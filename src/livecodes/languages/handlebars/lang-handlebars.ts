import type { LanguageSpecs } from '../../models';
import { handlebarsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const url = handlebarsBaseUrl + 'handlebars.min.js';
export const runtimeUrl = handlebarsBaseUrl + 'handlebars.runtime.min.js';

export const handlebars: LanguageSpecs = {
  name: 'handlebars',
  title: 'Handlebars',
  parser: {
    name: 'glimmer',
    pluginUrls: [parserPlugins.glimmer],
  },
  compiler: {
    url,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-handlebars-compiler.js}}');
      return (self as any).createHandlebarsCompiler();
    },
  },
  extensions: ['hbs', 'handlebars'],
  editor: 'markup',
  editorLanguage: 'html',
};
