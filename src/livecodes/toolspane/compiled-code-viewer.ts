import { getEditorConfig } from '../config';
import { createEditor, getFontFamily } from '../editor';
import type { createEventsManager } from '../events';
import { getLanguageExtension, languages, mapLanguage } from '../languages';
import type {
  Editors,
  Config,
  CodeEditor,
  EditorOptions,
  Language,
  CompiledCodeViewer,
} from '../models';
import { getToolspaneButtons, getToolspaneElement } from '../UI';

export const createCompiledCodeViewer = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  _eventsManager: ReturnType<typeof createEventsManager>,
  isEmbed: boolean,
  _runTests: () => Promise<void>,
): CompiledCodeViewer => {
  let compiledCodeElement: HTMLElement;
  let editor: CodeEditor;
  let languageLabel: HTMLElement;

  const createElements = () => {
    if (compiledCodeElement) return;
    const toolsPaneElement = getToolspaneElement();

    const container = document.createElement('div');
    container.id = 'compiled-code-container';
    toolsPaneElement.appendChild(container);

    compiledCodeElement = document.createElement('div');
    compiledCodeElement.id = 'compiled-code';
    container.appendChild(compiledCodeElement);

    const toolsPaneButtons = getToolspaneButtons();
    if (toolsPaneButtons) {
      languageLabel = document.createElement('div');
      languageLabel.id = 'compiled-code-language-label';
      languageLabel.style.display = 'none';
      toolsPaneButtons.prepend(languageLabel);
    }
  };

  const createCompiledEditor = (force = false) => {
    if (editor && !force) return editor;

    const editorOptions: EditorOptions = {
      baseUrl,
      container: compiledCodeElement,
      language: 'javascript',
      value: '',
      readonly: true,
      mode: config.mode,
      editorId: 'compiled',
      isEmbed,
      isHeadless: false,
      mapLanguage,
      getLanguageExtension,
      getFormatterConfig: () => ({}),
      getFontFamily,
      ...getEditorConfig(config),
    };
    return createEditor(editorOptions);
  };

  // workaround to fix "cannot-redeclare-block-scoped-variable" error
  // https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
  const fixTypes = (language: Language, content: string) => {
    if (language === 'javascript' && (window as any).monaco && editor.monaco) {
      editor?.setValue(content + '\nexport {}');
      const monacoEditor = editor.monaco;
      const lineCount = monacoEditor.getModel()?.getLineCount() || 1;
      monacoEditor.setHiddenAreas([]);
      monacoEditor.setHiddenAreas([
        new (window as any).monaco.Range(lineCount + 1, 0, lineCount + 2, 0),
      ]);
    }
  };

  const update = (language: Language, content: string, label?: string) => {
    if (!editor) return;
    if (editor.getLanguage() !== language) {
      editor.setLanguage(language, content);
    } else {
      editor.setValue(content);
    }
    fixTypes(language, content);
    if (languageLabel) {
      const compiledLanguage = languages.find((lang) => lang.name === label);
      const title = compiledLanguage?.longTitle || compiledLanguage?.title || label || '';
      languageLabel.innerHTML = title;
    }
  };

  const load = async () => {
    createElements();
    editor = await createCompiledEditor();
  };

  const reloadEditor = async (newConfig: Config) => {
    config = newConfig;
    if (!compiledCodeElement) {
      await load();
      return;
    }
    editor?.destroy();
    editor = await createCompiledEditor(true);
  };

  return {
    name: 'compiled',
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
    getEditor: () => editor,
    update,
    reloadEditor,
  };
};
