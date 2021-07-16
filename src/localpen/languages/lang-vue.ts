import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue 3',
  longTitle: 'Vue 3 SFC',
  info: `
  <h3>Vue3 Single File Components</h3>
  <div>Loaded using vue3-sfc-loader.</div>
  <ul>
    <li><a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue.js v3 official website</a></li>
    <li><a href="https://v3.vuejs.org/guide/introduction.html" target="_blank" rel="noopener">Vue3 documentation</a></li>
    <li><a href="https://v3.vuejs.org/guide/single-file-component.html" target="_blank" rel="noopener">Vue3 single file components</a></li>
    <li><a href="https://github.com/FranckFreiburger/vue3-sfc-loader" target="_blank" rel="noopener">vue3-sfc-loader GitHub repo</a></li>
    <!-- <li><a href="#">Vue3 SFC usage in LocalPen</a></li> -->
    <li><a href="?template=vue3" target="_parent" data-template="vue3">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/vue3-sfc-loader/vue3-sfc-loader.js',
    factory: () => async (code) =>
      `let app = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));

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
