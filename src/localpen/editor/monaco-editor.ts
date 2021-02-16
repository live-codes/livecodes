import { EditorLibrary, Language } from '../models';
import { CodeEditor } from './models';

const editorOptions = {
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
};

export const createMonacoEditor = async (options: any) => {
  const { container, baseUrl } = options;

  const monacoPath = baseUrl + 'vendor/monaco-editor';
  const monaco = (await import(`${monacoPath}/monaco.js`)).monaco;

  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('href', `${monacoPath}/monaco.css`);
  document.head.appendChild(stylesheet);

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

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    reactNamespace: 'React',
    allowNonTsExtensions: true,
    allowJs: false,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    experimentalDecorators: true,
  });

  const editor = monaco.editor.create(container, {
    ...editorOptions,
    ...options,
    language: options.language === 'jsx' ? 'javascript' : options.language,
  });

  if (options.theme === 'vs-light') container.style.backgroundColor = '#fff';
  if (options.theme?.startsWith('http') || options.theme?.startsWith('./')) {
    fetch(options.theme)
      .then((res) => res.json())
      .then((data) => {
        monaco.editor.defineTheme('theme', data);
        monaco.editor.setTheme('theme');
        container.style.backgroundColor = data.colors['editor.background'];
      });
  }

  const getValue = () => editor.getValue();
  const setValue = (value?: string) => editor.getModel().setValue(value || '');

  const setLanguage = (language: Language) => {
    monaco.editor.setModelLanguage(editor.getModel(), language);
  };

  const focus = () => editor.focus();
  const layout = () => editor.layout();

  const addTypes = (lib: EditorLibrary) =>
    monaco.languages.typescript.typescriptDefaults.addExtraLib(lib.content, lib.filename);

  const onContentChanged = (callback: () => void) => {
    editor.getModel().onDidChangeContent(callback);
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

  return {
    getValue,
    setValue,
    setLanguage,
    focus,
    layout,
    addTypes,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    monaco: editor,
  } as CodeEditor;
};
