import { createEditor } from './editor';
import { createEventsManager } from './events';
import { languages } from './languages';
import { Editors, Pen, Tool } from './models';
import { monaco } from './monaco';

export const createCompiledCodeViewer = (
  config: Pen,
  _editors: Editors,
  _eventsManager: ReturnType<typeof createEventsManager>,
): Tool => {
  let compiledCodeElement: HTMLElement;
  let editor: any;
  let languageLabel: HTMLElement;

  const createElements = () => {
    if (compiledCodeElement) return;

    const toolsPaneSelector = '#output #tools-pane';
    const toolsPaneElement = document.querySelector(toolsPaneSelector);
    if (!toolsPaneElement) {
      throw new Error('Cannot find element with selector: ' + toolsPaneSelector);
    }

    const container = document.createElement('div');
    container.id = 'compiled-code-container';
    toolsPaneElement.appendChild(container);

    compiledCodeElement = document.createElement('div');
    compiledCodeElement.id = 'compiled-code';
    container.appendChild(compiledCodeElement);

    const toolsPaneButtons = document.querySelector('#tools-pane-buttons');
    if (toolsPaneButtons) {
      languageLabel = document.createElement('div');
      languageLabel.id = 'compiled-code-language-label';
      languageLabel.style.display = 'none';
      toolsPaneButtons.prepend(languageLabel);
    }
  };

  const createCompiledEditor = () => {
    if (editor) return editor;

    const editorOptions = {
      ...config.editor,
      baseUrl: config.baseUrl,
      container: compiledCodeElement,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      readOnly: true,
    };
    return createEditor(editorOptions);
  };

  const update = (language: 'html' | 'css' | 'javascript', content: string) => {
    monaco.editor.setModelLanguage(editor.getModel(), language);
    editor.getModel().setValue(content);
    if (languageLabel) {
      const compiledLanguage = languages.find((lang) => lang.name === language);
      languageLabel.innerHTML = compiledLanguage?.longTitle || compiledLanguage?.title || '';
    }
  };

  const load = async () => {
    createElements();
    editor = await createCompiledEditor();
  };

  return {
    title: 'Compiled',
    load,
    onActivate: () => {
      if (languageLabel) {
        languageLabel.style.display = 'unset';
      }
    },
    onDeactivate: () => {
      if (languageLabel) {
        languageLabel.style.display = 'none';
      }
    },
    update,
  } as Tool;
};
