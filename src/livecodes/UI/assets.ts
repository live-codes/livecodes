/* eslint-disable import/no-internal-modules */
import type { DeployResult } from '../deploy';
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { Asset, FileType, Screen, User } from '../models';
import type { createNotifications } from '../notifications';
import type { GitHubFile } from '../services/github';
import { generateId, type Storage } from '../storage';
import { addAssetScreen, assetsScreen } from '../html';
import { copyToClipboard, isMobile, loadScript } from '../utils/utils';
import { flexSearchUrl } from '../vendors';
import {
  getAddAssetButton,
  getAssetDataUrlFileInput,
  getAssetDataUrlOutput,
  getAssetGHPagesFileInput,
  getAssetGHPagesFileInputLabel,
  getAssetGHPagesOutput,
  getAssetsButton,
  getAssetsDeleteAllButton,
} from './selectors';

const copyUrl = (url: string, notifications: any) => {
  if (copyToClipboard(url)) {
    notifications.success('URL is copied to clipboard.');
  } else {
    notifications.error('Failed to copy URL.');
  }
};

const createLinkContent = (item: Asset, baseUrl: string) => {
  const container = document.createElement('div');
  container.classList.add('asset-item');

  const title = document.createElement('div');
  title.classList.add('asset-title', 'overflow-text');
  title.textContent = item.filename;
  container.appendChild(title);

  const img = document.createElement('img');
  img.src = getThumbnailUrl(item, baseUrl);
  img.classList.add('img-preview');
  img.onerror = function () {
    const fallbackImg = baseUrl + 'assets/images/image.svg';
    if (img.src !== fallbackImg) {
      img.src = fallbackImg;
    }
  };
  container.appendChild(img);

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('asset-details');
  container.appendChild(detailsContainer);

  const type = document.createElement('div');
  type.classList.add('light');
  type.textContent = 'Type: ' + item.type;
  detailsContainer.appendChild(type);

  const lastModified = isMobile()
    ? new Date(item.lastModified).toLocaleDateString()
    : new Date(item.lastModified).toLocaleString();

  const date = document.createElement('div');
  date.classList.add('light');
  date.textContent = 'Date: ' + String(lastModified);
  detailsContainer.appendChild(date);

  const url = document.createElement('div');
  url.classList.add('light', 'overflow-text');
  url.textContent = 'URL: ' + item.url;
  detailsContainer.appendChild(url);

  return container;
};

const createAssetItem = (
  item: Asset,
  list: HTMLElement,
  notifications: ReturnType<typeof createNotifications>,
  baseUrl: string,
) => {
  const li = document.createElement('li');
  list.appendChild(li);

  const link = document.createElement('a');
  link.href = '#';
  link.dataset.id = item.id;
  link.classList.add('asset-link', 'hint--top');
  link.dataset.hint = 'Click to copy URL';
  link.appendChild(createLinkContent(item, baseUrl));
  link.onclick = (ev) => {
    ev.preventDefault();
    copyUrl(item.url, notifications);
  };

  li.appendChild(link);

  // const deleteButton = document.createElement('button');
  // deleteButton.classList.add('delete-button');
  // Replace with span for icon css
  const deleteButton = document.createElement('span');
  deleteButton.classList.add('icon-delete-button');
  li.appendChild(deleteButton);

  return { link, deleteButton };
};

