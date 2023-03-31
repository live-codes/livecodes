import { LanguageSpecs } from '../../models';
import { vueSfcLoaderCdnBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const loaderCdnUrl = vueSfcLoaderCdnBaseUrl + 'vue3-sfc-loader.min.js';
const vueCdnUrl = 'https://cdn.jsdelivr.net/npm/vue@3';

export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue 3',
  longTitle: 'Vue 3 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-vue-compiler.js}}');
      return (self as any).createVueCompiler();
    },
    scripts: [vueCdnUrl, loaderCdnUrl],
    imports: {
      vue: vueCdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
  editorLanguage: 'html',
};
