import type { LanguageSpecs } from '../../models';
import { malinaVersion } from '../../vendors';
import { parserPlugins } from '../prettier';

export const malina: LanguageSpecs = {
  name: 'malina',
  title: 'Malina.js',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-malina-compiler.js}}');
      return (self as any).createMalinaCompiler();
    },
    imports: {
      'malinajs/runtime.js': `https://jspm.dev/malinajs@${malinaVersion}/runtime.js`,
    },
  },
  extensions: ['xht'],
  editor: 'script',
  editorLanguage: 'html',
};
