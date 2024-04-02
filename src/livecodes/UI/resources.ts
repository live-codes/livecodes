/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events/events';
import type { createModal } from '../modal';
import type { Config, CssPresetId, PkgInfo } from '../models';
import { resourcesScreen } from '../html';
import { pkgInfoService } from '../services/pkgInfo';
import { debounce, hideOnClickOutside } from '../utils/utils';
import { getExternalResourcesCssPresetInputs, getExternalResourcesTextareas } from './selectors';

interface PkgInfoWithDefaultFiles extends PkgInfo {
  files: {
    css?: string;
    js?: string;
  };
}

type ResourceType = 'stylesheets' | 'scripts';

export const createExternalResourcesUI = ({
  baseUrl,
  modal,
  eventsManager,
  deps,
}: {
  baseUrl: string;
  modal: ReturnType<typeof createModal>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getConfig: () => Config;
    setConfig: (config: Config) => void;
    loadResources: () => Promise<void>;
  };
}) => {
  const div = document.createElement('div');
  div.innerHTML = resourcesScreen;
  const resourcesContainer = div.firstChild as HTMLElement;
  modal.show(resourcesContainer, { onClose: () => updateResources() });

  const externalResources = getExternalResourcesTextareas();
  externalResources.forEach((textarea) => {
    const resourceContent = deps.getConfig()[textarea.dataset.resource as ResourceType];
    textarea.value = resourceContent.length !== 0 ? resourceContent.join('\n') + '\n' : '';
  });

  const cssPresetInputs = getExternalResourcesCssPresetInputs();
  cssPresetInputs.forEach((input) => {
    const cssPreset = deps.getConfig().cssPreset;
    if (cssPreset === input.value) {
      input.checked = true;
    }
  });

  const searchInput = document.querySelector<HTMLInputElement>(
    '#resources-container #resources-search-input',
  )!;
  const resultContainer = document.querySelector<HTMLElement>(
    '#resources-container #resources-result-container',
  )!;
  const searchResultsEl = document.querySelector<HTMLElement>(
    '#resources-container #resources-search-results',
  )!;
  const fontsSelect = document.querySelector<HTMLSelectElement>(
    '#resources-container #fonts-container select',
  )!;
  const addFontsBtn = document.querySelector<HTMLElement>(
    '#resources-container #fonts-container button',
  )!;

  const addResource = (url: string, type: ResourceType) => {
    if (!url || isAdded(url, type)) return;
    const textarea = type === 'stylesheets' ? externalResources[0] : externalResources[1];
    textarea.value =
      textarea.value.trim() === ''
        ? url.trim() + '\n'
        : textarea.value
            .split('\n')
            .map((x) => x.trim())
            .filter((x) => x !== '')
            .join('\n') +
          '\n' +
          url.trim() +
          '\n';
    document
      .querySelector(`#resources-search-results a.add-resource[data-resource-url="${url}"]`)
      ?.classList.add('resource-added');
  };

  const isAdded = (url: string, type: ResourceType) => {
    if (!url) return false;
    const textarea = type === 'stylesheets' ? externalResources[0] : externalResources[1];
    return Boolean(
      textarea.value
        .split('\n')
        .map((x) => x.trim())
        .find((x) => x === url.trim()),
    );
  };

  const getResultItem = ({
    name,
    version,
    description,
    files,
  }: PkgInfo & { files: { css?: string; js?: string } }) => {
    const li = document.createElement('li');

    const itemTitle = document.createElement('div');
    itemTitle.classList.add('search-result-item-title');
    itemTitle.textContent = name;
    li.appendChild(itemTitle);

    const itemVersion = document.createElement('span');
    itemVersion.classList.add('label-description');
    itemVersion.textContent = 'v' + version;
    itemTitle.appendChild(itemVersion);

    const itemDescription = document.createElement('div');
    itemDescription.classList.add('search-result-item-description');
    itemDescription.textContent = description || '';
    li.appendChild(itemDescription);

    const itemFiles = document.createElement('div');
    itemFiles.classList.add('search-result-item-files');
    li.appendChild(itemFiles);

    const itemScript = document.createElement('span');
    itemScript.classList.add('search-result-item-script');
    itemFiles.appendChild(itemScript);

    if (files?.js) {
      const scriptAdded = isAdded(files.js, 'scripts');
      const itemScriptLink = document.createElement('a');
      itemScriptLink.classList.add('add-resource');
      itemScriptLink.classList.toggle('resource-added', scriptAdded);
      itemScriptLink.href = '#';
      itemScriptLink.onclick = scriptAdded ? null : () => addResource(files.js || '', 'scripts');
      itemScriptLink.title = files.js;
      itemScriptLink.dataset.resourceUrl = files.js;
      itemScriptLink.innerHTML = `<img src="${baseUrl}assets/images/javascript.svg" />`;
      itemScript.appendChild(itemScriptLink);
    }

    const itemStylesheet = document.createElement('span');
    itemStylesheet.classList.add('search-result-item-stylesheet');
    itemFiles.appendChild(itemStylesheet);

    if (files?.css) {
      const stylesheetAdded = isAdded(files.css, 'stylesheets');
      const itemStylesheetLink = document.createElement('a');
      itemStylesheetLink.classList.add('add-resource');
      itemStylesheetLink.classList.toggle('resource-added', stylesheetAdded);
      itemStylesheetLink.href = '#';
      itemStylesheetLink.onclick = stylesheetAdded
        ? null
        : () => addResource(files.css || '', 'stylesheets');
      itemStylesheetLink.title = files.css;
      itemStylesheetLink.dataset.resourceUrl = files.css;
      itemStylesheetLink.innerHTML = `<img src="${baseUrl}assets/images/css.svg" />`;
      itemStylesheet.appendChild(itemStylesheetLink);
    }

    const itemBrowse = document.createElement('span');
    itemBrowse.classList.add('search-result-item-Browse');
    itemFiles.appendChild(itemBrowse);

    const itemBrowseLink = document.createElement('a');
    itemBrowseLink.href = `https://cdn.jsdelivr.net/npm/${name}/`;
    itemBrowseLink.target = '_blank';
    itemBrowseLink.title = 'Browse package files on jsDelivr';
    itemBrowseLink.textContent = 'Browse';
    itemBrowse.appendChild(itemBrowseLink);

    return li;
  };

  const search = async () => {
    const query = searchInput.value;
    const searchResults = await pkgInfoService.search(searchInput.value, 5);

    if (query !== searchInput.value) {
      searchResultsEl.innerHTML =
        '<li><div class="search-result-item-description">Loading...</div></li>';
      return;
    }

    if ('error' in searchResults) {
      searchResultsEl.innerHTML =
        '<li><div class="search-result-item-error">Failed to load results!</div></li>';
      return;
    }

    if (searchResults.length === 0) {
      searchResultsEl.innerHTML = `<li><div class="search-result-item-description">No results found for: <strong>${query}</strong></div></li>`;
      return;
    }

    const resultsWithFiles = (
      await Promise.all(
        searchResults.map(async (info) => {
          const pkgName = info.version != null ? `${info.name}@${info.version}` : info.name;
          const files = await pkgInfoService.getPkgDefaultFiles(pkgName);
          if ('error' in files) return;
          return {
            ...info,
            files,
          };
        }),
      )
    ).filter(Boolean) as PkgInfoWithDefaultFiles[];

    if (query !== searchInput.value) return;

    if (resultsWithFiles.length === 0) {
      searchResultsEl.innerHTML =
        '<li><div class="search-result-item-error">Failed to load results!</div></li>';
      return;
    }

    searchResultsEl.innerHTML = '';
    resultsWithFiles.forEach((item) => searchResultsEl.appendChild(getResultItem(item)));
  };

  let menuEvents: ReturnType<typeof hideOnClickOutside> | undefined;

  searchInput?.focus();
  searchInput.addEventListener('input', async () => {
    searchResultsEl.innerHTML =
      '<li><div class="search-result-item-description">Loading...</div></li>';

    menuEvents?.clear();
    if (searchInput.value.length > 0) {
      resultContainer.style.display = 'unset';
      menuEvents = hideOnClickOutside(resultContainer);
    } else {
      resultContainer.style.display = 'none';
      return;
    }

    debounce(search, 300)();
  });

  const fontsModule: Promise<typeof import('../services/google-fonts')> = import(
    baseUrl + '{{hash:google-fonts.js}}'
  );
  fontsModule.then((mod) => {
    fontsSelect.innerHTML = '<option value="">Select font ...</option>';
    const fonts = mod.googleFonts.getFonts();
    fonts.forEach((font) => {
      const option = document.createElement('option');
      option.innerText = font;
      fontsSelect.appendChild(option);
    });

    eventsManager.addEventListener(addFontsBtn, 'click', () => {
      if (fontsSelect.value === '') return;
      addResource(mod.googleFonts.getStylesheetUrl(fontsSelect.value), 'stylesheets');
      fontsSelect.value = '';
      addFontsBtn.innerText = '✔';
      setTimeout(() => {
        addFontsBtn.innerText = 'Add';
      }, 1000);
    });
  });

  const updateResources = async () => {
    externalResources.forEach((textarea) => {
      const resource = textarea.dataset.resource as ResourceType;
      deps.setConfig({
        ...deps.getConfig(),
        [resource]:
          textarea.value
            ?.split('\n')
            .map((x) => x.trim())
            .filter((x) => x !== '') || [],
      });
    });

    cssPresetInputs.forEach((input) => {
      if (input.checked) {
        deps.setConfig({
          ...deps.getConfig(),
          cssPreset: input.value as CssPresetId,
        });
      }
    });

    deps.loadResources();
  };
};
