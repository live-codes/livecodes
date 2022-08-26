import type { LanguageSpecs } from '../../models';

export const v: LanguageSpecs = {
  name: 'v',
  title: 'V',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-v-compiler.js}}');
      return (self as any).createVCompiler();
    },
  },
  extensions: ['v'],
  editor: 'script',
};
