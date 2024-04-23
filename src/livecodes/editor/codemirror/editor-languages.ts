import { LanguageSupport, StreamLanguage, type StreamParser } from '@codemirror/language';

import type { Language } from '../../models';

const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

const getPath = (mod: string) => `./vendor/codemirror/${process.env.codemirrorVersion}/${mod}`;

const moduleUrls = {
  core: getPath('codemirror-core.js'),
  vue: getPath('codemirror-lang-vue.js'),
  json: getPath('codemirror-lang-json.js'),
  markdown: getPath('codemirror-lang-markdown.js'),
  python: getPath('codemirror-lang-python.js'),
  php: getPath('codemirror-lang-php.js'),
  cpp: getPath('codemirror-lang-cpp.js'),
  sql: getPath('codemirror-lang-sql.js'),
  wast: getPath('codemirror-lang-wast.js'),
  scss: getPath('codemirror-lang-scss.js'),
  coffeescript: getPath('codemirror-lang-coffeescript.js'),
  livescript: getPath('codemirror-lang-livescript.js'),
  ruby: getPath('codemirror-lang-ruby.js'),
  go: getPath('codemirror-lang-go.js'),
  perl: getPath('codemirror-lang-perl.js'),
  lua: getPath('codemirror-lang-lua.js'),
  r: getPath('codemirror-lang-r.js'),
  julia: getPath('codemirror-lang-julia.js'),
  scheme: getPath('codemirror-lang-scheme.js'),
  clojure: getPath('codemirror-lang-clojure.js'),
  tcl: getPath('codemirror-lang-tcl.js'),
  less: getPath('codemirror-lang-less.js'),
  stylus: getPath('codemirror-lang-stylus.js'),
  rust: getPath('codemirror-lang-rust.js'),
  swift: getPath('codemirror-lang-swift.js'),
};

export const editorLanguages: Partial<{ [key in Language]: () => Promise<LanguageSupport> }> = {
  html: async () => (await import(moduleUrls.core)).html(),
  css: async () => (await import(moduleUrls.core)).css(),
  javascript: async () => (await import(moduleUrls.core)).javascript(),
  typescript: async () => (await import(moduleUrls.core)).javascript({ typescript: true }),
  jsx: async () => (await import(moduleUrls.core)).javascript({ jsx: true }),
  tsx: async () => (await import(moduleUrls.core)).javascript({ jsx: true, typescript: true }),
  vue: async () => (await import(moduleUrls.vue)).vue(),
  json: async () => (await import(moduleUrls.json)).json(),
  markdown: async () => (await import(moduleUrls.markdown)).markdown(),
  python: async () => (await import(moduleUrls.python)).python(),
  php: async () => (await import(moduleUrls.php)).php(),
  cpp: async () => (await import(moduleUrls.cpp)).cpp(),
  sql: async () => (await import(moduleUrls.sql)).sql(),
  wat: async () => (await import(moduleUrls.wast)).wast(),
  scss: async () => (await import(moduleUrls.scss)).sass(),
  sass: async () => (await import(moduleUrls.scss)).sass({ indented: true }),
  coffeescript: async () => legacy((await import(moduleUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(moduleUrls.livescript)).liveScript),
  ruby: async () => legacy((await import(moduleUrls.ruby)).ruby),
  go: async () => legacy((await import(moduleUrls.go)).go),
  perl: async () => legacy((await import(moduleUrls.perl)).perl),
  lua: async () => legacy((await import(moduleUrls.lua)).lua),
  r: async () => legacy((await import(moduleUrls.r)).r),
  julia: async () => legacy((await import(moduleUrls.julia)).julia),
  scheme: async () => legacy((await import(moduleUrls.scheme)).scheme),
  clojure: async () => legacy((await import(moduleUrls.clojure)).clojure),
  tcl: async () => legacy((await import(moduleUrls.tcl)).tcl),
  less: async () => legacy((await import(moduleUrls.less)).less),
  stylus: async () => legacy((await import(moduleUrls.stylus)).stylus),
  // @ts-ignore
  rust: async () => legacy((await import(moduleUrls.rust)).rust),
  swift: async () => legacy((await import(moduleUrls.swift)).swift),
};
