import type { LanguageSpecs } from '../../models';
import { liquidJsUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const liquid: LanguageSpecs = {
  name: 'liquid',
  title: 'Liquid',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: liquidJsUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-liquid-compiler.js}}');
      return (self as any).createLiquidCompiler();
    },
  },
  extensions: ['liquid', 'liquidjs'],
  editor: 'markup',
  editorLanguage: 'html',
};
