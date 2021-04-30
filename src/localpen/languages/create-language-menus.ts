import { createEventsManager } from '../events';
import { createModal } from '../modal';
import { EditorId, Pen } from '../models';
import { languages } from './languages';
import { languageIsEnabled } from './utils';

const infoIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>`;

export const createLanguageMenus = (
  config: Pen,
  modal: ReturnType<typeof createModal>,
  eventsManager: ReturnType<typeof createEventsManager>,
  editorIds: EditorId[] = ['markup', 'style', 'script'],
) => {
  const rootList = document.createElement('ul');
  document.querySelector('#select-editor')?.appendChild(rootList);

  let editorsNumber = editorIds.length;

  editorIds.forEach((editorId) => {
    const editorSelector = document.createElement('li');
    editorSelector.id = editorId + '-selector';
    editorSelector.classList.add('editor-title', 'noselect');
    editorSelector.dataset.editor = editorId;
    editorSelector.innerHTML = `
      <span></span>
      <button onclick="event.stopPropagation();">
        <img
          width="20"
          height="20"
          style="filter: invert(1)"
          src="${config.baseUrl}assets/images/down_arrow.svg"
        />
      </button>
    `;
    rootList.appendChild(editorSelector);

    const menuScroller = document.createElement('div');
    menuScroller.classList.add('menu-scroller');
    editorSelector.appendChild(menuScroller);

    const languageMenu = document.createElement('ul');
    languageMenu.classList.add('dropdown-menu');
    menuScroller.appendChild(languageMenu);

    const editorLanguages = languages
      .filter((language) => languageIsEnabled(language.name, config))
      .filter((language) => language.editor === editorId);

    if (editorLanguages.length === 0) {
      editorSelector.style.display = 'none';
      editorsNumber -= 1;
    } else if (editorLanguages.length === 1) {
      const changeLanguageButton = editorSelector.querySelector('button');
      if (changeLanguageButton) {
        changeLanguageButton.style.display = 'none';
      }
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
      languageItem.appendChild(languageLink);

      if (language.info) {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.title = 'Click for info...';
        tooltip.innerHTML = infoIcon;
        const tooltipText = document.createElement('div');
        tooltipText.classList.add('language-info');
        tooltipText.innerHTML = language.info;
        eventsManager.addEventListener(
          tooltip,
          'mousedown',
          () => modal.show(tooltipText, 'small'),
          false,
        );
        languageItem.appendChild(tooltip);
      }
    });
  });

  if (editorsNumber === 2) {
    document.querySelectorAll('.editor-title').forEach((editorSelector) => {
      (editorSelector as HTMLElement).classList.add('half-width');
    });
  }
};
