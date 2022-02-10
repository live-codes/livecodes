// eslint-disable-next-line import/no-unresolved
import type * as Monaco from 'monaco-editor'; // only for typescript types

import { EditorLibrary, FormatFn, Language, CodeEditor, EditorOptions, Theme } from '../../models';
import { getLanguageExtension, mapLanguage } from '../../languages';
import { getRandomString, getWorkerDataURL, loadScript } from '../../utils';
import { emmetMonacoUrl, vendorsBaseUrl } from '../../vendors';
import { getImports } from '../../compiler';
import { modulesService } from '../../services';
import { clio, astro } from './languages';

let loaded = false;
const disposeEmmet: { html?: any; css?: any; jsx?: any; disabled?: boolean } = {};

const monacoMapLanguage = (language: Language): Language =>
  language === 'livescript'
    ? 'coffeescript'
    : ['rescript', 'reason', 'ocaml', 'wat'].includes(language)
    ? 'csharp'
    : mapLanguage(language);

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, baseUrl, readonly, theme, isEmbed, ...baseOptions } = options;
  if (!container) throw new Error('editor container not found');

  const monacoBaseUrl = vendorsBaseUrl + 'monaco-editor';
  let monaco: typeof Monaco;
  try {
    (window as any).monaco =
      (window as any).monaco || (await import(`${monacoBaseUrl}/monaco-editor.js`)).monaco;
    monaco = (window as any).monaco;
  } catch {
    throw new Error('Failed to load monaco editor');
  }

  type Options = Monaco.editor.IStandaloneEditorConstructionOptions;

  const defaultOptions: Options = {
    fontSize: isEmbed ? 12 : 14,
    theme: 'vs-' + theme,
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
    // lineNumbers: 'off',
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

  if (!document.head.querySelector('#__livecodes__monaco-styles')) {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', `${monacoBaseUrl}/monaco-editor.css`);
    stylesheet.id = '__livecodes__monaco-styles';
    document.head.appendChild(stylesheet);
  }

  (window as any).MonacoEnvironment = {
    getWorkerUrl(_moduleId: string, label: string) {
      const workers: Record<string, string> = {
        json: 'json',
        css: 'css',
        scss: 'css',
        sass: 'css',
        less: 'css',
        html: 'html',
        handlebars: 'html',
        javascript: 'ts',
        typescript: 'ts',
      };
      return getWorkerDataURL(`${monacoBaseUrl}/${workers[label] || 'editor'}.worker.js`);
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
    setTimeout(() => oldModel?.dispose(), 1000); // avoid race https://github.com/microsoft/monaco-editor/issues/1715
    upateListeners();
    configureEditor();
  };

  let language = options.language;

  const editor = monaco.editor.create(container, {
    ...editorOptions,
    ...baseOptions,
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

  const configureEmmet = (enabled: boolean) => {
    if (!enabled && !(window as any).emmetMonaco) return;

    loadScript(emmetMonacoUrl, 'emmetMonaco').then((emmetMonaco: any) => {
      if (enabled) {
        if (!disposeEmmet.html || disposeEmmet.disabled) {
          disposeEmmet.html = emmetMonaco.emmetHTML();
          disposeEmmet.css = emmetMonaco.emmetCSS();
          disposeEmmet.jsx = emmetMonaco.emmetJSX();
          disposeEmmet.disabled = false;
        }
      } else {
        disposeEmmet.html?.();
        disposeEmmet.css?.();
        disposeEmmet.jsx?.();
        disposeEmmet.disabled = true;
      }
    });
  };

  const setTheme = (theme: Theme) => {
    monaco.editor.setTheme('vs-' + theme);
  };

  const undo = () => {
    (editor.getModel() as any)?.undo?.();
  };

  const redo = () => {
    (editor.getModel() as any)?.redo?.();
  };

  const destroy = () => {
    configureEmmet(false);
    listeners.length = 0;
    editor.getModel()?.dispose();
  };

  // workaround for uncaught canceled promise rejection onMouseLeave
  // https://github.com/microsoft/monaco-editor/issues/2382
  window.addEventListener('unhandledrejection', function (event) {
    if (event.reason && event.reason.name === 'Canceled') {
      event.preventDefault();
    }
  });

  const registerShowPackageInfo = () => {
    // from https://github.com/snowpackjs/astro-repl/blob/main/src/editor/modules/monaco.ts

    const FetchCache = new Map();

    const npmPackageHoverProvider: Monaco.languages.HoverProvider = {
      provideHover(model, position) {
        const content = model.getLineContent(position.lineNumber);
        let pkg = getImports(content)[0];
        if (!pkg) return;

        if (
          pkg.startsWith('https://') ||
          pkg.startsWith('http://') ||
          pkg.startsWith('.') ||
          pkg.startsWith('data:') ||
          pkg.startsWith('blob:')
        ) {
          return;
        } else if (/^(skypack|unpkg|jsdelivr|esm|esm\.run|esm\.sh|bundle\.run)\:/.test(pkg)) {
          pkg = pkg.replace(/^(skypack|unpkg|jsdelivr|esm|esm\.run|esm\.sh|bundle\.run)\:/, '');
        }
        // remove version
        pkg = pkg.replace(/(^@?([^@])+)(.*)/g, `$1`);

        // remove sub-directories
        const parts = pkg.split('/');
        const end = parts[0].startsWith('@') ? 2 : 1;
        pkg = parts.slice(0, end).join('/');

        return (async () => {
          const url = modulesService.getModuleInfoUrl(pkg);
          let response: Response;
          let result: any;

          try {
            if (!FetchCache.has(url)) {
              response = await fetch(url);
              result = await response.json();
              FetchCache.set(url, result);
            } else {
              result = FetchCache.get(url);
            }
          } catch {
            return;
          }

          if (result?.results.length <= 0) return;

          const { name, description, version, date, publisher, links } =
            result?.results?.[0]?.package ?? {};
          const author = publisher?.username;
          const pubDate = new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return {
            contents: [
              {
                value: `## [${name}](${
                  links?.npm
                }) v${version}\n${description}\n\n\nPublished on ${pubDate} ${
                  author ? `by [@${author}](https://www.npmjs.com/~${author})` : ''
                }\n\n${
                  links?.repository ? `[GitHub](${links?.repository})  |` : ''
                }  [Skypack](https://skypack.dev/view/${name})  |  [jsDelivr](https://www.jsdelivr.com/package/npm/${name})  |  [Unpkg](https://unpkg.com/browse/${name}/)  | [Openbase](https://openbase.com/js/${name})`,
              },
            ],
          };
        })();
      },
    };
    monaco.languages.registerHoverProvider('javascript', npmPackageHoverProvider);
    monaco.languages.registerHoverProvider('typescript', npmPackageHoverProvider);
    monaco.languages.registerHoverProvider('html', npmPackageHoverProvider);
  };

  if (!loaded) {
    registerShowPackageInfo();

    monaco.languages.register({ id: 'clio' });
    monaco.languages.setMonarchTokensProvider('clio', clio as any);

    monaco.languages.register({ id: 'astro', extensions: ['astro'] });
    monaco.languages.setLanguageConfiguration('astro', astro.config as any);
    monaco.languages.setMonarchTokensProvider('astro', astro.tokens as any);
  }

  loaded = true;
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
    setTheme,
    undo,
    redo,
    destroy,
    monaco: editor,
  };
};
