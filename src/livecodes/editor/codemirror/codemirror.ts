import { EditorView, basicSetup } from 'codemirror';
import { Compartment, Extension, EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentUnit,
  LanguageSupport,
  StreamLanguage,
  StreamParser,
} from '@codemirror/language';

import type {
  FormatFn,
  Language,
  CodeEditor,
  EditorOptions,
  Theme,
  EditorPosition,
  EditorConfig,
} from '../../models';
import { emmetExt } from './emmet-codemirror';

export const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

export const createEditorCreator =
  (languages: Partial<{ [key in Language]: () => LanguageSupport }>) =>
  async (options: EditorOptions): Promise<CodeEditor> => {
    const { container, readonly, isEmbed, editorId } = options;
    let editorSettings: EditorConfig = { ...options };
    if (!container) throw new Error('editor container not found');
    const getLanguageExtension = (language: Language): (() => LanguageSupport) =>
      languages[language] || (languages.html as () => LanguageSupport);

    let language = options.language;
    const mapLanguage = options.mapLanguage || ((lang: Language) => lang);
    let mappedLanguage = mapLanguage(language);
    let theme = options.theme;
    const keyBindings: KeyBinding[] = [];

    type Listener = (update: ViewUpdate) => void;
    const listeners: Listener[] = [];
    const notifyListeners = (update: ViewUpdate) => {
      if (update.docChanged) {
        listeners.forEach((fn) => fn(update));
      }
    };

    const languageExtension = new Compartment();
    const keyBindingsExtension = new Compartment();
    const themeExtension = new Compartment();
    const readOnlyExtension = EditorView.editable.of(false);
    const editorSettingsExtension = new Compartment();

    const configureSettingsExtension = (settings: Partial<EditorConfig>) => {
      const fontSize = settings.fontSize ?? editorSettings.fontSize;
      const fontFamily = settings.fontFamily ?? editorSettings.fontFamily;
      const tabSize = settings.tabSize ?? editorSettings.tabSize;
      const useTabs = settings.useTabs ?? editorSettings.useTabs;
      const lineNumbers = settings.lineNumbers ?? editorSettings.lineNumbers;
      const wordWrap = settings.wordWrap ?? editorSettings.wordWrap;
      const emmet = settings.emmet ?? editorSettings.emmet;

      return [
        EditorState.tabSize.of(tabSize),
        indentUnit.of(useTabs ? '\t' : ' '.repeat(tabSize)),
        ...(wordWrap ? [EditorView.lineWrapping] : []),
        ...(emmet ? [emmetExt] : []),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: (fontSize || (isEmbed ? 12 : 14)) + 'px',
          },
          '.cm-scroller': {
            overflow: 'auto',
            fontFamily,
          },
          '.cm-gutters': {
            width: lineNumbers ? 'unset' : '5px',
            'overflow-x': lineNumbers ? 'unset' : 'hidden',
            visibility: lineNumbers ? 'unset' : 'hidden',
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
        languageExtension.of(getLanguageExtension(mappedLanguage)()),
        EditorView.updateListener.of(notifyListeners),
        themeExtension.of(themes[theme]),
        editorSettingsExtension.of(configureSettingsExtension({})),
        readonly ? readOnlyExtension : [],
        keyBindingsExtension.of(keymap.of(keyBindings)),
        basicSetup,
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

    const view = new EditorView({
      state: EditorState.create({
        extensions: getExtensions(),
        doc: options.value,
      }),
      parent: container,
    });

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
      view.dispatch({
        effects: languageExtension.reconfigure(getLanguageExtension(mappedLanguage)()),
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
      const newValue = await formatter(oldValue, offset);
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
      view.dispatch({
        effects: editorSettingsExtension.reconfigure(configureSettingsExtension(editorSettings)),
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
