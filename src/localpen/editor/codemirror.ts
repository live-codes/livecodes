/* eslint-disable import/no-internal-modules */
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { tagExtension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap, ViewUpdate } from '@codemirror/view';
import { defaultTabBinding } from '@codemirror/commands';
import { LanguageSupport } from '@codemirror/language';
import { StreamParser, StreamLanguage } from '@codemirror/stream-parser';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
import { less, sCSS } from '@codemirror/legacy-modes/mode/css';

import { EditorLibrary, FormatFn, Language } from '../models';
import { CodeEditor, EditorOptions } from './models';

const defaultOptions = {};

const codeblockOptions = {};

const compiledCodeOptions = {};

const consoleOptions = {};

export const createCodemirrorEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { container, baseUrl } = options;
  if (!container) throw new Error('editor container not fount');

  const editorOptions =
    options.editorType === 'console'
      ? consoleOptions
      : options.editorType === 'compiled'
      ? compiledCodeOptions
      : options.mode === 'codeblock'
      ? codeblockOptions
      : defaultOptions;

  let language = options.language;

  const legacy = async (parser: StreamParser<unknown>) =>
    new LanguageSupport(StreamLanguage.define(parser));

  const languageTag = Symbol('language');

  const getLanguageExtension = (language: Language) => {
    const languages = {
      html,
      markdown,
      css,
      javascript,
      typescript: () => javascript({ typescript: true }),
      jsx: () => javascript({ jsx: true }),
      tsx: () => javascript({ jsx: true, typescript: true }),
      coffeeScript: () => legacy(coffeeScript),
      less: () => legacy(less),
      scss: () => legacy(sCSS),
    };

    if (language in languages) {
      return languages[language];
    } else {
      return languages.html;
    }
  };

  const keyBindings = () =>
    keymap.of([
      {
        key: 'Ctrl-Enter',
        run() {
          // eslint-disable-next-line no-console
          console.log('run');
          return true;
        },
      },
    ]);

  type Listener = (update: ViewUpdate) => void;
  const listeners: Listener[] = [];
  const notifyListeners = (update: ViewUpdate) => {
    if (update.docChanged) {
      listeners.forEach((fn) => fn(update));
    }
  };

  const view = new EditorView({
    state: EditorState.create({
      extensions: [
        basicSetup,
        tagExtension(languageTag, getLanguageExtension(language)()),
        oneDark,
        keyBindings(),
        keymap.of([defaultTabBinding]),
        EditorView.updateListener.of(notifyListeners),
      ],
      doc: '',
    }),
    parent: container,
  });

  const getValue = () => view.state.doc.toString();
  const setValue = (value = '') => {
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value,
      },
    });
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

  const layout = () => {
    // TODO: implement
  };

  const addTypes = (_lib: EditorLibrary) => {
    // TODO: implement
  };
  const keyCodes = {
    CtrlEnter: 'Ctrl-Enter',
    Enter: 'Enter',
    UpArrow: 'ArrowUp',
    DownArrow: 'ArrowDown',
  };

  const addKeyBinding = (_label: string, _keybinding: any, _callback: () => void) => {
    // TODO: implement
  };

  const registerFormatter = (formatFn: FormatFn | undefined) => {
    if (!formatFn) return;
    // TODO: implement
  };

  const format = () => {
    // TODO: implement
  };

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    focus,
    layout,
    addTypes,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    format,
    registerFormatter,
    codemirror: view,
  };
};
