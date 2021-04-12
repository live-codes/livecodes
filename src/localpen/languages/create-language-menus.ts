import { EditorId, Pen } from '../models';
import { languages } from './languages';
import { languageIsEnabled } from './utils';

export const createLanguageMenus = (
  config: Pen,
  editorIds: EditorId[] = ['markup', 'style', 'script'],
) => {
  const rootList = document.createElement('ul');
  document.querySelector('#select-editor')?.appendChild(rootList);

  let editorsNumber = editorIds.length;

  editorIds.forEach((editorId) => {
    const editorSelector = document.createElement('li');
    editorSelector.id = editorId + '-selector';
    editorSelector.classList.add('editor-title');
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

    const languageMenu = document.createElement('ul');
    languageMenu.classList.add('dropdown-menu');
    editorSelector.appendChild(languageMenu);

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
      languageMenu.innerHTML += `
      <li>
      <a href="#" data-editor="${editorId}" data-lang="${language.name}" title="${
        language.longTitle || language.title
      }">${language.longTitle || language.title}</a>
    </li>
      `;
    });
  });

  if (editorsNumber === 2) {
    document.querySelectorAll('.editor-title').forEach((editorSelector) => {
      (editorSelector as HTMLElement).classList.add('half-width');
    });
  }
};
