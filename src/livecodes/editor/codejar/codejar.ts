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
    preElement.addEventListener('click', () => focus());
  }
  codeElement.className = 'language-' + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim() || '\n';

  if (options.editorId !== 'console') {
    preElement.classList.add('line-numbers');
  }
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

  const codejar =
    readonly || options.editorId === 'console'
      ? undefined
      : CodeJar(codeElement, highlight, codejarOptions);
  codejar?.recordHistory();

  type Listener = () => void;
  const listeners: Listener[] = [];
  codejar?.onUpdate(() => {
    if (getValue() === value) return;
    listeners.forEach((fn) => fn());
    // make sure there is some value
    if (!getValue()) {
      setValue();
    }
    value = getValue();
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

  const ctrl = navigator.platform.match('Mac') ? 'metaKey' : 'ctrlKey';
  type Keys = keyof CodeEditor['keyCodes'];
  interface KeyCode {
    name: Keys;
    code: KeyboardEventInit;
  }
  type KeyCodes = {
    [key in Keys]: KeyCode;
  };
  const keyCodes: KeyCodes = {
    CtrlEnter: {
      name: 'CtrlEnter',
      code: {
        [ctrl]: true,
        key: 'Enter',
      },
    },
    ShiftEnter: {
      name: 'ShiftEnter',
      code: {
        shiftKey: true,
        key: 'Enter',
      },
    },
    Enter: {
      name: 'Enter',
      code: {
        key: 'Enter',
      },
    },
    UpArrow: {
      name: 'UpArrow',
      code: {
        key: 'ArrowUp',
      },
    },
    DownArrow: {
      name: 'DownArrow',
      code: {
        key: 'ArrowDown',
      },
    },
    ShiftAltF: {
      name: 'ShiftAltF',
      code: {
        altKey: true,
        shiftKey: true,
        key: 'F',
      },
    },
  };

  const keyBindings: { [key in Keys]?: () => void } = {};
  const addKeyBinding = (_label: string, keyCode: KeyCode, callback: () => void) => {
    keyBindings[keyCode.name] = callback;
  };
  container.addEventListener('keydown', (ev: KeyboardEvent) => {
    let found = false;
    const keys = Object.keys(keyCodes) as unknown as Keys[];
    keys.forEach((key) => {
      if (found) return;
      const evObj = keyCodes[key].code;
      for (const k in evObj) {
        if ({}.hasOwnProperty.call(evObj, k)) {
          if (evObj[k as keyof KeyboardEventInit] !== (ev as any)[k]) {
            return;
          }
        }
      }
      keyBindings[key]?.();
      found = true;
    });
  });

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

  const undo = () => {
    codejar?.handleUndoRedo(
      new KeyboardEvent('keydown', {
        code: 'KeyZ',
        [ctrl]: true,
      }),
    );
  };

  const redo = () => {
    codejar?.handleUndoRedo(
      new KeyboardEvent('keydown', {
        code: 'KeyZ',
        [ctrl]: true,
        shiftKey: true,
      }),
    );
  };

  const goToLine = (line: number, column = 0) => {
    const allLines = getValue().split('\n');
    const lineNumber = allLines.length > line ? line : allLines.length;
    const selectedLine = allLines[lineNumber - 1];
    const columnNumber = selectedLine.length > column ? column : selectedLine.length;
    const previuosLines = allLines.slice(0, lineNumber - 1);
    const nextLines = allLines.slice(lineNumber);
    const position = previuosLines.join('\n').length + columnNumber;

    codeElement.innerHTML =
      previuosLines.join('\n') +
      '\n' +
      selectedLine.slice(0, columnNumber) +
      `<div id="scroll-target">​</div>` +
      selectedLine.slice(columnNumber) +
      '\n' +
      nextLines.join('\n');

    // scroll to view
    const target = codeElement.querySelector('#scroll-target');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      target.remove();
    }

    highlight();
    codejar?.restore({ start: position, end: position });
  };

  const destroy = () => {
    codejar?.destroy();
    listeners.length = 0;
    Object.keys(keyBindings).forEach((k) => delete (keyBindings as any)[k]);
    container.innerHTML = '';
  };

  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    getEditorId,
    focus,
    goToLine,
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
