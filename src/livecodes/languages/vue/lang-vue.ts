import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl, vueRuntimeUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const compilerUrl = vendorsBaseUrl + 'vue-compiler-sfc/vue-compiler-sfc.js';

export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue 3',
  longTitle: 'Vue 3 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: compilerUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-vue-compiler.js}}');
      return (self as any).createVueCompiler();
    },
    imports: {
      vue: vueRuntimeUrl,
    },
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
  editorLanguage: 'html',
};
