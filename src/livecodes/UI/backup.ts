/* eslint-disable import/no-internal-modules */
import type { EventsManager, Modal, Notifications } from '../models';
import type { Stores } from '../storage';
import { backupScreen } from '../html';
import { base64ToUint8Array, downloadFile, getDate, loadScript } from '../utils/utils';
import { jsZipUrl } from '../vendors';
import {
  getBackupBtn,
  getBackupCheckedInputs,
  getBackupForm,
  getBackupLink,
  getImportFileInput,
  getImportFileInputLabel,
} from './selectors';

const createBackupContainer = (eventsManager: EventsManager) => {
  const div = document.createElement('div');
  div.innerHTML = backupScreen;
  const backupContainer = div.firstChild as HTMLElement;

  const tabs = backupContainer.querySelectorAll<HTMLElement>('#backup-tabs li');
  tabs.forEach((tab) => {
    const link = tab.querySelector('a');
    if (!link) return;
    eventsManager.addEventListener(link, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#backup-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = backupContainer.querySelector('#' + link.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return backupContainer;
};

const inProgressMessage = window.deps.translateString('backup.inProgress', 'In progress...');
export const isInProgress = () => getBackupLink()?.title === inProgressMessage;

export const updateProgressStatus = ({
  inProgress,
  backupContainer,
}: {
  inProgress?: boolean;
  backupContainer: HTMLElement;
}) => {
  const backupLink = getBackupLink();
  const backupBtn = getBackupBtn(backupContainer);
  const fileInput = getImportFileInput(backupContainer);
  const fileInputLabel = getImportFileInputLabel(backupContainer);

  if (inProgress ?? isInProgress()) {
    if (backupLink) {
      backupLink.title = inProgressMessage;
    }
    backupBtn.innerText = inProgressMessage;
    backupBtn.disabled = true;
    fileInputLabel.innerText = inProgressMessage;
    fileInput.disabled = true;
  } else {
    if (backupLink) {
      backupLink.title = '';
    }
    backupBtn.innerText = window.deps.translateString('backup.backupBtn', 'Backup');
    backupBtn.disabled = false;
    fileInputLabel.innerText = window.deps.translateString(
      'backup.fileInputLabel',
      'Restore from file',
    );
    fileInput.disabled = false;
  }
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
  modal: Modal;
  notifications: Notifications;
  eventsManager: EventsManager;
  stores: Stores;
  deps: {
    loadUserConfig: () => void;
  };
}) => {
  const backupContainer = createBackupContainer(eventsManager);
  const backupForm = getBackupForm(backupContainer);
  const fileInput = getImportFileInput(backupContainer);

  updateProgressStatus({ backupContainer });

  const syncModule: Promise<typeof import('../sync/sync')> = import(
    baseUrl + '{{hash:sync.js}}'
  ).then((mod) => {
    mod.init(baseUrl);
    return mod;
  });

  interface File {
    filename: string;
    content: string;
  }

  const createZip = async (files: File[]) => {
    const JSZip: any = await loadScript(jsZipUrl, 'JSZip');
    const zip = new JSZip();

    files.forEach(({ filename, content }) => {
      zip.file(filename, content);
    });
    const output = await zip.generateAsync({
      type: 'base64',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6,
      },
    });

    const filename = 'livecodes_backup_' + getDate();
    const extension = 'zip';
    const content = 'data:application/zip;base64,' + encodeURIComponent(output);
    downloadFile(filename, extension, content);
  };

  const backup = async () => {
    const storeKeys = [...getBackupCheckedInputs(backupContainer)]
      .map((input) => input.dataset.store)
      .filter(Boolean) as Array<keyof Stores>;

    if (storeKeys.length === 0) {
      notifications.warning(
        window.deps.translateString(
          'backup.error.atLeastOneStore',
          'Please select at least one store to backup',
        ),
      );
      return;
    }

    if (storeKeys.includes('userConfig')) {
      storeKeys.push('userData');
      storeKeys.push('appData');
    }

    const loadedSyncModule = await syncModule;

    const files = await Promise.all(
      storeKeys
        .filter((storeKey) => Boolean(stores[storeKey]))
        .map(async (storeKey) => ({
          filename: storeKey + '.b64',
          content: (await loadedSyncModule.exportStoreAsBase64Update({ storeKey })) || '',
        })),
    );
    await createZip(files);
  };

  const loadFile = (input: HTMLInputElement) =>
    new Promise<Blob>((resolve, reject) => {
      if (input.files?.length === 0) return;

      const file = (input.files as FileList)[0];

      if (!file.name.endsWith('.zip')) {
        reject(
          window.deps.translateString(
            'backup.error.incorrectFileType',
            'Error: Incorrect file type',
          ),
        );
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

      resolve(file);
    });

  const extractZip = async (blob: Blob): Promise<File[]> => {
    const JSZip: any = await loadScript(jsZipUrl, 'JSZip');

    const zip = await JSZip.loadAsync(blob);
    const files: any[] = zip.file(/\.b64$/);
    return Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: await file.async('string'),
      })),
    );
  };

  const restore = async (files: File[]) => {
    const loadedSyncModule = await syncModule;
    const formData = new FormData(backupForm);
    const mergeCurrent = formData.get('restore-mode') === 'merge';

    for (const file of files) {
      const storeKey = file.filename.slice(0, -4) as keyof Stores;
      const storage = (stores as any)[storeKey];
      if (storage) {
        const update = base64ToUint8Array(file.content);
        await loadedSyncModule.restoreFromUpdate({
          update,
          storeKey,
          mergeCurrent,
        });
      }
    }
    const hasUserConfig = files.find((f) => f.filename.startsWith('user'));
    if (hasUserConfig) {
      deps.loadUserConfig();
    }
    notifications.success(
      window.deps.translateString('backup.restore.success', 'Restored Successfully!'),
    );
  };

  eventsManager.addEventListener(backupForm, 'submit', async (e) => {
    e.preventDefault();
    updateProgressStatus({ inProgress: true, backupContainer });
    await backup();
    updateProgressStatus({ inProgress: false, backupContainer });
  });

  eventsManager.addEventListener(fileInput, 'change', async () => {
    updateProgressStatus({ inProgress: true, backupContainer });
    await Promise.resolve(fileInput)
      .then(loadFile)
      .then(extractZip)
      .then(restore)
      .catch((message) => {
        notifications.error(message);
      });
    updateProgressStatus({ inProgress: false, backupContainer });
  });

  modal.show(backupContainer, { isAsync: true });
};
