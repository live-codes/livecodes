import { openScreen } from '../html';
import type {
  Config,
  ContentConfig,
  EventsManager,
  Language,
  LanguageSpecs,
  Modal,
  Notifications,
  Screen,
} from '../models';
import type { ProjectStorage, SavedProject } from '../storage';
import { downloadFile, getDate, isMobile, loadScript, loadStylesheet } from '../utils';
import { flexSearchUrl, tagifyBaseUrl } from '../vendors';
import { getTags } from './info';
import { getBulkImportButton, getDeleteAllButton, getExportAllButton } from './selectors';

export const createOpenItem = (
  item: SavedProject,
  list: HTMLElement,
  getLanguageTitle: (language: Language) => string,
  getLanguageByAlias: (alias?: string) => Language | undefined,
  isTemplate = false,
) => {
  const li = document.createElement('li');
  li.dataset.id = item.id;
  list.appendChild(li);

  const link = document.createElement('a');
  link.href = '#';
  link.dataset.id = item.id;
  link.classList.add('open-project-link');

  const container = document.createElement('div');
  container.classList.add('open-project-item');
  link.appendChild(container);

  const lastModified = isMobile()
    ? new Date(item.lastModified).toLocaleDateString()
    : new Date(item.lastModified).toLocaleString();

  const langs: HTMLElement[] = [];
  if (!isMobile()) {
    item.languages.forEach((lang) => {
      const langEl = document.createElement('span');
      langEl.classList.add('language-tag');
      langEl.dataset.lang = getLanguageByAlias(lang);
      if (isTemplate) {
        langEl.classList.add('template-tag');
      } else {
        langEl.title = window.deps.translateString('open.filter.language', 'filter by language');
      }
      langEl.textContent = getLanguageTitle(lang);
      langs.push(langEl);
    });
  }

  const userTags: HTMLElement[] = [];
  item.tags = [...new Set(item.tags)].filter(Boolean);
  if (!isMobile() && item.tags.length > 0) {
    item.tags.forEach((tag) => {
      const tagEl = document.createElement('span');
      tagEl.classList.add('user-tag');
      tagEl.dataset.tag = tag;
      if (isTemplate) {
        tagEl.classList.add('template-tag');
      } else {
        tagEl.title = window.deps.translateString('open.filter.tag', 'filter by tag');
      }
      tagEl.textContent = tag;
      userTags.push(tagEl);
    });
  }

  const title = document.createElement('div');
  title.classList.add('open-title', 'overflow-text');
  title.textContent = item.title;
  container.appendChild(title);

  const lastModifiedText = document.createElement('div');
  lastModifiedText.classList.add('light');
  lastModifiedText.textContent = window.deps.translateString(
    'open.lastModified',
    'Last modified: {{modified}}',
    {
      modified: lastModified,
    },
  );
  container.appendChild(lastModifiedText);

  const tags = document.createElement('div');
  tags.classList.add('project-tags');
  langs.forEach((lang) => tags.append(lang));
  tags.innerHTML += userTags.length > 0 ? ' <span class="light">|</span> ' : '';
  userTags.forEach((tag) => tags.append(tag));
  container.appendChild(tags);

  const setAsDefault = document.createElement('div');
  setAsDefault.classList.add('template-default');

  const iconTemplate = document.createElement('i');
  iconTemplate.classList.add('icon-file-template');
  setAsDefault.appendChild(iconTemplate);

  const setAsDefaultLink = document.createElement('span');
  setAsDefaultLink.innerText = window.deps.translateString('open.setAsDefault', 'Set as default');
  setAsDefaultLink.classList.add('template-default-link');
  setAsDefault.appendChild(setAsDefaultLink);

  const defaultTemplateLabel = document.createElement('span');
  defaultTemplateLabel.classList.add('default-template-label');
  defaultTemplateLabel.innerText = window.deps.translateString(
    'open.defaultTemplate',
    'Default template ',
  );
  setAsDefault.appendChild(defaultTemplateLabel);

  const removeDefaultLink = document.createElement('span');
  removeDefaultLink.innerText = window.deps.translateString('open.removeDefault', '(unset)');
  removeDefaultLink.classList.add('template-remove-default-link', 'delete');
  defaultTemplateLabel.appendChild(removeDefaultLink);

  if (isTemplate) {
    link.appendChild(setAsDefault);
  }
  li.appendChild(link);

  const actions = document.createElement('div');
  actions.classList.add('actions');
  li.appendChild(actions);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  const iconCSS = '<i class="icon-delete"></i>';
  deleteButton.title = window.deps.translateString('open.action.delete', 'Delete');
  deleteButton.innerHTML = `<span id="delete-button">${iconCSS}</span>`;
  actions.appendChild(deleteButton);

  return { link, deleteButton, setAsDefaultLink, removeDefaultLink };
};

