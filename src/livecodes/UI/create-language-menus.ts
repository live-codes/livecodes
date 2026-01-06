import { languageIsEnabled, processorIsEnabled } from '../languages/utils';
import type {
  Config,
  EditorId,
  EventsManager,
  Language,
  LanguageSpecs,
  Processor,
  Template,
} from '../models';
import { handleSlash, removeFormatting } from '../utils';
import { getResultElement } from './selectors';

export const createLanguageMenus = (
  config: Config,
  baseUrl: string,
  eventsManager: EventsManager,
  showLanguageInfo: (languageInfo: HTMLElement) => void,
  loadStarterTemplate: (templateName: Template['name']) => void,
  importCode: (options: { importUrl: string }) => Promise<boolean>,
  registerMenuButton: (menu: HTMLElement, button: HTMLElement) => void,
) => {
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const rootList = document.createElement('div');
  document.querySelector('#select-editor')?.appendChild(rootList);

  let editorsNumber = editorIds.length;

  editorIds.forEach((editorId) => {
    const editorSelector = document.createElement('a');
    editorSelector.href = '#';
    editorSelector.id = editorId + '-selector';
    editorSelector.classList.add('editor-title', 'noselect');
    editorSelector.dataset.editor = editorId;
    editorSelector.dataset.singleFile = 'true';
    editorSelector.innerHTML = `
      <span></span>
      <a
        href="javascript:void(0)"
        onclick="event.stopPropagation();"
        class="language-menu-button"
        title="${window.deps.translateString('core.changeLanguage.hint', 'Change Language')}"
      >
      <i class="icon-arrow-down"></i>
      </a>
    `;
    rootList.appendChild(editorSelector);

    const menuScroller = document.createElement('div');
    menuScroller.classList.add('menu-scroller');
    menuScroller.classList.add('menu-scroller-' + editorId);
    registerMenuButton(menuScroller, editorSelector.querySelector('.language-menu-button')!);
    editorSelector.appendChild(menuScroller);

    const languageMenu = document.createElement('ul');
    languageMenu.classList.add('dropdown-menu');
    languageMenu.classList.add('dropdown-menu-' + editorId);
    menuScroller.appendChild(languageMenu);

    const editorLanguages = [...window.deps.languages]
      .filter((language) => language.editor === editorId)
      .filter((language) => languageIsEnabled(language.name, config));

    if (editorLanguages.length === 0) {
      editorSelector.classList.add('hidden');
      editorsNumber -= 1;
    } else if (editorLanguages.length === 1) {
      const changeLanguageButton =
        editorSelector.querySelector<HTMLElement>('.language-menu-button');
      if (changeLanguageButton) {
        changeLanguageButton.style.display = 'none';
      }
    }

    const enabledProcessors = window.deps.processors.filter(
      (p) => p.editor === editorId && processorIsEnabled(p.name, config),
    );
    const processorsHeader =
      enabledProcessors.length > 0
        ? {
            name: editorId + '-processors',
            title: 'Processors:',
            longTitle: 'Processors:',
            editor: editorId,
          }
        : undefined;

    if (processorsHeader) {
      editorLanguages.push(processorsHeader as LanguageSpecs);
    }

    editorLanguages.forEach((language) => {
      const languageItem = document.createElement('li');
      languageItem.classList.add('language-item');
      languageMenu.appendChild(languageItem);

      const languageLink = document.createElement('a');
      languageLink.href = '#';
      languageLink.dataset.editor = editorId;
      languageLink.dataset.lang = language.name;
      languageLink.title = language.longTitle || language.title;
      languageLink.innerHTML = language.longTitle || language.title;

      if (!('extensions' in language)) {
        languageLink.classList.add('subtitle');
      }
      if (language.name === ('style-processors' as any)) {
        languageItem.classList.add('column-break');
      }
      languageItem.appendChild(languageLink);

      if (language.info !== false) {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.title = window.deps.translateString('generic.clickForInfo', 'Click for info...');
        tooltip.innerHTML = infoIcon;

        eventsManager.addEventListener(
          tooltip,
          'mousedown',
          async () => {
            const languageInfo = document.createElement('div');
            languageInfo.classList.add('language-info');
            languageInfo.innerHTML = await getLanguageInfo(language.name, baseUrl);
            showLanguageInfo(languageInfo);
            const templateLink: HTMLElement | null = languageInfo.querySelector('a[data-template]');
            const templateName = templateLink?.dataset.template as Template['name'];
            if (templateLink && templateName) {
              eventsManager.addEventListener(
                templateLink,
                'click',
                async (event) => {
                  event.preventDefault();
                  loadStarterTemplate(templateName);
                },
                false,
              );
            }
            const codeLink: HTMLElement | null = languageInfo.querySelector('a[data-code]');
            const codeUrl = codeLink?.dataset.code;
            if (codeLink && codeUrl) {
              eventsManager.addEventListener(
                codeLink,
                'click',
                async (event) => {
                  event.preventDefault();
                  importCode({ importUrl: codeUrl });
                },
                false,
              );
            }
          },
          false,
        );
        languageItem.appendChild(tooltip);
      }
    });
  });

  if (editorsNumber < 3) {
    document.querySelectorAll('.editor-title').forEach((editorSelector) => {
      editorSelector.classList.add('half-width');
    });
  }
};

