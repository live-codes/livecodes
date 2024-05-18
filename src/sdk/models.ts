export interface API {
  run: () => Promise<void>;
  format: (allEditors?: boolean) => Promise<void>;
  getShareUrl: (shortUrl?: boolean) => Promise<string>;
  getConfig: (contentOnly?: boolean) => Promise<Config>;
  setConfig: (config: Partial<Config>) => Promise<Config>;
  getCode: () => Promise<Code>;
  show: (
    panel: EditorId | Tool['name'] | 'result',
    options?: { full?: boolean; line?: number; column?: number; zoom?: Config['zoom'] },
  ) => Promise<void>;
  runTests: () => Promise<{ results: TestResult[] }>;
  /**
   * Runs a callback function when code changes.
   *
   * @deprecated Use the {@link watch} method instead.
   */
  onChange: (fn: ChangeHandler) => { remove: () => void };
  watch: WatchFn;
  exec: (command: APICommands, ...args: any[]) => Promise<{ output: any } | { error: string }>;
  destroy: () => Promise<void>;
}
/**
 * @deprecated Use the type {@link SDKCodeHandler} instead.
 */
export type ChangeHandler = SDKCodeHandler;
export type SDKReadyHandler = (data: { config: Config }) => void;
export type SDKCodeHandler = (data: { code: Code; config: Config }) => void;
export type SDKConsoleHandler = (data: { method: string; args: any[] }) => void;
export type SDKTestsHandler = (data: { results: TestResult[]; error?: string }) => void;
export type SDKGenericHandler = () => void;

export type WatchFns =
  | ((event: 'load', fn: SDKGenericHandler) => { remove: SDKGenericHandler })
  | ((event: 'ready', fn: SDKReadyHandler) => { remove: SDKGenericHandler })
  | ((event: 'code', fn: SDKCodeHandler) => { remove: SDKGenericHandler })
  | ((event: 'console', fn: SDKConsoleHandler) => { remove: SDKGenericHandler })
  | ((event: 'tests', fn: SDKTestsHandler) => { remove: SDKGenericHandler })
  | ((event: 'destroy', fn: SDKGenericHandler) => { remove: SDKGenericHandler });

export type SDKEvent = Parameters<WatchFns>[0];
export type SDKEventHandler = Parameters<WatchFns>[1];

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type WatchFn = UnionToIntersection<WatchFns>;

export type APICommands = 'setBroadcastToken' | 'showVersion';

export interface Playground extends API {
  load: () => Promise<void>;
}

export interface EmbedOptions {
  appUrl?: string;
  params?: UrlQueryParams;
  config?: Partial<Config> | string;
  import?: string;
  lite?: boolean;
  loading?: 'lazy' | 'click' | 'eager';
  template?: TemplateName;
  view?: 'split' | 'editor' | 'result' | 'headless';
}

export interface Config extends ContentConfig, AppConfig, UserConfig {}

export interface ContentConfig {
  title: string;
  description: string;
  head: string;
  htmlAttrs: Record<string, string> | string;
  tags: string[];
  activeEditor: EditorId | undefined;
  languages: Array<Language | Processor> | undefined;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  processors: Processor[];
  customSettings: CustomSettings;
  imports: { [key: string]: string };
  types: Types;
  tests: Partial<Editor> | undefined;
  readonly version: string;
}

export interface AppConfig {
  readonly: boolean;
  allowLangChange: boolean;
  mode: 'full' | 'focus' | 'simple' | 'editor' | 'codeblock' | 'result';
  tools: Partial<{
    enabled: Array<Tool['name']> | 'all';
    active: Tool['name'] | '';
    status: ToolsPaneStatus;
  }>;
  zoom: 1 | 0.5 | 0.25;
}

export interface UserConfig extends EditorConfig, FormatterConfig {
  autoupdate: boolean;
  autosave: boolean;
  autotest: boolean;
  delay: number;
  formatOnsave: boolean;
  layout: 'responsive' | 'horizontal' | 'vertical' | undefined;
  recoverUnsaved: boolean;
  showSpacing: boolean;
  welcome: boolean;
}

export interface EditorConfig {
  editor: 'monaco' | 'codemirror' | 'codejar' | undefined;
  theme: Theme;
  editorTheme: EditorTheme[] | string | undefined;
  fontFamily: string | undefined;
  fontSize: number | undefined;
  useTabs: boolean;
  tabSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
  closeBrackets: boolean;
  emmet: boolean;
  editorMode: 'vim' | 'emacs' | undefined;
  enableAI: boolean;
}

