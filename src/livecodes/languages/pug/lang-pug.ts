import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const pug: LanguageSpecs = {
  name: 'pug',
  title: 'Pug',
  // // disable formatter, till @prettier/plugin-pug supports prettier v3
  // // (https://github.com/prettier/plugin-pug/pull/411)
  // formatter: {
  //   prettier: () => {
  //     (self as any).importScripts(parserPlugins.pug);
  //     if (!(self as any).prettierPlugins.pug && (self as any).pluginPug) {
  //       (self as any).prettierPlugins.pug = (self as any).pluginPug;
  //     }
  //     return {
  //       name: 'pug',
  //       plugins: [(self as any).pluginPug],
  //     };
  //   },
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
