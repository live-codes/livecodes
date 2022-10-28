/* eslint-disable import/no-internal-modules */

// these imports are marked as external and are mapped to ./codemirror-core
// (see html/app.html and scripts/build.js)
// to allow lazy loaded modules to import the same modules
import { Compartment, Extension, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentUnit,
  LanguageSupport,
  HighlightStyle,
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
} from '../../models';
import { getEditorModeNode } from '../../UI/selectors';
import { basicSetup, lineNumbers, closeBrackets } from './basic-setup';
import { editorLanguages } from './editor-languages';

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, readonly, isEmbed, editorId, getFormatterConfig, getFontFamily } = options;
  let editorSettings: EditorConfig = { ...options };
  if (!container) throw new Error('editor container not found');
  const getLanguageSupport = async (language: Language): Promise<LanguageSupport> =>
    editorLanguages[language]?.() || (editorLanguages.html?.() as Promise<LanguageSupport>);

  let language = options.language;
  const mapLanguage = options.mapLanguage || ((lang: Language) => lang);
  let mappedLanguage = mapLanguage(language);
  let mappedLanguageSupport = await getLanguageSupport(mappedLanguage);
  let theme = options.theme;
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

  const loadExtensions = async (opt: EditorConfig) => {
    const modules = {
      vim: './{{hash:codemirror-vim.js}}',
      emacs: './{{hash:codemirror-emacs.js}}',
      emmet: './{{hash:codemirror-emmet.js}}',
    };
    vim = opt.editorMode === 'vim' ? (await import(modules.vim)).vim : undefined;
    emacs = opt.editorMode === 'emacs' ? (await import(modules.emacs)).emacs : undefined;
    emmet = opt.emmet ? (await import(modules.emmet)).emmet : undefined;
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
    const editorMode = settings.editorMode ?? editorSettings.editorMode;

    return [
      EditorState.tabSize.of(tabSize),
      indentUnit.of(useTabs ? '\t' : ' '.repeat(tabSize)),
      ...(wordWrap ? [EditorView.lineWrapping] : []),
      ...(editorMode === 'vim' && vim ? [vim()] : editorMode === 'emacs' && emacs ? [emacs()] : []),
      ...(enableEmmet && emmet ? [emmet] : []),
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
  const themes = {
    dark: oneDark,
    light: [syntaxHighlighting(defaultHighlightStyle)],
  };

  const getExtensions = () => {
    const defaultOptions: Extension[] = [
      languageExtension.of(mappedLanguageSupport),
      EditorView.updateListener.of(notifyListeners),
      themeExtension.of(themes[theme]),
      syntaxHighlighting(italicComments),
      editorSettingsExtension.of(configureSettingsExtension({})),
      keyBindingsExtension.of(keymap.of(keyBindings)),
      lineNumbersExtension.of(editorSettings.lineNumbers ? lineNumbers() : []),
      closeBracketsExtension.of(editorSettings.closeBrackets ? closeBrackets() : []),
      basicSetup,
      readonly ? readOnlyExtension : [],
      keymap.of([indentWithTab]),
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

  const setTheme = (newTheme: Theme) => {
    theme = newTheme;
    view.dispatch({
      effects: themeExtension.reconfigure(themes[theme]),
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

  const setPosition = ({ lineNumber, column = 0 }: EditorPosition) => {
    const line = view.state.doc.lines > lineNumber ? lineNumber : view.state.doc.lines;
    const lineInfo = view.state.doc.line(line);
    const columnNumber = lineInfo.length > column ? column : lineInfo.length;
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
