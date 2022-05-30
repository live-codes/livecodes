import type { LanguageSpecs } from '../../models';
import { imbaBaseUrl } from '../../vendors';

export const imba: LanguageSpecs = {
  name: 'imba',
  title: 'Imba',
  compiler: {
    url: imbaBaseUrl + 'compiler.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-imba-compiler.js}}');
      return (self as any).createImbaCompiler();
    },
    imports: {
      imba: imbaBaseUrl + 'imba.mjs',
    },
  },
  extensions: ['imba'],
  editor: 'script',
};
