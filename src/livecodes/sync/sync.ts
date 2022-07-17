/* eslint-disable import/no-internal-modules */
import { Doc, getActorId, merge, change, init, save, load, BinaryDocument } from 'automerge';
import { diff, applyChange } from 'deep-diff';

import type { User } from '../models';
import type { ProjectStorage, SimpleStorage, StorageData, StorageItem, Stores } from '../storage';
import { commitFile, getFile as getFileFromGithub, GitHubFile } from '../services/github';
import { base64ToUint8Array, Uint8ArrayToBase64 } from '../utils/utils';

const Automerge = { getActorId, merge, change, init, save, load };
const DeepDiff = { diff, applyChange };

const getStorageData = async (
  storage: ProjectStorage | SimpleStorage<any> | undefined,
): Promise<any[]> => {
  if (!storage) return [];
  if ('getValue' in storage) {
    // SimpleStorage
    return [JSON.stringify(storage.getValue() || {})];
  }
  // ProjectStorage
  const items = await storage.getAllData();
  return items.map((item) => JSON.stringify(item));
};

const setStorageData = async (
  storage: ProjectStorage | SimpleStorage<any> | undefined,
  data: any,
): Promise<void> => {
  if (!storage) return;
  if ('setValue' in storage) {
    // SimpleStorage
    storage.setValue(data);
    return;
  }
  // ProjectStorage
  await storage.clear();
  await storage.bulkInsert(data.map((item: StorageItem) => item.config));
};

const changeDoc = (oldDoc: Doc<Partial<StorageData>>, newData: Record<string, any>) => {
  let data = newData;
  try {
    // convert automerge document to plain object
    Automerge.getActorId(newData);
    data = JSON.parse(JSON.stringify(newData));
  } catch {
    // not automerge document, continue
  }
  const changes = DeepDiff.diff(oldDoc, data) || [];
  return Automerge.change(oldDoc, (doc: Doc<Partial<StorageData>>) => {
    changes.forEach((change) => DeepDiff.applyChange(doc, undefined, change));
  });
};

export const sync = async ({
  user,
  repo,
  newRepo,
  stores,
  syncStorage,
}: {
  user: User;
  repo: string;
  newRepo: boolean;
  stores: Stores;
  syncStorage: ProjectStorage | undefined;
}) => {
  // get local data from stores
  const data: Partial<StorageData> = {};
  for (const [key, storage] of Object.entries(stores)) {
    data[key as keyof Stores] = await getStorageData(storage);
  }

  // get previously saved sync data
  interface StoredSyncData {
    lastModified: number;
    data: BinaryDocument;
    lastSyncSha: string;
  }
  const storedSyncData = (await syncStorage?.getAllData<StoredSyncData>())?.[0];
  let localDoc: Doc<Partial<StorageData>> = storedSyncData
    ? Automerge.load(storedSyncData.data)
    : changeDoc(init(), {});

  // update sync data from stores
  localDoc = changeDoc(localDoc, data);

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
        const remoteSyncData = base64ToUint8Array(remoteFile.content) as BinaryDocument;
        const remoteDoc = Automerge.load(remoteSyncData);
        localDoc = Automerge.merge(localDoc, remoteDoc);

        if (!DeepDiff.diff(localDoc, data)) return true;
      }
    } catch {
      return false;
    }
  }

  // save to local stores
  for (const key of Object.keys(localDoc)) {
    await setStorageData(stores[key], localDoc[key]);
  }

  // push to remote
  const newSyncData = Automerge.save(localDoc);
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
    await syncStorage?.clear();
    await syncStorage?.addGenericItem(newData);
  } catch {
    return false;
  }

  return true;
};
