import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const vento: LanguageSpecs = {
  name: 'vento',
  title: 'Vento',
  formatter: {
    prettier: {
      name: 'html',
      pluginUrls: [parserPlugins.html],
    },
  },
  compiler: {
    url: vendorsBaseUrl + 'vento/vento.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-vento-compiler.js}}');
      return (self as any).createVentoCompiler();
    },
  },
  extensions: ['vto', 'vento'],
  editor: 'markup',
  editorLanguage: 'html',
  multiFileSupport: true,
};
