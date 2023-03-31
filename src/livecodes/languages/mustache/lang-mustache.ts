import type { LanguageSpecs } from '../../models';
import { mustacheUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const mustache: LanguageSpecs = {
  name: 'mustache',
  title: 'Mustache',
  parser: {
    name: 'glimmer',
    pluginUrls: [parserPlugins.glimmer],
  },
  compiler: {
    url: mustacheUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-mustache-compiler.js}}');
      return (self as any).createMustacheCompiler();
    },
  },
  extensions: ['mustache'],
  editor: 'markup',
  editorLanguage: 'html',
};
