import { defaultConfig } from '../config/default-config';
import { importScreen } from '../html';
import { importFromFiles } from '../import/files';
import { importCode } from '../import/import';
import type { populateConfig as populateConfigFn } from '../import/utils';
import type {
  Config,
  ContentConfig,
  EventsManager,
  Modal,
  Notifications,
  Screen,
  User,
} from '../models';
import type { ProjectStorage, StorageItem } from '../storage';
import { fetchWithHandler } from '../utils/utils';
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

const createImportContainer = (eventsManager: EventsManager) => {
  const div = document.createElement('div');
  div.innerHTML = importScreen;
  const importContainer = div.firstChild as HTMLElement;

  const tabs = importContainer.querySelectorAll<HTMLElement>('#import-tabs li');
  tabs.forEach((tab) => {
    const link = tab.querySelector('a');
    if (!link) return;
    eventsManager.addEventListener(link, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#import-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = importContainer.querySelector('#' + link.dataset.target);
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
  modal: Modal;
  notifications: Notifications;
  eventsManager: EventsManager;
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
    importButton.innerHTML = window.deps.translateString('generic.loading', 'Loading...');
    notifications.info(window.deps.translateString('generic.loading', 'Loading...'));
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
      notifications.error(
        window.deps.translateString('import.error.failedToLoadURL', 'Error: failed to load URL'),
      );
      importInput.focus();
    }
  });

  const codeImportInput = getCodeImportInput(importContainer);
  eventsManager.addEventListener(codeImportInput, 'change', () => {
    if (!codeImportInput.files?.length) return;
    notifications.info(window.deps.translateString('generic.loading', 'Loading...'));
    importFromFiles(codeImportInput.files, populateConfig, eventsManager)
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
    importJsonUrlButton.innerHTML = window.deps.translateString('generic.loading', 'Loading...');
    notifications.info(window.deps.translateString('generic.loading', 'Loading...'));
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
        notifications.error(
          window.deps.translateString('import.error.failedToLoadURL', 'Error: failed to load URL'),
        );
        importInput.focus();
      });
  });

  const bulkImportJsonUrlForm = getBulkImportJsonUrlForm(importContainer);
  const bulkimportJsonUrlButton = getBulkImportJsonUrlButton(importContainer);
  eventsManager.addEventListener(bulkImportJsonUrlForm, 'submit', async (e) => {
    e.preventDefault();
    notifications.info(
      window.deps.translateString('import.bulk.started', 'Bulk import started...'),
    );
    const buttonText = bulkimportJsonUrlButton.innerHTML;
    bulkimportJsonUrlButton.innerHTML = window.deps.translateString(
      'generic.loading',
      'Loading...',
    );
    bulkimportJsonUrlButton.disabled = true;
    const importInput = getBulkImportJsonUrlInput(importContainer);
    const url = importInput.value;
    fetchWithHandler(url)
      .then((res) => res.json())
      .then(insertItems)
      .catch(() => {
        bulkimportJsonUrlButton.innerHTML = buttonText;
        bulkimportJsonUrlButton.disabled = false;
        notifications.error(
          window.deps.translateString('import.error.failedToLoadURL', 'Error: failed to load URL'),
        );
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
        reject(
          window.deps.translateString(
            'generic.error.exceededSize',
            'Error: Exceeded size {{size}} MB',
            {
              size: 100,
            },
          ),
        );
        return;
      }

      const reader = new FileReader();
      eventsManager.addEventListener(reader, 'load', async (event: any) => {
        const text = (event.target?.result as string) || '';
        try {
          resolve(JSON.parse(text));
        } catch (error) {
          reject(
            window.deps.translateString(
              'import.error.invalidConfigFile',
              'Invalid configuration file',
            ),
          );
        }
      });

      eventsManager.addEventListener(reader, 'error', () => {
        reject(
          window.deps.translateString(
            'generic.error.failedToReadFile',
            'Error: Failed to read file',
          ),
        );
      });

      reader.readAsText(file);
    });

  const insertItems = async (items: StorageItem[]) => {
    const getItemConfig = (item: StorageItem) => item.config || (item as any).pen; // for backward compatibility
    if (Array.isArray(items) && items.every(getItemConfig) && projectStorage) {
      await projectStorage.bulkInsert(items.map(getItemConfig));
      notifications.success(window.deps.translateString('import.success', 'Import Successful!'));
      showScreen('open');
      return;
    }
    return Promise.reject(
      window.deps.translateString('import.error.invalidFile', 'Error: Invalid file'),
    );
  };

  const fileInput = getImportFileInput(importContainer);
  eventsManager.addEventListener(fileInput, 'change', () => {
    notifications.info(window.deps.translateString('generic.loading', 'Loading...'));
    loadFile<Config>(fileInput)
      .then(loadConfig)
      .then(modal.close)
      .catch((message) => {
        notifications.error(message);
      });
  });

  const bulkFileInput = getBulkImportFileInput(importContainer);
  eventsManager.addEventListener(bulkFileInput, 'change', () => {
    notifications.info(
      window.deps.translateString('import.bulk.started', 'Bulk import started...'),
    );
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

  modal.show(importContainer, { isAsync: true, autoFocus: false, size: 'large-fixed' });
  getUrlImportInput(importContainer).focus();
};
