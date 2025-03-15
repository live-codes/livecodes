import type { EventsManager, Modal, Notifications, User, UserData } from '../models';
import { syncScreen } from '../html';
import { autoCompleteUrl } from '../vendors';
import { getUserRepos } from '../services/github';
import {
  getExistingRepoAutoSync,
  getExistingRepoForm,
  getExistingRepoNameInput,
  getNewRepoAutoSync,
  getNewRepoForm,
  getNewRepoNameInput,
  getStartSyncBtns,
  getSyncIndicator,
  getSyncLink,
  getSyncStatus,
} from './selectors';

const createSyncContainer = (eventsManager: EventsManager, repo: string | null | undefined) => {
  const div = document.createElement('div');
  div.innerHTML = syncScreen;
  const syncContainer = div.firstChild as HTMLElement;

  const tabs = syncContainer.querySelectorAll<HTMLElement>('#sync-tabs li');
  tabs.forEach((tab) => {
    const link = tab.querySelector('a');
    if (!link) return;
    eventsManager.addEventListener(link, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#sync-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = syncContainer.querySelector('#' + link.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  if (repo) {
    setTimeout(() => {
      tabs[1].click();
      const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
      existingRepoNameInput.value = repo;
    });
  }

  return syncContainer;
};

const syncInProgressMessage = window.deps.translateString(
  'sync.syncInProgress',
  'Sync in progress...',
);
export const isSyncInProgress = () => getSyncLink()?.title === syncInProgressMessage;

export const updateSyncStatus = ({
  inProgress,
  lastSync,
  syncContainer,
}: {
  inProgress?: boolean;
  lastSync?: number;
  syncContainer?: HTMLElement;
}) => {
  const syncLink = getSyncLink();
  const syncIndicator = getSyncIndicator();
  const syncStatus = getSyncStatus(syncContainer);
  const startSyncBtns = getStartSyncBtns(syncContainer);

  const lastSyncMessage = lastSync ? `Last sync: ${new Date(lastSync).toLocaleString()}` : '';
  if (syncStatus) {
    syncStatus.innerText = lastSyncMessage;
  }

  if (inProgress ?? isSyncInProgress()) {
    if (syncLink) {
      syncLink.title = syncInProgressMessage;
      syncIndicator?.classList.remove('hidden');
    }
    startSyncBtns?.forEach((btn) => {
      btn.innerText = syncInProgressMessage;
      btn.disabled = true;
    });
  } else {
    if (syncLink) {
      syncLink.title = lastSyncMessage;
      syncIndicator?.classList.add('hidden');
    }
    startSyncBtns?.forEach((btn) => {
      btn.innerText = window.deps.translateString('sync.syncBtn', 'Sync');
      btn.disabled = false;
    });
  }
};

export const createSyncUI = async ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  user,
  deps,
}: {
  baseUrl: string;
  modal: Modal;
  notifications: Notifications;
  eventsManager: EventsManager;
  user: User;
  deps: {
    getSyncData: () => Promise<UserData['data']['sync'] | null>;
    setSyncData: (syncData: UserData['data']['sync']) => Promise<void>;
  };
}) => {
  const syncData = await deps.getSyncData();
  const syncContainer = createSyncContainer(eventsManager, syncData?.repo);

  const newRepoForm = getNewRepoForm(syncContainer);
  const newRepoNameInput = getNewRepoNameInput(syncContainer);
  const newRepoAutoSync = getNewRepoAutoSync(syncContainer);
  const existingRepoForm = getExistingRepoForm(syncContainer);
  const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
  const existingRepoAutoSync = getExistingRepoAutoSync(syncContainer);

  updateSyncStatus({ inProgress: isSyncInProgress(), lastSync: syncData?.lastSync, syncContainer });

  // start loading the module
  const syncModule: Promise<typeof import('../sync/sync')> = import(
    baseUrl + '{{hash:sync.js}}'
  ).then((mod) => {
    mod.init(baseUrl);
    return mod;
  });

  const sync = (user: User, repo: string, newRepo: boolean) => {
    notifications.info(window.deps.translateString('sync.syncStarted', 'Sync started...'));
    modal.close();

    return syncModule
      .then(async (mod) => {
        const syncResult = await mod.sync({
          user,
          repo,
          newRepo,
        });
        if (!syncResult) {
          notifications.error(window.deps.translateString('sync.error.generic', 'Sync failed!'));
          return;
        }
        notifications.success(window.deps.translateString('sync.success', 'Sync complete!'));
      })
      .catch(() => {
        notifications.error(window.deps.translateString('sync.error.generic', 'Sync failed!'));
      });
  };

  eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user || isSyncInProgress()) return;

    const repo = newRepoNameInput.value;
    const autosync = newRepoAutoSync.checked;

    const newRepo = true;
    if (!repo) {
      notifications.error(
        window.deps.translateString('sync.error.repoNameRequired', 'Repo name is required'),
      );
      return;
    }

    updateSyncStatus({ inProgress: true });

    await sync(user, repo, newRepo);
    const lastSync = Date.now();
    await deps.setSyncData({ autosync, repo, lastSync });

    updateSyncStatus({ inProgress: false, lastSync });
  });

  eventsManager.addEventListener(existingRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user || isSyncInProgress()) return;

    const repo = existingRepoNameInput.value;
    const autosync = existingRepoAutoSync.checked;

    const newRepo = false;
    if (!repo) {
      notifications.error(
        window.deps.translateString('sync.error.repoNameRequired', 'Repo name is required'),
      );
      return;
    }

    updateSyncStatus({ inProgress: true });

    await sync(user, repo, newRepo);
    const lastSync = Date.now();
    await deps.setSyncData({ autosync, repo, lastSync });

    updateSyncStatus({ inProgress: false, lastSync });
  });

  modal.show(syncContainer, { isAsync: true });
  newRepoNameInput.focus();

  if (!user) return;

  if (!(globalThis as any).autoComplete) {
    await import(autoCompleteUrl);
  }
  const autoComplete = (globalThis as any).autoComplete;

  const repos = await getUserRepos(user, 'all');

  eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
    existingRepoNameInput.focus();
  });

  const inputSelector = '#' + existingRepoNameInput.id;
  if (!document.querySelector(inputSelector)) return;
  const autoCompleteJS = new autoComplete({
    selector: inputSelector,
    placeHolder: window.deps.translateString('sync.searchRepos', 'Search your repos...'),
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
};
