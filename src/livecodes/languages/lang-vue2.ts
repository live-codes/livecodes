import { compileAllBlocks } from '../compiler';
import { LanguageSpecs } from '../models';
import { vueSfcLoaderCdnBaseUrl } from '../vendors';
import { loaderOptions } from './lang-vue';
import { parserPlugins } from './prettier';
import { escapeCode } from './utils';

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
    factory: () => async (code, { config }) =>
      `(() => {
let app = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(await compileAllBlocks(code, config))}\`;
/* --> */
${loaderOptions}
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
.then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
})();
`,
    scripts: [vueCdnUrl, loaderCdnUrl],
    imports: {
      vue: vueCdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue2'],
  editor: 'script',
  editorLanguage: 'html',
};
