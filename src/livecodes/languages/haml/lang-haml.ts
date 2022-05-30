import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const haml: LanguageSpecs = {
  name: 'haml',
  title: 'Haml',
  compiler: {
    url: vendorsBaseUrl + 'clientside-haml-js/haml.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-haml-compiler.js}}');
      return (self as any).createHamlCompiler();
    },
  },
  extensions: ['haml'],
  editor: 'markup',
};
