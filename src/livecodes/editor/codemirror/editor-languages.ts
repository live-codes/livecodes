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
  liquid: getPath('codemirror-lang-liquid.js'),
  json: getPath('codemirror-lang-json.js'),
  markdown: getPath('codemirror-lang-markdown.js'),
  mllike: getPath('codemirror-lang-mllike.js'),
  wast: getPath('codemirror-lang-wast.js'),
  scss: getPath('codemirror-lang-scss.js'),
  minizinc: getPath('codemirror-lang-minizinc.js'),
  prolog: getPath('codemirror-lang-prolog.js'),
  coffeescript: getPath('codemirror-lang-coffeescript.js'),
  livescript: getPath('codemirror-lang-livescript.js'),
  perl: getPath('codemirror-lang-perl.js'),
  julia: getPath('codemirror-lang-julia.js'),
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
  liquid: async () => (await import(moduleUrls.liquid)).liquid(),
  markdown: async () => (await import(moduleUrls.markdown)).markdown(),
  wat: async () => (await import(moduleUrls.wast)).wast(),
  scss: async () => (await import(moduleUrls.scss)).sass(),
  sass: async () => (await import(moduleUrls.scss)).sass({ indented: true }),
  minizinc: async () => (await import(moduleUrls.minizinc)).MiniZinc(),
  prolog: async () => (await import(moduleUrls.prolog)).prolog(),
  coffeescript: async () => legacy((await import(moduleUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(moduleUrls.livescript)).liveScript),
  perl: async () => legacy((await import(moduleUrls.perl)).perl),
  julia: async () => legacy((await import(moduleUrls.julia)).julia),
  clojure: async () => legacy((await import(moduleUrls.clojure)).clojure),
  tcl: async () => legacy((await import(moduleUrls.tcl)).tcl),
  less: async () => legacy((await import(moduleUrls.less)).less),
  stylus: async () => legacy((await import(moduleUrls.stylus)).stylus),
  ocaml: async () => legacy((await import(moduleUrls.mllike)).oCaml),
  // fsharp: async () => legacy((await import(moduleUrls.mllike)).fSharp),
  // @ts-ignore
  rust: async () => legacy((await import(moduleUrls.rust)).rust),
  swift: async () => legacy((await import(moduleUrls.swift)).swift),
};
