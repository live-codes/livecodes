/* eslint-disable import/no-unresolved */

// these imports are marked as external and are mapped to ./codemirror-core
// (see html/app.html and scripts/build.js)
// to allow lazy loaded modules to import the same modules
// @ts-ignore
import { autocompletion } from '@codemirror/autocomplete';
// @ts-ignore
import { basicSetup, closeBrackets, lineNumbers } from 'codemirror';
// @ts-ignore
import { Compartment, EditorState, type Extension } from '@codemirror/state';
// @ts-ignore
import { oneDark } from '@codemirror/theme-one-dark';
// @ts-ignore
import { EditorView, keymap, type KeyBinding, type ViewUpdate } from '@codemirror/view';
// @ts-ignore
import { redo, undo } from '@codemirror/commands';
// prettier-ignore
// @ts-ignore
import { HighlightStyle,defaultHighlightStyle,foldEffect,indentUnit,syntaxHighlighting,type LanguageSupport } from '@codemirror/language';
// @ts-ignore
import { tags } from '@lezer/highlight';
// @ts-ignore
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
// @ts-ignore
import { vscodeKeymap } from '@replit/codemirror-vscode-keymap';
// @ts-ignore
import { colorPicker } from '@replit/codemirror-css-color-picker';

// these are imported normally
import { getEditorModeNode } from '../../UI/selectors';
import type {
  CodeEditor,
  CodemirrorTheme,
  Config,
  EditorConfig,
  EditorLibrary,
  EditorOptions,
  EditorPosition,
  FormatFn,
  Language,
  Theme,
} from '../../models';
import { ctrl, debounce, getRandomString } from '../../utils/utils';
import { codeMirrorBaseUrl, comlinkBaseUrl } from '../../vendors';
import { getEditorTheme } from '../themes';
import { codemirrorThemes, customThemes } from './codemirror-themes';
import { editorLanguages } from './editor-languages';

