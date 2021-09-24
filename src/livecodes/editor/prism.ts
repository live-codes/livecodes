/* eslint-disable import/no-internal-modules */
import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-pug';
import 'prismjs/components/prism-haml';
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
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-coffeescript';
import 'prismjs/components/prism-livescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-scheme';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-wasm';

import { FormatFn, Language, CodeEditor, EditorOptions } from '../models';
import { encodeHTML } from '../utils';
import { mapLanguage } from '../languages';

declare const Prism: any;
Prism.manual = true;

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { baseUrl, container, mode } = options;
  if (!container) throw new Error('editor container not found');

  const lineNumbers = mode === 'codeblock' ? false : true;

  let value = options.value;
  let language = options.language;
  let mappedLanguage = language === 'wat' ? 'wasm' : mapLanguage(language);

  if (!document.head.querySelector('#prism-styles')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = baseUrl + 'styles/prism.css';
    stylesheet.id = 'prism-styles';
    document.head.appendChild(stylesheet);
  }

  const preElement: HTMLElement = document.createElement('pre');
  const codeElement: HTMLElement = document.createElement('code');
  container.appendChild(preElement);
  preElement.appendChild(codeElement);

  container.classList.add('prism');
  codeElement.className = 'language-' + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim();

  if (lineNumbers) {
    preElement.classList.add('line-numbers');
  }
  if (mode === 'codeblock') {
    preElement.classList.add('codeblock');
  }

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
  const setLanguage = (lang: Language, newValue?: string) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    codeElement.className = 'language-' + mappedLanguage;
    Prism.highlightAllUnder(container);
    if (newValue != null) {
      setValue(newValue);
    }
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

  const format = async () => {
    //
  };

  const destroy = () => {
    container.innerHTML = '';
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
    registerFormatter,
    format,
    isReadonly: true,
    prism: Prism,
    destroy,
  };
};
