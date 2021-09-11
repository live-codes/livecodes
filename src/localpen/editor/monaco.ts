// eslint-disable-next-line import/no-unresolved
import * as Monaco from 'monaco-editor'; // only for typescript types
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';

import { EditorLibrary, FormatFn, Language, CodeEditor, EditorOptions } from '../models';
import { getLanguageExtension, mapLanguage } from '../languages';
import { getRandomString } from '../utils';

const monacoMapLanguage = (language: Language): Language =>
  language === 'livescript'
    ? 'coffeescript'
    : ['rescript', 'reason', 'ocaml', 'wat'].includes(language)
    ? 'csharp'
    : mapLanguage(language);

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, baseUrl, readonly } = options;
  if (!container) throw new Error('editor container not found');

  const monacoPath = baseUrl + 'vendor/monaco-editor';
  let monaco: typeof Monaco;
  try {
    (window as any).monaco =
      (window as any).monaco || (await import(`${monacoPath}/monaco-editor.js`)).monaco;
    monaco = (window as any).monaco;
  } catch {
    throw new Error('Failed to load monaco editor');
  }

  type Options = Monaco.editor.IStandaloneEditorConstructionOptions;

  const defaultOptions: Options = {
    fontSize: 14,
    theme: 'vs-dark',
    formatOnType: false,
    tabSize: 2,
    lineNumbersMinChars: 3,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      useShadows: false,
    },
    mouseWheelZoom: true,
    automaticLayout: true,
    readOnly: readonly,
  };

  const codeblockOptions: Options = {
    ...defaultOptions,
    readOnly: true,
    lineNumbers: 'off',
    scrollBeyondLastLine: false,
    contextmenu: false,
  };

  const compiledCodeOptions: Options = {
    ...defaultOptions,
    scrollBeyondLastLine: false,
    readOnly: true,
  };

  const consoleOptions: Options = {
    ...defaultOptions,
    lineNumbers: 'off',
    glyphMargin: true,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    scrollbar: {
      vertical: 'auto',
    },
    scrollBeyondLastLine: false,
    contextmenu: false,
  };

  const editorOptions =
    options.editorType === 'console'
      ? consoleOptions
      : options.editorType === 'compiled'
      ? compiledCodeOptions
      : options.mode === 'codeblock'
      ? codeblockOptions
      : defaultOptions;

  if (!document.head.querySelector('#__localpen__monaco-styles')) {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', `${monacoPath}/monaco-editor.css`);
    stylesheet.id = '__localpen__monaco-styles';
    document.head.appendChild(stylesheet);
  }

  (window as any).MonacoEnvironment = {
    getWorkerUrl(_moduleId: string, label: string) {
      if (label === 'json') return `${monacoPath}/json.worker.js`;
      if (label === 'css') return `${monacoPath}/css.worker.js`;
      if (label === 'scss') return `${monacoPath}/css.worker.js`;
      if (label === 'sass') return `${monacoPath}/css.worker.js`;
      if (label === 'less') return `${monacoPath}/css.worker.js`;
      if (label === 'html') return `${monacoPath}/html.worker.js`;
      if (label === 'typescript' || label === 'javascript') {
        return `${monacoPath}/ts.worker.js`;
      }
      return `${monacoPath}/editor.worker.js`;
    },
  };

  const configureEditor = () => {
    const compilerOptions: Monaco.languages.typescript.CompilerOptions = {
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      allowNonTsExtensions: true,
      allowJs: false,
      target: monaco.languages.typescript.ScriptTarget.Latest,
      experimentalDecorators: true,
      allowSyntheticDefaultImports: true,
      lib: ['es2020', 'dom'],
    };
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);

    if (language === 'tsx' || language === 'jsx') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...compilerOptions,
        jsx: monaco.languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
      });
    }
    if (language === 'stencil') {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...compilerOptions,
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        jsxFactory: undefined,
        reactNamespace: 'h',
      });
    }
  };

  type Listener = () => void;
  const listeners: Listener[] = [];
  const upateListeners = () => {
    listeners.forEach((fn) => editor.getModel()?.onDidChangeContent(fn));
  };

  const setModel = (
    editor: Monaco.editor.IStandaloneCodeEditor,
    value: string,
    language: Language,
  ) => {
    const random = getRandomString();
    const ext = getLanguageExtension(language);
    const oldModel = editor.getModel();
    const model = monaco.editor.createModel(
      value || '',
      monacoMapLanguage(language),
      monaco.Uri.parse(`file:///main.${random}.${ext}`),
    );
    editor.setModel(model);
    oldModel?.dispose();

    upateListeners();
    configureEditor();
  };

  let language = options.language;

  const editor = monaco.editor.create(container, {
    ...editorOptions,
    ...options,
    language,
  });
  setModel(editor, options.value, language);

  if (editorOptions.theme === 'vs-light') container.style.backgroundColor = '#fff';
  if (editorOptions.theme?.startsWith('http') || editorOptions.theme?.startsWith('./')) {
    fetch(editorOptions.theme)
      .then((res) => res.json())
      .then((data) => {
        monaco.editor.defineTheme('theme', data);
        monaco.editor.setTheme('theme');
        container.style.backgroundColor = data.colors['editor.background'];
      });
  }

  const getValue = () => editor.getValue();
  const setValue = (value = '') => {
    editor.getModel()?.setValue(value);
  };

  const types: Array<{ dispose: () => void }> = [];
  const clearTypes = () => {
    types.forEach((type) => {
      type.dispose();
    });
    types.length = 0;
  };

  const getLanguage = () => language;
  const setLanguage = (lang: Language, value?: string) => {
    language = lang;
    clearTypes();
    setModel(editor, value ?? editor.getValue(), language);
  };

  const addTypes = (lib: EditorLibrary) => {
    types.push(
      monaco.languages.typescript.typescriptDefaults.addExtraLib(lib.content, lib.filename),
    );
    types.push(
      monaco.languages.typescript.javascriptDefaults.addExtraLib(lib.content, lib.filename),
    );
  };

  const focus = () => editor.focus();
  const layout = () => editor.layout();

  const onContentChanged = (fn: () => void) => {
    listeners.push(fn);
    editor.getModel()?.onDidChangeContent(fn);
  };

  const keyCodes = {
    // eslint-disable-next-line
    CtrlEnter: monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    Enter: monaco.KeyCode.Enter,
    UpArrow: monaco.KeyCode.UpArrow,
    DownArrow: monaco.KeyCode.DownArrow,
  };

  const addKeyBinding = (label: string, keybinding: any, callback: () => void) => {
    editor.addAction({
      id: label,
      label,
      keybindings: [keybinding],
      precondition: '!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible',
      run: callback,
    });
  };

  const registerFormatter = (formatFn: FormatFn | undefined) => {
    const editorModel = editor.getModel();
    if (!formatFn || !editorModel) return;

    monaco.languages.registerDocumentFormattingEditProvider(monacoMapLanguage(language), {
      provideDocumentFormattingEdits: async () => {
        const val = editor.getValue();
        const prettyVal = await formatFn(val, 0);
        return [
          {
            range: editorModel.getFullModelRange(),
            text: prettyVal.formatted,
          },
        ];
      },
    });
  };

  const format = () => editor.getAction('editor.action.formatDocument').run();

  const disposeEmmet: { html?: any; css?: any } = {};
  const configureEmmet = (enabled: boolean) => {
    if (enabled) {
      disposeEmmet.html = emmetHTML();
      disposeEmmet.css = emmetCSS();
    } else {
      if (disposeEmmet.html) disposeEmmet.html();
      if (disposeEmmet.css) disposeEmmet.css();
    }
  };

  const destroy = () => editor.getModel()?.dispose();

  // workaround for uncaught canceled promise rejection onMouseLeave
  // https://github.com/microsoft/monaco-editor/issues/2382
  window.addEventListener('unhandledrejection', function (event) {
    if (event.reason && event.reason.name === 'Canceled') {
      event.preventDefault();
    }
  });

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    focus,
    layout,
    addTypes,
    configureEmmet,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    registerFormatter,
    format,
    isReadonly: readonly,
    monaco: editor,
    destroy,
  };
};
