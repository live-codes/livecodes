import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue 3',
  longTitle: 'Vue 3 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/vue3-sfc-loader/vue3-sfc-loader.js',
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
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
`,
    scripts: ['https://unpkg.com/vue@3', 'vendor/vue3-sfc-loader/vue3-sfc-loader.js'],
    umd: true,
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
};