const organizeAssets = async (
  getAssets: () => Promise<Asset[]>,
  showAssets: (assets: Asset[]) => Promise<void>,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  let sortBy: 'date' | 'filename' = 'date';
  let sortByDirection: 'asc' | 'desc' = 'desc';
  let type: string;
  let searchResults: string[] = [];

  const lastModifiedButton = document.querySelector(
    '#assets-list-container #assets-sort-by-last-modified',
  ) as HTMLElement;
  const titleButton = document.querySelector(
    '#assets-list-container #assets-sort-by-title',
  ) as HTMLElement;
  const sortedAscButton = document.querySelector(
    '#assets-list-container #assets-sorted-asc',
  ) as HTMLElement;
  const sortedDescButton = document.querySelector(
    '#assets-list-container #assets-sorted-desc',
  ) as HTMLElement;
  const typeSelect = document.querySelector(
    '#assets-list-container #assets-type-filter',
  ) as HTMLSelectElement;
  const searchAssetsInput = document.querySelector(
    '#assets-list-container #search-assets',
  ) as HTMLInputElement;
  const resetFiltersLink = document.querySelector(
    '#assets-list-container #assets-reset-filters',
  ) as HTMLElement;

  Array.from(new Set((await getAssets()).map((x) => x.type)))
    .sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0,
    )
    .forEach((type) => {
      const option = document.createElement('option');
      option.text = type;
      option.value = type;
      typeSelect.appendChild(option);
    });

  const getFilteredAndSorted = async () =>
    (await getAssets())
      .filter((p) => (type ? p.type === type : true))
      .filter((p) => (searchAssetsInput.value.trim() !== '' ? searchResults.includes(p.id) : true))
      .sort((a, b) =>
        sortBy === 'date' && sortByDirection === 'asc'
          ? a.lastModified - b.lastModified
          : sortBy === 'date' && sortByDirection === 'desc'
            ? b.lastModified - a.lastModified
            : sortBy === 'filename' && sortByDirection === 'asc' && a.filename < b.filename
              ? -1
              : sortBy === 'filename' && sortByDirection === 'asc' && a.filename > b.filename
                ? 1
                : sortBy === 'filename' && sortByDirection === 'desc' && a.filename < b.filename
                  ? 1
                  : sortBy === 'filename' && sortByDirection === 'desc' && a.filename > b.filename
                    ? -1
                    : 0,
      );

  const reloadAssets = async () => {
    showAssets(await getFilteredAndSorted());
  };

  const sortAscending = () => {
    sortByDirection = 'asc';
    sortedAscButton.style.display = 'unset';
    sortedDescButton.style.display = 'none';
  };

  const sortDescending = () => {
    sortByDirection = 'desc';
    sortedAscButton.style.display = 'none';
    sortedDescButton.style.display = 'unset';
  };

  const filterByType = async (value = typeSelect.value) => {
    type = value;
    await reloadAssets();
  };

  eventsManager.addEventListener(
    lastModifiedButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== 'date') {
        sortDescending();
      } else if (sortByDirection === 'asc') {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = 'date';
      lastModifiedButton.classList.add('active');
      titleButton.classList.remove('active');
      await reloadAssets();
    },
    false,
  );

  eventsManager.addEventListener(
    titleButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== 'filename') {
        sortAscending();
      } else if (sortByDirection === 'asc') {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = 'filename';
      lastModifiedButton.classList.remove('active');
      titleButton.classList.add('active');
      await reloadAssets();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedAscButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadAssets();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedDescButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadAssets();
    },
    false,
  );

  eventsManager.addEventListener(
    typeSelect,
    'change',
    async () => {
      await filterByType();
    },
    false,
  );

  loadScript(flexSearchUrl, 'FlexSearch').then(async (FlexSearch: any) => {
    const index = new FlexSearch.Document({
      index: ['filename', 'type'],
      tokenize: 'full',
      worker: true,
    });

    await Promise.all((await getAssets()).map((p) => index.add(p)));

    eventsManager.addEventListener(
      searchAssetsInput,
      'keyup',
      async () => {
        const result = await index.searchAsync(searchAssetsInput.value);
        searchResults = result.map((field: any) => field.result).flat();
        await reloadAssets();
      },
      false,
    );
  });

  eventsManager.addEventListener(
    resetFiltersLink,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortBy = 'date';
      sortByDirection = 'desc';
      type = '';
      searchResults = [];
      lastModifiedButton.classList.add('active');
      titleButton.classList.remove('active');
      sortDescending();
      typeSelect.value = '';
      searchAssetsInput.value = '';
      await reloadAssets();
    },
    false,
  );
};