const createItemLoader = (item: SavedProject) => {
  const loading = document.createElement('div');
  loading.innerHTML = `
    <div class="modal-message">${window.deps.translateString('generic.loading', 'Loading...')}</div>
    <div class="modal-message">${item.title}</div>
    `;
  return loading;
};

const organizeProjects = (
  getProjects: () => Promise<SavedProject[]>,
  showProjects: (projects: SavedProject[]) => Promise<void>,
  eventsManager: EventsManager,
  languages: LanguageSpecs[],
) => {
  let sortBy: 'lastModified' | 'title' = 'lastModified';
  let sortByDirection: 'asc' | 'desc' = 'desc';
  let language: Language;
  let tags: string[] = [];
  let tagify: any;
  let searchResults: string[] = [];

  const lastModifiedButton = document.querySelector(
    '#list-container #sort-by-last-modified',
  ) as HTMLElement;
  const titleButton = document.querySelector('#list-container #sort-by-title') as HTMLElement;
  const sortedAscButton = document.querySelector('#list-container #sorted-asc') as HTMLElement;
  const sortedDescButton = document.querySelector('#list-container #sorted-desc') as HTMLElement;
  const languageSelect = document.querySelector(
    '#list-container #language-filter',
  ) as HTMLSelectElement;
  const filterTagsInput = document.querySelector(
    '#list-container #filter-tags',
  ) as HTMLInputElement;
  const searchProjectsInput = document.querySelector(
    '#list-container #search-projects',
  ) as HTMLInputElement;
  const resetFiltersLink = document.querySelector('#list-container #reset-filters') as HTMLElement;

  languages
    .map((x) => ({
      name: x.name,
      title: x.longTitle || x.title,
    }))
    .sort((a, b) =>
      a.title.toLowerCase() < b.title.toLowerCase()
        ? -1
        : a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : 0,
    )
    .forEach((lang) => {
      const option = document.createElement('option');
      option.text = lang.title;
      option.value = lang.name;
      languageSelect.appendChild(option);
    });

  const getFilteredAndSorted = async () =>
    (await getProjects())
      .filter((p) => (language ? p.languages.includes(language) : true))
      .filter((p) =>
        tags.length > 0 ? tags.map((t) => p.tags.includes(t)).every((x) => x === true) : true,
      )
      .filter((p) =>
        searchProjectsInput.value.trim() !== '' ? searchResults.includes(p.id) : true,
      )
      .sort((a, b) =>
        sortBy === 'lastModified' && sortByDirection === 'asc'
          ? a.lastModified - b.lastModified
          : sortBy === 'lastModified' && sortByDirection === 'desc'
            ? b.lastModified - a.lastModified
            : sortBy === 'title' && sortByDirection === 'asc' && a.title < b.title
              ? -1
              : sortBy === 'title' && sortByDirection === 'asc' && a.title > b.title
                ? 1
                : sortBy === 'title' && sortByDirection === 'desc' && a.title < b.title
                  ? 1
                  : sortBy === 'title' && sortByDirection === 'desc' && a.title > b.title
                    ? -1
                    : 0,
      );

  const registerLanguageFilters = () => {
    const projectTags = document.querySelectorAll<HTMLElement>('.project-tags span');
    projectTags.forEach((tag) => {
      if (tag.dataset.lang) {
        eventsManager.addEventListener(
          tag,
          'click',
          async (ev) => {
            ev.stopPropagation();
            languageSelect.value = tag.dataset.lang || '';
            await filterByLanguage();
          },
          false,
        );
      } else if (tag.dataset.tag) {
        eventsManager.addEventListener(
          tag,
          'click',
          async (ev) => {
            ev.stopPropagation();
            if (tagify) {
              tagify.removeAllTags();
              tagify.addTags(tag.dataset.tag);
              await filterByTags();
            }
          },
          false,
        );
      }
    });
  };

  const reloadProjects = async () => {
    showProjects(await getFilteredAndSorted());
    registerLanguageFilters();
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

  const filterByTags = async (value = filterTagsInput.value) => {
    tags = getTags(value).filter((x) => x !== '');
    await reloadProjects();
  };

  const filterByLanguage = async (value = languageSelect.value) => {
    language = value as Language;
    await reloadProjects();
  };

  eventsManager.addEventListener(
    lastModifiedButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== 'lastModified') {
        sortDescending();
      } else if (sortByDirection === 'asc') {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = 'lastModified';
      lastModifiedButton.classList.add('active');
      titleButton.classList.remove('active');
      await reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    titleButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      if (sortBy !== 'title') {
        sortAscending();
      } else if (sortByDirection === 'asc') {
        sortDescending();
      } else {
        sortAscending();
      }
      sortBy = 'title';
      lastModifiedButton.classList.remove('active');
      titleButton.classList.add('active');
      await reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedAscButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedDescButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    filterTagsInput,
    'keyup',
    () => filterByTags(filterTagsInput.value),
    false,
  );

  eventsManager.addEventListener(
    languageSelect,
    'change',
    async () => {
      await filterByLanguage();
    },
    false,
  );
  registerLanguageFilters();

  loadStylesheet(tagifyBaseUrl + 'tagify.css', 'tagify-styles');
  import(tagifyBaseUrl + 'tagify.esm.js').then(async (tagifyMod: any) => {
    const Tagify = tagifyMod.default;
    if (Tagify) {
      tagify = new Tagify(filterTagsInput, {
        focusable: false,
        whitelist: Array.from(new Set((await getProjects()).map((item) => item.tags).flat())).sort(
          (a, b) => (b > a ? -1 : 1),
        ),
        dropdown: {
          maxItems: 40,
          enabled: 0,
          closeOnSelect: false,
          highlightFirst: true,
        },
      });

      tagify.on('change', () => filterByTags(JSON.stringify(tagify?.value || '')));
    }
  });

  loadScript(flexSearchUrl, 'FlexSearch').then(async (FlexSearch: any) => {
    const index = new FlexSearch.Document({
      index: ['title', 'description', 'tags', 'languages'],
      tokenize: 'full',
      worker: true,
    });

    await Promise.all((await getProjects()).map((p) => index.add(p)));

    eventsManager.addEventListener(
      searchProjectsInput,
      'input',
      async () => {
        const result = await index.searchAsync(searchProjectsInput.value);
        searchResults = result.map((field: any) => field.result).flat();
        await reloadProjects();
      },
      false,
    );
  });

  eventsManager.addEventListener(
    resetFiltersLink,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortBy = 'lastModified';
      sortByDirection = 'desc';
      language = '' as Language;
      tags = [];
      searchResults = [];
      lastModifiedButton.classList.add('active');
      titleButton.classList.remove('active');
      sortDescending();
      languageSelect.value = '';
      tagify?.removeAllTags();
      searchProjectsInput.value = '';
      await reloadProjects();
    },
    false,
  );
};

