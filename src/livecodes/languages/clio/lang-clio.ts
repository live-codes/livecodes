import type { LanguageSpecs } from '../../models';
import { clioBaseUrl } from '../../vendors';

export const clio: LanguageSpecs = {
  name: 'clio',
  title: 'Clio',
  compiler: {
    url: clioBaseUrl + 'compile.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-clio-compiler.js}}');
      return (self as any).createClioCompiler();
    },
    scripts: [clioBaseUrl + 'exec.js'],
  },
  extensions: ['clio'],
  editor: 'script',
  editorLanguage: 'coffeescript',
};
