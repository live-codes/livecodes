import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const vue2: LanguageSpecs = {
  name: 'vue2',
  title: 'Vue 2',
  longTitle: 'Vue 2 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/vue3-sfc-loader/vue2-sfc-loader.js',
    factory: () => (code) =>
      `let app = document.querySelector("#app") || document.body;

/* <!-- */
let content = \`${code.replace(/`/g, '\\`')}\`;
/* --> */
const options = {
moduleCache: { vue: Vue },
async getFile(url) {
  if (url === '/component.vue') return content;
  const res = await fetch(url);
  if ( !res.ok )
    throw Object.assign(new Error(res.statusText + ' ' + url), { res });
  return await res.text();
},
addStyle: (textContent) => {
  const style = Object.assign(document.createElement('style'), { textContent });
  const ref = document.head.getElementsByTagName('style')[0] || null;
  document.head.insertBefore(style, ref);
},
};
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
.then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
`,
    scripts: ['https://unpkg.com/vue@2', 'vendor/vue3-sfc-loader/vue2-sfc-loader.js'],
    umd: true,
  },
  extensions: ['vue2'],
  editor: 'script',
};
