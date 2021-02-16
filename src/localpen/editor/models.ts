import { EditorLibrary, Language } from '../models';

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string) => void;
  setLanguage: (language: Language) => void;
  focus: () => void;
  layout: () => void;
  addTypes?: (lib: EditorLibrary) => any;
  onContentChanged: (callback: () => void) => void;
  addKeyBinding: (label: string, keybinding: any, callback: () => void) => void;
  keyCodes: {
    CtrlEnter: any;
    Enter: any;
    UpArrow: any;
    DownArrow: any;
  };
  monaco?: any;
  codemirror?: any;
}
