import type { LanguageSpecs } from '../../models';
import { nunjucksBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const url = nunjucksBaseUrl + 'nunjucks.min.js';
export const runtimeUrl = nunjucksBaseUrl + 'nunjucks-slim.min.js';

export const nunjucks: LanguageSpecs = {
  name: 'nunjucks',
  title: 'Nunjucks',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-nunjucks-compiler.js}}');
      return (self as any).createNunjucksCompiler();
    },
  },
  extensions: ['njk', 'nunjucks'],
  editor: 'markup',
  editorLanguage: 'html',
};
