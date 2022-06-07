import { getLanguageEditorId } from '../languages';
import { CodeEditor, EditorOptions } from '../models';

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
    goToLine: () => undefined,
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
