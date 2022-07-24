/* eslint-disable import/no-internal-modules */
import type { User } from '../models';
import type { Storage, SimpleStorage, StorageData, Stores, ProjectStorage } from '../storage';
import { commitFile, getFile as getFileFromGithub, GitHubFile } from '../services/github';
import { base64ToUint8Array, Uint8ArrayToBase64 } from '../utils/utils';
import { Y, DeepDiff, applyChange, toJSON, YMap } from './diff';

export interface StoredSyncData {
  lastModified: number;
  data: Uint8Array;
  lastSyncSha: string;
}

const getStorageData = async <T>(
  storage: SimpleStorage<T> | Storage<T> | ProjectStorage | undefined,
) => {
  if (!storage) return [];
  if ('getValue' in storage) {
    // SimpleStorage
    const value = storage.getValue();
    return [...(value ? [value] : [])];
  }
  // ProjectStorage
  const items = await storage.getAllData();
  return items;
};

const setStorageData = async <T>(
  storage: Storage<T> | SimpleStorage<T> | undefined,
  data: T[] | T,
) => {
  if (!storage) return;
  if ('setValue' in storage) {
    // SimpleStorage
    storage.setValue(data as T);
    return;
  }

  // ProjectStorage
  await storage.clear();
  await storage.restore(data as T[]);
};

const changeDoc = (target: YMap<any>, data: Record<string, any>) => {
  const changes = DeepDiff.diff(toJSON(target), data) || [];
  target.doc?.transact(() => {
    for (const change of changes) {
      applyChange(target, change);
    }
  });
};

export const sync = async ({
  user,
  repo,
  newRepo,
  stores,
}: {
  user: User;
  repo: string;
  newRepo: boolean;
  stores: Stores;
}) => {
  // get local data from stores
  const data: Partial<StorageData> = {};
  for (const [key, storage] of Object.entries(stores)) {
    if (['restore', 'sync'].includes(key)) continue;
    data[key as keyof Stores] = await getStorageData(storage);
  }

  // get previously saved sync data
  const storedSyncData = (await stores.sync?.getAllData())?.[0];
  const localDoc = new Y.Doc();

  if (storedSyncData) {
    Y.applyUpdate(localDoc, storedSyncData.data);
  }

  // update sync data from stores
  changeDoc(localDoc.getMap<any>('data'), data);

  const path = 'livecodes-data.b64';

  // pull from remote
  if (!newRepo) {
    let remoteFile: any;
    try {
      remoteFile = await getFileFromGithub({
        user,
        repo,
        branch: 'main',
        path,
      });
    } catch {
      //
    }

    try {
      if (remoteFile?.content) {
        const remoteSyncData = base64ToUint8Array(remoteFile.content);
        Y.applyUpdate(localDoc, remoteSyncData);

        if (!DeepDiff.diff(localDoc, data)) return true;
      }
    } catch {
      return false;
    }
  }

  // save to local stores
  for (const key of Object.keys(localDoc)) {
    await setStorageData((stores as any)[key], (localDoc as any)[key]);
  }

  // push to remote
  const newSyncData = Y.encodeStateAsUpdate(localDoc);
  const file: GitHubFile = {
    path,
    content: Uint8ArrayToBase64(newSyncData),
  };

  try {
    const result = await commitFile({
      file,
      user,
      repo,
      branch: 'main',
      message: 'sync',
      newRepo,
      privateRepo: true,
      description: 'Livecodes Sync',
      readmeContent: '# Livecodes Sync',
    });
    if (!result) return false;

    // save sync data
    const newData: StoredSyncData = {
      lastModified: Date.now(),
      data: newSyncData,
      lastSyncSha: result.commit,
    };
    await stores.sync?.clear();
    await stores.sync?.addItem(newData);
  } catch {
    return false;
  }

  return true;
};
