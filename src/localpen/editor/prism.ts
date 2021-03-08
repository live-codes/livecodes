/* eslint-disable import/no-internal-modules */
import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-asciidoc';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-stylus';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-coffeescript';

import { FormatFn, Language, CodeEditor, EditorOptions } from '../models';
import { encodeHTML } from '../utils';

declare const Prism: any;
Prism.manual = true;

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { baseUrl, container } = options;
  if (!container) throw new Error('editor container not found');

  const mapLanguage = (language: Language): string => language;

  let value = options.value;
  let language = options.language;

  if (!document.head.querySelector('#prism-styles')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = baseUrl + 'assets/prism.css';
    stylesheet.id = 'prism-styles';
    document.head.appendChild(stylesheet);
  }

  const preElement: HTMLElement = document.createElement('pre');
  const codeElement: HTMLElement = document.createElement('code');
  container.appendChild(preElement);
  preElement.appendChild(codeElement);

  container.classList.add('prism');
  preElement.classList.add('line-numbers');
  codeElement.className = 'language-' + mapLanguage(language);
  codeElement.innerHTML = encodeHTML(value).trim();

  Prism.highlightAllUnder(container);

  const getValue = () => value;
  const setValue = (newValue = '') => {
    value = newValue;
    codeElement.innerHTML = encodeHTML(value).trim();
    Prism.highlightAllUnder(container);
  };
  const focus = () => {
    container.focus();
  };
  const getLanguage = () => language;
  const setLanguage = (lang: Language) => {
    language = lang;
    codeElement.className = 'language-' + mapLanguage(language);
    Prism.highlightAllUnder(container);
  };

  const onContentChanged = (_fn: () => void) => {
    //
  };

  const keyCodes = {
    CtrlEnter: 'Ctrl-Enter',
    Enter: 'Enter',
    UpArrow: 'ArrowUp',
    DownArrow: 'ArrowDown',
    ShiftAltF: 'Shift-Alt-f',
  };

  const addKeyBinding = (_label: string, _keyCode: any, _callback: () => void) => {
    //
  };

  const registerFormatter = (_formatFn: FormatFn | undefined) => {
    //
  };

  const format = () => {
    //
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
    prism: Prism,
  };
};