export interface FormatterConfig {
  useTabs: boolean;
  tabSize: number;
  semicolons: boolean;
  singleQuote: boolean;
  trailingComma: boolean;
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
  recentTemplates?: Array<{ name: Template['name']; title: string }>;
  recentProjects?: Array<{ id: string; title: string; description: string }>;
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
  | 'eta'
  | 'nunjucks'
  | 'njk'
  | 'liquid'
  | 'liquidjs'
  | 'dot'
  | 'twig'
  | 'art-template'
  | 'art'
  | 'bbcode'
  | 'bb'
  | 'mjml'
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
  | 'stylis'
  | 'postcss'
  | 'javascript'
  | 'js'
  | 'json'
  | 'babel'
  | 'es'
  | 'sucrase'
  | 'typescript'
  | 'flow'
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
  | 'civet'
  | 'clio'
  | 'imba'
  | 'assemblyscript'
  | 'as'
  | 'python'
  | 'py'
  | 'pyodide'
  | 'python-wasm'
  | 'py-wasm'
  | 'pythonwasm'
  | 'pywasm'
  | 'py3'
  | 'wasm.py'
  | 'r'
  | 'rlang'
  | 'rstats'
  | 'r-wasm'
  | 'ruby'
  | 'rb'
  | 'ruby-wasm'
  | 'wasm.rb'
  | 'rubywasm'
  | 'go'
  | 'golang'
  | 'php'
  | 'php-wasm'
  | 'phpwasm'
  | 'wasm.php'
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
  | 'cpp-wasm'
  | 'cppwasm'
  | 'cwasm'
  | 'wasm.cpp'
  | 'clang'
  | 'clang.cpp'
  | 'perl'
  | 'pl'
  | 'pm'
  | 'lua'
  | 'lua-wasm'
  | 'luawasm'
  | 'wasm.lua'
  | 'teal'
  | 'tl'
  | 'fennel'
  | 'fnl'
  | 'julia'
  | 'jl'
  | 'scheme'
  | 'scm'
  | 'commonlisp'
  | 'common-lisp'
  | 'lisp'
  | 'clojurescript'
  | 'clojure'
  | 'cljs'
  | 'clj'
  | 'cljc'
  | 'edn'
  | 'gleam'
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
  | 'pg.sql'
  | 'pgsql.sql'
  | 'pgsql'
  | 'pg'
  | 'pglite'
  | 'pglite.sql'
  | 'postgresql'
  | 'postgres'
  | 'postgre.sql'
  | 'postgresql.sql'
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
  hiddenContent?: string;
  hiddenContentUrl?: string;
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
        declareAsGlobal?: boolean;
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

export type Processor =
  | 'postcss'
  | 'postcssImportUrl'
  | 'tailwindcss'
  | 'windicss'
  | 'unocss'
  | 'tokencss'
  | 'lightningcss'
  | 'autoprefixer'
  | 'postcssPresetEnv'
  | 'cssmodules'
  | 'purgecss'
  | 'cssnano';

export type ParserName =
  | 'babel'
  | 'babel-ts'
  | 'babel-flow'
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
  formatterConfig?: Partial<FormatterConfig>,
) => Promise<{ formatted: string; cursorOffset: number }>;

export interface LanguageFormatter {
  factory: (baseUrl: string, language: Language) => FormatFn;
}

export type CssPresetId = '' | 'normalize.css' | 'reset-css';

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
  compileInfo?: CompileInfo;
}

export interface CompileInfo {
  cssModules?: Record<string, string>;
  modifiedHTML?: string;
  importedContent?: string;
  imports?: Record<string, string>;
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
    | 'text/perl'
    | 'text/julia'
    | 'text/biwascheme'
    | 'text/commonlisp'
    | 'text/tcl'
    | 'text/prolog'
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

export type Template = Pick<ContentConfig, 'title' | 'markup' | 'style' | 'script'> &
  Partial<ContentConfig> & {
    name: TemplateName;
    aliases?: TemplateName[];
    thumbnail: string;
    tools?: Config['tools'];
    autotest?: Config['autotest'];
  };

export type TemplateName =
  | 'blank'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'react-native'
  | 'vue2'
  | 'vue'
  | 'angular'
  | 'preact'
  | 'svelte'
  | 'solid'
  | 'lit'
  | 'stencil'
  | 'mdx'
  | 'astro'
  | 'riot'
  | 'malina'
  | 'jquery'
  | 'backbone'
  | 'knockout'
  | 'jest'
  | 'jest-react'
  | 'bootstrap'
  | 'tailwindcss'
  | 'coffeescript'
  | 'livescript'
  | 'civet'
  | 'clio'
  | 'imba'
  | 'rescript'
  | 'reason'
  | 'ocaml'
  | 'python'
  | 'pyodide'
  | 'python-wasm'
  | 'r'
  | 'ruby'
  | 'ruby-wasm'
  | 'go'
  | 'php'
  | 'php-wasm'
  | 'cpp'
  | 'clang'
  | 'cpp-wasm'
  | 'perl'
  | 'lua'
  | 'lua-wasm'
  | 'teal'
  | 'fennel'
  | 'julia'
  | 'scheme'
  | 'commonlisp'
  | 'clojurescript'
  | 'gleam'
  | 'tcl'
  | 'markdown'
  | 'assemblyscript'
  | 'wat'
  | 'sql'
  | 'postgresql'
  | 'prolog'
  | 'blockly'
  | 'diagrams';

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
  clear: (silent?: boolean) => void;
  // filterLog: (filter: string) => void;
  evaluate: (code: string) => void;
  reloadEditor: (config: Config) => Promise<void>;
}

