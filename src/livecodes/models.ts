export interface API {
  run: () => Promise<void>;
  format: (allEditors?: boolean) => Promise<void>;
  getShareUrl: (shortUrl?: boolean) => Promise<string>;
  getConfig: (contentOnly?: boolean) => Promise<Config>;
  setConfig: (config: Partial<Config>) => Promise<Config>;
  getCode: () => Promise<Code>;
  show: (
    panel: EditorId | Tool['name'] | 'result',
    options?: { full?: boolean; line?: number; column?: number },
  ) => Promise<void>;
  runTests: () => Promise<{ results: TestResult[] }>;
  onChange: (fn: ChangeHandler) => { remove: () => void };
  exec: (command: APICommands, ...args: any[]) => Promise<{ output: any } | { error: string }>;
  destroy: () => Promise<void>;
}

export type ChangeHandler = ({ code, config }: { code: Code; config: Config }) => void;
export type APICommands = 'setBroadcastToken';

export interface Playground extends API {
  load: () => Promise<void>;
}

export interface EmbedOptions {
  appUrl?: string;
  config?: Partial<Config> | string;
  import?: string;
  lite?: boolean;
  loading?: 'lazy' | 'click' | 'eager';
  template?: string;
  view?: 'editor,result' | 'editor' | 'result';
}

export interface Config extends ContentConfig, AppConfig, UserConfig {}

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
  customSettings: CustomSettings;
  imports: { [key: string]: string };
  types: Types;
  tests: Partial<Editor> | undefined;
  readonly version: string;
}

export interface AppConfig {
  readonly: boolean;
  allowLangChange: boolean;
  mode: 'full' | 'editor' | 'codeblock' | 'result';
  editor: 'monaco' | 'codemirror' | 'codejar' | '';
  showVersion: boolean;
  tools: {
    enabled: Array<Tool['name']> | 'all';
    active: Tool['name'] | '';
    status: ToolsPaneStatus;
  };
}

export interface UserConfig {
  autoupdate: boolean;
  autosave: boolean;
  delay: number;
  formatOnsave: boolean;
  emmet: boolean;
  theme: Theme;
  recoverUnsaved: boolean;
  showSpacing: boolean;
}

export interface UserData {
  id: string;
  data: Partial<{
    sync: {
      autosync: boolean;
      repo: string;
      lastSync: number;
    };
    deploys: {
      [key: string]: string; // projectId => repoName
    };
  }>;
}

