import { createEventsManager } from '../events';
import { getLanguageTitle, languages } from '../languages';
import { Language } from '../models';
import { SavedProject } from '../storage';
import { isMobile, loadScript, loadStylesheet } from '../utils';
import { flexSearchUrl, tagifyScriptUrl, tagifyStylesUrl } from '../vendors';
import { getTags } from './info';

export const createOpenItem = (item: SavedProject, list: HTMLElement) => {
  const li = document.createElement('li');
  list.appendChild(li);

  const link = document.createElement('a');
  link.href = '#';
  link.dataset.id = item.id;
  link.classList.add('open-project-link');
  const lastModified = isMobile()
    ? new Date(item.lastModified).toLocaleDateString()
    : new Date(item.lastModified).toLocaleString();

  let langs = '';
  if (!isMobile()) {
    item.languages.forEach((lang) => {
      langs += `<span class="language-tag" data-lang="${lang}" title="filter by language">${getLanguageTitle(
        lang,
      )}</span>`;
    });
  }

  let userTags = '';
  item.tags = item.tags.filter(Boolean);
  if (!isMobile() && item.tags.length > 0) {
    userTags += '<span class="light">|</span> ';
    item.tags.forEach((tag) => {
      userTags += `<span class="user-tag" data-tag="${tag}" title="filter by tag">${tag}</span>`;
    });
  }
  link.innerHTML = `
    <div class="open-title">${item.title}</div>
    <div class="light"><span>Last modified: </span>
    ${lastModified}</div>
    <div class="project-tags">${langs} ${userTags}</div>
  `;
  li.appendChild(link);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  li.appendChild(deleteButton);

  return { link, deleteButton };
};

export const createItemLoader = (item: { title: string }) => {
  const loading = document.createElement('div');
  loading.innerHTML = `
    <div class="modal-message">Loading...</div>
    <div class="modal-message">${item.title}</div>
    `;
  return loading;
};

export const organizeProjects = (
  getProjects: () => SavedProject[],
  showProjects: (projects: SavedProject[]) => void,
  eventsManager: ReturnType<typeof createEventsManager>,
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

  const getFilteredAndSorted = () =>
    getProjects()
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
          (ev) => {
            ev.stopPropagation();
            languageSelect.value = tag.dataset.lang || '';
            filterByLanguage();
          },
          false,
        );
      } else if (tag.dataset.tag) {
        eventsManager.addEventListener(
          tag,
          'click',
          (ev) => {
            ev.stopPropagation();
            if (tagify) {
              tagify.removeAllTags();
              tagify.addTags(tag.dataset.tag);
              filterByTags();
            }
          },
          false,
        );
      }
    });
  };

  const reloadProjects = () => {
    showProjects(getFilteredAndSorted());
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

  const filterByTags = (value = filterTagsInput.value) => {
    tags = getTags(value).filter((x) => x !== '');
    reloadProjects();
  };

  const filterByLanguage = (value = languageSelect.value) => {
    language = value as Language;
    reloadProjects();
  };

  eventsManager.addEventListener(
    lastModifiedButton,
    'click',
    (ev) => {
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
      reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    titleButton,
    'click',
    (ev) => {
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
      reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedAscButton,
    'click',
    (ev) => {
      ev.preventDefault();
      sortDescending();
      reloadProjects();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedDescButton,
    'click',
    (ev) => {
      ev.preventDefault();
      sortAscending();
      reloadProjects();
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
    () => {
      filterByLanguage();
    },
    false,
  );
  registerLanguageFilters();

  loadStylesheet(tagifyStylesUrl, 'tagify-styles');
  loadScript(tagifyScriptUrl, 'Tagify').then((Tagify: any) => {
    if (Tagify) {
      tagify = new Tagify(filterTagsInput, {
        whitelist: Array.from(
          new Set(
            getProjects()
              .map((item) => item.tags)
              .flat(),
          ),
        ).sort((a, b) => (b > a ? -1 : 1)),
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
      worker: true,
    });

    await Promise.all(getProjects().map((p) => index.add(p)));

    eventsManager.addEventListener(
      searchProjectsInput,
      'keyup',
      async () => {
        const result = await index.searchAsync(searchProjectsInput.value);
        searchResults = result.map((field: any) => field.result).flat();
        reloadProjects();
      },
      false,
    );
  });

  eventsManager.addEventListener(
    resetFiltersLink,
    'click',
    (ev) => {
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
      reloadProjects();
    },
    false,
  );
};
