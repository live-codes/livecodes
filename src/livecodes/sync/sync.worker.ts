/* eslint-disable import/no-internal-modules */
import type { User } from '../models';
import type { Storage, SimpleStorage, ProjectStorage, Stores } from '../storage';
import { createStores, initializeStores } from '../storage/stores';
import { commitFile, getContent, GitHubFile } from '../services/github';
import { base64ToUint8Array, typedArraysAreEqual, Uint8ArrayToBase64 } from '../utils/utils';
import { Y, DeepDiff, applyChange, toJSON } from './diff';
import type { StoredSyncData, SyncMessageEvent } from './models';

const storesToSync: Array<keyof Stores> = ['projects', 'templates', 'assets', 'snippets'];
const repoDir = 'livecodes-data';
const rootArrayKey = 'data';
const worker: Worker = self as any;

const stores = createStores();

interface GitHubContent {
  name: string;
  sha: string;
  type: 'file' | 'dir';
}

const getStorageData = async <T>(
  storage: SimpleStorage<T> | Storage<T> | ProjectStorage | undefined,
) => {
  if (!storage) return [];
  if ('getValue' in storage) {
    // SimpleStorage
    const value = storage.getValue();
    return value != null ? [value] : [];
  }
  // Storage
  return storage.getAllData();
};

const setStorageData = async <T>(
  storage: SimpleStorage<T> | Storage<T> | ProjectStorage | undefined,
  data: T[],
) => {
  if (!storage) return;
  if ('setValue' in storage) {
    // SimpleStorage
    storage.setValue(data[0]);
    return;
  }
  // Storage
  await storage.clear();
  await storage.restore(data as any);
};

const changeDoc = (target: Y.Array<any>, data: any[] = []) => {
  const changes = DeepDiff.diff(toJSON(target), data) || [];
  target.doc?.transact(() => {
    for (const change of changes) {
      applyChange(target, change);
    }
  });
};

