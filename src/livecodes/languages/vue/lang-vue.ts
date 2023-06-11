import type { LanguageSpecs } from '../../models';
import { vue3CdnUrl, vueSfcLoaderCdnBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const loaderCdnUrl = vueSfcLoaderCdnBaseUrl + 'vue3-sfc-loader.js';

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
    scripts: [vue3CdnUrl, loaderCdnUrl],
    imports: {
      vue: vue3CdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
  editorLanguage: 'html',
};