export const createSavedProjectsList = async ({
  projectStorage,
  eventsManager,
  showScreen,
  getContentConfig,
  notifications,
  modal,
  loadConfig,
  getProjectId,
  setProjectId,
  languages,
  getLanguageTitle,
  getLanguageByAlias,
}: {
  projectStorage: ProjectStorage;
  eventsManager: EventsManager;
  showScreen: (screen: Screen['screen']) => void;
  getContentConfig: (config: Config | ContentConfig) => ContentConfig;
  notifications: Notifications;
  modal: Modal;
  loadConfig: (config: ContentConfig) => Promise<void>;
  getProjectId: () => string | undefined;
  setProjectId: (id: string) => void;
  languages: LanguageSpecs[];
  getLanguageTitle: (language: Language) => string;
  getLanguageByAlias: (alias?: string) => Language | undefined;
}) => {
  const div = document.createElement('div');
  div.innerHTML = openScreen;
  const listContainer = div.firstChild as HTMLElement;
  const noDataMessage = listContainer.querySelector('.no-data') as HTMLElement;
  const noMatchMessage = listContainer.querySelector('#no-match.no-data') as HTMLElement;
  const projectsContainer = listContainer.querySelector('#projects-container') as HTMLElement;
  const list = document.createElement('ul') as HTMLElement;
  list.classList.add('open-list');
  let savedProjects = await projectStorage.getList();
  let visibleProjects = savedProjects;

  const bulkImportButton = getBulkImportButton(listContainer);
  const exportAllButton = getExportAllButton(listContainer);
  const deleteAllButton = getDeleteAllButton(listContainer);

  eventsManager.addEventListener(
    bulkImportButton,
    'click',
    () => {
      showScreen('import');
    },
    false,
  );

  eventsManager.addEventListener(
    exportAllButton,
    'click',
    async () => {
      const data = (await projectStorage.getAllData())
        .filter((item) => visibleProjects.find((p) => p.id === item.id))
        .map((item) => ({
          ...item,
          config: getContentConfig(item.config),
        }))
        .sort((a, b) => a.lastModified - b.lastModified);

      const filename = 'livecodes_export_' + getDate();
      const content = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
      downloadFile(filename, 'json', content);
    },
    false,
  );

  eventsManager.addEventListener(
    deleteAllButton,
    'click',
    async () => {
      notifications.confirm(
        window.deps.translateString('open.delete.all', 'Delete {{projects}} projects?', {
          projects: visibleProjects.length,
        }),
        async () => {
          notifications.info(
            window.deps.translateString('open.delete.deleting', 'Deleting projects...'),
          );
          await Promise.all(
            visibleProjects.map((p) => {
              if (getProjectId() === p.id) {
                setProjectId('');
              }
              return projectStorage.deleteItem(p.id);
            }),
          );
          visibleProjects = [];
          savedProjects = await projectStorage.getList();
          await showList(visibleProjects);
        },
      );
    },
    false,
  );

  projectsContainer.appendChild(list);

  const showList = async (projects: SavedProject[]) => {
    visibleProjects = projects;
    list.innerHTML = '';
    projects.forEach((item) => {
      const { link, deleteButton } = createOpenItem(
        item,
        list,
        getLanguageTitle,
        getLanguageByAlias,
      );

      eventsManager.addEventListener(
        link,
        'click',
        async (event) => {
          event.preventDefault();

          const loading = createItemLoader(item);
          modal.show(loading, { size: 'small' });

          const itemId = (link as HTMLElement).dataset.id || '';
          const savedProject = (await projectStorage.getItem(itemId))?.config;
          if (savedProject) {
            await loadConfig(savedProject);
            setProjectId(itemId);
          }
          modal.close();
          loading.remove();
        },
        false,
      );

      eventsManager.addEventListener(
        deleteButton,
        'click',
        () => {
          notifications.confirm(
            window.deps.translateString('open.delete.one', 'Delete project: {{project}}?', {
              project: item.title,
            }),
            async () => {
              if (item.id === getProjectId()) {
                setProjectId('');
              }
              await projectStorage.deleteItem(item.id);
              visibleProjects = visibleProjects.filter((p) => p.id !== item.id);
              const li = deleteButton.parentElement as HTMLElement;
              li.classList.add('hidden');
              setTimeout(() => {
                showList(visibleProjects);
              }, 500);
            },
          );
        },
        false,
      );
    });

    if (projects.length === 0) {
      list.classList.add('hidden');
      deleteAllButton.classList.add('hidden');
      exportAllButton.classList.add('hidden');
      if ((await projectStorage.getList()).length === 0) {
        noDataMessage.classList.remove('hidden');
        noMatchMessage.classList.add('hidden');
      } else {
        noDataMessage.classList.add('hidden');
        noMatchMessage.classList.remove('hidden');
      }
    } else {
      list.classList.remove('hidden');
      deleteAllButton.classList.remove('hidden');
      exportAllButton.classList.remove('hidden');
      noDataMessage.classList.add('hidden');
      noMatchMessage.classList.add('hidden');
    }
  };

  await showList(savedProjects);

  const getProjects = () => projectStorage.getList();
  modal.show(listContainer, { isAsync: true });
  organizeProjects(getProjects, showList, eventsManager, languages);
};
