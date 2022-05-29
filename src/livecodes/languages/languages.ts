import { LanguageSpecs } from '../models';
import { asciidoc } from './asciidoc';
import { babel } from './lang-babel';
import { css } from './lang-css';
import { haml } from './lang-haml';
import { html } from './lang-html';
import { javascript } from './lang-javascript';
import { jsx } from './lang-jsx';
import { less } from './lang-less';
import { markdown } from './lang-markdown';
import { mdx } from './lang-mdx';
import { pug } from './lang-pug';
import { sass } from './lang-sass';
import { scss } from './lang-scss';
import { svelte } from './lang-svelte';
import { stylus } from './lang-stylus';
import { tsx } from './lang-tsx';
import { typescript } from './lang-typescript';
import { vue } from './lang-vue';
import { vue2 } from './lang-vue2';
import { stencil } from './lang-stencil';
import { coffeescript } from './lang-coffeescript';
import { livescript } from './lang-livescript';
import { assemblyscript } from './assemblyscript';
import { python } from './lang-python';
import { ruby } from './lang-ruby';
import { php } from './lang-php';
import { perl } from './lang-perl';
import { lua } from './lang-lua';
import { scheme } from './lang-scheme';
import { solid } from './lang-solid';
import { solidTsx } from './lang-solid-tsx';
import { pyodide } from './lang-python-pyodide';
import { liquid } from './lang-liquid';
import { ejs } from './lang-ejs';
import { handlebars } from './lang-handlebars';
import { dot } from './lang-dot';
import { nunjucks } from './lang-nunjucks';
import { go } from './lang-go';
import { rescript } from './lang-rescript';
import { reason } from './lang-reason';
import { ocaml } from './lang-ocaml';
import { wat } from './lang-wat';
import { riot } from './lang-riot';
import { sql } from './lang-sql';
import { reactNative } from './lang-react-native';
import { reactNativeTsx } from './lang-react-native-tsx';
import { blockly } from './lang-blockly';
import { twig } from './lang-twig';
import { astro } from './astro';
import { malina } from './lang-malina';
import { commonlisp } from './lang-commonlisp';
import { cpp } from './lang-cpp';
import { julia } from './lang-julia';
import { clang } from './lang-cpp-clang';
import { tcl } from './lang-tcl';
import { prolog } from './lang-prolog';
import { clio } from './lang-clio';
import { richtext } from './lang-richtext';
import { graph } from './lang-graph';
import { imba } from './lang-imba';
import { mustache } from './lang-mustache';

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
  graph,
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