export const createAssetsList = async ({
  assetsStorage,
  eventsManager,
  showScreen,
  notifications,
  modal,
  baseUrl,
}: {
  assetsStorage: Storage<Asset>;
  eventsManager: ReturnType<typeof createEventsManager>;
  showScreen: (screen: Screen['screen']) => void;
  notifications: ReturnType<typeof createNotifications>;
  modal: ReturnType<typeof createModal>;
  baseUrl: string;
}) => {
  const div = document.createElement('div');
  div.innerHTML = assetsScreen;
  const listContainer = div.firstChild as HTMLElement;
  const noDataMessage = listContainer.querySelector('.no-data') as HTMLElement;
  const noMatchMessage = listContainer.querySelector('#assets-no-match.no-data') as HTMLElement;
  const assetsContainer = listContainer.querySelector('#assets-container') as HTMLElement;
  const list = document.createElement('ul') as HTMLElement;
  list.classList.add('open-list');
  let savedAssets = await assetsStorage.getAllData();
  let visibleAssets = savedAssets;

  const addAssetButton = getAddAssetButton(listContainer);
  const deleteAllButton = getAssetsDeleteAllButton(listContainer);

  eventsManager.addEventListener(
    addAssetButton,
    'click',
    () => {
      showScreen('add-asset');
    },
    false,
  );

  eventsManager.addEventListener(
    deleteAllButton,
    'click',
    async () => {
      notifications.confirm(`Delete ${visibleAssets.length} assets?`, async () => {
        for (const p of visibleAssets) {
          await assetsStorage.deleteItem(p.id);
        }
        visibleAssets = [];
        savedAssets = await assetsStorage.getAllData();
        await showList(visibleAssets);
      });
    },
    false,
  );

  assetsContainer.appendChild(list);

  const showList = async (assets: Asset[]) => {
    visibleAssets = assets;
    list.innerHTML = '';
    assets.forEach((item) => {
      const { deleteButton } = createAssetItem(item, list, notifications, baseUrl);

      eventsManager.addEventListener(
        deleteButton,
        'click',
        () => {
          notifications.confirm(`Delete asset: ${item.filename}?`, async () => {
            await assetsStorage.deleteItem(item.id);
            visibleAssets = visibleAssets.filter((p) => p.id !== item.id);
            const li = deleteButton.parentElement as HTMLElement;
            li.classList.add('hidden');
            setTimeout(() => {
              showList(visibleAssets);
            }, 500);
          });
        },
        false,
      );
    });

    if (assets.length === 0) {
      list.classList.add('hidden');
      deleteAllButton.classList.add('hidden');
      if ((await assetsStorage.getList()).length === 0) {
        noDataMessage.classList.remove('hidden');
        noMatchMessage.classList.add('hidden');
      } else {
        noDataMessage.classList.add('hidden');
        noMatchMessage.classList.remove('hidden');
      }
    } else {
      list.classList.remove('hidden');
      deleteAllButton.classList.remove('hidden');
      noDataMessage.classList.add('hidden');
      noMatchMessage.classList.add('hidden');
    }
  };

  await showList(savedAssets);

  const getAssets = () => assetsStorage.getAllData();
  modal.show(listContainer, { isAsync: true });
  organizeAssets(getAssets, showList, eventsManager);
};

