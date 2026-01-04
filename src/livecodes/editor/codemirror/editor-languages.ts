/* eslint-disable import/no-unresolved */

// @ts-ignore
import { LanguageSupport, StreamLanguage, type StreamParser } from '@codemirror/language';
// @ts-ignore
import { html } from '@codemirror/lang-html';
// @ts-ignore
import { css } from '@codemirror/lang-css';
// @ts-ignore
import { javascript } from '@codemirror/lang-javascript';
// @ts-ignore
import { json } from '@codemirror/lang-json';

import type { Language } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

const getPath = (mod: string) => codeMirrorBaseUrl + mod;

const moduleUrls = {
  vue: getPath('codemirror-lang-vue.js'),
  svelte: getPath('codemirror-lang-svelte.js'),
  liquid: getPath('codemirror-lang-liquid.js'),
  json: getPath('codemirror-lang-json.js'),
  markdown: getPath('codemirror-lang-markdown.js'),
  python: getPath('codemirror-lang-python.js'),
  php: getPath('codemirror-lang-php.js'),
  java: getPath('codemirror-lang-java.js'),
  clike: getPath('codemirror-lang-clike.js'),
  mllike: getPath('codemirror-lang-mllike.js'),
  cpp: getPath('codemirror-lang-cpp.js'),
  sql: getPath('codemirror-lang-sql.js'),
  wast: getPath('codemirror-lang-wast.js'),
  scss: getPath('codemirror-lang-scss.js'),
  minizinc: getPath('codemirror-lang-minizinc.js'),
  prolog: getPath('codemirror-lang-prolog.js'),
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
  html: async () => html(),
  css: async () => css(),
  javascript: async () => javascript(),
  typescript: async () => javascript({ typescript: true }),
  jsx: async () => javascript({ jsx: true }),
  tsx: async () => javascript({ jsx: true, typescript: true }),
  json: async () => json(),
  vue: async () => (await import(moduleUrls.vue)).vue(),
  svelte: async () => (await import(moduleUrls.svelte)).svelte(),
  liquid: async () => (await import(moduleUrls.liquid)).liquid(),
  markdown: async () => (await import(moduleUrls.markdown)).markdown(),
  python: async () => (await import(moduleUrls.python)).python(),
  php: async () => (await import(moduleUrls.php)).php(),
  go: async () => (await import(moduleUrls.go)).go(),
  java: async () => (await import(moduleUrls.java)).java(),
  cpp: async () => (await import(moduleUrls.cpp)).cpp(),
  sql: async () => (await import(moduleUrls.sql)).sql(),
  wat: async () => (await import(moduleUrls.wast)).wast(),
  scss: async () => (await import(moduleUrls.scss)).sass(),
  sass: async () => (await import(moduleUrls.scss)).sass({ indented: true }),
  minizinc: async () => (await import(moduleUrls.minizinc)).MiniZinc(),
  prolog: async () => (await import(moduleUrls.prolog)).prolog(),
  coffeescript: async () => legacy((await import(moduleUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(moduleUrls.livescript)).liveScript),
  ruby: async () => legacy((await import(moduleUrls.ruby)).ruby),
  perl: async () => legacy((await import(moduleUrls.perl)).perl),
  lua: async () => legacy((await import(moduleUrls.lua)).lua),
  r: async () => legacy((await import(moduleUrls.r)).r),
  julia: async () => legacy((await import(moduleUrls.julia)).julia),
  scheme: async () => legacy((await import(moduleUrls.scheme)).scheme),
  clojure: async () => legacy((await import(moduleUrls.clojure)).clojure),
  tcl: async () => legacy((await import(moduleUrls.tcl)).tcl),
  less: async () => legacy((await import(moduleUrls.less)).less),
  stylus: async () => legacy((await import(moduleUrls.stylus)).stylus),
  csharp: async () => legacy((await import(moduleUrls.clike)).csharp),
  ocaml: async () => legacy((await import(moduleUrls.mllike)).oCaml),
  // fsharp: async () => legacy((await import(moduleUrls.mllike)).fSharp),
  // @ts-ignore
  rust: async () => legacy((await import(moduleUrls.rust)).rust),
  swift: async () => legacy((await import(moduleUrls.swift)).swift),
};
