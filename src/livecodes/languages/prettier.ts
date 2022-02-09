import { prettierBaseUrl, prettierPhpUrl, vendorsBaseUrl } from '../vendors';

export const prettierUrl = prettierBaseUrl + 'standalone.min.js';
export const parserPlugins = {
  babel: prettierBaseUrl + 'parser-babel.js',
  glimmer: prettierBaseUrl + 'parser-glimmer.js',
  html: prettierBaseUrl + 'parser-html.js',
  markdown: prettierBaseUrl + 'parser-markdown.js',
  postcss: prettierBaseUrl + 'parser-postcss.js',
  php: prettierPhpUrl,
  pug: vendorsBaseUrl + 'prettier/parser-pug.js',
};
