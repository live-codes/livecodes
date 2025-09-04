import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const ripple: LanguageSpecs = {
  name: 'ripple',
  title: 'Ripple',
  info: false,
  parser: {
    name: 'ripple',
    pluginUrls: [parserPlugins.ripple],
  },
  compiler: {
    factory: (config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-ripple-compiler.js}}');
      return (self as any).createRippleCompiler(config);
    },
  },
  extensions: ['ripple'],
  editor: 'script',
  editorLanguage: 'jsx',
};
