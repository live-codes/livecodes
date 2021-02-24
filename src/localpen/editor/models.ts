import { EditorLibrary, FormatFn, Language, Pen } from '../models';

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language) => void;
  focus: () => void;
  layout?: () => void;
  addTypes?: (lib: EditorLibrary) => any;
  onContentChanged: (callback: () => void) => void;
  addKeyBinding: (label: string, keybinding: any, callback: () => void) => void;
  keyCodes: {
    CtrlEnter: any;
    Enter: any;
    UpArrow: any;
    DownArrow: any;
  };
  registerFormatter: (formatFn: FormatFn | undefined) => void;
  format: () => void;
  monaco?: any;
  codemirror?: any;
}

export interface EditorOptions {
  baseUrl: string;
  container: HTMLElement | null;
  language: Language;
  value: string;
  mode?: Pen['mode'];
  editorType: 'code' | 'compiled' | 'console';
}
