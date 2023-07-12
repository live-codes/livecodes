import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
// import { parserPlugins } from '../prettier';

export const pug: LanguageSpecs = {
  name: 'pug',
  title: 'Pug',

  // disable formatter, till @prettier/plugin-pug supports prettier v3
  // (https://github.com/prettier/plugin-pug/pull/411)
  // parser: {
  //   name: 'pug',
  //   pluginUrls: [parserPlugins.pug],
  // },

  compiler: {
    url: vendorsBaseUrl + 'pug/pug.min.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-pug-compiler.js}}');
      return (self as any).createPugCompiler();
    },
  },
  extensions: ['pug', 'jade'],
  editor: 'markup',
};