export interface CompiledCodeViewer extends Tool {
  title: 'Compiled';
  update: (language: Language, content: string, label?: string | undefined) => void;
  reloadEditor: (config: Config) => Promise<void>;
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
    | 'tests'
    | 'embed'
    | 'snippet'
    | 'add-snippet';
  theme: Theme;
  isEmbed: boolean;
  isHeadless: boolean;
  getLanguageExtension: (alias: string) => Language | undefined;
  mapLanguage: (language: Language) => Language;
  getFormatterConfig: () => Partial<FormatterConfig>;
  getFontFamily: (font: string | undefined) => string;
}

export type MonacoTheme =
  | 'active4d'
  | 'all-hallows-eve'
  | 'amy'
  | 'birds-of-paradise'
  | 'blackboard'
  | 'brilliance-black'
  | 'brilliance-dull'
  | 'chrome-devtools'
  | 'clouds-midnight'
  | 'clouds'
  | 'cobalt'
  | 'cobalt2'
  | 'custom-vs-light' // hidden
  | 'custom-vs-dark' // hidden
  | 'dawn'
  | 'dracula'
  | 'dreamweaver'
  | 'eiffel'
  | 'espresso-libre'
  | 'github'
  | 'github-dark'
  | 'github-light'
  | 'hc-black'
  | 'hc-light'
  | 'idle'
  | 'idlefingers'
  | 'iplastic'
  | 'katzenmilch'
  | 'krtheme'
  | 'kuroir'
  | 'lazy'
  | 'magicwb-amiga'
  | 'merbivore-soft'
  | 'merbivore'
  | 'monochrome'
  | 'monochrome-dark'
  | 'monokai'
  | 'monokai-bright'
  | 'monoindustrial'
  | 'night-owl'
  | 'nord'
  | 'oceanic-next'
  | 'pastels-on-dark'
  | 'slush-and-poppies'
  | 'solarized-dark'
  | 'solarized-light'
  | 'spacecadet'
  | 'sunburst'
  | 'textmate-mac-classic'
  | 'tomorrow'
  | 'tomorrow-night'
  | 'tomorrow-night-blue'
  | 'tomorrow-night-bright'
  | 'tomorrow-night-eighties'
  | 'twilight'
  | 'upstream-sunburst'
  | 'vibrant-ink'
  | 'vs'
  | 'vs-dark'
  | 'xcode-default'
  | 'zenburnesque';

export type CodemirrorTheme =
  | 'amy'
  | 'aura'
  | 'ayu-light'
  | 'barf'
  | 'basic-light'
  | 'basic-dark'
  | 'bespin'
  | 'birds-of-paradise'
  | 'boys-and-girls'
  | 'clouds'
  | 'cm-light'
  | 'cobalt'
  | 'cool-glow'
  | 'dracula'
  | 'espresso'
  | 'github-dark'
  | 'github-light'
  | 'gruvbox-dark'
  | 'gruvbox-light'
  | 'material-dark'
  | 'material-light'
  | 'monochrome'
  | 'monochrome-dark'
  | 'noctis-lilac'
  | 'nord'
  | 'one-dark'
  | 'rose-pine-dawn'
  | 'smoothy'
  | 'solarized-light'
  | 'solarized-dark'
  | 'tokyo-night'
  | 'tokyo-night-day'
  | 'tokyo-night-storm'
  | 'tomorrow';

export type CodejarTheme =
  | 'a11y-dark'
  | 'atom-dark'
  | 'base16-ateliersulphurpool-light'
  | 'cb'
  | 'coldark-cold'
  | 'coldark-dark'
  | 'coy'
  | 'coy-without-shadows'
  | 'darcula'
  | 'dark'
  | 'dracula'
  | 'duotone-dark'
  | 'duotone-earth'
  | 'duotone-forest'
  | 'duotone-light'
  | 'duotone-sea'
  | 'duotone-space'
  | 'funky'
  | 'ghcolors'
  | 'gruvbox-dark'
  | 'gruvbox-light'
  | 'holi-theme'
  | 'hopscotch'
  | 'laserwave'
  | 'lucario'
  | 'material-dark'
  | 'material-light'
  | 'material-oceanic'
  | 'monochrome'
  | 'monochrome-dark'
  | 'night-owl'
  | 'nord'
  | 'okaidia'
  | 'one-dark'
  | 'one-light'
  | 'pojoaque'
  | 'shades-of-purple'
  | 'solarized-dark-atom'
  | 'solarized-light'
  | 'synthwave84'
  | 'tomorrow'
  | 'twilight'
  | 'vs'
  | 'vsc-dark-plus'
  | 'xonokai'
  | 'z-touchs';

