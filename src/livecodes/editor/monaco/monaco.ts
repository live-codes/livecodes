// eslint-disable-next-line import/no-unresolved
import * as Monaco from 'monaco-editor'; // only for typescript types

import type {
  EditorLibrary,
  FormatFn,
  Language,
  CodeEditor,
  EditorOptions,
  Theme,
  EditorPosition,
  EditorConfig,
} from '../../models';
import { getRandomString, loadScript } from '../../utils';
import { emmetMonacoUrl } from '../../vendors';
import { getImports } from '../../compiler';
import { modulesService } from '../../services';

type Options = Monaco.editor.IStandaloneEditorConstructionOptions;

let loaded = false;
const disposeEmmet: { html?: any; css?: any; jsx?: any; disabled?: boolean } = {};
export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, baseUrl, readonly, theme, isEmbed, getLanguageExtension, mapLanguage } =
    options;
  if (!container) throw new Error('editor container not found');

  const convertOptions = (opt: EditorConfig): Options => ({
    fontFamily: opt.fontFamily,
    fontSize: opt.fontSize || (isEmbed ? 12 : 14),
    insertSpaces: !opt.useTabs,
    tabSize: opt.tabSize,
    lineNumbers: opt.lineNumbers ? 'on' : 'off',
    wordWrap: opt.wordWrap ? 'on' : 'off',
    autoClosingBrackets: opt.closeBrackets ? 'always' : 'never',
    autoClosingQuotes: opt.closeBrackets ? 'always' : 'never',
    autoClosingDelete: opt.closeBrackets ? 'always' : 'never',
  });

  const baseOptions = convertOptions(options);

  const monacoMapLanguage = (language: Language): Language =>
    language === 'livescript'
      ? 'coffeescript'
      : ['rescript', 'reason', 'ocaml'].includes(language)
      ? 'csharp'
      : mapLanguage(language);

  const monacoPath = baseUrl + 'vendor/monaco-editor/' + process.env.monacoVersion;
  let monaco: typeof Monaco;
  try {
    (window as any).monaco =
      (window as any).monaco || (await import(`${monacoPath}/monaco-editor.js`)).monaco;
    monaco = (window as any).monaco;
  } catch {
    throw new Error('Failed to load monaco editor');
  }

  const defaultOptions: Options = {
    theme: 'vs-' + theme,
    formatOnType: false,
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    scrollbar: { useShadows: false },
    mouseWheelZoom: true,
    automaticLayout: true,
    readOnly: readonly,
  };

  const codeblockOptions: Options = {
    ...defaultOptions,
    scrollBeyondLastLine: false,
    contextmenu: false,
  };

  const compiledCodeOptions: Options = {
    ...defaultOptions,
    scrollBeyondLastLine: false,
  };

  const consoleOptions: Options = {
    ...defaultOptions,
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

  const embedOptions: Options = {
    ...consoleOptions,
  };

  const editorId = options.editorId;
  const editorOptions =
    editorId === 'console'
      ? consoleOptions
      : editorId === 'compiled'
      ? compiledCodeOptions
      : editorId === 'embed'
      ? embedOptions
      : options.mode === 'codeblock'
      ? codeblockOptions
      : defaultOptions;

  if (!document.head.querySelector('#__livecodes__monaco-styles')) {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', `${monacoPath}/monaco-editor.css`);
    stylesheet.id = '__livecodes__monaco-styles';
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
      lib: ['esnext', 'dom'],
      module: monaco.languages.typescript.ModuleKind.ESNext,
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

  let modelUri = '';
  const setModel = (
    editor: Monaco.editor.IStandaloneCodeEditor,
    value: string,
    language: Language,
  ) => {
    const random = getRandomString();
    const ext = getLanguageExtension(language);
    modelUri = `file:///${editorId}.${random}.${ext}`;
    const oldModel = editor.getModel();
    const model = monaco.editor.createModel(
      value || '',
      monacoMapLanguage(language),
      monaco.Uri.parse(modelUri),
    );
    editor.setModel(model);
    setTimeout(() => oldModel?.dispose(), 1000); // avoid race https://github.com/microsoft/monaco-editor/issues/1715
    upateListeners();
    configureEditor();
  };

  let language = options.language;

  const editor = monaco.editor.create(container, {
    ...baseOptions,
    ...editorOptions,
    language: monacoMapLanguage(language),
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

  const customLanguages: Partial<Record<Language, string>> = {
    astro: baseUrl + '{{hash:monaco-astro.js}}',
    clio: baseUrl + '{{hash:monaco-clio.js}}',
    imba: baseUrl + '{{hash:monaco-imba.js}}',
    // sql: baseUrl + '{{hash:monaco-sql.js}}', // TODO: add autocomplete
    wat: baseUrl + '{{hash:monaco-wat.js}}',
  };

  interface CustomLanguageDefinition {
    config?: Monaco.languages.LanguageConfiguration;
    tokens?: Monaco.languages.IMonarchLanguage;
  }
  const loadMonacoLanguage = async (lang: Language) => {
    const langUrl = customLanguages[lang];
    if (langUrl && !monaco.languages.getLanguages().find((l) => l.id === lang)) {
      const mod: CustomLanguageDefinition = (await import(langUrl)).default;
      monaco.languages.register({ id: lang });
      if (mod.config) {
        monaco.languages.setLanguageConfiguration(lang, mod.config);
      }
      if (mod.tokens) {
        monaco.languages.setMonarchTokensProvider(lang, mod.tokens);
      }
    }
  };

  const getEditorId = () => editorId;
  const getValue = () => editor.getValue();
  const setValue = (value = '') => {
    editor.getModel()?.setValue(value);
  };

  const types: Array<{
    filename: string;
    libJs: { dispose: () => void };
    libTs: { dispose: () => void };
  }> = [];

  const isEditorType = (type: { filename: string }) =>
    !type.filename.startsWith('file:///node_modules/');

  const clearTypes = (allTypes = true) => {
    types
      .filter((type) => (allTypes ? true : isEditorType(type)))
      .forEach((type) => {
        type.libJs.dispose();
        type.libTs.dispose();
      });
    types.length = 0;
  };

  const getLanguage = () => language;
  const setLanguage = (lang: Language, value?: string) => {
    language = lang;
    clearTypes(false);
    setModel(editor, value ?? editor.getValue(), language);
    loadMonacoLanguage(lang);
  };

  const addTypes = (type: EditorLibrary) => {
    const loadedType = types.find((t) => t.filename === type.filename);
    if (loadedType) {
      if (isEditorType(type)) {
        loadedType.libJs.dispose();
        loadedType.libJs = monaco.languages.typescript.javascriptDefaults.addExtraLib(
          type.content,
          type.filename,
        );
      }
      return;
    }
    types.push({
      filename: type.filename,
      libJs: monaco.languages.typescript.javascriptDefaults.addExtraLib(
        type.content,
        type.filename,
      ),
      libTs: isEditorType(type)
        ? {
            // avoid duplicate declarations for typescript
            dispose: () => {
              // do nothing
            },
          }
        : monaco.languages.typescript.typescriptDefaults.addExtraLib(type.content, type.filename),
    });
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
    // eslint-disable-next-line
    ShiftEnter: monaco.KeyMod.Shift | monaco.KeyCode.Enter,
    Enter: monaco.KeyCode.Enter,
    UpArrow: monaco.KeyCode.UpArrow,
    DownArrow: monaco.KeyCode.DownArrow,
    // eslint-disable-next-line
    ShiftAltF: monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
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
          disposeEmmet.html = emmetMonaco.emmetHTML(monaco, [
            'html',
            'php',
            'astro',
            'markdown',
            'mdx',
          ]);
          disposeEmmet.css = emmetMonaco.emmetCSS(monaco, ['css', 'scss', 'less']);
          disposeEmmet.jsx = emmetMonaco.emmetJSX(monaco, [
            'javascript',
            'typescript',
            'jsx',
            'tsx',
          ]);
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

  const changeSettings = (settings: EditorConfig) => {
    const newOptions = {
      ...convertOptions(settings),
      ...editorOptions,
    };
    configureEmmet(settings.emmet);
    editor.updateOptions(newOptions);
  };

  const undo = () => {
    (editor.getModel() as any)?.undo?.();
  };

  const redo = () => {
    (editor.getModel() as any)?.redo?.();
  };

  const getPosition = (): EditorPosition => {
    const position = editor.getPosition();
    return {
      lineNumber: position?.lineNumber ?? 0,
      column: position?.column ?? 0,
    };
  };

  const setPosition = (position: EditorPosition) => {
    const newPosition = {
      lineNumber: position.lineNumber,
      column: position.column ?? 0,
    };
    editor.setPosition(newPosition);
    setTimeout(() => editor.revealPositionInCenter(newPosition, 0), 50);
  };

  const destroy = () => {
    configureEmmet(false);
    listeners.length = 0;
    clearTypes(true);
    // editor.getModel()?.dispose();
    container.innerHTML = '';
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

          // const { name, description, version, date, publisher, links } =
          //   result?.results?.[0]?.package ?? {};
          // const author = publisher?.username;
          // const pubDate = new Date(date).toLocaleDateString(undefined, {
          //   year: 'numeric',
          //   month: 'long',
          //   day: 'numeric',
          // });

          // return {
          //   contents: [
          //     {
          //       value: `## [${name}](${
          //         links?.npm
          //       }) v${version}\n${description}\n\n\nPublished on ${pubDate} ${
          //         author ? `by [@${author}](https://www.npmjs.com/~${author})` : ''
          //       }\n\n${
          //         links?.repository ? `[GitHub](${links?.repository})  |` : ''
          //       }  [Skypack](https://skypack.dev/view/${name})  |  [jsDelivr](https://www.jsdelivr.com/package/npm/${name})  |  [Unpkg](https://unpkg.com/browse/${name}/)  | [Openbase](https://openbase.com/js/${name})\n\nDocs: [Importing modules](${baseUrl.replace(
          //         '/livecodes/',
          //         '',
          //       )}/docs/features/npm-modules)`,
          //     },
          //   ],
          // };
          const { name, description, links } = result?.results?.[0]?.package ?? {};

          return {
            contents: [
              {
                value: `## [${name}](${links?.npm})\n${description}\n\n\n${
                  links?.repository ? `[GitHub](${links?.repository})  |` : ''
                }  [Skypack](https://skypack.dev/view/${name})  |  [jsDelivr](https://www.jsdelivr.com/package/npm/${name})  |  [Unpkg](https://unpkg.com/browse/${name}/)  | [Openbase](https://openbase.com/js/${name})\n\nDocs: [Importing modules](${baseUrl.replace(
                  '/livecodes/',
                  '',
                )}/docs/features/npm-modules)`,
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
  }

  loaded = true;
  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    getEditorId,
    focus,
    getPosition,
    setPosition,
    layout,
    addTypes,
    changeSettings,
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
