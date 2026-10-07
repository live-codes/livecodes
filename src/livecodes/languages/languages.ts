import type { LanguageSpecs } from '../models';
import { adaWasm } from './ada-wasm';
import { artTemplate } from './art-template';
import { asciidoc } from './asciidoc';
import { assemblyWasm } from './assembly-wasm';
import { assemblyscript } from './assemblyscript';
import { astro } from './astro';
import { babel } from './babel';
import { bbcode } from './bbcode';
import { blazorWasm } from './blazor-wasm';
import { blockly } from './blockly';
import { civet } from './civet';
import { cWasm, cppWasm, objcWasm, objcppWasm } from './clang-wasm';
import { clio } from './clio';
import { clojurescriptCherry } from './clojurescript-cherry';
import { clojurescriptSelfHosted } from './clojurescript-selfhosted';
import { cobolWasm } from './cobol-wasm';
import { coffeescript } from './coffeescript';
import { commonlisp } from './commonlisp';
import { cpp } from './cpp';
import { csharpWasm } from './csharp-wasm';
import { css } from './css';
import { dWasm } from './d-wasm';
import { diagrams } from './diagrams';
import { dot } from './dot';
import { ejs } from './ejs';
import { elm } from './elm';
import { eta } from './eta';
import { fanak } from './fanak';
import { fennel } from './fennel';
import { flow } from './flow';
import { fortranWasm } from './fortran-wasm';
import { fsharp } from './fsharp';
import { fsharpWasm } from './fsharp-wasm';
import { gleam } from './gleam';
import { go } from './go';
import { goWasm } from './go-wasm';
import { haml } from './haml';
import { handlebars } from './handlebars';
import { haskell } from './haskell';
import { haskellWasm } from './haskell-wasm';
import { html } from './html';
import { imba } from './imba';
import { janetWasm } from './janet-wasm';
import { java } from './java';
import { javascript } from './javascript';
import { jinja } from './jinja';
import { jsx, tsx } from './jsx';
import { julia } from './julia';
import { less } from './less';
import { liquid } from './liquid';
import { livescript } from './livescript';
import { lua } from './lua';
import { luaWasm } from './lua-wasm';
import { malina } from './malina';
import { markdown } from './markdown';
import { mdx } from './mdx';
import { minizinc } from './minizinc';
import { mjml } from './mjml';
import { mustache } from './mustache';
import { nim, nimWasm } from './nim';
import { nunjucks } from './nunjucks';
import { ocaml } from './ocaml';
import { pascal } from './pascal';
import { perl } from './perl';
import { php } from './php';
import { phpWasm } from './php-wasm';
import { postgresql } from './postgresql';
import { prolog } from './prolog';
import { pug } from './pug';
import { python } from './python';
import { pythonWasm } from './python-wasm';
import { r } from './r';
import { react, reactTsx } from './react';
import { reactNative, reactNativeTsx } from './react-native';
import { reason } from './reason';
import { rescript } from './rescript';
import { richtext } from './richtext';
import { riot } from './riot';
import { ruby } from './ruby';
import { rubyWasm } from './ruby-wasm';
import { rustWasm } from './rust-wasm';
import { scheme } from './scheme';
import { sass, scss } from './scss';
import { solid, solidTsx } from './solid';
import { sql } from './sql';
import { stencil } from './stencil';
import { stylis } from './stylis';
import { stylus } from './stylus';
import { sucrase } from './sucrase';
import { svelte, svelteApp } from './svelte';
import { swiftWasm } from './swift-wasm';
import { tcl } from './tcl';
import { teal } from './teal';
import { twig } from './twig';
import { typescript } from './typescript';
import { vWasm } from './v-wasm';
import { vbWasm } from './vb-wasm';
import { vento } from './vento';
import { vue, vueApp } from './vue';
import { vue2 } from './vue2';
import { wat } from './wat';
import { zigWasm } from './zig-wasm';

export const languages: LanguageSpecs[] = [
  html,
  markdown,
  mdx,
  astro,
  pug,
  asciidoc,
  haml,
  mustache,
  handlebars,
  ejs,
  eta,
  nunjucks,
  liquid,
  dot,
  twig,
  vento,
  artTemplate,
  jinja,
  bbcode,
  mjml,
  diagrams,
  richtext,
  css,
  scss,
  sass,
  less,
  stylus,
  stylis,
  javascript,
  typescript,
  flow,
  babel,
  sucrase,
  jsx,
  tsx,
  react,
  reactTsx,
  reactNative,
  reactNativeTsx,
  vue,
  vue2,
  vueApp,
  svelte,
  svelteApp,
  stencil,
  solid,
  solidTsx,
  riot,
  malina,
  coffeescript,
  livescript,
  civet,
  clio,
  imba,
  elm,
  rescript,
  reason,
  ocaml,
  nim,
  nimWasm,
  janetWasm,
  python,
  pythonWasm,
  r,
  ruby,
  rubyWasm,
  go,
  goWasm,
  php,
  phpWasm,
  cpp,
  cWasm,
  cppWasm,
  objcWasm,
  objcppWasm,
  fortranWasm,
  dWasm,
  cobolWasm,
  rustWasm,
  swiftWasm,
  zigWasm,
  java,
  csharpWasm,
  blazorWasm,
  vWasm,
  vbWasm,
  fsharp,
  fsharpWasm,
  fanak,
  haskell,
  haskellWasm,
  scheme,
  commonlisp,
  clojurescriptCherry,
  clojurescriptSelfHosted,
  gleam,
  perl,
  lua,
  luaWasm,
  teal,
  fennel,
  julia,
  tcl,
  adaWasm,
  pascal,
  assemblyscript,
  wat,
  assemblyWasm,
  sql,
  postgresql,
  prolog,
  minizinc,
  blockly,
];
