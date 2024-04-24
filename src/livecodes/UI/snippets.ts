/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { Snippet, CodeEditor, EditorOptions, Screen, Language, AppData } from '../models';
import type { createNotifications } from '../notifications';
import { generateId, type Storage } from '../storage';
import { addSnippetScreen, snippetsScreen } from '../html';
import { getLanguageTitle, languages } from '../languages';
import { copyToClipboard, isMobile, loadScript } from '../utils';
import { flexSearchUrl } from '../vendors';
import { edit as editIcon, copy as copyIcon } from '../UI/icons';

import {
  getAddSnippetButton,
  getAddSnippetEditor,
  getSaveSnippetBtn,
  getSnippetDescriptionArea,
  getSnippetLanguageSelect,
  getSnippetsBtn,
  getSnippetsDeleteAllButton,
  getSnippetTitleInput,
} from './selectors';

const textLanguage = { name: 'text', title: 'Plain Text', editorLanguage: '' };
const getLanguage = (name: Language) =>
  name === textLanguage.name ? textLanguage.title : getLanguageTitle(name);

const copySnippet = (url: string, notifications: any) => {
  if (copyToClipboard(url)) {
    notifications.success('Snippet is copied to clipboard.');
  } else {
    notifications.error('Failed to copy URL.');
  }
};

const createSnippetItem = (
  item: Snippet,
  list: HTMLElement,
  notifications: ReturnType<typeof createNotifications>,
  showScreen: any,
) => {
  const li = document.createElement('li');
  list.appendChild(li);

  const link = document.createElement('a');
  link.href = '#';
  link.dataset.hint = 'Click to copy snippet';
  link.classList.add('snippet-item', 'hint--top');
  link.title = item.description;
  link.onclick = (ev) => {
    ev.preventDefault();
    copySnippet(item.code, notifications);
  };

  const lastModified = isMobile()
    ? new Date(item.lastModified).toLocaleDateString()
    : new Date(item.lastModified).toLocaleString();

  const title = document.createElement('div');
  title.classList.add('open-title', 'overflow-text');
  title.textContent = item.title;
  link.appendChild(title);

  if (!isMobile()) {
    const lastModifiedText = document.createElement('div');
    lastModifiedText.classList.add('light');
    lastModifiedText.textContent = 'Last modified: ' + lastModified;
    link.appendChild(lastModifiedText);
  }

  const tags = document.createElement('div');
  tags.classList.add('project-tags');
  const langEl = document.createElement('span');
  langEl.classList.add('language-tag');
  langEl.dataset.lang = item.language;
  langEl.title = 'filter by language';
  langEl.textContent = getLanguage(item.language);
  tags.append(langEl);
  link.appendChild(tags);

  const editorContainer = document.createElement('div');
  editorContainer.classList.add('editor', 'custom-editor');
  link.appendChild(editorContainer);
  li.appendChild(link);

  const actions = document.createElement('div');
  actions.classList.add('actions');
  li.appendChild(actions);

  const copyButton = document.createElement('div');
  copyButton.innerHTML = copyIcon;
  copyButton.classList.add('action-button', 'hint--left');
  copyButton.dataset.hint = 'Copy';
  copyButton.onclick = (ev) => {
    ev.preventDefault();
    copySnippet(item.code, notifications);
  };
  actions.appendChild(copyButton);

  const editButton = document.createElement('div');
  editButton.innerHTML = editIcon;
  editButton.classList.add('action-button', 'hint--left');
  editButton.dataset.hint = 'Edit';
  editButton.onclick = () => {
    showScreen('add-snippet', item.id);
  };
  actions.appendChild(editButton);

  const deleteWrapper = document.createElement('div');
  deleteWrapper.dataset.hint = 'Delete';
  deleteWrapper.classList.add('hint--left');
  actions.appendChild(deleteWrapper);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteWrapper.appendChild(deleteButton);

  return { link, deleteButton };
};

