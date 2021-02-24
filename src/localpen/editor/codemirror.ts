/* eslint-disable import/no-internal-modules */
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { Extension, tagExtension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { KeyBinding, keymap, ViewUpdate } from '@codemirror/view';
import { defaultTabBinding } from '@codemirror/commands';
import { LanguageSupport } from '@codemirror/language';
import { StreamParser, StreamLanguage } from '@codemirror/stream-parser';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
import { less, sCSS } from '@codemirror/legacy-modes/mode/css';

import { FormatFn, Language } from '../models';
import { CodeEditor, EditorOptions } from './models';

export const createCodemirrorEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container } = options;
  if (!container) throw new Error('editor container not fount');

  let language = options.language;

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
      coffeescript: () => legacy(coffeeScript),
      less: () => legacy(less),
      scss: () => legacy(sCSS),
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

  const languageTag = Symbol('language');
  const keyBindingsTag = Symbol('keyBindings');

  const defaultOptions: Extension[] = [
    tagExtension(keyBindingsTag, keymap.of([])),
    keymap.of([defaultTabBinding]),
    basicSetup,
    tagExtension(languageTag, getLanguageExtension(language)()),
    EditorView.updateListener.of(notifyListeners),
    oneDark,
  ];

  const codeblockOptions = [EditorView.editable.of(false), ...defaultOptions];

  const compiledCodeOptions = [EditorView.editable.of(false), ...defaultOptions];

  const consoleOptions = [...defaultOptions];

  const editorOptions =
    options.editorType === 'console'
      ? consoleOptions
      : options.editorType === 'compiled'
      ? compiledCodeOptions
      : options.mode === 'codeblock'
      ? codeblockOptions
      : defaultOptions;

  const view = new EditorView({
    state: EditorState.create({
      extensions: editorOptions,
      doc: options.value,
    }),
    parent: container,
  });

  const getValue = () => view.state.doc.toString();
  const setValue = (value = '', newState = true) => {
    if (newState) {
      view.setState(EditorState.create({ doc: value, extensions: editorOptions }));
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
  const setLanguage = (lang: Language) => {
    language = lang;
    const languageExtension = getLanguageExtension(language)();
    view.dispatch({
      reconfigure: { [languageTag]: languageExtension },
    });
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
      reconfigure: { [keyBindingsTag]: keymap.of(keyBindings) },
    });
  };

  let formatter: FormatFn | undefined;
  const registerFormatter = (formatFn: FormatFn | undefined) => {
    if (!formatFn) return;
    formatter = formatFn;
    addKeyBinding('format', keyCodes.ShiftAltF, format);
  };

  const format = () => {
    if (!formatter) return;
    const offset = view.state.selection.main.to;
    const oldValue = getValue();
    const newValue = formatter(oldValue, offset);
    setValue(newValue.formatted, false);
    view.dispatch({ selection: { anchor: newValue.cursorOffset } });
  };

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    focus,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    format,
    registerFormatter,
    codemirror: view,
  };
};