export const createMultiFileEditorTab = ({
  title,
  showEditor,
  addFile,
  renameFile,
  deleteFile,
  isMainFile,
  isNewFile = false,
}: {
  title: string;
  showEditor: (filename: string) => void;
  addFile?: (filename: string) => Promise<boolean>;
  renameFile: (filename: string, newName: string) => boolean;
  deleteFile: (filename: string) => void;
  isMainFile: boolean;
  isNewFile: boolean;
}) => {
  let currentFileName = title;
  const selector = document.querySelector(`.editor-title[data-editor="${currentFileName}"]`);
  if (selector) return;
  const editorSelector = document.createElement('a');
  editorSelector.href = '#';
  editorSelector.classList.add('editor-title', 'noselect');
  editorSelector.dataset.editor = currentFileName;
  editorSelector.dataset.multiFile = 'true';
  editorSelector.addEventListener('click', () => showEditor(currentFileName));

  const label = document.createElement('span');
  label.innerHTML = currentFileName;
  label.title = currentFileName;
  label.addEventListener('paste', removeFormatting, false);
  editorSelector.appendChild(label);

  if (!isMainFile) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-file-button');
    deleteButton.innerHTML = deleteIcon;
    deleteButton.addEventListener('click', () => {
      if (
        confirm(
          window.deps.translateString('core.confirm.deleteFile', 'Delete file: {{filename}}?', {
            filename: currentFileName,
          }),
        )
      ) {
        deleteFile(currentFileName);
        editorSelector.remove();
      }
    });
    editorSelector.appendChild(deleteButton);
  }

  const selectAll = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const accept = async () => {
    cleanup();
    const success =
      isNewFile && typeof addFile === 'function'
        ? await addFile(label.innerText)
        : renameFile(currentFileName, label.innerText);
    if (!success) {
      onDblClick();
      return;
    }
    label.contentEditable = 'false';
    currentFileName = handleSlash(label.innerText);
    label.title = currentFileName;
    label.innerText = currentFileName;
    label.style.maxWidth = '';
    showEditor(currentFileName);
    if (isNewFile) {
      // a new tab is created. remove this one
      editorSelector.remove();
    }
    isNewFile = false;
  };

  const onEnter = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    accept();
  };

  const onClickOutside = (event: MouseEvent) => {
    if (!label.contains(event.target as Node)) {
      accept();
    }
  };

  // covers the sandboxed iframe to allow capturing clicks
  const createResultCover = () => {
    const cover = document.createElement('div');
    cover.classList.add('result-cover');
    getResultElement().appendChild(cover);
  };

  const removeResultCover = () => {
    document.querySelector('.result-cover')?.remove();
  };

  const onDblClick = () => {
    label.contentEditable = 'true';
    label.style.maxWidth = 'unset';
    requestAnimationFrame(() => label.focus());
    selectAll(label);
    createResultCover();
    window.addEventListener('keydown', onEnter);
    window.addEventListener('click', onClickOutside, { once: true });
  };

  const cleanup = () => {
    window.removeEventListener('keydown', onEnter);
    window.removeEventListener('click', onClickOutside);
    removeResultCover();
  };

  editorSelector.addEventListener('dblclick', onDblClick);

  const scrollTo = document.querySelector('#multi-file-scroll-to');
  document.querySelector('#select-editor > div')?.insertBefore(editorSelector, scrollTo);

  if (isNewFile) {
    scrollTo?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
    onDblClick();
  }
};

export const createAddFileButton = ({ onclick: handleAddFileClick }: { onclick: () => void }) => {
  if (document.querySelector('#add-file-button')) return;
  const addFileButton = document.createElement('button');
  addFileButton.id = 'add-file-button';
  addFileButton.classList.add('app-menu-button', 'menu');
  addFileButton.innerHTML =
    '<i class="icon-add" title="Add file" data-i18n="core.addFile" data-i18n-prop="title"></i>';
  addFileButton.addEventListener('click', handleAddFileClick);
  document.querySelector('#select-editor')?.appendChild(addFileButton);

  const scrollTo = document.createElement('div');
  scrollTo.id = 'multi-file-scroll-to';
  document.querySelector('#select-editor > div')?.appendChild(scrollTo);
};

export const createProcessorItem = (processor: { name: string; title: string }) => {
  const processorItem = document.createElement('li');
  processorItem.classList.add('language-item', 'processor-item');
  processorItem.innerHTML = `
  <a href="#">
    <label class="switch">
      <span>${processor.title}</span>
      <div>
        <input id="${processor.name}" type="checkbox" data-processor="${processor.name}" tabindex="-1" />
        <span class="slider round"></span>
      </div>
    </label>
  </a>
  `;
  return processorItem;
};

const getLanguageInfo = async (language: Language | Processor, baseUrl: string) => {
  const languageInfoHTML = await import(baseUrl + '{{hash:language-info.js}}').then(
    (mod) => mod.languageInfo,
  );
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(languageInfoHTML, 'text/html');
  const info = dom.querySelector(`[data-lang="${language}"]`);
  return info?.innerHTML || '';
};

const infoIcon = '<i class="icon-info"></i>';
const deleteIcon = '<i class="icon-close"></i>';
