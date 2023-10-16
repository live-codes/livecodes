/* eslint-disable import/no-internal-modules */
import type { SourceFile, populateConfig as populateConfigFn } from '../import/utils';
import type { createModal } from '../modal';
import type { Config, ContentConfig, User, Screen } from '../models';
import type { createNotifications } from '../notifications';
import type { ProjectStorage, StorageItem } from '../storage';
import type { createEventsManager } from '../events';
import { defaultConfig } from '../config/default-config';
import { importScreen } from '../html';
import { fetchWithHandler } from '../utils/utils';
import { importCode } from '../import/import';
import { importFromZip } from '../import/zip';
import {
  getBulkImportFileInput,
  getBulkImportJsonUrlButton,
  getBulkImportJsonUrlForm,
  getBulkImportJsonUrlInput,
  getCodeImportInput,
  getImportFileInput,
  getImportJsonUrlButton,
  getImportJsonUrlForm,
  getImportJsonUrlInput,
  getLinkToSavedProjects,
  getUrlImportButton,
  getUrlImportForm,
  getUrlImportInput,
} from './selectors';
export { importCode };

const createImportContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = importScreen;
  const importContainer = div.firstChild as HTMLElement;

  const tabs = importContainer.querySelectorAll<HTMLElement>('#import-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#import-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = importContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return importContainer;
};

