/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { User } from '../models';
import type { Stores } from '../storage';
import { syncScreen } from '../html';
import { autoCompleteUrl } from '../vendors';
import { getUserRepos } from '../services/github';
import {
  getExistingRepoAutoSync,
  getExistingRepoButton,
  getExistingRepoForm,
  getExistingRepoNameInput,
  getNewRepoAutoSync,
  getNewRepoButton,
  getNewRepoForm,
  getNewRepoNameInput,
} from './selectors';

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
  baseUrl,
  modal,
  notifications,
  eventsManager,
  user,
  stores,
}: {
  baseUrl: string;
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  user: User;
  stores: Stores;
}) => {
  const syncContainer = createSyncContainer(eventsManager);

  const newRepoForm = getNewRepoForm(syncContainer);
  const newRepoButton = getNewRepoButton(syncContainer);
  const newRepoNameInput = getNewRepoNameInput(syncContainer);
  const newRepoAutoSync = getNewRepoAutoSync(syncContainer);
  const existingRepoForm = getExistingRepoForm(syncContainer);
  const existingRepoButton = getExistingRepoButton(syncContainer);
  const existingRepoNameInput = getExistingRepoNameInput(syncContainer);
  const existingRepoAutoSync = getExistingRepoAutoSync(syncContainer);

  // start loading the module
  const syncModule: Promise<typeof import('../sync/sync')> = import(baseUrl + '{{hash:sync.js}}');

  const sync = (user: User, repo: string, newRepo: boolean) => {
    notifications.info('Sync started...');
    modal.close();

    return syncModule
      .then(async (mod) => {
        const syncResult = await mod.sync({
          user,
          repo,
          newRepo,
          stores,
        });
        if (!syncResult) {
          notifications.error('Sync failed!');
          return;
        }
        notifications.success('Sync complete!');
      })
      .catch(() => {
        notifications.error('Sync failed!');
      });
  };

  eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = newRepoNameInput.value;
    const autoSync = newRepoAutoSync.checked;
    // eslint-disable-next-line no-console
    console.log(autoSync);
    const newRepo = true;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    newRepoButton.innerHTML = 'Sync started...';
    newRepoButton.disabled = true;

    await sync(user, name, newRepo);
    newRepoButton.innerHTML = 'Sync';
    newRepoButton.disabled = false;
  });

  eventsManager.addEventListener(existingRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = existingRepoNameInput.value;
    const autoSync = existingRepoAutoSync.checked;
    // eslint-disable-next-line no-console
    console.log(autoSync);
    const newRepo = false;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    existingRepoButton.innerHTML = 'Sync started...';
    existingRepoButton.disabled = true;

    await sync(user, name, newRepo);
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