export const createAddAssetContainer = ({
  assetsStorage,
  eventsManager,
  showScreen,
  notifications,
  deployAsset,
  getUser,
  baseUrl,
  activeTab,
}: {
  assetsStorage: Storage<Asset>;
  eventsManager: ReturnType<typeof createEventsManager>;
  showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
  notifications: ReturnType<typeof createNotifications>;
  deployAsset: (user: User, file: GitHubFile) => Promise<DeployResult | null>;
  getUser: (fn?: () => void) => Promise<User | void>;
  baseUrl: string;
  activeTab: number;
}) => {
  let user: User | void;
  const div = document.createElement('div');
  div.innerHTML = addAssetScreen;
  const addAssetContainer = div.firstChild as HTMLElement;

  const tabs = addAssetContainer.querySelectorAll<HTMLElement>('#add-asset-tabs li');
  const activateTab = (tab: HTMLElement) => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('#add-asset-screens > div').forEach((screen) => {
      screen.classList.remove('active');
    });
    const target = addAssetContainer.querySelector('#' + tab.dataset.target);
    target?.classList.add('active');
    target?.querySelector('input')?.focus();
  };
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => activateTab(tab));
  });
  setTimeout(() => {
    if (activeTab) {
      activateTab(tabs[activeTab]);
    }
  });

  const assetsButton = getAssetsButton(addAssetContainer);
  const dataUrlFileInput = getAssetDataUrlFileInput(addAssetContainer);
  const dataUrlOutput = getAssetDataUrlOutput(addAssetContainer);
  const ghPagesFileInput = getAssetGHPagesFileInput(addAssetContainer);
  const ghPagesFileInputLabel = getAssetGHPagesFileInputLabel(addAssetContainer);
  const ghPagesOutput = getAssetGHPagesOutput(addAssetContainer);

  eventsManager.addEventListener(
    assetsButton,
    'click',
    () => {
      showScreen('assets');
    },
    false,
  );

  const loadFile = (input: HTMLInputElement, deploy = false): Promise<Asset> =>
    new Promise((resolve, reject) => {
      if (input.files?.length === 0) return;

      const file = (input.files as FileList)[0];

      // Max 2 MB allowed
      const maxSizeAllowed = 2 * 1024 * 1024;
      if (file.size > maxSizeAllowed) {
        reject('Error: Exceeded size 2MB');
        return;
      }

      const reader = new FileReader();
      eventsManager.addEventListener(reader, 'load', async (event: any) => {
        let url = '';
        if (deploy) {
          if (!user) {
            reject('Error: Unauthenticated user');
            return;
          }
          ghPagesFileInputLabel.innerText = 'Uploading...';
          ghPagesFileInputLabel.classList.add('disabled');
          const deployResult = await deployAsset(user, {
            path: file.name,
            content: event.target?.result.split('base64,')[1],
          });
          ghPagesFileInputLabel.innerText = 'Upload file';
          ghPagesFileInputLabel.classList.remove('disabled');
          if (deployResult) {
            url = deployResult.url;
          } else {
            reject('Error: Failed to upload file');
          }
        }
        url = url || (event.target?.result as string);
        resolve({
          id: generateId(),
          filename: file.name,
          type: getType(file.type, file.name),
          url,
          lastModified: Date.now(),
        });
      });

      eventsManager.addEventListener(reader, 'error', () => {
        reject('Error: Failed to read file');
      });

      reader.readAsDataURL(file);
    });

  const processAsset = async (asset: Asset, outputElement: HTMLElement, deploy = false) => {
    await assetsStorage.updateItem(asset.id, asset);

    const AddedFile = document.createElement('p');
    const fileLabel = document.createElement('span');
    fileLabel.textContent = 'Added file: ';
    fileLabel.classList.add('bold');
    AddedFile.appendChild(fileLabel);
    const fileName = document.createElement('span');
    fileName.textContent += asset.filename;
    AddedFile.appendChild(fileName);
    AddedFile.classList.add('overflow-text');
    outputElement.appendChild(AddedFile);

    const urlText = document.createElement('p');
    const urlLabel = document.createElement('span');
    urlLabel.textContent = 'URL: ';
    urlLabel.classList.add('bold');
    urlText.appendChild(urlLabel);
    const url = document.createElement('span');
    url.textContent += asset.url;
    urlText.appendChild(url);
    urlText.classList.add('overflow-text');
    outputElement.appendChild(urlText);

    if (deploy) {
      const deployNotice = document.createElement('p');
      deployNotice.textContent = 'The asset should be available on this URL soon (~1 min).';
      deployNotice.classList.add('description', 'center');
      outputElement.appendChild(deployNotice);
    } else {
      const previewImg = document.createElement('img');
      previewImg.src = getThumbnailUrl(asset, baseUrl);
      previewImg.onerror = function () {
        const fallbackImg = baseUrl + 'assets/images/image.svg';
        if (previewImg.src !== fallbackImg) {
          previewImg.src = fallbackImg;
        }
      };
      previewImg.classList.add('img-preview-larger');
      outputElement.appendChild(previewImg);
    }

    const clickToCopy = document.createElement('p');
    clickToCopy.textContent = 'Click to copy URL';
    clickToCopy.classList.add('description', 'center');
    outputElement.appendChild(clickToCopy);

    const sep = document.createElement('hr');
    sep.style.margin = '1em';
    outputElement.appendChild(sep);

    outputElement.title = 'Click to copy URL';
    notifications.success('File added to assets!');
    outputElement.onclick = () => copyUrl(asset.url, notifications);
  };

  const inputHandler = async (
    fileInput: HTMLInputElement,
    outputElement: HTMLElement,
    deploy = false,
  ) => {
    await loadFile(fileInput, deploy)
      .then((asset) => processAsset(asset, outputElement, deploy))
      .catch((message) => {
        notifications.error(message);
      });
  };

  eventsManager.addEventListener(
    dataUrlFileInput,
    'change',
    () => {
      inputHandler(dataUrlFileInput, dataUrlOutput);
    },
    false,
  );

  eventsManager.addEventListener(
    ghPagesFileInputLabel,
    'click',
    async (ev: Event) => {
      user = await getUser(async () => {
        await showScreen('add-asset', 1);
      });
      if (!user) {
        ev.preventDefault();
        notifications.error('Authentication error!');
      }
    },
    false,
  );

  eventsManager.addEventListener(
    ghPagesFileInput,
    'change',
    () => {
      inputHandler(ghPagesFileInput, ghPagesOutput, true);
    },
    false,
  );

  return addAssetContainer;
};

