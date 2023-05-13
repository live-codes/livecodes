import { getLanguageEditorId } from '../languages';
import type { CodeEditor, EditorOptions } from '../models';

export const createFakeEditor = (options: EditorOptions): CodeEditor => {
  let value = options.value;
  let language = options.language;
  return {
    getValue: () => value,
    setValue: (v = '') => {
      value = v;
    },
    getLanguage: () => language,
    setLanguage: (lang, v) => {
      language = lang;
      if (v) {
        value = v;
      }
    },
    getEditorId: () => getLanguageEditorId(language) || 'markup',
    focus: () => undefined,
    getPosition: () => ({ lineNumber: 1, column: 1 }),
    setPosition: () => undefined,
    onContentChanged: () => undefined,
    addKeyBinding: () => undefined,
    keyCodes: {
      CtrlEnter: '',
      ShiftEnter: '',
      Enter: '',
      UpArrow: '',
      DownArrow: '',
      ShiftAltF: '',
    },
    changeSettings: () => undefined,
    registerFormatter: () => undefined,
    format: async () => undefined,
    isReadonly: true,
    setTheme: () => undefined,
    undo: () => undefined,
    redo: () => undefined,
    destroy: () => undefined,
    isFake: true,
  };
};