const syncStore = async ({
  user,
  repo,
  branch,
  stores,
  storeKey,
  remoteContent,
}: {
  user: User;
  repo: string;
  branch: string;
  stores: Stores;
  storeKey: keyof Stores;
  remoteContent: GitHubContent[];
}) => {
  const syncKey = `${user.username}_${storeKey}`;
  const lastSyncSha = (await stores.sync?.getItem(syncKey))?.lastSyncSha;
  const filename = `${storeKey}.b64`;
  const path = `${repoDir}/${filename}`;

  const storage: SimpleStorage<any> | Storage<any> | ProjectStorage | undefined = stores[storeKey];
  if (!storage) return true;

  const isSimpleStorage = 'getValue' in storage;
  if (isSimpleStorage) return true;
  const doc = new Y.Doc();
  try {
    // ***************************
    // Get data: remote update, local update, current data in store
    // ***************************
    // #region
    let remoteUpdate;
    const remoteFileExists = remoteContent.find((f) => f.name === filename) != null;
    const uptodate = remoteContent.find((f) => f.sha === lastSyncSha) != null;
    const remoteFile =
      !remoteFileExists || uptodate
        ? undefined
        : await getContent({
            user,
            repo,
            branch,
            path,
          });

    if (remoteFile?.content) {
      const content =
        remoteFile.encoding === 'arrayBuffer'
          ? Uint8ArrayToBase64(new Uint8Array(remoteFile.content))
          : remoteFile.content;
      remoteUpdate = base64ToUint8Array(content);
    }

    const localUpdate = (await stores.sync?.getItem(syncKey))?.data;

    const currentData = await getStorageData(storage);
    // #endregion

    // ***************************
    //           Merge
    // ***************************
    // #region

    if (localUpdate) {
      Y.applyUpdate(doc, localUpdate);
      changeDoc(doc.getArray(rootArrayKey), currentData);
      if (remoteUpdate) {
        Y.applyUpdate(doc, remoteUpdate);
      }
    }

    if (!localUpdate && !remoteUpdate) {
      changeDoc(doc.getArray(rootArrayKey), currentData);
    }

    if (!localUpdate && remoteUpdate) {
      const remoteDoc = new Y.Doc();
      Y.applyUpdate(remoteDoc, remoteUpdate);
      const remoteData = toJSON<any[]>(remoteDoc.getArray(rootArrayKey));
      remoteDoc.destroy();

      // concat (currentData wins)
      const data = [...remoteData, ...currentData];

      changeDoc(doc.getArray(rootArrayKey), data);
    }
    // #endregion

    // ***************************
    //       Save and push
    // ***************************
    // #region

    // save to local stores
    const newData: any[] = toJSON(doc.getArray(rootArrayKey));
    const dataChanged = DeepDiff.diff(newData, currentData) != null;
    if (dataChanged) {
      await setStorageData(storage, newData);
    }

    // push to remote
    const newSyncUpdate = Y.encodeStateAsUpdate(doc);

    const shouldPushUpdate =
      !remoteFileExists ||
      (remoteUpdate && !typedArraysAreEqual(remoteUpdate, newSyncUpdate)) ||
      (uptodate && localUpdate && !typedArraysAreEqual(localUpdate, newSyncUpdate));

    if (shouldPushUpdate) {
      const file: GitHubFile = {
        path,
        content: Uint8ArrayToBase64(newSyncUpdate),
      };

      const result = await commitFile({
        file,
        user,
        repo,
        branch,
        message: 'sync ' + storeKey,
      });
      if (!result) {
        return false;
      }
    }

    const dirEntries: GitHubContent[] = !shouldPushUpdate
      ? remoteContent
      : (
          await getContent({
            user,
            repo,
            branch,
            path: repoDir,
          })
        )?.entries;
    const sha = dirEntries?.find?.((f) => f.name === filename)?.sha;

    // save sync data
    const newSyncData: StoredSyncData = {
      lastModified: Date.now(),
      data: newSyncUpdate,
      lastSyncSha: sha || '',
    };
    await stores.sync?.updateItem(syncKey, newSyncData);
    // #endregion
  } catch {
    return false;
  } finally {
    doc.destroy();
  }

  return true;
};

const sync = async ({
  user,
  repo,
  branch = 'main',
  newRepo,
}: {
  user: User;
  repo: string;
  branch?: string;
  newRepo: boolean;
}) => {
  let remoteContent: GitHubContent[] = [];
  try {
    if (newRepo) {
      await commitFile({
        file: {
          path: repoDir + '/.gitkeep',
          content: '',
        },
        user,
        repo,
        branch,
        message: 'create data dir',
        description: 'LiveCodes Sync',
        newRepo,
        privateRepo: true,
        readmeContent: '# LiveCodes Sync',
      });
    } else {
      const repoRootEntries: GitHubContent[] = (
        await getContent({
          user,
          repo,
          branch,
          path: '',
        })
      )?.entries;

      if (repoRootEntries?.find?.((x) => x.type === 'dir' && x.name === repoDir)) {
        remoteContent = (
          await getContent({
            user,
            repo,
            branch,
            path: repoDir,
          })
        )?.entries;
      }
    }
  } catch {
    return false;
  }

  let success = true;
  const storeKeys = (Object.keys(stores) as Array<keyof Stores>).filter((k) =>
    storesToSync.includes(k),
  );

  for (const storeKey of storeKeys) {
    const result = await syncStore({
      user,
      repo,
      branch,
      stores,
      storeKey,
      remoteContent,
    });
    if (!result) {
      success = false;
    }
  }
  return success;
};

