import { vendorsBaseUrl } from '../vendors';

const prettierBaseUrl = 'https://cdn.jsdelivr.net/npm/prettier@2.5.1/';

export const prettierUrl = prettierBaseUrl + 'standalone.min.js';
export const parserPlugins = {
  babel: prettierBaseUrl + 'parser-babel.js',
  glimmer: prettierBaseUrl + 'parser-glimmer.js',
  html: prettierBaseUrl + 'parser-html.js',
  markdown: prettierBaseUrl + 'parser-markdown.js',
  postcss: prettierBaseUrl + 'parser-postcss.js',
  php: 'https://cdn.jsdelivr.net/npm/@prettier/plugin-php@0.17.5/standalone.js',
  pug: vendorsBaseUrl + 'prettier/parser-pug.js',
};
