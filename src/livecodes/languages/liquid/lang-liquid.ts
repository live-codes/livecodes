import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, liquidJsUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const liquid: LanguageSpecs = {
  name: 'liquid',
  title: 'Liquid',
  formatter: {
    prettier: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
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
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-liquid.js')).liquid(),
    },
  },
  multiFileSupport: true,
};