const exportToLocalSync = async ({ user, storeKey }: { user: User; storeKey: keyof Stores }) => {
  const syncKey = `${user.username}_${storeKey}`;
  const storage: SimpleStorage<any> | Storage<any> | ProjectStorage | undefined = stores[storeKey];
  if (!storage) return;

  const { data: localUpdate, lastSyncSha = '' } = (await stores.sync?.getItem(syncKey)) || {};

  const currentData = await getStorageData(storage);

  const doc = new Y.Doc();

  try {
    if (localUpdate) {
      Y.applyUpdate(doc, localUpdate);
    }
    changeDoc(doc.getArray(rootArrayKey), currentData);

    const newSyncUpdate = Y.encodeStateAsUpdate(doc);

    const newSyncData: StoredSyncData = {
      lastModified: Date.now(),
      data: newSyncUpdate,
      lastSyncSha,
    };
    await stores.sync?.updateItem(syncKey, newSyncData);
  } finally {
    doc.destroy();
  }
};

const exportStoreAsBase64Update = async ({ storeKey }: { storeKey: keyof Stores }) => {
  const storage: SimpleStorage<any> | Storage<any> | ProjectStorage | undefined = stores[storeKey];
  if (!storage) return;

  const currentData = await getStorageData(storage);
  const doc = new Y.Doc();
  changeDoc(doc.getArray(rootArrayKey), currentData);
  const update = Y.encodeStateAsUpdate(doc);
  const base64 = Uint8ArrayToBase64(update);
  doc.destroy();
  return base64;
};

const restoreFromUpdate = async ({
  update,
  storeKey,
  mergeCurrent = true,
}: {
  update: Uint8Array;
  storeKey: keyof Stores;
  mergeCurrent?: boolean;
}) => {
  const storage: SimpleStorage<any> | Storage<any> | ProjectStorage | undefined = stores[storeKey];
  if (!storage) return;

  const isSimpleStorage = 'getValue' in storage;
  const currentData = await getStorageData(storage);
  const doc = new Y.Doc();

  try {
    Y.applyUpdate(doc, update);
    if (mergeCurrent) {
      const savedData = toJSON<any[]>(doc.getArray(rootArrayKey));
      const data = isSimpleStorage ? savedData : [...savedData, ...currentData];
      changeDoc(doc.getArray(rootArrayKey), data);
    }

    const newData: any[] = toJSON(doc.getArray(rootArrayKey));
    const dataChanged = DeepDiff.diff(newData, currentData) != null;
    if (dataChanged) {
      await setStorageData(storage, newData);
    }
  } finally {
    doc.destroy();
  }
};

const restoreFromLocalSync = async ({
  user,
  storeKey,
  mergeCurrent = true,
}: {
  user: User;
  storeKey: keyof Stores;
  mergeCurrent?: boolean;
}) => {
  const syncKey = `${user.username}_${storeKey}`;
  const storage: SimpleStorage<any> | Storage<any> | ProjectStorage | undefined = stores[storeKey];
  if (!storage) return;

  const update = (await stores.sync?.getItem(syncKey))?.data;
  if (!update) return;

  return restoreFromUpdate({ update, storeKey, mergeCurrent });
};

worker.addEventListener('message', async (event: SyncMessageEvent) => {
  if (!stores.projects) {
    await initializeStores(stores, false);
  }

  const message = event.data;

  let data;

  if (message.method === 'sync') {
    data = await (sync as any)(...message.args);
  }

  if (message.method === 'exportToLocalSync') {
    data = await (exportToLocalSync as any)(...message.args);
  }

  if (message.method === 'exportStoreAsBase64Update') {
    data = await (exportStoreAsBase64Update as any)(...message.args);
  }

  if (message.method === 'restoreFromUpdate') {
    data = await (restoreFromUpdate as any)(...message.args);
  }

  if (message.method === 'restoreFromLocalSync') {
    data = await (restoreFromLocalSync as any)(...message.args);
  }

  worker.postMessage({
    messageId: message.messageId,
    method: message.method,
    data,
  });
});

export type workerSync = typeof sync;
export type workerExportToLocalSync = typeof exportToLocalSync;
export type workerExportStoreAsBase64Update = typeof exportStoreAsBase64Update;
export type workerRestoreFromUpdate = typeof restoreFromUpdate;
export type workerRestoreFromLocalSync = typeof restoreFromLocalSync;