const getType = (mime: string, filename: string): FileType => {
  const types: { [key: string]: FileType } = {
    'audio/aac': 'audio',
    'video/x-msvideo': 'video',
    'image/bmp': 'image',
    'application/x-bzip': 'archive',
    'application/x-bzip2': 'archive',
    'text/css': 'stylesheet',
    'text/csv': 'csv',
    'application/gzip': 'archive',
    'image/gif': 'image',
    'text/html': 'html',
    'image/vnd.microsoft.icon': 'icon',
    'image/jpeg': 'image',
    'text/javascript': 'script',
    'application/javascript': 'script',
    'application/json': 'json',
    'application/ld+json': 'json',
    'audio/midi': 'audio',
    'audio/x-midi': 'audio',
    'audio/mpeg': 'audio',
    'video/mp4': 'video',
    'video/mpeg': 'video',
    'audio/ogg': 'audio',
    'video/ogg': 'video',
    'application/ogg': 'audio',
    'audio/opus': 'audio',
    'font/otf': 'font',
    'image/png': 'image',
    'application/vnd.rar': 'archive',
    'image/svg+xml': 'image',
    'application/x-tar': 'archive',
    'image/tiff': 'image',
    'video/mp2t': 'video',
    'font/ttf': 'font',
    'text/plain': 'text',
    'audio/wav': 'audio',
    'audio/webm': 'audio',
    'video/webm': 'video',
    'image/webp': 'image',
    'font/woff': 'font',
    'font/woff2': 'font',
    'application/xhtml+xml': 'html',
    'application/xml': 'xml',
    'application/zip': 'archive',
    'video/3gpp': 'video',
    'video/3gpp2': 'audio',
    'application/x-7z-compressed': 'archive',
  };
  const extensions: { [key: string]: FileType } = {
    aac: 'audio',
    bmp: 'image',
    bzip: 'archive',
    bzip2: 'archive',
    css: 'stylesheet',
    csv: 'csv',
    gzip: 'archive',
    gif: 'image',
    html: 'html',
    ico: 'icon',
    jpeg: 'image',
    jpg: 'image',
    js: 'script',
    json: 'json',
    midi: 'audio',
    mpeg: 'audio',
    mp4: 'video',
    ogg: 'audio',
    otf: 'font',
    png: 'image',
    rar: 'archive',
    svg: 'image',
    tar: 'archive',
    tiff: 'image',
    mp2t: 'video',
    ttf: 'font',
    txt: 'text',
    wav: 'audio',
    webm: 'audio',
    webp: 'image',
    woff: 'font',
    woff2: 'font',
    xml: 'xml',
    zip: 'archive',
    '3gpp': 'video',
    '3gpp2': 'audio',
    '7z': 'archive',
  };
  const extension = filename.split('.')[filename.split('.').length - 1];
  return types[mime] || extensions[extension] || 'other';
};

const getThumbnailUrl = (item: Asset, baseUrl: string) => {
  if (item.type === 'image' || item.type === 'icon') {
    return item.url;
  }
  const path = baseUrl + 'assets/images/';
  if (item.type === 'other') {
    return path + 'file.svg';
  }
  return path + item.type + '.svg';
};
