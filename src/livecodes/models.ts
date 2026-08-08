export type * from '../sdk/internal';
export type * from '../sdk/models';

import type {
  Config,
  ContentConfig,
  CssPresetId,
  Editor,
  EditorConfig,
  EditorId,
  EditorPosition,
  FormatterConfig,
  Language,
  Processor,
  ScreenName,
  SidebarSectionName,
  SidebarStatus,
  SourceFile,
  TemplateName,
  TestResult,
  Theme,
  ToolName,
  ToolsPaneStatus,
  Types,
} from '../sdk/models';

export interface Editors {
  [key: string]: CodeEditor;
  markup: CodeEditor;
  style: CodeEditor;
  script: CodeEditor;
}
export interface EditorLanguages {
  [key: string]: Language;
  markup: Language;
  style: Language;
  script: Language;
}

export type LanguageEditorSupport = {
  monaco?: {
    language?: Language;
    languageSupport?:
      | string
      | ((
          monaco: any,
        ) => void | Promise<void> | { dispose: () => void } | Promise<{ dispose: () => void }>);
  };
  codemirror?: {
    language?: Language;
    languageSupport?: string | (() => void | Promise<void>);
  };
  codejar?: {
    language?: Language;
  };
} & {
  compilerOptions?: Record<string, unknown>;
};

export interface LanguageSpecs {
  name: Language;
  title: string;
  longTitle?: string;
  info?: boolean;
  formatter?: LanguageFormatter;
  compiler: Compiler | Language;
  extensions: Language[];
  editor: EditorId;
  editorLanguage?: Language;
  editorSupport?: LanguageEditorSupport;
  preset?: CssPresetId;
  largeDownload?: boolean;
  multiFileSupport?: boolean;
}

export interface ProcessorSpecs {
  name: Processor;
  title: string;
  longTitle?: string;
  info?: string;
  isPostcssPlugin: boolean;
  needsHTML?: boolean;
  compiler: {
    url: string;
    factory: (
      config: Config,
      baseUrl: string,
      options: CompileOptions,
    ) => CompilerFunction | CompilerFunction[];
  };
  editor: EditorId;
  hidden?: boolean;
}

export type ParserName =
  | 'babel'
  | 'babel-ts'
  | 'babel-flow'
  | 'json'
  | 'json5'
  | 'jsonc'
  | 'glimmer'
  | 'html'
  | 'markdown'
  | 'css'
  | 'scss'
  | 'less'
  | 'php'
  | 'pug'
  | 'java'
  | 'minizinc';

export interface PrettierParser {
  name: ParserName;
  plugins?: any[];
  pluginUrls: string[];
}
export type FormatFn = (
  value: string,
  cursorOffset: number,
  formatterConfig?: Partial<FormatterConfig>,
) => Promise<{ formatted: string; cursorOffset: number }>;

export type LanguageFormatter =
  | {
      factory: (baseUrl: string, language: Language) => FormatFn;
    }
  | { prettier: PrettierParser };

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
  filename: string;
  html?: string;
  blockly?: BlocklyContent;
  forceCompile?: boolean;
  compileInfo?: CompileInfo;
}

export interface CompileInfo {
  cssModules?: Record<string, Record<string, string>>;
  modifiedHTML?: string;
  importedContent?: string;
  imports?: Record<string, string>;
  errors?: string[];
}

export interface CompileResult {
  code: string;
  info: CompileInfo;
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
    language: Language | Processor;
    baseUrl: string;
    options: CompileOptions;
    worker?: Worker;
  },
) => Promise<string | CompileResult>;

