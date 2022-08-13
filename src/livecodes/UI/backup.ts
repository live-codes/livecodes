/* eslint-disable import/no-internal-modules */
import type { Screen } from '../models';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { createEventsManager } from '../events';
import { backupScreen } from '../html';
import { Stores } from '../storage';
import { downloadFile, getDate } from '../utils/utils';
import { jsZipUrl } from '../vendors';
import {
  getBackupBtn,
  getBackupCheckedInputs,
  getBackupForm,
  getImportFileInput,
} from './selectors';

const createBackupContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = backupScreen;
  const backupContainer = div.firstChild as HTMLElement;

  const tabs = backupContainer.querySelectorAll<HTMLElement>('#backup-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#backup-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = backupContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return backupContainer;
};

export const createBackupUI = ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  stores,
  deps,
}: {
  baseUrl: string;
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  stores: Stores;
  deps: {
    showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
  };
}) => {
  const backupContainer = createBackupContainer(eventsManager);
  const backupForm = getBackupForm(backupContainer);
  const backupBtn = getBackupBtn(backupContainer);
  const fileInput = getImportFileInput(backupContainer);

  const syncModule: Promise<typeof import('../sync/sync')> = import(baseUrl + '{{hash:sync.js}}');

  const createZip = async (files: Array<{ filename: string; content: string }>) => {
    if (!(window as any).JSZip) {
      (window as any).JSZip = (await import(jsZipUrl)).default;
    }

    const zip = new (window as any).JSZip();

    files.forEach(({ filename, content }) => {
      zip.file(filename, content);
    });
    const output = await zip.generateAsync({ type: 'base64' });

    const filename = 'livecodes_backup_' + getDate();
    const extension = 'zip';
    const content = 'data:application/zip;base64,' + encodeURIComponent(output);
    downloadFile(filename, extension, content);
  };

  const backup = async () => {
    const storeKeys = [...getBackupCheckedInputs(backupContainer)]
      .map((input) => input.dataset.store)
      .filter(Boolean) as Array<keyof Stores>;

    if (storeKeys.includes('userConfig')) {
      storeKeys.push('userData');
    }

    const loadedSyncModule = await syncModule;

    const files = await Promise.all(
      storeKeys
        .filter((storeKey) => Boolean(stores[storeKey]))
        .map(async (storeKey) => ({
          filename: storeKey + '.b64',
          content: await loadedSyncModule.exportStoreAsBase64Update({ storage: stores[storeKey]! }),
        })),
    );
    await createZip(files);
  };

  // const loadZipFile = (input: HTMLInputElement) => importFromZip(input.files![0]);

  const loadFile = <T>(input: HTMLInputElement) =>
    new Promise<T>((resolve, reject) => {
      if (input.files?.length === 0) return;

      const file = (input.files as FileList)[0];

      const allowedTypes = ['application/json', 'text/plain'];
      if (allowedTypes.indexOf(file.type) === -1) {
        reject('Error: Incorrect file type');
        return;
      }

      // Max 20 MB allowed
      const maxSizeAllowed = 20 * 1024 * 1024;
      if (file.size > maxSizeAllowed) {
        reject('Error: Exceeded size 20MB');
        return;
      }

      const reader = new FileReader();
      eventsManager.addEventListener(reader, 'load', async (event: any) => {
        const text = (event.target?.result as string) || '';
        try {
          resolve(JSON.parse(text));
        } catch (error) {
          reject('Invalid configuration file');
        }
      });

      eventsManager.addEventListener(reader, 'error', () => {
        reject('Error: Failed to read file');
      });

      reader.readAsText(file);
    });

  const restore = async () => {
    notifications.success('Import Successful!');
    deps.showScreen('open');
  };

  eventsManager.addEventListener(backupForm, 'submit', async (e) => {
    e.preventDefault();
    backupBtn.disabled = true;
    await backup();
    backupBtn.disabled = false;
  });

  eventsManager.addEventListener(fileInput, 'change', () => {
    loadFile(fileInput)
      .then(restore)
      .catch((message) => {
        notifications.error(message);
      });
  });

  modal.show(backupContainer, { isAsync: true });
};
