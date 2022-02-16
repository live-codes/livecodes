import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { Compartment, Extension } from '@codemirror/state';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { undo, redo } from '@codemirror/history';
import { oneDark } from '@codemirror/theme-one-dark';
import { KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { LanguageSupport } from '@codemirror/language';
import { StreamLanguage, StreamParser } from '@codemirror/stream-parser';

import { mapLanguage } from '../../languages';
import { FormatFn, Language, CodeEditor, EditorOptions, Theme } from '../../models';
import { emmetExt } from './emmet-codemirror';

export const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

export const createEditorCreator =
  (languages: Partial<{ [key in Language]: () => LanguageSupport }>) =>
  async (options: EditorOptions): Promise<CodeEditor> => {
    const { container, readonly, isEmbed } = options;
    if (!container) throw new Error('editor container not found');
    const getLanguageExtension = (language: Language): (() => LanguageSupport) =>
      languages[language] || (languages.html as () => LanguageSupport);

    let language = options.language;
    let mappedLanguage = mapLanguage(language);
    let theme = options.theme;
    const keyBindings: KeyBinding[] = [];
    let emmetEnabled = true;

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
    const emmetExtension = new Compartment();
    const readOnlyExtension = EditorView.editable.of(false);
    const fullHeight = EditorView.theme({
      '&': { height: '100%', fontSize: isEmbed ? '12px' : '14px' },
      '.cm-scroller': { overflow: 'auto' },
    });

    const themes = {
      dark: oneDark,
      light: [defaultHighlightStyle],
    };

    const getExtensions = () => {
      const defaultOptions: Extension[] = [
        languageExtension.of(getLanguageExtension(mappedLanguage)()),
        EditorView.updateListener.of(notifyListeners),
        themeExtension.of(themes[theme]),
        fullHeight,
        readonly ? readOnlyExtension : [],
        !emmetEnabled ? [] : emmetExtension.of(emmetExt),
        keyBindingsExtension.of(keymap.of(keyBindings)),
        basicSetup,
        keymap.of([indentWithTab]),
      ];

      const codeblockOptions = [readOnlyExtension, ...defaultOptions];

      const compiledCodeOptions = [readOnlyExtension, ...defaultOptions];

      const consoleOptions = [...defaultOptions];

      return options.editorType === 'console'
        ? consoleOptions
        : options.editorType === 'compiled'
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
      addKeyBinding('format', keyCodes.ShiftAltF, format);
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

    const configureEmmet = (enabled: boolean) => {
      emmetEnabled = enabled;
      view.dispatch({
        effects: emmetExtension.reconfigure(!enabled ? [] : emmetExt),
      });
    };

    const editorUndo = () => {
      undo({ state: view.state, dispatch: view.dispatch });
    };

    const editorRedo = () => {
      redo({ state: view.state, dispatch: view.dispatch });
    };
    addKeyBinding('redo', 'Mod-Shift-z', editorRedo);

    const destroy = () => {
      listeners.length = 0;
      view.destroy();
    };

    return {
      getValue,
      setValue,
      getLanguage,
      setLanguage,
      focus,
      configureEmmet,
      onContentChanged,
      keyCodes,
      addKeyBinding,
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
