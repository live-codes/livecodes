import type { LanguageSpecs } from '../../models';
import { vue2CdnUrl, vueSfcLoaderCdnBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const loaderCdnUrl = vueSfcLoaderCdnBaseUrl + 'vue2-sfc-loader.js';

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
      (self as any).importScripts(baseUrl + '{{hash:lang-vue2-compiler.js}}');
      return (self as any).createVue2Compiler();
    },
    scripts: [vue2CdnUrl, loaderCdnUrl],
    imports: {
      vue: vue2CdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue2'],
  editor: 'script',
  editorLanguage: 'html',
};
