import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: vendorsBaseUrl + 'svelte/svelte-compiler.min.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-svelte-compiler.js}}');
      return (self as any).createSvelteCompiler();
    },
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
