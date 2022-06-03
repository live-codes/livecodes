import type { LanguageSpecs } from '../../models';
import { astroBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const compilerURL = astroBaseUrl + 'compiler.min.js';

export const astro: LanguageSpecs = {
  name: 'astro',
  title: 'Astro',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: compilerURL,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-astro-compiler.js}}');
      return (self as any).createAstroCompiler();
    },
  },
  extensions: ['astro'],
  editor: 'markup',
};
