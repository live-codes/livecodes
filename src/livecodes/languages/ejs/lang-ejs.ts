import type { LanguageSpecs } from '../../models';
import { ejsUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const ejs: LanguageSpecs = {
  name: 'ejs',
  title: 'EJS',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: ejsUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-ejs-compiler.js}}');
      return (self as any).createEjsCompiler();
    },
  },
  extensions: ['ejs'],
  editor: 'markup',
  editorLanguage: 'html',
};
