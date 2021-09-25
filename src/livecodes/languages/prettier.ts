import { vendorsBaseUrl } from '../vendors';

export const prettierUrl = 'https://unpkg.com/prettier@2.3.2/standalone.js';

export const parserPlugins = {
  babel: 'https://unpkg.com/prettier@2.3.2/parser-babel.js',
  glimmer: 'https://unpkg.com/prettier@2.3.2/parser-glimmer.js',
  html: 'https://unpkg.com/prettier@2.3.2/parser-html.js',
  markdown: 'https://unpkg.com/prettier@2.3.2/parser-markdown.js',
  postcss: 'https://unpkg.com/prettier@2.3.2/parser-postcss.js',
  php: 'https://unpkg.com/@prettier/plugin-php@0.17.3/standalone.js',
  pug: vendorsBaseUrl + 'prettier/parser-pug.js',
};
