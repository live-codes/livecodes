/* eslint-disable import/no-internal-modules */
import { CodeJar } from 'codejar';
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

import type { FormatFn, Language, CodeEditor, EditorOptions, Theme } from '../../models';
import { encodeHTML } from '../../utils';

declare const Prism: any;
Prism.manual = true;

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { baseUrl, container, mode, editorId, readonly } = options;
  if (!container) throw new Error('editor container not found');

  let { value, language } = options;
  const mapLanguage = options.mapLanguage || ((lang: Language) => lang);
  let mappedLanguage = language === 'wat' ? 'wasm' : mapLanguage(language);

  const preElement: HTMLElement = document.createElement('pre');
  const codeElement: HTMLElement = document.createElement('code');
  container.appendChild(preElement);
  preElement.appendChild(codeElement);

  container.classList.add('prism');
  if (!readonly) {
    container.classList.add('codejar');
    preElement.onclick = () => codeElement.focus();
  }
  codeElement.className = 'language-' + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim() || '\n';

  preElement.classList.add('line-numbers');
  if (mode === 'codeblock') {
    preElement.classList.add('codeblock');
  }

  const highlight = () => {
    Prism.highlightElement(codeElement);
  };

  if (readonly) {
    highlight();
  }

  const codejarOptions = {
    tab: ' '.repeat(2),
  };

  const codejar = readonly ? undefined : CodeJar(codeElement, highlight, codejarOptions);

  codejar?.recordHistory();

  type Listener = () => void;
  const listeners: Listener[] = [];
  codejar?.onUpdate(() => {
    listeners.forEach((fn) => fn());
  });

  const getEditorId = () => editorId;
  const getValue = () => (codejar ? codejar?.toString() : value);
  const setValue = (newValue = '\n') => {
    value = newValue;
    if (codejar) {
      codejar.updateCode(value);
      codejar.recordHistory();
    } else {
      codeElement.innerHTML = encodeHTML(value).trim();
      highlight();
    }
  };
  const focus = () => {
    codeElement.focus();
  };
  const getLanguage = () => language;
  const setLanguage = (lang: Language, newValue?: string) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    codeElement.className = 'language-' + mappedLanguage;
    highlight();
    if (newValue != null) {
      setValue(newValue);
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

  const addKeyBinding = (_label: string, _keyCode: any, _callback: () => void) => {
    //
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
    const position = codejar?.save();
    const offset = (position?.dir === '<-' ? position.start : position?.end) || 0;
    const oldValue = getValue();
    const newValue = await formatter(oldValue, offset);
    setValue(newValue.formatted);
    const newOffset = newValue.cursorOffset >= 0 ? newValue.cursorOffset : 0;
    codejar?.restore({ start: newOffset, end: newOffset });
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

  // const ctrl = navigator.platform.match('Mac') ? 'metaKey' : 'ctrlKey';
  const undo = () => {
    // codeElement.dispatchEvent(
    //   new KeyboardEvent('keydown', {
    //     code: 'KeyZ',
    //     [ctrl]: true,
    //   }),
    // );
  };

  const redo = () => {
    // codeElement.dispatchEvent(
    //   new KeyboardEvent('keydown', {
    //     code: 'KeyZ',
    //     [ctrl]: true,
    //     shiftKey: true,
    //   }),
    // );
  };

  const destroy = () => {
    codejar?.destroy();
    listeners.length = 0;
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
    isReadonly: readonly,
    setTheme,
    undo,
    redo,
    destroy,
    prism: Prism,
    codejar,
  };
};
