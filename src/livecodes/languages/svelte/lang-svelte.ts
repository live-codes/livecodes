import type { LanguageSpecs } from '../../models';
import { svelteBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: svelteBaseUrl + 'compiler/index.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-svelte-compiler.js}}');
      return (self as any).createSvelteCompiler();
    },
    imports: {
      svelte: svelteBaseUrl + 'src/index-client.js',
      'svelte/internal/client': svelteBaseUrl + 'src/internal/client/index.js',
      'svelte/internal/disclose-version': svelteBaseUrl + 'src/internal/disclose-version.js',
      'esm-env': 'https://esm.sh/esm-env',
    },
    inlineScript: 'globalThis.process = { env: { NODE_ENV: "production" } };',
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
