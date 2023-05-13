import type { LanguageSpecs } from '../../models';
import { etaUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const eta: LanguageSpecs = {
  name: 'eta',
  title: 'Eta',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: etaUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-eta-compiler.js}}');
      return (self as any).createEtaCompiler();
    },
  },
  extensions: ['eta'],
  editor: 'markup',
  editorLanguage: 'html',
};