// export type CodeiumEditor = Pick<CodeEditor, 'getLanguage' | 'getValue'> & {
//   editorId: EditorOptions['editorId'];
// };
// const editors: CodeiumEditor[] = [];
let tsWorker: any;
let tabFocusMode = false;
const changeTabFocusMode = debounce(() => (tabFocusMode = !tabFocusMode), 50);

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const {
    container,
    readonly,
    isEmbed,
    editorId,
    getFormatterConfig,
    getFontFamily,
    getLanguageExtension,
  } = options;
  let editorSettings: EditorConfig = { ...options };
  if (!container) throw new Error('editor container not found');

  const getLanguageSupport = async (language: Language): Promise<LanguageSupport> =>
    editorLanguages[language]?.() || (editorLanguages.html?.() as Promise<LanguageSupport>);

  const mapLanguage = (lang: Language) => {
    if (lang.startsWith('vue')) return 'vue';
    if (lang.startsWith('svelte')) return 'svelte';
    if (lang === 'liquid') return 'liquid';
    return options.mapLanguage?.(lang) || lang;
  };

  const themes: Partial<Record<CodemirrorTheme, Extension>> = {
    'one-dark': oneDark,
    'cm-light': [
      syntaxHighlighting(defaultHighlightStyle),
      EditorView.theme({
        '&': { backgroundColor: '#ffffff' },
      }),
    ],
    ...customThemes,
  };
  const defaultThemes: Record<Theme, CodemirrorTheme> = { dark: 'one-dark', light: 'cm-light' };
  const getActiveTheme = () => themes[theme] || themes[defaultThemes[options.theme]] || [];

  let language = options.language;
  let mappedLanguage = mapLanguage(language);
  let mappedLanguageSupport = await getLanguageSupport(mappedLanguage);
  let theme: CodemirrorTheme = await loadTheme(options.theme, options.editorTheme);
  const keyBindings: KeyBinding[] = [];

  type Listener = (update: ViewUpdate) => void;
  const listeners: Listener[] = [];
  const notifyListeners = (update: ViewUpdate) => {
    if (update.docChanged) {
      listeners.forEach((fn) => fn(update));
    }
  };

  let codemirrorTS: Extension[] | undefined;
  let vim: (() => Extension) | undefined;
  let emacs: (() => Extension) | undefined;
  let emmet: Extension | undefined;
  // let codeium:
  //   | ((editors: CodeiumEditor[], mapLanguage: (lang: Language) => Language) => Extension)
  //   | undefined;
  let lineNumbersRelative: () => Extension;

  const configureTSExtension = (extensionList: readonly Extension[]) => {
    if (mappedLanguage === 'typescript') {
      return extensionList;
    }
    if (mappedLanguage === 'javascript') {
      // do not use linter
      return extensionList.slice(0, -1);
    }
    return [];
  };

  // till Promise.withResolvers() has better support
  let tsResolve: () => void;
  const tsLoaded = new Promise<void>((resolve) => (tsResolve = resolve));

  const loadTS = async (reset = false) => {
    const feature = codemirrorTS && reset ? 'changeCodeMirrorLanguage' : 'initCodeMirrorTS';
    if (reset) {
      codemirrorTS = undefined;
    }
    if (!['typescript', 'javascript'].includes(mappedLanguage) || codemirrorTS) return;
    const codemirrorTsUrl = `${codeMirrorBaseUrl}codemirror-ts.js`;
    const [tsMod, Comlink, _] = await Promise.all([
      import(codemirrorTsUrl),
      import(comlinkBaseUrl + 'esm/comlink.min.js'),
      (window as any).compiler.typescriptFeatures({ feature, payload: language }),
    ]);
    const { tsFacetWorker, tsSyncWorker, tsLinterWorker, tsAutocompleteWorker, tsHoverWorker } =
      tsMod;

    if (!tsWorker) {
      const iframe = document.querySelector<HTMLIFrameElement>('#compiler-frame');
      if (!iframe?.contentWindow) return;
      const worker: any = Comlink.wrap(Comlink.windowEndpoint(iframe.contentWindow));
      await worker.initialize();
      tsWorker = worker;
    }

    const random = getRandomString();
    const ext = getLanguageExtension(language);
    const extension =
      mappedLanguage === 'typescript' && !ext?.endsWith('ts') && !ext?.endsWith('tsx')
        ? ext + '.tsx'
        : ext;
    const path = `/${editorId}.${random}.${extension}`;

    codemirrorTS = codemirrorTS || [
      tsFacetWorker.of({ worker: tsWorker, path }),
      tsSyncWorker(),
      autocompletion({ override: [tsAutocompleteWorker()] }),
      tsHoverWorker(),
      tsLinterWorker(),
    ];
    view.dispatch({ effects: [tsExtension.reconfigure(configureTSExtension(codemirrorTS))] });
  };

  const addTypes = (lib: EditorLibrary) => {
    tsLoaded.then(() => {
      (window as any).compiler.typescriptFeatures({ feature: 'addTypes', payload: lib });
    });
  };

  const loadExtensions = async (opt: EditorConfig) => {
    const modules = {
      vim: `${codeMirrorBaseUrl}codemirror-vim.js`,
      emacs: `${codeMirrorBaseUrl}codemirror-emacs.js`,
      emmet: `${codeMirrorBaseUrl}codemirror-emmet.js`,
      // codeium: `${codeMirrorBaseUrl}codemirror-codeium.js`,
      lineNumbersRelative: `${codeMirrorBaseUrl}codemirror-line-numbers-relative.js`,
    };
    const [vimMod, emacsMod, emmetMod, /* codeiumMod, */ lineNumbersRelativeMod] =
      await Promise.all([
        opt.editorMode === 'vim' ? import(modules.vim) : Promise.resolve({}),
        opt.editorMode === 'emacs' ? import(modules.emacs) : Promise.resolve({}),
        opt.emmet ? import(modules.emmet) : Promise.resolve({}),
        // opt.enableAI ? import(modules.codeium) : Promise.resolve({}),
        opt.lineNumbers === 'relative' ? import(modules.lineNumbersRelative) : Promise.resolve({}),
      ]);
    vim = vimMod.vim;
    emacs = emacsMod.emacs;
    emmet = emmetMod.emmet;
    // codeium = codeiumMod.codeium;
    lineNumbersRelative = lineNumbersRelativeMod.lineNumbersRelative;
  };
  await loadExtensions(options);

  const languageExtension = new Compartment();
  const tsExtension = new Compartment();
  const keyBindingsExtension = new Compartment();
  const themeExtension = new Compartment();
  const readOnlyExtension = EditorView.editable.of(false);
  const editorSettingsExtension = new Compartment();
  const lineNumbersExtension = new Compartment();
  const closeBracketsExtension = new Compartment();
  const italicComments = HighlightStyle.define([{ tag: tags.comment, fontStyle: 'italic' }]);

  const configureSettingsExtension = (settings: Partial<EditorConfig>) => {
    const fontSize = (settings.fontSize ?? editorSettings.fontSize) || (isEmbed ? 12 : 14);
    const fontFamily = getFontFamily(settings.fontFamily ?? editorSettings.fontFamily);
    const tabSize = settings.tabSize ?? editorSettings.tabSize;
    const useTabs = settings.useTabs ?? editorSettings.useTabs;
    const wordWrap = settings.wordWrap ?? editorSettings.wordWrap;
    const enableEmmet = settings.emmet ?? editorSettings.emmet;
    const enableLineNumbers = settings.lineNumbers ?? editorSettings.lineNumbers;
    // const enableAI = settings.enableAI ?? editorSettings.enableAI;
    const editorMode = settings.editorMode ?? editorSettings.editorMode;

    return [
      EditorState.tabSize.of(tabSize),
      indentUnit.of(useTabs ? '\t' : ' '.repeat(tabSize)),
      ...(wordWrap ? [EditorView.lineWrapping] : []),
      ...(editorMode === 'vim' && vim ? [vim()] : editorMode === 'emacs' && emacs ? [emacs()] : []),
      ...(enableEmmet && emmet ? [emmet] : []),
      ...(enableLineNumbers === 'relative' && lineNumbersRelative
        ? [lineNumbersRelative()]
        : enableLineNumbers && lineNumbers
          ? [lineNumbers()]
          : []),
      // ...(enableAI && codeium ? [codeium(editors, mapLanguage)] : []),
      EditorView.theme({
        '&': {
          height: '100%',
          fontSize: fontSize + 'px',
        },
        '.cm-scroller': {
          overflow: 'auto',
          fontFamily,
        },
      }),
    ];
  };

  const getExtensions = () => {
    const defaultOptions: Extension[] = [
      languageExtension.of(mappedLanguageSupport),
      tsExtension.of(
        ['typescript', 'javascript'].includes(mappedLanguage) && codemirrorTS
          ? configureTSExtension(codemirrorTS)
          : [],
      ),
      EditorView.updateListener.of(notifyListeners),
      themeExtension.of(getActiveTheme()),
      syntaxHighlighting(italicComments),
      editorSettingsExtension.of(configureSettingsExtension({})),
      keyBindingsExtension.of(keymap.of(keyBindings)),
      closeBracketsExtension.of(editorSettings.closeBrackets ? closeBrackets() : []),
      basicSetup,
      readonly ? readOnlyExtension : [],
      keymap.of(vscodeKeymap),
      indentationMarkers(),
      colorPicker,
    ];

    const codeblockOptions = [readOnlyExtension, ...defaultOptions];

    const compiledCodeOptions = [readOnlyExtension, ...defaultOptions];

    const consoleOptions = [...defaultOptions];

    return editorId === 'console'
      ? consoleOptions
      : editorId === 'compiled'
        ? compiledCodeOptions
        : options.mode === 'codeblock'
          ? codeblockOptions
          : defaultOptions;
  };

  const showEditorMode = async (mode: EditorConfig['editorMode']) => {
    const editorModeNode = getEditorModeNode();
    const setEditorModeText = (str: string) => {
      if (!editorModeNode) return;
      editorModeNode.textContent = str;
    };
    if (!mode) {
      setEditorModeText('');
    }
    if (mode === 'vim') {
      setEditorModeText('Vim');
    }
    if (mode === 'emacs') {
      setEditorModeText('Emacs');
    }
  };

  const view = new EditorView({
    state: EditorState.create({
      extensions: getExtensions(),
      doc: options.value,
    }),
    parent: container,
  });
  showEditorMode(options.editorMode);

  const getEditorId = () => editorId;
  const getValue = () => view.state.doc.toString();
  const setValue = (value = '', newState = true) => {
    if (newState) {
      view.setState(EditorState.create({ doc: value, extensions: getExtensions() }));
    } else {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      });
    }
  };
  const focus = () => view.focus();
  const getLanguage = () => language;
  const setLanguage = (lang: Language, value?: string) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    getLanguageSupport(mappedLanguage).then((langSupport) => {
      mappedLanguageSupport = langSupport;
      view.dispatch({
        effects: [languageExtension.reconfigure(mappedLanguageSupport)],
      });
    });
    tsLoaded.then(() => {
      loadTS(true);
    });
    if (value != null) {
      setValue(value);
    }
  };

  // const codeiumEditor: CodeiumEditor = { editorId, getLanguage, getValue };
  // editors.push(codeiumEditor);
  loadTS().then(() => {
    tsResolve();
  });

  const onContentChanged = (fn: Listener) => {
    listeners.push(fn);
  };

  const keyCodes = {
    CtrlEnter: 'Ctrl-Enter',
    ShiftEnter: 'Shift-Enter',
    Enter: 'Enter',
    UpArrow: 'ArrowUp',
    DownArrow: 'ArrowDown',
    ShiftAltF: 'Shift-Alt-f',
  };

  const addKeyBinding = (_label: string, keyCode: any, callback: () => void) => {
    keyBindings.push({
      key: keyCode,
      run() {
        callback();
        return true;
      },
    });
    view.dispatch({
      effects: keyBindingsExtension.reconfigure(keymap.of(keyBindings)),
    });
  };

  const toggleTabFocusMode = (event: KeyboardEvent) => {
    if (event.code === 'KeyM' && ctrl(event)) {
      event.preventDefault();
      changeTabFocusMode();
      // wait for debounce
      setTimeout(() => {
        view.setTabFocusMode?.(tabFocusMode);
      }, 70);
    }
  };
  view.setTabFocusMode(tabFocusMode);
  addEventListener('keydown', toggleTabFocusMode);

  let formatter: FormatFn | undefined;
  const registerFormatter = (formatFn: FormatFn | undefined) => {
    if (!formatFn) return;
    formatter = formatFn;
    addKeyBinding('format', keyCodes.ShiftAltF, async () => {
      await format();
      focus();
    });
  };

  const format = async () => {
    if (!formatter) return;
    const offset = view.state.selection.main.to;
    const oldValue = getValue();
    const newValue = await formatter(oldValue, offset, getFormatterConfig());
    setValue(newValue.formatted, false);
    const newOffset = newValue.cursorOffset >= 0 ? newValue.cursorOffset : 0;
    view.dispatch({ selection: { anchor: newOffset } });
  };

  async function loadTheme(appTheme: Theme, editorTheme: Config['editorTheme']) {
    const selectedTheme = getEditorTheme({
      editor: 'codemirror',
      editorTheme,
      theme: appTheme,
      editorThemes: codemirrorThemes.map((t) => t.name),
    });
    const newTheme = (selectedTheme ? selectedTheme : defaultThemes[appTheme]) as CodemirrorTheme;

    const themeData = codemirrorThemes.find((t) => t.name === newTheme);
    if (!themes[newTheme] && themeData?.url) {
      const themeExt = (await import(themeData.url))[themeData.exportName || 'default'];
      themes[newTheme] = themeExt;
    }
    return newTheme;
  }

  const setTheme = (appTheme: Theme, editorTheme: Config['editorTheme']) => {
    loadTheme(appTheme, editorTheme).then((newTheme) => {
      theme = newTheme;
      view.dispatch({
        effects: themeExtension.reconfigure(getActiveTheme()),
      });
    });
  };

  const changeSettings = (settings: EditorConfig) => {
    editorSettings = { ...settings };
    loadExtensions(editorSettings).then(() => {
      view.dispatch({
        effects: [
          editorSettingsExtension.reconfigure(configureSettingsExtension(editorSettings)),
          lineNumbersExtension.reconfigure(editorSettings.lineNumbers ? lineNumbers() : []),
          closeBracketsExtension.reconfigure(editorSettings.closeBrackets ? closeBrackets() : []),
        ],
      });
      setTheme(editorSettings.theme, editorSettings.editorTheme);
      showEditorMode(editorSettings.editorMode);
    });
  };

  const editorUndo = () => {
    undo({ state: view.state, dispatch: view.dispatch });
  };

  const editorRedo = () => {
    redo({ state: view.state, dispatch: view.dispatch });
  };
  addKeyBinding('redo', 'Mod-Shift-z', editorRedo);

  const getPosition = (): EditorPosition => {
    const position = view.state.selection.asSingle().ranges[0].from;
    const lineInfo = view.state.doc.lineAt(position);
    const lineNumber = lineInfo.number;
    const column = position - lineInfo.from + 1;
    return { lineNumber, column };
  };

  const setPosition = ({ lineNumber, column = 1 }: EditorPosition) => {
    const col = column - 1; // columns in codemirror start at 0
    const line = view.state.doc.lines > lineNumber ? lineNumber : view.state.doc.lines;
    const lineInfo = view.state.doc.line(line);
    const columnNumber = lineInfo.length > col ? col : lineInfo.length;
    const position = lineInfo.from + columnNumber;
    view.dispatch({
      selection: { anchor: position },
      effects: [EditorView.scrollIntoView(position, { x: 'center', y: 'center' })],
    });
  };

  const foldRegions = () => {
    const code = view.state.doc.toString();
    const regionRegExp = /\/\/#region[\s\S]*?\/\/#endregion/g;
    let matches;
    while ((matches = regionRegExp.exec(code)) !== null) {
      const start = matches.index + code.slice(matches.index).indexOf('\n');
      const end = matches.index + matches[0].length;
      view.dispatch({
        effects: foldEffect.of({ from: start, to: end }),
      });
    }
  };

  const foldLines = (linesToFold: Array<{ from: number; to: number }>) => {
    linesToFold.forEach((line) => {
      let start = 0;
      let end = view.state.doc.length;
      if (line.from < 0 || line.to < 0 || line.from > line.to) return;
      try {
        if (line.from) {
          const startLineInfo = view.state.doc.line(line.from);
          start = startLineInfo.from;
        }
        if (line.to) {
          const endLineInfo = view.state.doc.line(line.to);
          end = endLineInfo.from + endLineInfo.length;
        }
        view.dispatch({
          effects: foldEffect.of({ from: start, to: end }),
        });
      } catch (e) {
        //
      }
    });
  };

  const destroy = () => {
    listeners.length = 0;
    keyBindings.length = 0;
    view.destroy();
    container.innerHTML = '';
    // editors.splice(editors.indexOf(codeiumEditor), 1);
    removeEventListener('keydown', toggleTabFocusMode);
  };

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    getEditorId,
    focus,
    getPosition,
    setPosition,
    foldRegions,
    foldLines,
    addTypes,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    changeSettings,
    registerFormatter,
    format,
    isReadonly: readonly,
    setTheme,
    undo: editorUndo,
    redo: editorRedo,
    destroy,
    codemirror: view,
  };
};
