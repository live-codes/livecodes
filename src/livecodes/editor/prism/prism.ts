/* eslint-disable import/no-internal-modules */
import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';

import { FormatFn, Language, CodeEditor, EditorOptions, Theme } from '../../models';
import { encodeHTML } from '../../utils';
import { mapLanguage } from '../../languages';

declare const Prism: any;
Prism.manual = true;

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { baseUrl, container, mode, editorId } = options;
  if (!container) throw new Error('editor container not found');

  let value = options.value;
  let language = options.language;
  let mappedLanguage = language === 'wat' ? 'wasm' : mapLanguage(language);

  const preElement: HTMLElement = document.createElement('pre');
  const codeElement: HTMLElement = document.createElement('code');
  container.appendChild(preElement);
  preElement.appendChild(codeElement);

  container.classList.add('prism');
  codeElement.className = 'language-' + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim();

  preElement.classList.add('line-numbers');
  if (mode === 'codeblock') {
    preElement.classList.add('codeblock');
  }

  Prism.highlightAllUnder(container);

  const getEditorId = () => editorId;
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
    ShiftEnter: 'Shift-Enter',
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

  const setTheme = (theme: Theme) => {
    const id = 'prism-styles';
    const styles = document.head.querySelector<HTMLLinkElement>('#' + id);
    const fileName = theme === 'light' ? '{{hash:prism-light.css}}' : '{{hash:prism-dark.css}}';
    const stylesUrl = baseUrl + fileName;
    if (styles && styles.href === stylesUrl) return;

    styles?.remove();
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = stylesUrl;
    stylesheet.id = id;
    document.head.appendChild(stylesheet);
  };
  setTheme(options.theme);

  const undo = () => {
    //
  };

  const redo = () => {
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
    getEditorId,
    focus,
    onContentChanged,
    keyCodes,
    addKeyBinding,
    registerFormatter,
    format,
    isReadonly: true,
    setTheme,
    undo,
    redo,
    destroy,
    prism: Prism,
  };
};
