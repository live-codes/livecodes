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
    imports: {
      'svelte/internal': 'https://unpkg.com/svelte@4.0.0/src/runtime/internal/index.js',
      'svelte/internal/disclose-version':
        'https://unpkg.com/svelte@4.0.0/src/runtime/internal/disclose-version/index.js',
    },
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