export interface Compiler {
  dependencies?: Language[];
  url?: string;
  fn?: CompilerFunction;
  factory: (config: Config, baseUrl: string) => CompilerFunction | Promise<CompilerFunction>;
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
  inlineModule?: string | ((options: { baseUrl: string }) => Promise<string>);
  loadAsExternalModule?: boolean;
  scriptType?:
    | 'module'
    | 'text/liquid'
    | 'text/python'
    | 'text/r'
    | 'text/ruby-wasm'
    | 'text/x-uniter-php'
    | 'text/php-wasm'
    | 'text/cpp'
    | 'text/java'
    | 'text/csharp-wasm'
    | 'text/perl'
    | 'text/julia'
    | 'text/biwascheme'
    | 'text/commonlisp'
    | 'text/tcl'
    | 'text/prolog'
    | 'text/minizinc'
    | 'text/go-wasm'
    | 'application/json'
    | 'application/lua'
    | 'text/fennel'
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

export interface Tool {
  name: ToolName;
  title: string;
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
  getEditor?: () => CodeEditor | undefined;
}

export type ToolList = Array<{
  name: ToolName;
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
  title: string;
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  table: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  clear: (silent?: boolean) => void;
  // filterLog: (filter: string) => void;
  evaluate: (code: string) => void;
  reloadEditor: (config: Config) => Promise<void>;
  setTheme?: (theme: Theme) => void;
}

export interface CompiledCodeViewer extends Tool {
  title: string;
  update: (language: Language, content: string, label?: string | undefined) => void;
  reloadEditor: (config: Config) => Promise<void>;
}

export interface TestViewer extends Tool {
  title: string;
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
  getActiveTool: () => ToolName;
  setActiveTool: (name: ToolName) => void;
  disableTool: (name: ToolName) => void;
  enableTool: (name: ToolName) => void;
  console?: Console;
  compiled?: CompiledCodeViewer;
  tests?: TestViewer;
}

export interface SidebarSection {
  name: SidebarSectionName;
  title: string;
  icon: string;
  load: () => Promise<void>;
  onActivate: () => void;
  onDeactivate: () => void;
  destroy: () => void;
}

export type SidebarSectionList = Array<{
  name: SidebarSectionName;
  factory:
    | string // url to a module whose default export is a factory function
    | ((
        container: HTMLElement,
        options: {
          config: Config;
          baseUrl: string;
          editors: Editors;
          eventsManager: EventsManager;
          isEmbed: boolean;
          dir: 'ltr' | 'rtl';
        },
      ) => SidebarSection | Promise<SidebarSection>);
}>;

export interface FilesSection extends SidebarSection {
  title: 'Files';
}

export interface Sidebar {
  load: () => Promise<void>;
  open: () => void;
  close: () => void;
  hide: () => void;
  getStatus: () => SidebarStatus;
  getActiveSection: () => SidebarSectionName;
  setActiveSection: (name: SidebarSectionName) => void;
  disableSection: (name: SidebarSectionName) => void;
  enableSection: (name: SidebarSectionName) => void;
  files?: FilesSection;
  destroy: () => void;
}

export interface CodeEditor {
  getValue: () => string;
  setValue: (value?: string, newState?: boolean) => void;
  getLanguage: () => Language;
  setLanguage: (language: Language, value?: string) => void;
  getEditorId: () => string;
  setEditorId: (filename: string, language?: Language) => void;
  focus: () => void;
  getPosition: () => EditorPosition;
  setPosition: (position: EditorPosition) => void;
  foldRegions?: () => void | Promise<void>;
  foldLines?: (linesToFold: Array<{ from: number; to: number }>) => void | Promise<void>;
  layout?: () => void;
  addTypes?: (lib: EditorLibrary, force?: boolean) => any;
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
  changeSettings: (editorSettings: EditorConfig) => void;
  configureTailwindcss?: (enabled: boolean) => void;
  registerFormatter: (formatFn: FormatFn | undefined) => void;
  format: () => Promise<void>;
  isReadonly: boolean;
  setTheme: (theme: Theme, editorTheme: Config['editorTheme']) => void;
  undo: () => void;
  redo: () => void;
  destroy: () => void;
  monaco?: any;
  codemirror?: any;
  prism?: any;
  codejar?: any;
  isFake?: boolean;
}

export interface EditorOptions extends EditorConfig {
  baseUrl: string;
  container: HTMLElement | null;
  language: Language;
  value: string;
  mode?: Config['mode'];
  readonly: boolean;
  editorId:
    | EditorId
    | 'compiled'
    | 'console'
    | 'customSettings'
    | 'editorSettings'
    | 'codeToImage'
    | 'tests'
    | 'embed'
    | 'snippet'
    | 'add-snippet';
  theme: Theme;
  isEmbed: boolean;
  isLite: boolean;
  isHeadless: boolean;
  getLanguageExtension: (alias: string) => Language | undefined;
  mapLanguage: (
    language: Language,
    editor?: Exclude<Config['editor'], 'auto' | undefined>,
  ) => Language;
  getFormatterConfig: () => Partial<FormatterConfig>;
  getFontFamily: (font: string | undefined) => string;
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
  screen: ScreenName;
  show: (options?: any) => void | Promise<unknown>;
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
  recentTemplates?: Array<{ name: TemplateName; title: string }>;
  recentProjects?: Array<{ id: string; title: string; description: string }>;
  language?: Language;
  snippets?: {
    language: Language;
  };
  broadcast?: {
    serverUrl: string;
    userToken?: string;
  };
  codeToImagePreset?: Record<string, any>;
}

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
  addEventListener: <T extends Event>(
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: T) => any,
    _options?: any,
  ) => void;
  removeEventListener: <T extends Event>(
    element: HTMLElement | Document | Window | FileReader | null,
    eventType: string,
    fn: (event: T) => any,
  ) => void;
  removeEventListeners: () => void;
}