const organizeSnippets = async (
  getSnippets: () => Promise<Snippet[]>,
  showSnippets: (snippets: Snippet[]) => Promise<void>,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  let sortBy: 'date' | 'title' = 'date';
  let sortByDirection: 'asc' | 'desc' = 'desc';
  let language: string;
  let searchResults: string[] = [];

  const lastModifiedButton = document.querySelector(
    '#snippets-list-container #snippets-sort-by-last-modified',
  ) as HTMLElement;
  const titleButton = document.querySelector(
    '#snippets-list-container #snippets-sort-by-title',
  ) as HTMLElement;
  const sortedAscButton = document.querySelector(
    '#snippets-list-container #snippets-sorted-asc',
  ) as HTMLElement;
  const sortedDescButton = document.querySelector(
    '#snippets-list-container #snippets-sorted-desc',
  ) as HTMLElement;
  const langSelect = document.querySelector(
    '#snippets-list-container #snippets-lang-filter',
  ) as HTMLSelectElement;
  const searchSnippetsInput = document.querySelector(
    '#snippets-list-container #search-snippets',
  ) as HTMLInputElement;
  const resetFiltersLink = document.querySelector(
    '#snippets-list-container #snippets-reset-filters',
  ) as HTMLElement;

  Array.from(new Set((await getSnippets()).map((x) => x.language)))
    .sort((a, b) =>
      a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0,
    )
    .forEach((lang) => {
      const option = document.createElement('option');
      option.text = getLanguage(lang);
      option.value = lang;
      langSelect.appendChild(option);
    });

  const getFilteredAndSorted = async () =>
    (await getSnippets())
      .filter((p) => (language ? p.language === language : true))
      .filter((p) =>
        searchSnippetsInput.value.trim() !== '' ? searchResults.includes(p.id) : true,
      )
      .sort((a, b) =>
        sortBy === 'date' && sortByDirection === 'asc'
          ? a.lastModified - b.lastModified
          : sortBy === 'date' && sortByDirection === 'desc'
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
            langSelect.value = tag.dataset.lang || '';
            await filterByLanguage();
          },
          false,
        );
      }
    });
  };

  const reloadSnippets = async () => {
    showSnippets(await getFilteredAndSorted());
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

  const filterByLanguage = async (value = langSelect.value) => {
    language = value;
    await reloadSnippets();
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
      await reloadSnippets();
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
      await reloadSnippets();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedAscButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortDescending();
      await reloadSnippets();
    },
    false,
  );

  eventsManager.addEventListener(
    sortedDescButton,
    'click',
    async (ev) => {
      ev.preventDefault();
      sortAscending();
      await reloadSnippets();
    },
    false,
  );

  eventsManager.addEventListener(
    langSelect,
    'change',
    async () => {
      await filterByLanguage();
    },
    false,
  );

  registerLanguageFilters();

  loadScript(flexSearchUrl, 'FlexSearch').then(async (FlexSearch: any) => {
    const index = new FlexSearch.Document({
      index: ['title', 'language', 'description'],
      tokenize: 'full',
      worker: true,
    });

    await Promise.all((await getSnippets()).map((p) => index.add(p)));

    eventsManager.addEventListener(
      searchSnippetsInput,
      'keyup',
      async () => {
        const result = await index.searchAsync(searchSnippetsInput.value);
        searchResults = result.map((field: any) => field.result).flat();
        await reloadSnippets();
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
      language = '';
      searchResults = [];
      lastModifiedButton.classList.add('active');
      titleButton.classList.remove('active');
      sortDescending();
      langSelect.value = '';
      searchSnippetsInput.value = '';
      await reloadSnippets();
    },
    false,
  );
};

export const createSnippetsList = async ({
  snippetsStorage,
  eventsManager,
  notifications,
  modal,
  deps,
}: {
  snippetsStorage: Storage<Snippet>;
  eventsManager: ReturnType<typeof createEventsManager>;
  notifications: ReturnType<typeof createNotifications>;
  modal: ReturnType<typeof createModal>;
  deps: {
    createEditorFn: (options: Partial<EditorOptions>) => Promise<CodeEditor>;
    showScreen: (screen: Screen['screen']) => void;
  };
}) => {
  const div = document.createElement('div');
  div.innerHTML = snippetsScreen;
  const listContainer = div.firstChild as HTMLElement;
  const noDataMessage = listContainer.querySelector('.no-data') as HTMLElement;
  const noMatchMessage = listContainer.querySelector('#snippets-no-match.no-data') as HTMLElement;
  const snippetsContainer = listContainer.querySelector('#snippets-container') as HTMLElement;
  const list = document.createElement('ul') as HTMLElement;
  list.classList.add('open-list');
  let savedSnippets = await snippetsStorage.getAllData();
  let visibleSnippets = savedSnippets;

  const addSnippetButton = getAddSnippetButton(listContainer);
  const deleteAllButton = getSnippetsDeleteAllButton(listContainer);

  eventsManager.addEventListener(
    addSnippetButton,
    'click',
    () => {
      deps.showScreen('add-snippet');
    },
    false,
  );

  eventsManager.addEventListener(
    deleteAllButton,
    'click',
    async () => {
      notifications.confirm(`Delete ${visibleSnippets.length} snippets?`, async () => {
        for (const p of visibleSnippets) {
          await snippetsStorage.deleteItem(p.id);
        }
        visibleSnippets = [];
        savedSnippets = await snippetsStorage.getAllData();
        await showList(visibleSnippets);
      });
    },
    false,
  );

  snippetsContainer.appendChild(list);

  const showList = async (snippets: Snippet[]) => {
    visibleSnippets = snippets;
    list.innerHTML = '';
    snippets.forEach((item) => {
      const { link, deleteButton } = createSnippetItem(item, list, notifications, deps.showScreen);

      const editorContainer = link.querySelector<HTMLElement>('.editor');
      deps.createEditorFn({
        container: editorContainer,
        editorId: 'snippet',
        editor: 'codejar',
        readonly: true,
        language: item.language,
        value: item.code,
      });

      eventsManager.addEventListener(
        deleteButton,
        'click',
        () => {
          notifications.confirm(`Delete snippet: ${item.title}?`, async () => {
            await snippetsStorage.deleteItem(item.id);
            visibleSnippets = visibleSnippets.filter((p) => p.id !== item.id);
            const li = deleteButton.parentElement as HTMLElement;
            li.classList.add('hidden');
            setTimeout(() => {
              showList(visibleSnippets);
            }, 500);
          });
        },
        false,
      );
    });

    if (snippets.length === 0) {
      list.classList.add('hidden');
      deleteAllButton.classList.add('hidden');
      if ((await snippetsStorage.getList()).length === 0) {
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

  await showList(savedSnippets);

  const getSnippets = () => snippetsStorage.getAllData();
  modal.show(listContainer, { isAsync: true });
  organizeSnippets(getSnippets, showList, eventsManager);
};

export const createAddSnippetContainer = async ({
  snippetId,
  snippetsStorage,
  eventsManager,
  showScreen,
  notifications,
  deps,
}: {
  snippetId?: string;
  snippetsStorage: Storage<Snippet>;
  eventsManager: ReturnType<typeof createEventsManager>;
  showScreen: (screen: Screen['screen'], activeTab?: number) => Promise<void>;
  notifications: ReturnType<typeof createNotifications>;
  deps: {
    createEditorFn: (options: Partial<EditorOptions>) => Promise<CodeEditor>;
    getAppData: () => AppData | null;
    setAppData: (data: AppData) => void;
  };
}) => {
  const div = document.createElement('div');
  div.innerHTML = addSnippetScreen;
  const addSnippetContainer = div.firstChild as HTMLElement;
  const snippetsButton = getSnippetsBtn(addSnippetContainer);
  const snippetTitleInput = getSnippetTitleInput(addSnippetContainer);
  const snippetDescriptionArea = getSnippetDescriptionArea(addSnippetContainer);
  const languageSelect = getSnippetLanguageSelect(addSnippetContainer);
  const snippetEditor = getAddSnippetEditor(addSnippetContainer);
  const saveSnippetBtn = getSaveSnippetBtn(addSnippetContainer);

  const loadedSnippet = snippetId ? await snippetsStorage.getItem(snippetId) : null;
  if (loadedSnippet) {
    snippetTitleInput.value = loadedSnippet.title;
    snippetDescriptionArea.value = loadedSnippet.description;
  }

  const selectedLanguage =
    loadedSnippet?.language || deps.getAppData()?.snippets?.language || 'javascript';

  [...languages, textLanguage]
    .filter(
      (lang) =>
        ['jsx', 'tsx', 'rescript', 'reason', 'ocaml'].includes(lang.name) ||
        (!['blockly', 'richtext'].includes(lang.name) &&
          !['html', 'javascript', 'typescript', 'cpp', 'python'].includes(
            lang.editorLanguage || '',
          )),
    )
    .map((lang) => ({ name: lang.name, title: getLanguage(lang.name as Language) }))
    .sort((a, b) =>
      a.title.toLowerCase() < b.title.toLowerCase()
        ? -1
        : a.title.toLowerCase() < b.title.toLowerCase()
          ? 1
          : 0,
    )
    .forEach((lang) => {
      const option: HTMLOptionElement = document.createElement('option');
      option.text = lang.title;
      option.value = lang.name;
      option.selected = lang.name === selectedLanguage;
      languageSelect.appendChild(option);
    });

  const editor = await deps.createEditorFn({
    container: snippetEditor,
    editorId: 'add-snippet',
    language: selectedLanguage,
    value: loadedSnippet?.code || '',
  });

  const saveSnippet = async () => {
    if (!snippetTitleInput.value) {
      notifications.error('Please add snippet title.');
      snippetTitleInput.focus();
      return;
    }

    const snippet: Snippet = {
      id: loadedSnippet?.id || generateId(),
      title: snippetTitleInput.value,
      description: snippetDescriptionArea.value,
      language: languageSelect.value as Language,
      code: editor.getValue(),
      lastModified: Date.now(),
    };

    await snippetsStorage.updateItem(snippet.id, snippet);
    deps.setAppData({ snippets: { language: snippet.language } });

    notifications.success('Snippet locally saved to device!');
    showScreen('snippets');
  };

  eventsManager.addEventListener(
    snippetsButton,
    'click',
    () => {
      showScreen('snippets');
    },
    false,
  );

  eventsManager.addEventListener(
    languageSelect,
    'change',
    () => {
      editor.setLanguage(languageSelect.value as Language);
    },
    false,
  );
  eventsManager.addEventListener(saveSnippetBtn, 'click', saveSnippet, false);

  return addSnippetContainer;
};