export type EditorTheme =
  | MonacoTheme
  | CodemirrorTheme
  | CodejarTheme
  | `${MonacoTheme}@${Theme}`
  | `${CodemirrorTheme}@${Theme}`
  | `${CodejarTheme}@${Theme}`
  | `monaco:${MonacoTheme}`
  | `codemirror:${CodemirrorTheme}`
  | `codejar:${CodejarTheme}`
  | `monaco:${MonacoTheme}@${Theme}`
  | `codemirror:${CodemirrorTheme}@${Theme}`
  | `codejar:${CodejarTheme}@${Theme}`;

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
    | 'resources'
    | 'share'
    | 'embed'
    | 'deploy'
    | 'sync'
    | 'backup'
    | 'broadcast'
    | 'welcome'
    | 'about'
    | 'custom-settings'
    | 'editor-settings'
    | 'test-editor';
  show: (options?: any) => void | Promise<unknown>;
}

export type CustomSettings = Partial<
  {
    [key in Language | Processor]: any;
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
    defaultCDN: CDN;
    types: Types;
  }
>;

export type CDN =
  | 'jspm'
  | 'skypack'
  | 'jsdelivr'
  | 'fastly.jsdelivr'
  | 'gcore.jsdelivr'
  | 'testingcf.jsdelivr'
  | 'jsdelivr.b-cdn'
  | 'jsdelivr.gh'
  | 'fastly.jsdelivr.gh'
  | 'gcore.jsdelivr.gh'
  | 'testingcf.jsdelivr.gh'
  | 'jsdelivr.b-cdn.gh'
  | 'jsdelivr.esm'
  | 'fastly.jsdelivr.esm'
  | 'gcore.jsdelivr.esm'
  | 'testingcf.jsdelivr.esm'
  | 'jsdelivr.b-cdn.esm'
  | 'esm.run'
  | 'esm.sh'
  | 'esbuild'
  | 'bundle.run'
  | 'unpkg'
  | 'npmcdn'
  | 'statically';

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

export interface TestResult {
  duration: number;
  errors: string[];
  status: 'pass' | 'fail' | 'skip';
  testPath: string[];
}

export interface Subscribable<T> {
  subscribe: (fn: (data: T) => void) => { unsubscribe: () => void };
  unsubscribeAll: () => void;
}

export type languageSelector = `${Language}-selector`;
export type ToolNames =
  | `${Tool['name']}`
  | `${Tool['name']},${Tool['name']}`
  | `${Tool['name']},${Tool['name']},${Tool['name']}`;
export type ToolsStatus = `${ToolNames}|${Config['tools']['status']}`;

export type UrlQueryParams = Partial<
  EmbedOptions &
    Omit<
      Config,
      'activeEditor' | 'languages' | 'tags' | 'processors' | 'stylesheets' | 'scripts' | 'tools'
    > &
    Pick<Screen, 'screen'> & { new: '' } & { [key in Language]: string } & {
      [key in languageSelector]: string;
    } & {
      config: string;
      embed: boolean;
      preview: boolean;
      x: string;
      files: string; // comma-separated files (e.g. import from GitHub dir)
      raw: Language;
      language: Language;
      lang: Language;
      languages: string; // comma-separated languages
      processors: string; // comma-separated processors
      stylesheets: string; // comma-separated stylesheets
      scripts: string; // comma-separated scripts
      activeEditor: EditorId | 0 | 1 | 2;
      active: EditorId | 0 | 1 | 2;
      tags: string | string[];
      'no-defaults': boolean;
      scrollPosition: boolean;
      disableAI: boolean;
      tools: 'open' | 'full' | 'closed' | 'console' | 'compiled' | 'tests' | 'none' | ToolsStatus;
    } & {
      [key in Tool['name']]: 'open' | 'full' | 'closed' | 'none' | '' | 'true';
    }
>;

export interface CustomEvents {
  getConfig: 'livecodes-get-config';
  config: 'livecodes-config';
  load: 'livecodes-load';
  appLoaded: 'livecodes-app-loaded';
  ready: 'livecodes-ready';
  change: 'livecodes-change';
  testResults: 'livecodes-test-results';
  console: 'livecodes-console';
  destroy: 'livecodes-destroy';
  resizeEditor: 'livecodes-resize-editor';
  apiResponse: 'livecodes-api-response';
}

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