export interface Subscribable<T> {
  subscribe: (fn: (data: T) => void) => { unsubscribe: () => void };
  unsubscribeAll: () => void;
}

export type Await<T> = T extends PromiseLike<infer U> ? U : T;

export type EditorCache = Editor & {
  compiled: string;
  modified?: string;
};

export type Cache = Omit<ContentConfig, 'files'> & {
  markup: EditorCache;
  style: EditorCache;
  script: EditorCache;
  tests?: EditorCache;
  files: Array<SourceFile & { compiled: string; modified?: string }>;
  mainFile?: string;
  result?: string;
  styleOnlyUpdate?: boolean;
};

export interface PkgInfo {
  name: string;
  description?: string;
  version?: string;
  repository?: {
    url?: string;
  };
  repo?: string;
  homepage?: string;
}

export interface APIError {
  error: boolean;
  status?: number;
  message?: string;
}

export interface CDNService {
  search: (query: string, limit?: number) => Promise<PkgInfo[] | APIError>;
  getPkgInfo: (pkgName: string) => Promise<PkgInfo | APIError>;
  getPkgFiles: (pkgName: string) => Promise<{ default?: string; files: string[] } | APIError>;
  getPkgDefaultFiles: (pkgName: string) => Promise<{ js?: string; css?: string } | APIError>;
}

export interface WorkerMessageEvent<T, K = unknown> extends MessageEvent {
  data: {
    messageId: string;
    method: T;
    args?: any;
    data?: K;
  };
}

export interface ModalOptions {
  size?: 'large' | 'small' | 'full' | 'large-fixed';
  closeButton?: boolean;
  isAsync?: boolean;
  onClose?: () => void;
  scrollToSelector?: string;
  autoFocus?: boolean;
}

export interface Modal {
  show: (container: HTMLElement, options?: ModalOptions) => void;
  close: () => void;
}

export interface Notifications {
  info: (message: string, dismissable?: boolean) => void;
  success: (message: string, dismissable?: boolean) => void;
  warning: (message: string, dismissable?: boolean) => void;
  error: (message: string, dismissable?: boolean) => void;
  confirm: (message: string, confirmCallback: () => void, cancelCallback?: () => void) => void;
}

export interface INinjaAction {
  title: string;
  keywords?: string;
  content?: string;
  id?: string;
  hotkey?: string;
  icon?: string;
  mdIcon?: string;
  parent?: string;
  children?: string[] | Array<Omit<INinjaAction, 'parent'>>;
  section?: string;
  href?: string;
  attributes?: Record<string, string>;
  handler?: (
    action: INinjaAction,
    event: KeyboardEvent | CustomEvent<INinjaAction> | undefined,
    searchQuery: string,
  ) => void | { keepOpen: boolean } | Promise<void>;
  matcher?: (
    action: INinjaAction,
    searchOptions: { searchString: string; searchRegex: RegExp },
  ) => boolean;
  keepOpen?: boolean;
}

export type ConfigWithCompiled = Omit<Config, 'files'> & {
  files: Array<SourceFile & { compiled: string }>;
};
