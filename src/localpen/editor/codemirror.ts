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

import { mapLanguage } from '../languages';
import { FormatFn, Language, CodeEditor, EditorOptions } from '../models';
import { php } from './codemirror-php-mode';

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, readonly } = options;
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
      coffeescript: () => legacy(coffeeScript),
      livescript: () => legacy(liveScript),
      ruby: () => legacy(ruby),
      go: () => legacy(go),
      php: () => legacy(php),
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

  const languageTag = Symbol('language');
  const keyBindingsTag = Symbol('keyBindings');
  const readOnlyExtension = EditorView.editable.of(false);

  const defaultOptions: Extension[] = [
    tagExtension(keyBindingsTag, keymap.of([])),
    keymap.of([defaultTabBinding]),
    basicSetup,
    tagExtension(languageTag, getLanguageExtension(mappedLanguage)()),
    EditorView.updateListener.of(notifyListeners),
    oneDark,
    readonly ? readOnlyExtension : [],
  ];

  const codeblockOptions = [readOnlyExtension, ...defaultOptions];

  const compiledCodeOptions = [readOnlyExtension, ...defaultOptions];

  const consoleOptions = [...defaultOptions];

  const editorOptions =
    options.editorType === 'console'
      ? consoleOptions
      : options.editorType === 'compiled'
      ? compiledCodeOptions
      : options.mode === 'codeblock'
      ? codeblockOptions
      : defaultOptions;

  polyfill();
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
  const setLanguage = (lang: Language, value?: string) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    const languageExtension = getLanguageExtension(mappedLanguage)();
    view.dispatch({
      reconfigure: { [languageTag]: languageExtension },
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
      reconfigure: { [keyBindingsTag]: keymap.of(keyBindings) },
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
    codemirror: view,
    destroy,
  };
};

/**
 * this is used to bypass an error occuring in firefox
 * where document.getSelection() evaluates to null
 */
function polyfill() {
  if (document.getSelection()) return;

  const getSelection = document.getSelection.bind(document);
  document.getSelection = () =>
    getSelection()
      ? getSelection()
      : ({
          anchorNode: null,
          anchorOffset: 0,
          focusNode: null,
          focusOffset: 0,
        } as Selection);
}
