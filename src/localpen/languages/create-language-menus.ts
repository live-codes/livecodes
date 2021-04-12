import { EditorId, Pen } from '../models';
import { languages } from './languages';

export const createLanguageMenus = (
  config: Pen,
  editorIds: EditorId[] = ['markup', 'style', 'script'],
) => {
  const rootList = document.createElement('ul');
  document.querySelector('#select-editor')?.appendChild(rootList);

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

    languages
      .filter((language) => language.editor === editorId)
      .forEach((language) => {
        languageMenu.innerHTML += `
      <li>
      <a href="#" data-editor="${editorId}" data-lang="${language.name}" title="${
          language.longTitle || language.title
        }">${language.longTitle || language.title}</a>
    </li>
      `;
      });
  });
};
