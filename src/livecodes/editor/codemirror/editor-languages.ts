import { LanguageSupport, StreamLanguage, StreamParser } from '@codemirror/language';

import type { Language } from '../../models';

const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

const getPath = (mod: string) => `./vendor/codemirror/${process.env.codemirrorVersion}/${mod}`;

const moduleUrls = {
  core: getPath('codemirror-core.js'),
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
  julia: getPath('codemirror-lang-julia.js'),
  scheme: getPath('codemirror-lang-scheme.js'),
  tcl: getPath('codemirror-lang-tcl.js'),
  less: getPath('codemirror-lang-less.js'),
  stylus: getPath('codemirror-lang-stylus.js'),
};

export const editorLanguages: Partial<{ [key in Language]: () => Promise<LanguageSupport> }> = {
  html: async () => (await import(moduleUrls.core)).html(),
  css: async () => (await import(moduleUrls.core)).css(),
  javascript: async () => (await import(moduleUrls.core)).javascript(),
  typescript: async () => (await import(moduleUrls.core)).javascript({ typescript: true }),
  jsx: async () => (await import(moduleUrls.core)).javascript({ jsx: true }),
  tsx: async () => (await import(moduleUrls.core)).javascript({ jsx: true, typescript: true }),
  json: async () => (await import(moduleUrls.json)).json(),
  markdown: async () => (await import(moduleUrls.markdown)).markdown(),
  python: async () => (await import(moduleUrls.python)).python(),
  php: async () => (await import(moduleUrls.php)).php(),
  cpp: async () => (await import(moduleUrls.cpp)).cpp(),
  sql: async () => (await import(moduleUrls.sql)).sql(),
  wat: async () => (await import(moduleUrls.wast)).wast(),
  scss: async () => legacy((await import(moduleUrls.scss)).sCSS),
  coffeescript: async () => legacy((await import(moduleUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(moduleUrls.livescript)).liveScript),
  ruby: async () => legacy((await import(moduleUrls.ruby)).ruby),
  go: async () => legacy((await import(moduleUrls.go)).go),
  perl: async () => legacy((await import(moduleUrls.perl)).perl),
  lua: async () => legacy((await import(moduleUrls.lua)).lua),
  julia: async () => legacy((await import(moduleUrls.julia)).julia),
  scheme: async () => legacy((await import(moduleUrls.scheme)).scheme),
  tcl: async () => legacy((await import(moduleUrls.tcl)).tcl),
  less: async () => legacy((await import(moduleUrls.less)).less),
  stylus: async () => legacy((await import(moduleUrls.stylus)).stylus),
};
