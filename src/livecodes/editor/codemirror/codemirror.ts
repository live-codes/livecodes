/* eslint-disable import/no-internal-modules */

// these imports are marked as external and are mapped to ./codemirror-core
// (see html/app.html and scripts/build.js)
// to allow lazy loaded modules to import the same modules
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap, type KeyBinding, type ViewUpdate } from '@codemirror/view';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentUnit,
  HighlightStyle,
  type LanguageSupport,
} from '@codemirror/language';
import { tags } from '@lezer/highlight';

// these are imported normally
import type {
  FormatFn,
  Language,
  CodeEditor,
  EditorOptions,
  Theme,
  EditorPosition,
  EditorConfig,
  Config,
  CodemirrorTheme,
} from '../../models';
import { getEditorModeNode } from '../../UI/selectors';
import { getEditorTheme } from '../themes';
import { basicSetup, lineNumbers, closeBrackets } from './basic-setup';
import { editorLanguages } from './editor-languages';
import { colorPicker, indentationMarkers, vscodeKeymap } from './extras';
import { codemirrorThemes, customThemes } from './codemirror-themes';

export type CodeiumEditor = Pick<CodeEditor, 'getLanguage' | 'getValue'> & {
  editorId: EditorOptions['editorId'];
};
const editors: CodeiumEditor[] = [];

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, readonly, isEmbed, editorId, getFormatterConfig, getFontFamily } = options;
  let editorSettings: EditorConfig = { ...options };
  if (!container) throw new Error('editor container not found');

  const getLanguageSupport = async (language: Language): Promise<LanguageSupport> =>
    editorLanguages[language]?.() || (editorLanguages.html?.() as Promise<LanguageSupport>);

  const mapLanguage = (lang: Language) => {
    if (['vue', 'vue3', 'vue2'].includes(lang)) return 'vue';
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

  let vim: (() => Extension) | undefined;
  let emacs: (() => Extension) | undefined;
  let emmet: Extension | undefined;
  let codeium:
    | ((editors: CodeiumEditor[], mapLanguage: (lang: Language) => Language) => Extension)
    | undefined;

  const loadExtensions = async (opt: EditorConfig) => {
    const modules = {
      vim: `./vendor/codemirror/${process.env.codemirrorVersion}/codemirror-vim.js`,
      emacs: `./vendor/codemirror/${process.env.codemirrorVersion}/codemirror-emacs.js`,
      emmet: `./vendor/codemirror/${process.env.codemirrorVersion}/codemirror-emmet.js`,
      codeium: `./vendor/codemirror/${process.env.codemirrorVersion}/codemirror-codeium.js`,
    };
    vim = opt.editorMode === 'vim' ? (await import(modules.vim)).vim : undefined;
    emacs = opt.editorMode === 'emacs' ? (await import(modules.emacs)).emacs : undefined;
    emmet = opt.emmet ? (await import(modules.emmet)).emmet : undefined;
    codeium = opt.enableAI ? (await import(modules.codeium)).codeium : undefined;
  };

  await loadExtensions(options);
  const languageExtension = new Compartment();
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
    const enableAI = settings.enableAI ?? editorSettings.enableAI;
    const editorMode = settings.editorMode ?? editorSettings.editorMode;

    return [
      EditorState.tabSize.of(tabSize),
      indentUnit.of(useTabs ? '\t' : ' '.repeat(tabSize)),
      ...(wordWrap ? [EditorView.lineWrapping] : []),
      ...(editorMode === 'vim' && vim ? [vim()] : editorMode === 'emacs' && emacs ? [emacs()] : []),
      ...(enableEmmet && emmet ? [emmet] : []),
      ...(enableAI && codeium ? [codeium(editors, mapLanguage)] : []),
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
      EditorView.updateListener.of(notifyListeners),
      themeExtension.of(getActiveTheme()),
      syntaxHighlighting(italicComments),
      editorSettingsExtension.of(configureSettingsExtension({})),
      keyBindingsExtension.of(keymap.of(keyBindings)),
      lineNumbersExtension.of(editorSettings.lineNumbers ? lineNumbers() : []),
      closeBracketsExtension.of(editorSettings.closeBrackets ? closeBrackets() : []),
      basicSetup,
      readonly ? readOnlyExtension : [],
      keymap.of([indentWithTab]),
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
        effects: languageExtension.reconfigure(mappedLanguageSupport),
      });
    });
    if (value != null) {
      setValue(value);
    }
  };
  const codeiumEditor: CodeiumEditor = { editorId, getLanguage, getValue };
  editors.push(codeiumEditor);

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

  const destroy = () => {
    listeners.length = 0;
    keyBindings.length = 0;
    view.destroy();
    container.innerHTML = '';
    editors.splice(editors.indexOf(codeiumEditor), 1);
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
