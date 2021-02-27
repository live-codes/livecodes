import { createEditor } from './editor';
import { createEventsManager } from './events';
import { languages } from './languages';
import { Editors, Pen, Tool, CodeEditor, EditorOptions } from './models';

export const createCompiledCodeViewer = (
  config: Pen,
  _editors: Editors,
  _eventsManager: ReturnType<typeof createEventsManager>,
): Tool => {
  let compiledCodeElement: HTMLElement;
  let editor: CodeEditor;
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

    const editorOptions: EditorOptions = {
      baseUrl: config.baseUrl,
      container: compiledCodeElement,
      language: 'javascript',
      value: '',
      editorType: 'compiled',
    };
    return createEditor(editorOptions);
  };

  const update = (language: 'html' | 'css' | 'javascript', content: string, config: Pen) => {
    if (!editor) return;

    editor.setLanguage(language);
    editor.setValue(content);
    if (languageLabel) {
      const compiledLanguage = languages.find((lang) => lang.name === language);
      const title = compiledLanguage?.longTitle || compiledLanguage?.title || '';
      const modifier =
        title !== 'CSS'
          ? ''
          : config.autoprefixer === true
          ? ' (Autoprefixer: On)'
          : ' (Autoprefixer: Off)';
      languageLabel.innerHTML = title + modifier;
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
