/* eslint-disable camelcase */

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
  console: ToolsPaneStatus;
  compiled: ToolsPaneStatus;
  progressBar: boolean;
  editor: { [key: string]: any };
  allowLangChange: boolean;
  language: Language;
  markup: Editor;
  style: Editor;
  script: Editor;
  stylesheets: string[];
  scripts: string[];
  cssPreset: CssPresetId;
  modules: Module[];
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
  | 'typescript'
  | 'ts'
  | 'jsx'
  | 'tsx'
  | 'coffeescript'
  | 'coffee';

export interface Editor {
  language: Language;
  content?: string;
  contentUrl?: string;
  selector?: string;
}

export type EditorId = 'markup' | 'style' | 'script';

export interface Editors {
  markup: any;
  style: any;
  script: any;
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
  factory: (compilerModule: any, config: Pen) => (code: string) => string;
  umd?: boolean;
  editors?: EditorId[];
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
