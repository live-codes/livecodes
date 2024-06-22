/* eslint-disable import/no-internal-modules */
// eslint-disable-next-line import/no-unresolved
import type * as Monaco from 'monaco-editor';

import type {
  EditorLibrary,
  FormatFn,
  Language,
  CodeEditor,
  EditorOptions,
  Theme,
  EditorPosition,
  EditorConfig,
  PkgInfo,
  APIError,
  MonacoTheme,
  Config,
} from '../../models';
import { cloneObject, getRandomString, loadScript } from '../../utils/utils';
import {
  codeiumProviderUrl,
  emmetMonacoUrl,
  monacoBaseUrl,
  monacoEmacsUrl,
  monacoVimUrl,
} from '../../vendors';
import { getImports } from '../../compiler/import-map';
import { getEditorModeNode } from '../../UI/selectors';
import { pkgInfoService } from '../../services/pkgInfo';
import { getEditorTheme } from '../themes';
import { customThemes, monacoThemes } from './monaco-themes';
import { registerTwoSlash } from './register-twoslash';

type Options = Monaco.editor.IStandaloneEditorConstructionOptions;
declare const globalThis: {
  monaco: typeof Monaco;
  ts: typeof import('typescript');
  require: any;
};

let monacoGloballyLoaded = false;
const disposeEmmet: { html?: any; css?: any; jsx?: any; disabled?: boolean } = {};
let monaco: typeof Monaco;
const loadedThemes = new Set<string>();
let codeiumProvider: { dispose: () => void } | undefined;
// track editors for providing context for AI
let editors: Monaco.editor.IStandaloneCodeEditor[] = [];

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const {
    container,
    baseUrl,
    readonly,
    theme,
    editorTheme,
    isEmbed,
    getLanguageExtension,
    mapLanguage,
    getFormatterConfig,
    getFontFamily,
  } = options;
  if (!container) throw new Error('editor container not found');

  const loadMonaco = () =>
    new Promise<typeof Monaco>((resolve) => {
      const script = document.createElement('script');
      script.src = monacoBaseUrl + '/loader.js';
      script.addEventListener('load', () => {
        const re = globalThis.require;
        re.config({
          paths: { vs: monacoBaseUrl },
        });
        re(['vs/editor/editor.main'], function (monaco: typeof Monaco) {
          resolve(monaco);
        });
      });
      document.body.appendChild(script);
    });

  let editorMode: any | undefined;

  const convertOptions = (opt: EditorConfig): Options => ({
    fontFamily: getFontFamily(opt.fontFamily),
    fontSize: opt.fontSize || (isEmbed ? 12 : 14),
    insertSpaces: !opt.useTabs,
    detectIndentation: false,
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

  try {
    (window as any).monaco = (window as any).monaco || (await loadMonaco());
    monaco = (window as any).monaco;
  } catch {
    throw new Error('Failed to load monaco editor');
  }

  customThemes.forEach((t) => monaco.editor.defineTheme(t.name, t.theme));

  const loadTheme = async (theme: Theme, editorTheme: Config['editorTheme']) => {
    const selectedTheme = getEditorTheme({
      editor: 'monaco',
      editorTheme,
      theme,
      editorThemes: monacoThemes.map((t) => t.name),
    });
    const newTheme = (
      selectedTheme === 'vs'
        ? 'custom-vs-light'
        : selectedTheme === 'vs-dark'
          ? 'custom-vs-dark'
          : !selectedTheme
            ? 'custom-vs-' + theme
            : selectedTheme
    ) as MonacoTheme;

    if (loadedThemes.has(newTheme)) return newTheme;
    const themeData = monacoThemes.find((t) => t.name === newTheme);
    if (themeData?.url) {
      await fetch(themeData.url)
        .then((data) => data.json())
        .then((data) => {
          monaco.editor.defineTheme(newTheme, data);
          loadedThemes.add(newTheme);
        });
    }
    return newTheme;
  };

  const setTheme = (theme: Theme, editorTheme: Config['editorTheme']) => {
    loadTheme(theme, editorTheme).then((newTheme) => {
      monaco.editor.setTheme(newTheme);
    });
  };

  // https://github.com/microsoft/TypeScript-Website/blob/eaa8205658445d4df6c0ca04e42fab1019f71df0/packages/sandbox/src/index.ts#L59-L62
  // Basically android and monaco is pretty bad, this makes it less bad
  // See https://github.com/microsoft/pxt/pull/7099 for this, and the long
  // read is in https://github.com/microsoft/monaco-editor/issues/563
  const isAndroid = navigator && /android/i.test(navigator.userAgent);

  const defaultOptions: Options = {
    theme: await loadTheme(theme, editorTheme),
    fontLigatures: true,
    formatOnType: false,
    lineNumbersMinChars: 3,
    minimap: { enabled: false },
    scrollbar: { useShadows: false },
    mouseWheelZoom: true,
    automaticLayout: true,
    readOnly: readonly,
    fixedOverflowWidgets: true,
    lightbulb: {
      enabled: 'on' as Monaco.editor.ShowLightbulbIconMode.On,
    },
    quickSuggestions: {
      other: !isAndroid,
      comments: !isAndroid,
      strings: !isAndroid,
    },
    acceptSuggestionOnCommitCharacter: !isAndroid,
    acceptSuggestionOnEnter: !isAndroid ? 'on' : 'off',
    accessibilitySupport: !isAndroid ? 'on' : 'off',
    inlayHints: {
      enabled: 'on',
    },
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
  const initOptions =
    editorId === 'console'
      ? consoleOptions
      : editorId === 'compiled'
        ? compiledCodeOptions
        : editorId === 'embed'
          ? embedOptions
          : options.mode === 'codeblock'
            ? codeblockOptions
            : defaultOptions;
  let editorOptions: Options = cloneObject({ ...baseOptions, ...initOptions });

  type CompilerOptions = Monaco.languages.typescript.CompilerOptions;

  const getCompilerOptions = ({
    isJSLang,
    isJsx,
    nonReactJsx,
    monaco,
  }: {
    isJSLang: boolean;
    isJsx: boolean;
    nonReactJsx: boolean;
    monaco: typeof Monaco;
  }): CompilerOptions => {
    const settings: CompilerOptions = {
      allowJs: isJSLang,
      checkJs: !isJSLang,
      strictNullChecks: !isJSLang,
      allowNonTsExtensions: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      allowSyntheticDefaultImports: true,
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      lib: ['esnext', 'dom'],
    };

    const jsxSettings: CompilerOptions = {
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      jsxFactory: 'React.createElement',
      reactNamespace: 'React',
      jsxFragmentFactory: 'React.Fragment',
    };

    const nonReactJsxSettings: CompilerOptions = {
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      jsxFactory: 'h',
      reactNamespace: 'h',
      jsxFragmentFactory: 'Fragment',
    };

    return {
      ...settings,
      ...(isJsx ? jsxSettings : {}),
      ...(nonReactJsx ? nonReactJsxSettings : {}),
    };
  };

  const configureTypeScriptFeatures = () => {
    const JSLangs = ['javascript', 'jsx', 'flow', 'solid', 'react-native'];
    const hasJsx = [
      'jsx',
      'tsx',
      'sucrase',
      'babel',
      'flow',
      'solid',
      'solid.tsx',
      'react-native',
      'react-native-tsx',
    ];
    const isJSLang = JSLangs.includes(language);
    const isJsx = hasJsx.includes(language);
    const nonReactJsx = ['solid', 'solid.tsx', 'stencil'].includes(language);

    if (
      !['script', 'tests', 'editorSettings'].includes(editorId) ||
      !['javascript', 'typescript'].includes(monacoMapLanguage(language))
    ) {
      return;
    }

    const compilerOptions = getCompilerOptions({ isJSLang, isJsx, nonReactJsx, monaco });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);

    const disgnosticsOptions: Monaco.languages.typescript.DiagnosticsOptions = {
      // just silence errors for "flow" for now
      // TODO: fix this
      // https://github.com/facebook/flow/tree/main/website/src/try-flow
      noSemanticValidation: language === 'flow',
      // This is when tslib is not found
      diagnosticCodesToIgnore: [2354],
    };
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(disgnosticsOptions);
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(disgnosticsOptions);

    registerTwoSlash({ isJSLang, editor, monaco, compilerOptions });
  };

  type Listener = () => void;
  const listeners: Listener[] = [];
  const updateListeners = () => {
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
    const extension =
      monacoMapLanguage(language) === 'typescript' && !ext?.endsWith('ts') && !ext?.endsWith('tsx')
        ? ext + '.tsx'
        : ext;
    modelUri = `file:///${editorId}.${random}.${extension}`;
    const oldModel = editor.getModel();
    const model = monaco.editor.createModel(
      value || '',
      monacoMapLanguage(language),
      monaco.Uri.parse(modelUri),
    );
    editor.setModel(model);
    setTimeout(() => oldModel?.dispose(), 1000); // avoid race https://github.com/microsoft/monaco-editor/issues/1715
    updateListeners();
    configureTypeScriptFeatures();
  };

  let language = options.language;

  const editor = monaco.editor.create(container, {
    ...editorOptions,
    language: monacoMapLanguage(language),
  });
  setModel(editor, options.value, language);

  const contentEditors: Array<EditorOptions['editorId']> = ['markup', 'style', 'script', 'tests'];
  if (contentEditors.includes(editorId)) {
    editors.push(editor);
  }

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
    astro: baseUrl + '{{hash:monaco-lang-astro.js}}',
    clio: baseUrl + '{{hash:monaco-lang-clio.js}}',
    imba: baseUrl + '{{hash:monaco-lang-imba.js}}',
    // sql: baseUrl + '{{hash:monaco-lang-sql.js}}', // TODO: add autocomplete
    wat: baseUrl + '{{hash:monaco-lang-wat.js}}',
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

  let types: Array<{
    editorId: EditorOptions['editorId'];
    filename: string;
    libJs: { dispose: () => void };
    libTs: { dispose: () => void };
  }> = [];

  const isEditorType = (type: { filename: string }) => !type.filename.startsWith('/node_modules/');

  const addTypes = (type: EditorLibrary, force?: boolean) => {
    const code = type.content;
    const path = 'file://' + type.filename;
    const loadedType = types.find((t) => t.filename === type.filename);
    if (loadedType) {
      if (isEditorType(type)) {
        loadedType.libJs.dispose();
        loadedType.libJs = monaco.languages.typescript.javascriptDefaults.addExtraLib(code, path);
      }
      if (!force) return;
      loadedType.libJs?.dispose();
      loadedType.libTs?.dispose();
    }
    types.push({
      editorId,
      filename: type.filename,
      libJs: monaco.languages.typescript.javascriptDefaults.addExtraLib(code, path),
      libTs: isEditorType(type)
        ? {
            // avoid duplicate declarations for typescript
            dispose: () => {
              // do nothing
            },
          }
        : monaco.languages.typescript.typescriptDefaults.addExtraLib(code, path),
    });
  };

  let scriptModel: Monaco.editor.ITextModel | undefined;
  const createScriptModel = () => {
    if (editorId !== 'tests') return;
    let scriptLanguage = 'javascript';
    const scriptEditor = editors.find((editor) => {
      const editorLang = editor.getModel()?.getLanguageId();
      scriptLanguage = editorLang || 'javascript';
      return ['javascript', 'typescript'].includes(editorLang!);
    });
    if (!scriptEditor) return;
    const ext = scriptLanguage === 'typescript' ? 'tsx' : 'jsx';
    const createModel = () => {
      scriptModel = monaco.editor.createModel(
        scriptEditor.getValue(),
        scriptLanguage,
        monaco.Uri.parse('script.' + ext),
      );
    };
    if (scriptModel) {
      scriptModel.dispose();
      setTimeout(() => {
        createModel();
      }, 300);
    } else {
      createModel();
    }
  };
  createScriptModel();

  const clearTypes = (allTypes = true) => {
    scriptModel?.dispose();
    if (editorId === 'tests') return;
    types
      .filter((type) => type.editorId === editorId)
      .filter((type) => (allTypes ? true : isEditorType(type)))
      .forEach((type) => {
        type.libJs.dispose();
        type.libTs.dispose();
      });
    types = types
      .filter((type) => type.editorId !== editorId)
      .filter((type) => (allTypes ? false : !isEditorType(type)));
  };

  const getLanguage = () => language;
  const setLanguage = (lang: Language, value?: string) => {
    language = lang;
    clearTypes(false);
    setModel(editor, value ?? editor.getValue(), language);
    loadMonacoLanguage(lang);
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

  const configureEditorMode = async (mode: EditorConfig['editorMode']) => {
    const editorModeNode = getEditorModeNode();
    const statusNode = document.querySelector<HTMLElement>(
      `#editor-status [data-status="${options.editorId}"]`,
    );
    const setEditorModeText = (str: string) => {
      if (!editorModeNode) return;
      editorModeNode.textContent = str;
    };
    const setStatusText = (str: string) => {
      if (!statusNode) return;
      statusNode.textContent = str;
    };

    if (!mode) {
      editorMode?.dispose();
      editorMode = undefined;
      setStatusText('');
      setEditorModeText('');
      return;
    }

    if (mode === 'vim') {
      if (editorMode?.mode === 'vim') return;
      if (editorMode?.mode === 'emacs') {
        editorMode.dispose();
        setStatusText('');
      }
      const MonacoVim: any = await loadScript(monacoVimUrl, 'MonacoVim');
      const stNode = statusNode?.innerHTML !== '' ? undefined : statusNode; // avoid duplication
      editorMode = MonacoVim.initVimMode(editor, stNode);
      editorMode.mode = 'vim';
      setEditorModeText('Vim');
    }

    if (mode === 'emacs') {
      if (editorMode?.mode === 'emacs') return;
      if (editorMode?.mode === 'vim') {
        editorMode.dispose();
        setStatusText('');
      }
      const MonacoEmacs: any = await loadScript(monacoEmacsUrl, 'MonacoEmacs');
      editorMode = new MonacoEmacs.EmacsExtension(editor);
      setStatusText('');
      editorMode.onDidMarkChange(function (ev: Event) {
        setStatusText(ev ? 'Mark Set!' : 'Mark Unset');
      });
      editorMode.onDidChangeKey(function (str: string) {
        setStatusText(str);
      });
      editorMode.start();
      editorMode.mode = 'emacs';
      setEditorModeText('Emacs');
    }
  };
  configureEditorMode(options.editorMode);

  const registerFormatter = (formatFn: FormatFn | undefined) => {
    const editorModel = editor.getModel();
    if (!formatFn || !editorModel) return;

    monaco.languages.registerDocumentFormattingEditProvider(monacoMapLanguage(language), {
      provideDocumentFormattingEdits: async () => {
        const val = editor.getValue();
        const prettyVal = await formatFn(val, 0, getFormatterConfig());
        return [
          {
            range: editorModel.getFullModelRange(),
            text: prettyVal.formatted,
          },
        ];
      },
    });
  };

  const format = async () => editor.getAction('editor.action.formatDocument')?.run();

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

  const changeSettings = (settings: EditorConfig) => {
    editorOptions = {
      ...convertOptions(settings),
      ...initOptions,
    };
    configureEmmet(settings.emmet);
    configureEditorMode(settings.editorMode);
    editor.updateOptions(editorOptions);
    configureCodeium(settings.enableAI);
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
      lineNumber: position?.lineNumber ?? 1,
      column: position?.column ?? 1,
    };
  };

  const setPosition = (position: EditorPosition) => {
    const newPosition = {
      lineNumber: position.lineNumber,
      column: position.column ?? 1,
    };
    editor.setPosition(newPosition);
    setTimeout(() => editor.revealPositionInCenter(newPosition, 0), 50);
  };

  const configureCodeium = (enabled: boolean) => {
    if (!enabled) {
      codeiumProvider?.dispose();
      codeiumProvider = undefined;
      return;
    }

    // already loaded or loading
    if (codeiumProvider) {
      return;
    }

    // avoid race condition between different editors
    codeiumProvider = { dispose: () => 'loading...' };

    import(codeiumProviderUrl).then((codeiumModule) => {
      codeiumProvider = codeiumModule.registerCodeiumProvider(monaco, {
        getEditors: () => editors,
      });
    });
  };

  const destroy = () => {
    editors = editors.filter((e) => e !== editor);
    editorMode?.dispose();
    listeners.length = 0;
    clearTypes(true);
    editor.getModel()?.dispose();
    editor.dispose();
    container.innerHTML = '';
  };

  // workaround for uncaught canceled promise rejection onMouseLeave
  // https://github.com/microsoft/monaco-editor/issues/2382
  window.addEventListener('unhandledrejection', function (event) {
    if (event.reason && event.reason.name === 'Canceled') {
      event.preventDefault();
    }
  });

  const addCloseTag = (event: Monaco.IKeyboardEvent) => {
    // select enabled languages
    const addCloseLanguages = ['html', 'markdown', 'javascript', 'typescript']; // enable js & ts for jsx & tsx

    const model = editor.getModel();
    if (
      !model ||
      !addCloseLanguages.includes(monacoMapLanguage(language)) ||
      editorOptions.autoClosingBrackets === 'never'
    ) {
      return;
    }

    const isSelfClosing = (tag: string) =>
      [
        'area',
        'base',
        'br',
        'col',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
        'circle',
        'ellipse',
        'line',
        'path',
        'polygon',
        'polyline',
        'rect',
        'stop',
        'use',
      ].includes(tag);

    // when the user enters '>'
    if (event.browserEvent.key === '>') {
      const currentSelections = editor.getSelections() || [];

      const edits: Monaco.editor.IIdentifiedSingleEditOperation[] = [];
      const newSelections: Monaco.Selection[] = [];
      // potentially insert the ending tag at each of the selections
      for (const selection of currentSelections) {
        // shift the selection over by one to account for the new character
        newSelections.push(
          new monaco.Selection(
            selection.selectionStartLineNumber,
            selection.selectionStartColumn + 1,
            selection.endLineNumber,
            selection.endColumn + 1,
          ),
        );
        // grab the content before the cursor
        const contentBeforeChange = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: selection.endLineNumber,
          endColumn: selection.endColumn,
        });

        // if ends with a HTML tag we are currently closing
        const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/);
        if (!match) {
          continue;
        }

        const [fullMatch, tag] = match;

        // skip self-closing tags like <br> or <img>
        if (isSelfClosing(tag) || fullMatch.trim().endsWith('/')) {
          continue;
        }

        // add in the closing tag
        edits.push({
          range: {
            startLineNumber: selection.endLineNumber,
            startColumn: selection.endColumn + 1, // add 1 to offset for the inserting '>' character
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn + 1,
          },
          text: `</${tag}>`,
        });
      }

      // wait for next tick to avoid it being an invalid operation
      setTimeout(() => {
        editor.executeEdits(model.getValue(), edits, newSelections);
      }, 0);
    }
  };
  editor.onKeyDown(addCloseTag);

  const registerShowPackageInfo = () => {
    // from https://github.com/snowpackjs/astro-repl/blob/main/src/editor/modules/monaco.ts

    const pkgCache = new Map<string, PkgInfo>();

    const npmPackageHoverProvider: Monaco.languages.HoverProvider = {
      provideHover(model, position) {
        const content = model.getLineContent(position.lineNumber);
        let pkg = getImports(content, /* removeSpecifier= */ true)[0];
        if (!pkg) return;

        if (
          pkg.startsWith('https://') ||
          pkg.startsWith('http://') ||
          pkg.startsWith('.') ||
          pkg.startsWith('data:') ||
          pkg.startsWith('blob:')
        ) {
          return;
        }
        // remove version
        // pkg = pkg.replace(/(^@?([^@])+)(.*)/g, `$1`);

        // remove sub-directories
        const parts = pkg.split('/');
        const end = parts[0].startsWith('@') ? 2 : 1;
        pkg = parts.slice(0, end).join('/');

        return (async () => {
          let pkgInfo: PkgInfo | APIError | undefined;

          if (!pkgCache.has(pkg)) {
            pkgInfo = await pkgInfoService.getPkgInfo(pkg);
            if ('error' in pkgInfo) return;
            pkgCache.set(pkg, pkgInfo);
          } else {
            pkgInfo = pkgCache.get(pkg);
          }
          if (!pkgInfo || 'error' in pkgInfo) return;

          const { name, description = '', repo = '' } = pkgInfo;

          return {
            contents: [
              {
                value: `## [${name}](https://www.npmjs.com/package/${name})\n${description}\n\n\n${
                  repo ? `[GitHub](${repo}) |` : ''
                } [Skypack](https://skypack.dev/view/${name}) | [jsDelivr](https://www.jsdelivr.com/package/npm/${name}) | [Unpkg](https://unpkg.com/browse/${name}/) | [Snyk](https://snyk.io/advisor/npm-package/${name}) | [Bundlephobia](https://bundlephobia.com/package/${name})\n\nDocs: [Importing modules](${
                  new URL(process.env.DOCS_BASE_URL as string, location.href).href
                }features/module-resolution)`,
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

  if (!monacoGloballyLoaded) {
    registerShowPackageInfo();
  }

  monacoGloballyLoaded = true;
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
