import type { LanguageSpecs } from '../../models';
import { vueSfcLoaderCdnBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const loaderCdnUrl = vueSfcLoaderCdnBaseUrl + 'vue2-sfc-loader.js';
const vueCdnUrl = 'https://cdn.jsdelivr.net/npm/vue@2';

export const vue2: LanguageSpecs = {
  name: 'vue2',
  title: 'Vue 2',
  longTitle: 'Vue 2 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-vue-compiler.js}}');
      return (self as any).createVue2Compiler();
    },
    scripts: [vueCdnUrl, loaderCdnUrl],
    imports: {
      vue: vueCdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue2'],
  editor: 'script',
  editorLanguage: 'html',
};