export interface AppData {
  defaultTemplate?: string | null;
  language?: Language;
  snippets?: {
    language: Language;
  };
  broadcast?: {
    serverUrl: string;
    userToken?: string;
  };
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
  | 'mustache'
  | 'handlebars'
  | 'hbs'
  | 'ejs'
  | 'nunjucks'
  | 'njk'
  | 'liquid'
  | 'liquidjs'
  | 'dot'
  | 'twig'
  | 'art-template'
  | 'art'
  | 'diagrams'
  | 'diagram'
  | 'graph'
  | 'plt'
  | 'richtext'
  | 'rte'
  | 'rich'
  | 'rte.html'
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
  | 'clio'
  | 'imba'
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
  | 'cpp'
  | 'c'
  | 'C'
  | 'cp'
  | 'cxx'
  | 'c++'
  | 'cppm'
  | 'ixx'
  | 'ii'
  | 'hpp'
  | 'h'
  | 'clang'
  | 'clang.cpp'
  | 'perl'
  | 'pl'
  | 'pm'
  | 'lua'
  | 'julia'
  | 'jl'
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
  | 'tcl'
  | 'wat'
  | 'wast'
  | 'webassembly'
  | 'wasm'
  | 'Binary'
  | 'csharp'
  | 'sql'
  | 'sqlite'
  | 'sqlite3'
  | 'prolog.pl'
  | 'prolog'
  | 'blockly'
  | 'blockly.xml'
  | 'xml'
  | 'pintora';

export interface Editor {
  language: Language;
  content?: string;
  contentUrl?: string;
  selector?: string;
  position?: EditorPosition;
}

export interface EditorPosition {
  lineNumber: number;
  column?: number;
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
  [key: string]:
    | string
    | {
        url: string;
        declareAsModule?: boolean;
        autoload?: boolean;
      };
}

export interface LanguageSpecs {
  name: Language;
  title: string;
  longTitle?: string;
  info?: boolean;
  parser?: Parser;
  formatter?: LanguageFormatter;
  compiler: Compiler | Language;
  extensions: Language[];
  editor: EditorId;
  editorLanguage?: Language;
  preset?: CssPresetId;
  largeDownload?: boolean;
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

export interface CompileOptions {
  html?: string;
  blockly?: BlocklyContent;
  forceCompile?: boolean;
}

export type CompilerFunction = (
  code: string,
  {
    config,
    language,
    baseUrl,
    options,
    worker,
  }: {
    config: Config;
    language: Language;
    baseUrl: string;
    options: CompileOptions;
    worker?: Worker;
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
  inlineScript?: string | ((options: { baseUrl: string }) => Promise<string>);
  scriptType?:
    | 'module'
    | 'text/liquid'
    | 'text/python'
    | 'text/x-uniter-php'
    | 'text/cpp'
    | 'text/perl'
    | 'text/julia'
    | 'text/biwascheme'
    | 'text/commonlisp'
    | 'text/tcl'
    | 'text/prolog'
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
  Partial<Pick<Config, 'processors' | 'customSettings' | 'tests'>> & {
    name: string;
    thumbnail: string;
  };

export interface Tool {
  name: 'console' | 'compiled' | 'tests';
  title: 'Console' | 'Compiled' | 'Tests';
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
  getEditor?: () => CodeEditor | undefined;
}

export type ToolsPaneStatus = 'closed' | 'open' | 'full' | 'none' | '';

export type ToolList = Array<{
  name: Tool['name'];
  factory: (
    config: Config,
    baseUrl: string,
    editors: Editors,
    eventsManager: EventsManager,
    isEmbed: boolean,
    runTests: () => Promise<void>,
  ) => Tool;
}>;

export interface Console extends Tool {
  title: 'Console';
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  table: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  clear: () => void;
  // filterLog: (filter: string) => void;
  evaluate: (code: string) => void;
}

export interface CompiledCodeViewer extends Tool {
  title: 'Compiled';
  update: (language: Language, content: string, label?: string | undefined) => void;
  reloadEditor: () => Promise<void>;
}

export interface TestViewer extends Tool {
  title: 'Tests';
  showResults: ({ results, error }: { results: TestResult[]; error?: string }) => void;
  resetTests: () => void;
  clearTests: () => void;
}

export interface ToolsPane {
  load: () => Promise<void>;
  open: () => void;
  close: () => void;
  maximize: () => void;
  hide: () => void;
  getStatus: () => ToolsPaneStatus;
  getActiveTool: () => Tool['name'];
  setActiveTool: (name: Tool['name']) => void;
  disableTool: (name: Tool['name']) => void;
  enableTool: (name: Tool['name']) => void;
  console?: Console;
  compiled?: CompiledCodeViewer;
  tests?: TestViewer;
}

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string, newState?: boolean) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language, value?: string) => void;
  getEditorId: () => string;
  focus: () => void;
  getPosition: () => EditorPosition;
  setPosition: (position: EditorPosition) => void;
  layout?: () => void;
  addTypes?: (lib: EditorLibrary) => any;
  configureEmmet?: (enabled: boolean) => void;
  onContentChanged: (callback: () => void) => void;
  addKeyBinding: (label: string, keybinding: any, callback: () => void) => void;
  keyCodes: {
    CtrlEnter: any;
    ShiftEnter: any;
    Enter: any;
    UpArrow: any;
    DownArrow: any;
    ShiftAltF: any;
  };
  registerFormatter: (formatFn: FormatFn | undefined) => void;
  format: () => Promise<void>;
  isReadonly: boolean;
  setTheme: (theme: Theme) => void;
  undo: () => void;
  redo: () => void;
  destroy: () => void;
  monaco?: any;
  codemirror?: any;
  prism?: any;
  codejar?: any;
  isFake?: boolean;
}

export interface EditorOptions {
  baseUrl: string;
  container: HTMLElement | null;
  language: Language;
  value: string;
  mode?: Config['mode'];
  readonly: boolean;
  editor?: Config['editor'];
  editorId:
    | EditorId
    | 'compiled'
    | 'console'
    | 'customSettings'
    | 'tests'
    | 'embed'
    | 'snippet'
    | 'add-snippet';
  editorBuild?: 'basic' | 'full';
  theme: Theme;
  isEmbed: boolean;
  getLanguageExtension: (alias: string) => Language | undefined;
  mapLanguage: (language: Language) => Language;
}

export interface CustomEditor {
  language: Language;
  show: (show: boolean, options: CustomEditorOptions) => Promise<void>;
  getContent: (options: CustomEditorOptions) => Promise<unknown>;
  setTheme: (theme: Theme) => void;
}

export interface CustomEditorOptions {
  baseUrl: string;
  editors: Editors;
  config: Config;
  html: string;
  eventsManager: EventsManager;
}

export type CustomEditors = {
  [key in Language]?: CustomEditor;
};

export interface BlocklyContent {
  xml?: string;
  js?: string;
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
    | 'snippets'
    | 'add-snippet'
    | 'import'
    | 'external'
    | 'share'
    | 'embed'
    | 'deploy'
    | 'sync'
    | 'backup'
    | 'broadcast'
    | 'custom-settings'
    | 'test-editor';
  show: (options?: any) => void | Promise<unknown>;
}

export type CustomSettings = Partial<
  {
    [key in Language | keyof Config['processors']['postcss']]: any;
  } & {
    template: {
      data?: any;
      prerender?: boolean;
    };
    scriptType:
      | 'module'
      | 'application/javascript'
      | 'application/ecmascript'
      | 'text/javascript'
      | 'text/ecmascript'
      | ''
      | Compiler['scriptType'];
    mapImports: boolean;
    imports: Record<string, string>;
    convertCommonjs: boolean;
    types: Types;
    head: string;
    htmlClasses: string;
  }
>;

export type EditorCache = Editor & {
  compiled: string;
  modified?: string;
};

export type Cache = ContentConfig & {
  markup: EditorCache;
  style: EditorCache;
  script: EditorCache;
  tests?: EditorCache;
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

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: Language;
  code: string;
  lastModified: number;
}

export interface EventsManager {
  addEventListener: (
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: Event | KeyboardEvent | MouseEvent | MessageEvent) => void,
    _options?: any,
  ) => void;
  removeEventListener: (
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: Event | KeyboardEvent | MouseEvent | MessageEvent) => void,
  ) => void;
  removeEventListeners: () => void;
}

export interface TestResult {
  duration: number;
  errors: string[];
  status: 'pass' | 'fail';
  testPath: string[];
}

export interface Subscribable<T> {
  subscribe: (fn: (data: T) => void) => { unsubscribe: () => void };
  unsubscribeAll: () => void;
}

type languageSelector = `${Language}-selector`;
type ToolNames =
  | `${Tool['name']}`
  | `${Tool['name']},${Tool['name']}`
  | `${Tool['name']},${Tool['name']},${Tool['name']}`;
type ToolsStatus = `${ToolNames}|${Config['tools']['status']}`;

export type UrlQueryParams = Partial<
  EmbedOptions &
    Config &
    Screen & { [key in Language]: string } & { [key in languageSelector]: string } & {
      config: string;
      embed: boolean;
      preview: boolean;
      x: string;
      raw: Language;
      language: Language;
      lang: Language;
      languages: string; // comma-separated languages
      active: EditorId;
      tags: string | string[];
      'no-defaults': boolean;
      tools: 'open' | 'full' | 'closed' | 'console' | 'compiled' | 'tests' | 'none' | ToolsStatus;
    } & {
      [key in Tool['name']]: 'open' | 'full' | 'closed' | 'none';
    }
>;
