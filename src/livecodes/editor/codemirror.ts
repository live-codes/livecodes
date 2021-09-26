/* eslint-disable import/no-internal-modules */
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { Compartment, Extension } from '@codemirror/state';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { oneDark } from '@codemirror/theme-one-dark';
import { KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { LanguageSupport } from '@codemirror/language';
import { StreamParser, StreamLanguage } from '@codemirror/stream-parser';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
import { liveScript } from '@codemirror/legacy-modes/mode/livescript';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { go } from '@codemirror/legacy-modes/mode/go';
import { perl } from '@codemirror/legacy-modes/mode/perl';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { scheme } from '@codemirror/legacy-modes/mode/scheme';
import { less, sCSS } from '@codemirror/legacy-modes/mode/css';
import { stylus } from '@codemirror/legacy-modes/mode/stylus';
import { sql } from '@codemirror/lang-sql';
import { php } from '@codemirror/lang-php';
import { wast } from '@codemirror/lang-wast';

import { mapLanguage } from '../languages';
import { FormatFn, Language, CodeEditor, EditorOptions, Theme } from '../models';

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, readonly, theme } = options;
  if (!container) throw new Error('editor container not found');

  let language = options.language;
  let mappedLanguage = mapLanguage(language);

  const legacy = (parser: StreamParser<unknown>) =>
    new LanguageSupport(StreamLanguage.define(parser));

  const getLanguageExtension = (language: Language): (() => LanguageSupport) => {
    const languages: Partial<{ [key in Language]: () => LanguageSupport }> = {
      html,
      markdown,
      css,
      javascript,
      typescript: () => javascript({ typescript: true }),
      jsx: () => javascript({ jsx: true }),
      tsx: () => javascript({ jsx: true, typescript: true }),
      json,
      python,
      php,
      sql,
      wat: wast,
      coffeescript: () => legacy(coffeeScript),
      livescript: () => legacy(liveScript),
      ruby: () => legacy(ruby),
      go: () => legacy(go),
      perl: () => legacy(perl),
      lua: () => legacy(lua),
      scheme: () => legacy(scheme),
      less: () => legacy(less),
      scss: () => legacy(sCSS),
      stylus: () => legacy(stylus),
    };

    return languages[language] || (languages.html as () => LanguageSupport);
  };

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
  const fullHeight = EditorView.theme({
    '&': { height: '100%' },
    '.cm-scroller': { overflow: 'auto' },
  });

  const themes = {
    dark: oneDark,
    light: [defaultHighlightStyle],
  };

  const getExtensions = () => {
    const defaultOptions: Extension[] = [
      keyBindingsExtension.of(keymap.of(keyBindings)),
      keymap.of([indentWithTab]),
      basicSetup,
      languageExtension.of(getLanguageExtension(mappedLanguage)()),
      EditorView.updateListener.of(notifyListeners),
      themeExtension.of(themes[theme]),
      fullHeight,
      readonly ? readOnlyExtension : [],
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

  const setTheme = (theme: Theme) => {
    view.dispatch({
      effects: themeExtension.reconfigure(themes[theme]),
    });
  };

  const destroy = () => view.destroy();

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    focus,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    registerFormatter,
    format,
    isReadonly: readonly,
    setTheme,
    destroy,
    codemirror: view,
  };
};
