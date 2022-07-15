/* eslint-disable import/no-internal-modules */
import { Doc, getActorId, merge, change, init, save, load, BinaryDocument } from 'automerge';
import { diff, applyChange } from 'deep-diff';

import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { User } from '../models';
import { syncScreen } from '../html';
import { autoCompleteUrl } from '../vendors';
import { commitFile, getFile, getUserRepos, GitHubFile } from '../services/github';
import { ProjectStorage, SimpleStorage, StorageData, Stores } from '../storage';
import { base64ToUint8Array, Uint8ArrayToBase64 } from '../utils/utils';
import {
  getExistingRepoAutoSync,
  getExistingRepoButton,
  getExistingRepoForm,
  getExistingRepoNameInput,
  getNewRepoAutoSync,
  getNewRepoButton,
  getNewRepoForm,
  getNewRepoNameError,
  getNewRepoNameInput,
} from './selectors';

const Automerge = { getActorId, merge, change, init, save, load };
const DeepDiff = { diff, applyChange };

const createSyncContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = syncScreen;
  const syncContainer = div.firstChild as HTMLElement;

  const tabs = syncContainer.querySelectorAll<HTMLElement>('#sync-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#sync-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = syncContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return syncContainer;
};

export const createSyncUI = async ({
  modal,
  notifications,
  eventsManager,
  user,
  stores,
  syncStorage,
}: {
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  user: User;
  stores: Stores;
  syncStorage: ProjectStorage | undefined;
}) => {
  const syncContainer = createSyncContainer(eventsManager);

  const newRepoForm = getNewRepoForm(syncContainer);
  const newRepoButton = getNewRepoButton(syncContainer);
  const newRepoNameInput = getNewRepoNameInput(syncContainer);
  const newRepoNameError = getNewRepoNameError(syncContainer);
  const newRepoAutoSync = getNewRepoAutoSync(syncContainer);
  const existingRepoForm = getExistingRepoForm(syncContainer);
  const existingRepoButton = getExistingRepoButton(syncContainer);
  const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
  const existingRepoAutoSync = getExistingRepoAutoSync(syncContainer);

  const publish = async (user: User, repo: string, newRepo: boolean) => {
    newRepoNameError.innerHTML = '';

    const syncResult = await sync({
      user,
      repo,
      newRepo,
      stores,
      syncStorage,
    });

    if (!syncResult) {
      newRepoNameError.innerHTML = 'Sync failed!';
      return false;
    }

    notifications.success('Sync complete!');
    return true;
  };

  eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = newRepoNameInput.value;
    const autoSync = newRepoAutoSync.checked;
    const newRepo = true;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    newRepoButton.innerHTML = 'Sync started...';
    newRepoButton.disabled = true;

    await publish(user, name, newRepo);
    newRepoButton.innerHTML = 'Sync';
    newRepoButton.disabled = false;
  });

  eventsManager.addEventListener(existingRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = existingRepoNameInput.value;
    const autoSync = existingRepoAutoSync.checked;
    const newRepo = false;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    existingRepoButton.innerHTML = 'Sync started...';
    existingRepoButton.disabled = true;

    await publish(user, name, newRepo);
    existingRepoButton.innerHTML = 'Sync';
    existingRepoButton.disabled = false;
  });

  let autoComplete: any;
  import(autoCompleteUrl).then(async () => {
    autoComplete = (globalThis as any).autoComplete;

    if (!user) return;
    const repos = await getUserRepos(user, 'all');

    eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
      existingRepoNameInput.focus();
    });

    const inputSelector = '#' + existingRepoNameInput.id;
    if (!document.querySelector(inputSelector)) return;
    const autoCompleteJS = new autoComplete({
      selector: inputSelector,
      placeHolder: 'Search your repos...',
      data: {
        src: repos,
      },
      resultItem: {
        highlight: {
          render: true,
        },
      },
    });

    eventsManager.addEventListener(autoCompleteJS.input, 'selection', function (event: any) {
      const feedback = event.detail;
      autoCompleteJS.input.blur();
      const selection = feedback.selection.value;
      autoCompleteJS.input.value = selection;
    });
  });

  modal.show(syncContainer, { isAsync: true });
  newRepoNameInput.focus();
};

const getStorageAsFiles = async ([path, storage]: [
  path: string,
  storage: ProjectStorage | SimpleStorage<any> | undefined,
]): Promise<GitHubFile[]> => {
  if (!storage) return [];
  if ('getValue' in storage) {
    // SimpleStorage
    return [
      {
        path: `${path}.json`,
        content: JSON.stringify((await storage.getValue()) || {}),
      },
    ];
  }
  // ProjectStorage
  const items = await storage.getAllData();
  return items.map((item) => ({
    path: `${path}/${item.id}.json`,
    content: JSON.stringify(item),
  }));
};

const getStorageData = async (
  storage: ProjectStorage | SimpleStorage<any> | undefined,
): Promise<any[]> => {
  if (!storage) return [];
  if ('getValue' in storage) {
    // SimpleStorage
    return [JSON.stringify((await storage.getValue()) || {})];
  }
  // ProjectStorage
  const items = await storage.getAllData();
  return items.map((item) => JSON.stringify(item));
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
  const data: Partial<StorageData> = {};
  for (const [key, storage] of Object.entries(stores)) {
    data[key as keyof Stores] = await getStorageData(storage);
  }

  interface StoredSyncData {
    lastModified: number;
    data: BinaryDocument;
    lastSyncSha: string;
  }

  const storedSyncData = (await syncStorage?.getAllData<StoredSyncData>())?.[0];
  let localDoc: Doc<Partial<StorageData>> = storedSyncData
    ? Automerge.load(storedSyncData.data)
    : changeDoc(init(), {});
  localDoc = changeDoc(localDoc, data);

  const path = 'data/stores';
  let remoteFile: any;
  try {
    remoteFile = await getFile({
      user,
      repo,
      branch: 'main',
      path,
    });

    if (remoteFile?.content) {
      const remoteSyncData = base64ToUint8Array(remoteFile.content) as BinaryDocument;
      let remoteDoc = Automerge.load(remoteSyncData);
      console.log(DeepDiff.diff(localDoc, remoteDoc));
      localDoc = Automerge.merge(localDoc, remoteDoc);
      remoteDoc = Automerge.merge(remoteDoc, localDoc);
    }
  } catch {
    //
  }

  if (!DeepDiff.diff(localDoc, data)) return;

  const newSyncData = Automerge.save(localDoc);
  const file: GitHubFile = {
    path,
    content: Uint8ArrayToBase64(newSyncData),
  };

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

  const newData: StoredSyncData = {
    lastModified: Date.now(),
    data: newSyncData,
    lastSyncSha: result?.commit,
  };
  await syncStorage?.clear();
  await syncStorage?.addGenericItem(newData);
};
