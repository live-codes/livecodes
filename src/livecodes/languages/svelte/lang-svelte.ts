import type { LanguageSpecs } from '../../models';
import { svelteRuntimeBaseUrl, vendorsBaseUrl } from '../../vendors';
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
    imports: {
      svelte: svelteRuntimeBaseUrl + 'index.js',
      'svelte/internal': svelteRuntimeBaseUrl + 'index.js',
      'svelte/internal/disclose-version': svelteRuntimeBaseUrl + 'disclose-version/index.js',
    },
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
