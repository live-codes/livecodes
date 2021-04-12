import { createEventsManager } from './events';

export interface Pen {
  baseUrl: string;
  title: string;
  autoupdate: boolean;
  autosave: boolean;
  delay: number;
  emmet: boolean;
  autoprefixer: boolean;
  mode: 'full' | 'editor' | 'codeblock' | 'result';
  readonly: boolean;
  console: ToolsPaneStatus;
  compiled: ToolsPaneStatus;
  allowLangChange: boolean;
  language: Language | undefined;
  languages: Language[] | undefined;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  modules: Module[];
  editor: 'monaco' | 'codemirror' | 'prism' | '';
  showVersion: boolean;
}

export type Language =
  | 'html'
  | 'htm'
  | 'markdown'
  | 'md'
  | 'mdown'
  | 'mkdn'
  | 'mdx'
  | 'pug'
  | 'jade'
  | 'asciidoc'
  | 'adoc'
  | 'asc'
  | 'css'
  | 'scss'
  | 'sass'
  | 'less'
  | 'stylus'
  | 'styl'
  | 'javascript'
  | 'js'
  | 'babel'
  | 'es'
  | 'typescript'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'vue'
  | 'vue3'
  | 'vue2'
  | 'coffeescript'
  | 'coffee'
  | 'python'
  | 'py'
  | 'ruby'
  | 'rb'
  | 'php'
  | 'scheme'
  | 'scm';

export interface Editor {
  language: Language;
  content?: string;
  contentUrl?: string;
  selector?: string;
}

export type EditorId = 'markup' | 'style' | 'script';

export interface Editors {
  markup: CodeEditor;
  style: CodeEditor;
  script: CodeEditor;
}
export interface EditorLanguages {
  markup: Language;
  style: Language;
  script: Language;
}

export interface Module {
  name: string;
  url?: string;
  typesUrl?: string;
}

export interface LanguageSpecs {
  name: Language;
  title: string;
  longTitle?: string;
  parser?: Parser;
  compiler?: Compiler | Language;
  extensions: Language[];
  editor: EditorId;
  preset?: CssPresetId;
}

export interface Processors {
  name: ProcessorName | Language;
  compiler: Compiler | ProcessorName | Language;
  editors?: EditorId[];
}

export type ProcessorName = 'autoprefixer';

export type ParserName =
  | 'babel'
  | 'babel-ts'
  | 'html'
  | 'markdown'
  | 'css'
  | 'scss'
  | 'less'
  | 'pug';
export interface Parser {
  name: ParserName;
  plugins?: any[];
  pluginUrls: string[];
}
export type FormatFn = (
  value: string,
  cursorOffset: number,
) => Promise<{ formatted: string; cursorOffset: number }>;
export type CssPresetId =
  | ''
  | 'normalize.css'
  | 'reset-css'
  | 'github-markdown-css'
  | 'asciidoctor.css';

export interface CssPreset {
  id: CssPresetId;
  name: string;
  url: string;
}

export interface EditorLibrary {
  filename: string;
  content: string;
}

export interface Compiler {
  url: string;
  fn?: (code: string, options?: any) => any;
  factory: (compilerModule: any, config: Pen) => (code: string) => string | Promise<string>;
  umd?: boolean;
  editors?: EditorId[];
  styles?: string[];
  scripts?: string[];
  deferScripts?: boolean;
  inlineScript?: string;
  scriptType?: 'text/python' | 'text/ruby' | 'text/x-uniter-php' | 'text/biwascheme';
}

export interface Compilers {
  [language: string]: Compiler;
}

export interface Template {
  title: string;
  thumbnail: string;
  language: Language;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  modules: Module[];
}

export interface Tool {
  title: string;
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
}

export type ToolsPaneStatus = 'closed' | 'open' | 'full' | 'none' | '';

export type ToolList = Array<{
  name: 'console' | 'compiled';
  factory: (
    config: Pen,
    editors: Editors,
    eventsManager: ReturnType<typeof createEventsManager>,
  ) => Tool;
}>;

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string, newState?: boolean) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language) => void;
  focus: () => void;
  layout?: () => void;
  addTypes?: (lib: EditorLibrary) => any;
  configureEmmet?: (enabled: boolean) => void;
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
  isReadonly: boolean;
  monaco?: any;
  codemirror?: any;
  prism?: any;
}

export interface EditorOptions {
  baseUrl: string;
  container: HTMLElement | null;
  language: Language;
  value: string;
  mode?: Pen['mode'];
  readonly: boolean;
  editor?: Pen['editor'];
  editorType: 'code' | 'compiled' | 'console';
}
