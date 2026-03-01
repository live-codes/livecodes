import type { LanguageSpecs } from '../../models';
import { malinaBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const malina: LanguageSpecs = {
  name: 'malina',
  title: 'Malina.js',
  formatter: {
    prettier: {
      name: 'html',
      pluginUrls: [parserPlugins.html, parserPlugins.babel],
    },
  },
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-malina-compiler.js}}');
      return (self as any).createMalinaCompiler();
    },
    imports: {
      'malinajs/runtime.js': `${malinaBaseUrl}runtime.js`,
    },
  },
  extensions: ['xht'],
  editor: 'script',
  editorLanguage: 'html',
};