export const createImportUI = ({
  baseUrl,
  modal,
  notifications,
  eventsManager,
  getUser,
  loadConfig,
  populateConfig,
  projectStorage,
  showScreen,
}: {
  baseUrl: string;
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  getUser: (() => Promise<void | User>) | undefined;
  loadConfig: (newConfig: Partial<ContentConfig>, url?: string) => Promise<void>;
  populateConfig: typeof populateConfigFn;
  projectStorage: ProjectStorage | undefined;
  showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
}) => {
  const importContainer = createImportContainer(eventsManager);
  const importForm = getUrlImportForm(importContainer);
  const importButton = getUrlImportButton(importContainer);
  eventsManager.addEventListener(importForm, 'submit', async (e) => {
    e.preventDefault();
    const buttonText = importButton.innerHTML;
    importButton.innerHTML = 'Loading...';
    importButton.disabled = true;
    const importInput = getUrlImportInput(importContainer);
    const url = importInput.value;

    const imported = await importCode(url, {}, defaultConfig, await getUser?.(), baseUrl);
    if (imported && Object.keys(imported).length > 0) {
      await loadConfig(
        {
          ...defaultConfig,
          ...imported,
        },
        location.origin + location.pathname + '?x=' + encodeURIComponent(url),
      );
      modal.close();
    } else {
      importButton.innerHTML = buttonText;
      importButton.disabled = false;
      notifications.error('failed to load URL');
      importInput.focus();
    }
  });

  const loadFiles = (input: HTMLInputElement) =>
    new Promise<Partial<ContentConfig>>((resolve, reject) => {
      const files = Array.from(input.files as FileList);
      const sourceFiles: SourceFile[] = [];

      for (const file of files) {
        // Max 100 MB allowed
        const maxSizeAllowed = 100 * 1024 * 1024;
        if (file.size > maxSizeAllowed) {
          reject('Error: Exceeded size 100 MB');
          return;
        }

        const reader = new FileReader();
        eventsManager.addEventListener(reader, 'load', async (event: any) => {
          const text = (event.target?.result as string) || '';
          sourceFiles.push({
            filename: file.name,
            content: text,
          });

          if (sourceFiles.length === files.length) {
            resolve(populateConfig(sourceFiles, {}));
          }
        });

        eventsManager.addEventListener(reader, 'error', () => {
          reject('Error: Failed to read file');
        });

        reader.readAsText(file);
      }
    });

  const loadZipFile = (input: HTMLInputElement) => importFromZip(input.files![0], populateConfig);

  const codeImportInput = getCodeImportInput(importContainer);
  eventsManager.addEventListener(codeImportInput, 'change', () => {
    if (codeImportInput.files?.length === 0) return;

    const getConfigFromFiles =
      codeImportInput.files?.length === 1 && codeImportInput.files[0].name.endsWith('.zip')
        ? loadZipFile
        : loadFiles;

    getConfigFromFiles(codeImportInput)
      .then(loadConfig)
      .then(modal.close)
      .catch((message) => {
        notifications.error(message);
      });
  });

  const importJsonUrlForm = getImportJsonUrlForm(importContainer);
  const importJsonUrlButton = getImportJsonUrlButton(importContainer);
  eventsManager.addEventListener(importJsonUrlForm, 'submit', async (e) => {
    e.preventDefault();
    const buttonText = importJsonUrlButton.innerHTML;
    importJsonUrlButton.innerHTML = 'Loading...';
    importJsonUrlButton.disabled = true;
    const importInput = getImportJsonUrlInput(importContainer);
    const url = importInput.value;
    fetchWithHandler(url)
      .then((res) => res.json())
      .then((fileConfig) =>
        loadConfig(fileConfig, location.origin + location.pathname + '?config=' + url),
      )
      .then(() => modal.close())
      .catch(() => {
        importJsonUrlButton.innerHTML = buttonText;
        importJsonUrlButton.disabled = false;
        notifications.error('Error: failed to load URL');
        importInput.focus();
      });
  });

  const bulkImportJsonUrlForm = getBulkImportJsonUrlForm(importContainer);
  const bulkimportJsonUrlButton = getBulkImportJsonUrlButton(importContainer);
  eventsManager.addEventListener(bulkImportJsonUrlForm, 'submit', async (e) => {
    e.preventDefault();
    const buttonText = bulkimportJsonUrlButton.innerHTML;
    bulkimportJsonUrlButton.innerHTML = 'Loading...';
    bulkimportJsonUrlButton.disabled = true;
    const importInput = getBulkImportJsonUrlInput(importContainer);
    const url = importInput.value;
    fetchWithHandler(url)
      .then((res) => res.json())
      .then(insertItems)
      .catch(() => {
        bulkimportJsonUrlButton.innerHTML = buttonText;
        bulkimportJsonUrlButton.disabled = false;
        notifications.error('Error: failed to load URL');
        importInput.focus();
      });
  });

  const loadFile = <T>(input: HTMLInputElement) =>
    new Promise<T>((resolve, reject) => {
      if (input.files?.length === 0) return;

      const file = (input.files as FileList)[0];

      const allowedTypes = ['application/json', 'text/plain'];
      if (allowedTypes.indexOf(file.type) === -1) {
        reject('Error: Incorrect file type');
        return;
      }

      // Max 100 MB allowed
      const maxSizeAllowed = 100 * 1024 * 1024;
      if (file.size > maxSizeAllowed) {
        reject('Error: Exceeded size 100 MB');
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

  const insertItems = async (items: StorageItem[]) => {
    const getItemConfig = (item: StorageItem) => item.config || (item as any).pen; // for backward compatibility
    if (Array.isArray(items) && items.every(getItemConfig) && projectStorage) {
      await projectStorage.bulkInsert(items.map(getItemConfig));
      notifications.success('Import Successful!');
      showScreen('open');
      return;
    }
    return Promise.reject('Error: Invalid file');
  };

  const fileInput = getImportFileInput(importContainer);
  eventsManager.addEventListener(fileInput, 'change', () => {
    loadFile<Config>(fileInput)
      .then(loadConfig)
      .then(modal.close)
      .catch((message) => {
        notifications.error(message);
      });
  });

  const bulkFileInput = getBulkImportFileInput(importContainer);
  eventsManager.addEventListener(bulkFileInput, 'change', () => {
    loadFile<StorageItem[]>(bulkFileInput)
      .then(insertItems)
      .catch((message) => {
        notifications.error(message);
      });
  });

  const linkToSavedProjects = getLinkToSavedProjects(importContainer);
  eventsManager.addEventListener(linkToSavedProjects, 'click', (e) => {
    e.preventDefault();
    showScreen('open');
  });

  modal.show(importContainer, { isAsync: true });
  getUrlImportInput(importContainer).focus();
};
