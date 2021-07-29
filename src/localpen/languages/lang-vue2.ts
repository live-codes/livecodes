import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';
import { escapeCode } from './utils';

export const vue2: LanguageSpecs = {
  name: 'vue2',
  title: 'Vue 2',
  longTitle: 'Vue 2 SFC',
  info: `
  <h3>Vue2 Single File Components</h3>
  <div>Loaded using vue3-sfc-loader.</div>
  <ul>
    <li><a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js official website</a></li>
    <li><a href="https://vuejs.org/v2/guide/" target="_blank" rel="noopener">Vue2 documentation</a></li>
    <li><a href="https://vuejs.org/v2/guide/single-file-components.html" target="_blank" rel="noopener">Vue2 single file components</a></li>
    <li><a href="https://github.com/FranckFreiburger/vue3-sfc-loader" target="_blank" rel="noopener">vue3-sfc-loader GitHub repo</a></li>
    <!-- <li><a href="#">Vue2 SFC usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/vue3-sfc-loader/vue2-sfc-loader.js',
    factory: () => async (code) =>
      `let app = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(code)}\`;
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
  editorLanguage: 'html',
};
