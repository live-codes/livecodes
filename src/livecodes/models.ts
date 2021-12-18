import { CompileOptions } from './compiler';
import { createEventsManager } from './events';

export interface API {
  run: () => Promise<void>;
  format: () => Promise<void>;
  getShareUrl: () => Promise<string>;
  getConfig: () => Config;
  setConfig: (Config: Config) => Promise<Config>;
  getCode: () => Promise<Code>;
}

export type Config = ContentConfig & AppConfig & UserConfig;

export interface ContentConfig {
  title: string;
  description: string;
  tags: string[];
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
      postcssImportUrl?: boolean;
      tailwindcss: boolean;
      windicss: boolean;
      autoprefixer: boolean;
      postcssPresetEnv: boolean;
    };
  };
  customSettings: customSettings;
  imports: { [key: string]: string };
  types: Types;
  readonly version: string;
}

export interface AppConfig {
  readonly: boolean;
  console: ToolsPaneStatus;
  compiled: ToolsPaneStatus;
  allowLangChange: boolean;
  mode: 'full' | 'editor' | 'codeblock' | 'result';
  editor: 'monaco' | 'codemirror' | 'prism' | '';
  showVersion: boolean;
}

export interface UserConfig {
  autoupdate: boolean;
  autosave: boolean;
  delay: number;
  formatOnsave: boolean;
  emmet: boolean;
  theme: Theme;
  enableRestore: boolean;
}

export type Language =
  | 'html'
  | 'htm'
  | 'markdown'
  | 'md'
  | 'mdown'
  | 'mkdn'
  | 'mdx'
  | 'astro'
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
  | 'twig'
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
  | 'react-native'
  | 'react-native.jsx'
  | 'react-native-tsx'
  | 'react-native.tsx'
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
  | 'riotjs'
  | 'malina'
  | 'malinajs'
  | 'xht'
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
  | 'commonlisp'
  | 'common-lisp'
  | 'lisp'
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
  | 'Binary'
  | 'csharp'
  | 'sql'
  | 'sqlite'
  | 'sqlite3'
  | 'blockly'
  | 'blockly.xml'
  | 'xml';

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
  info?: boolean;
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
    config: Config;
    language: Language;
    baseUrl: string;
    options: CompileOptions;
  },
) => Promise<string>;

export interface Compiler {
  dependencies?: Language[];
  url?: string;
  fn?: CompilerFunction;
  factory: (config: Config, baseUrl: string) => CompilerFunction;
  runOutsideWorker?: CompilerFunction;
  editors?: EditorId[];
  styles?:
    | string[]
    | ((options: { compiled: string; baseUrl: string; config: Config }) => string[]);
  scripts?:
    | string[]
    | ((options: { compiled: string; baseUrl: string; config: Config }) => string[]);
  deferScripts?: boolean;
  inlineScript?: string;
  scriptType?:
    | 'module'
    | 'text/liquid'
    | 'text/python'
    | 'text/x-uniter-php'
    | 'text/perl'
    | 'text/biwascheme'
    | 'text/commonlisp'
    | 'application/json'
    | 'application/lua'
    | 'application/wasm-uint8';
  liveReload?: boolean;
  aliasTo?: Language;
  compiledCodeLanguage?: Language;
  imports?: { [key: string]: string };
  types?: Types;
}

export interface Compilers {
  [language: string]: Compiler;
}

export type Template = Pick<
  Config,
  | 'title'
  | 'activeEditor'
  | 'markup'
  | 'style'
  | 'script'
  | 'stylesheets'
  | 'scripts'
  | 'cssPreset'
  | 'imports'
  | 'types'
> &
  Partial<Pick<Config, 'processors' | 'customSettings'>> & {
    name: string;
    thumbnail: string;
  };

export interface Tool {
  title: string;
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
  getEditor?: () => CodeEditor | undefined;
}

export type ToolsPaneStatus = 'closed' | 'open' | 'full' | 'none' | '';

export type ToolList = Array<{
  name: 'console' | 'compiled';
  factory: (
    config: Config,
    baseUrl: string,
    editors: Editors,
    eventsManager: ReturnType<typeof createEventsManager>,
  ) => Tool;
}>;

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string, newState?: boolean) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language, value?: string) => void;
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
  format: () => Promise<void>;
  isReadonly: boolean;
  setTheme: (theme: Theme) => void;
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
  mode?: Config['mode'];
  readonly: boolean;
  editor?: Config['editor'];
  editorType: 'code' | 'compiled' | 'console';
  editorBuild?: 'basic' | 'full';
  theme: Theme;
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
  screen:
    | 'login'
    | 'info'
    | 'new'
    | 'open'
    | 'assets'
    | 'add-asset'
    | 'import'
    | 'external'
    | 'share'
    | 'deploy'
    | 'custom-settings';
  show: (options?: any) => void | Promise<unknown>;
}

export type customSettings = {
  [key in Language | keyof Config['processors']['postcss']]?: any;
} & {
  template?: {
    data?: any;
    prerender?: boolean;
  };
};

export type EditorCache = Editor & {
  compiled: string;
  modified?: string;
};

export type Cache = ContentConfig & {
  markup: EditorCache;
  style: EditorCache;
  script: EditorCache;
  result?: string;
  styleOnlyUpdate?: boolean;
};

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

export type Theme = 'light' | 'dark';

export type Await<T> = T extends PromiseLike<infer U> ? U : T;

export type FileType =
  | 'image'
  | 'audio'
  | 'video'
  | 'archive'
  | 'html'
  | 'stylesheet'
  | 'script'
  | 'font'
  | 'icon'
  | 'json'
  | 'csv'
  | 'xml'
  | 'text'
  | 'other';

export interface Asset {
  id: string;
  filename: string;
  type: FileType;
  url: string;
  lastModified: number;
}
