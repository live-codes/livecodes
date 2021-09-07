import { createEventsManager } from './events';

export interface API {
  run: () => Promise<void>;
  save: () => void;
  getShareUrl: () => string;
  getConfig: () => Pen;
  setConfig: (Config: Pen) => Promise<Pen>;
  getCode: () => Promise<Code>;
}

export interface Pen {
  title: string;
  autoupdate: boolean;
  autosave: boolean;
  delay: number;
  emmet: boolean;
  mode: 'full' | 'editor' | 'codeblock' | 'result';
  readonly: boolean;
  console: ToolsPaneStatus;
  compiled: ToolsPaneStatus;
  allowLangChange: boolean;
  activeEditor: EditorId | undefined;
  languages: Language[] | undefined;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  processors: {
    postcss: {
      autoprefixer: boolean;
      postcssPresetEnv: boolean;
      tailwindcss: boolean;
    };
  };
  customSettings: customSettings;
  imports: { [key: string]: string };
  types: Types;
  editor: 'monaco' | 'codemirror' | 'prism' | '';
  readonly version: string;
  showVersion: boolean;
}

export type ContentPen = Pick<
  Pen,
  | 'title'
  | 'activeEditor'
  | 'languages'
  | 'markup'
  | 'style'
  | 'script'
  | 'stylesheets'
  | 'scripts'
  | 'cssPreset'
  | 'processors'
  | 'customSettings'
  | 'imports'
  | 'types'
  | 'version'
>;

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
  | 'haml'
  | 'asciidoc'
  | 'adoc'
  | 'asc'
  | 'handlebars'
  | 'hbs'
  | 'ejs'
  | 'nunjucks'
  | 'njk'
  | 'liquid'
  | 'liquidjs'
  | 'dot'
  | 'css'
  | 'scss'
  | 'sass'
  | 'less'
  | 'stylus'
  | 'styl'
  | 'postcss'
  | 'javascript'
  | 'js'
  | 'json'
  | 'babel'
  | 'es'
  | 'typescript'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'vue'
  | 'vue3'
  | 'vue2'
  | 'svelte'
  | 'stencil'
  | 'stencil.tsx'
  | 'solid'
  | 'solid.jsx'
  | 'solid.tsx'
  | 'riot'
  | 'coffeescript'
  | 'coffee'
  | 'livescript'
  | 'ls'
  | 'assemblyscript'
  | 'as'
  | 'python'
  | 'py'
  | 'pyodide'
  | 'py3'
  | 'ruby'
  | 'rb'
  | 'go'
  | 'golang'
  | 'php'
  | 'perl'
  | 'pl'
  | 'pm'
  | 'lua'
  | 'scheme'
  | 'scm'
  | 'rescript'
  | 'res'
  | 'resi'
  | 'reason'
  | 're'
  | 'rei'
  | 'ocaml'
  | 'ml'
  | 'mli'
  | 'wat'
  | 'wast'
  | 'webassembly'
  | 'wasm'
  | 'Binary';

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

export interface Types {
  [key: string]: TypeValue;
}

export type TypeValue =
  | string
  | {
      url: string;
      declareAsModule?: boolean;
      autoload?: boolean;
    };

export interface LanguageSpecs {
  name: Language;
  title: string;
  longTitle?: string;
  info?: string;
  parser?: Parser;
  formatter?: LanguageFormatter;
  compiler?: Compiler | Language;
  extensions: Language[];
  editor: EditorId;
  editorLanguage?: Language;
  preset?: CssPresetId;
}

export interface Processors {
  name: ProcessorName | Language;
  title: string;
  longTitle?: string;
  info?: string;
  compiler: Compiler | ProcessorName | Language;
  editors?: EditorId[];
}

export type ProcessorName = 'postcss';

export type ParserName =
  | 'babel'
  | 'babel-ts'
  | 'glimmer'
  | 'html'
  | 'markdown'
  | 'css'
  | 'scss'
  | 'less'
  | 'php'
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

export interface LanguageFormatter {
  factory: (baseUrl: string, language: Language) => FormatFn;
}

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

export type CompilerFunction = (
  code: string,
  {
    config,
    language,
    baseUrl,
    options,
  }: {
    config: Pen;
    language: Language;
    baseUrl: string;
    options: any;
  },
) => Promise<string>;

export interface Compiler {
  dependencies?: Language[];
  url?: string;
  fn?: CompilerFunction;
  factory: (config: Pen, baseUrl: string) => CompilerFunction;
  runOutsideWorker?: CompilerFunction;
  editors?: EditorId[];
  styles?: string[] | ((options: { compiled: string; baseUrl: string; config: Pen }) => string[]);
  scripts?: string[] | ((options: { compiled: string; baseUrl: string; config: Pen }) => string[]);
  deferScripts?: boolean;
  inlineScript?: string;
  scriptType?:
    | 'module'
    | 'text/liquid'
    | 'text/python'
    | 'text/x-uniter-php'
    | 'text/perl'
    | 'text/biwascheme'
    | 'application/lua'
    | 'application/wasm-uint8';
  liveReload?: boolean;
  aliasTo?: Language;
  compiledCodeLanguage?: Language;
}

export interface Compilers {
  [language: string]: Compiler;
}

export interface Template {
  name: string;
  title: string;
  thumbnail: string;
  activeEditor: EditorId;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  processors?: {
    postcss: {
      autoprefixer: boolean;
      postcssPresetEnv: boolean;
      tailwindcss: boolean;
    };
  };
  imports: { [key: string]: string };
  types: Types;
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
    baseUrl: string,
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
  destroy: () => void;
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

export interface User {
  uid: string;
  token: string | null;
  displayName: string | null;
  username: string | null;
  email: string | null;
  photoURL: string | null;
}

export type GithubScope = 'gist' | 'repo' | 'public_repo';

export interface ShareData {
  url: string;
  title: string;
}

export interface Screen {
  screen: 'login' | 'new' | 'open' | 'import' | 'external' | 'share' | 'deploy' | 'custom-settings';
  show: () => void | Promise<unknown>;
}

export type customSettings = {
  [key in Language | keyof Pen['processors']['postcss']]?: any;
} & {
  template?: {
    data?: any;
    prerender?: boolean;
  };
};

export type Cache = {
  [key in EditorId]: { language: Language; content: string; compiled: string; modified?: string };
} & { result?: string };

export interface Code {
  markup: {
    language: Language;
    content: string;
    compiled: string;
  };
  style: {
    language: Language;
    content: string;
    compiled: string;
  };
  script: {
    language: Language;
    content: string;
    compiled: string;
  };
  result: string;
}
