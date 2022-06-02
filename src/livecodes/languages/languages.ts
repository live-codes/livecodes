import { LanguageSpecs } from '../models';
import { asciidoc } from './asciidoc';
import { babel } from './babel';
import { css } from './css';
import { haml } from './haml';
import { html } from './html';
import { javascript } from './javascript';
import { jsx } from './jsx';
import { less } from './less';
import { markdown } from './markdown';
import { mdx } from './mdx';
import { pug } from './pug';
import { sass } from './sass';
import { scss } from './scss';
import { svelte } from './lang-svelte';
import { stylus } from './lang-stylus';
import { tsx } from './lang-tsx';
import { typescript } from './lang-typescript';
import { vue } from './lang-vue';
import { vue2 } from './lang-vue2';
import { stencil } from './lang-stencil';
import { coffeescript } from './coffeescript';
import { livescript } from './livescript';
import { assemblyscript } from './assemblyscript';
import { python } from './python';
import { ruby } from './ruby';
import { php } from './php';
import { perl } from './perl';
import { lua } from './lua';
import { scheme } from './scheme';
import { solid } from './lang-solid';
import { solidTsx } from './lang-solid-tsx';
import { pyodide } from './python-pyodide';
import { liquid } from './liquid';
import { ejs } from './ejs';
import { handlebars } from './handlebars';
import { dot } from './dot';
import { nunjucks } from './nunjucks';
import { go } from './go';
import { rescript } from './rescript';
import { reason } from './reason';
import { ocaml } from './ocaml';
import { wat } from './lang-wat';
import { riot } from './riot';
import { sql } from './lang-sql';
import { reactNative } from './react-native';
import { reactNativeTsx } from './react-native-tsx';
import { blockly } from './blockly';
import { twig } from './lang-twig';
import { astro } from './astro';
import { malina } from './malina';
import { commonlisp } from './commonlisp';
import { cpp } from './cpp';
import { julia } from './julia';
import { clang } from './cpp-clang';
import { tcl } from './lang-tcl';
import { prolog } from './prolog';
import { clio } from './clio';
import { richtext } from './richtext';
import { diagram } from './diagram';
import { imba } from './imba';
import { mustache } from './mustache';

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
  nunjucks,
  liquid,
  dot,
  twig,
  diagram,
  richtext,
  css,
  scss,
  sass,
  less,
  stylus,
  javascript,
  babel,
  typescript,
  jsx,
  tsx,
  reactNative,
  reactNativeTsx,
  vue,
  vue2,
  svelte,
  stencil,
  solid,
  solidTsx,
  riot,
  malina,
  coffeescript,
  livescript,
  clio,
  imba,
  rescript,
  reason,
  ocaml,
  python,
  pyodide,
  ruby,
  go,
  php,
  cpp,
  clang,
  perl,
  lua,
  julia,
  scheme,
  commonlisp,
  tcl,
  assemblyscript,
  wat,
  sql,
  prolog,
  blockly,
];
