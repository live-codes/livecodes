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

import type {
  FormatFn,
  Language,
  CodeEditor,
  EditorOptions,
  Theme,
  EditorPosition,
  EditorConfig,
} from '../../models';
import { encodeHTML } from '../../utils';

declare const Prism: any;
Prism.manual = true;

export const createEditor = async (options: EditorOptions): Promise<CodeEditor> => {
  const { baseUrl, container, mode, editorId, readonly, isEmbed } = options;
  if (!container) throw new Error('editor container not found');

  let { value, language } = options;
  let currentPosition: EditorPosition = { lineNumber: 1 };
  const mapLanguage = options.mapLanguage || ((lang: Language) => lang);
  let mappedLanguage = language === 'wat' ? 'wasm' : mapLanguage(language);
  let editorOptions: ReturnType<typeof convertOptions>;

  const preElement: HTMLElement = document.createElement('pre');
  const codeElement: HTMLElement = document.createElement('code');
  container.appendChild(preElement);
  preElement.appendChild(codeElement);

  container.classList.add('prism');
  if (!readonly) {
    container.classList.add('codejar');
    preElement.addEventListener('click', () => {
      currentPosition = getPosition();
      focus(/* restorePosition = */ false);
    });
    preElement.addEventListener('blur', () => {
      currentPosition = getPosition();
    });
  }
  new ResizeObserver(() => {
    if (!editorOptions.wordWrap) return;
    highlight();
  }).observe(preElement);
  codeElement.className = 'language-' + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim() || '\n';

  if (options.editorId !== 'console' && options.editorId !== 'embed') {
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

  const codejar =
    readonly || options.editorId === 'console' ? undefined : CodeJar(codeElement, highlight, {});
  codejar?.recordHistory();

  type Listener = () => void;
  const listeners: Listener[] = [];
  codejar?.onUpdate(() => {
    currentPosition = getPosition();
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
  setTimeout(() => {
    setValue(value || '\n');
  }, 1000);

  const focus = (restorePosition = true) => {
    codeElement.focus();
    if (restorePosition) {
      setPosition(currentPosition, /* smoothScroll = */ false);
      currentPosition = getPosition();
    }
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
      focus(false);
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

  const convertOptions = (opt: EditorConfig) => ({
    fontFamily: opt.fontFamily,
    fontSize: (opt.fontSize || (isEmbed ? 12 : 14)) + 'px',
    tab: opt.useTabs ? '\t' : ' '.repeat(opt.tabSize || 2),
    tabSize: String(opt.tabSize),
    lineNumbers: opt.lineNumbers,
    wordWrap: opt.wordWrap ? 'pre-wrap' : 'nowrap',
    addClosing: opt.closeBrackets,
  });

  const changeSettings = (settings: EditorConfig) => {
    editorOptions = convertOptions(settings);
    codejar?.updateOptions({
      tab: editorOptions.tab,
      addClosing: editorOptions.addClosing,
    });
    [preElement, codeElement].forEach((el) => {
      el.style.setProperty('font-family', editorOptions.fontFamily, 'important');
      el.style.setProperty('font-size', editorOptions.fontSize + 'px', 'important');
      el.style.setProperty('tab-size', editorOptions.tabSize, 'important');
      el.style.setProperty('white-space', editorOptions.wordWrap, 'important');
    });
    highlight();
  };
  changeSettings(options);

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

  const getPosition = (): EditorPosition => {
    const position = codejar?.save().start ?? 0;
    const allLines = getValue().split('\n');
    let length = 0;
    let lineNumber = 1;
    let column = 0;
    for (const line of allLines) {
      if (length + line.length < position) {
        length += line.length + 1; // add line break
        lineNumber += 1;
      } else {
        column = position - length;
        break;
      }
    }
    return { lineNumber, column };
  };

  const setPosition = ({ lineNumber, column = 0 }: EditorPosition, smoothScroll = true) => {
    const allLines = getValue().split('\n');
    const line = allLines.length > lineNumber ? lineNumber : allLines.length;
    const selectedLine = allLines[line - 1];
    const columnNumber = (selectedLine.length > column ? column : selectedLine.length) + 1;
    const previuosLines = allLines.slice(0, line - 1);
    const nextLines = allLines.slice(line);
    const position =
      previuosLines.join('\n').length + columnNumber - (previuosLines.length > 0 ? 0 : 1);

    codeElement.innerHTML =
      encodeHTML(
        previuosLines.join('\n') +
          (previuosLines.length > 0 ? '\n' : '') +
          selectedLine.slice(0, columnNumber),
      ) +
      `<div id="scroll-target">​</div>` +
      encodeHTML(selectedLine.slice(columnNumber) + '\n' + nextLines.join('\n'));

    // scroll to view
    const target = codeElement.querySelector('#scroll-target');
    if (target) {
      target.scrollIntoView({
        behavior: smoothScroll ? 'smooth' : undefined,
        block: 'center',
        inline: 'center',
      });
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
    getPosition,
    setPosition: (position) => setPosition(position),
    onContentChanged,
    keyCodes,
    addKeyBinding,
    changeSettings,
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
