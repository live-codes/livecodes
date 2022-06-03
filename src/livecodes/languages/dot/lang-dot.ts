import type { LanguageSpecs } from '../../models';
import { dotUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const dot: LanguageSpecs = {
  name: 'dot',
  title: 'doT',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: dotUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-dot-compiler.js}}');
      return (self as any).createDotCompiler();
    },
  },
  extensions: ['dot'],
  editor: 'markup',
  editorLanguage: 'html',
};
