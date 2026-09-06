import { prettierBaseUrl, prettierMinizincUrl, prettierPhpUrl, vendorsBaseUrl } from '../vendors';

export const prettierUrl = prettierBaseUrl + 'standalone.js';
export const parserPlugins = {
  babel: prettierBaseUrl + 'plugins/babel.js',
  estree: prettierBaseUrl + 'plugins/estree.js',
  glimmer: prettierBaseUrl + 'plugins/glimmer.js',
  html: prettierBaseUrl + 'plugins/html.js',
  markdown: prettierBaseUrl + 'plugins/markdown.js',
  postcss: prettierBaseUrl + 'plugins/postcss.js',
  php: prettierPhpUrl,
  minizinc: prettierMinizincUrl,
  pug: vendorsBaseUrl + 'prettier/parser-pug.js',
  java: vendorsBaseUrl + 'prettier/parser-java.js',
};
