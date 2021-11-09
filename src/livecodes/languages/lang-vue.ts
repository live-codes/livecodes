import { LanguageSpecs } from '../models';
import { modulesService } from '../services';
import { parserPlugins } from './prettier';
import { escapeCode } from './utils';

export const loaderCdnBaseUrl = 'https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.8.4/dist/';
const loaderCdnUrl = loaderCdnBaseUrl + 'vue3-sfc-loader.min.js';
const vueCdnUrl = 'https://cdn.jsdelivr.net/npm/vue@3';

export const loaderOptions = `const options = {
  moduleCache: { vue: Vue },
  pathResolve({ refPath, relPath }) {
    if ( relPath === '.' ) {
      return refPath;
    }
    if ( relPath.startsWith('http') || relPath === 'vue' ) {
      return relPath;
    }
    // relPath is a module name ?
    if ( relPath[0] !== '.' && relPath[0] !== '/' )
      return '${modulesService.getModuleUrl('')}' + relPath;

    return refPath === undefined || !refPath.startsWith('http') ? relPath : String(new URL(relPath, refPath));
  },
  async getFile(url) {
    if (url === '/component.vue') return content;
    const res = await fetch(url);
    if ( !res.ok )
      throw Object.assign(new Error(res.statusText + ' ' + url), { res });
    return await res.text();
  },
  loadModule(path, options) {
      if ( path === 'vue' ) return Vue;
      if ( path.endsWith('.vue') ) return;
      if ( !['http://', 'https://'].some(x => path.startsWith(x)) ) return;
      return import(path).catch(() => import(path + '.js'));
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
`;
export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue 3',
  longTitle: 'Vue 3 SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) =>
      `let app = document.querySelector("#app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(code)}\`;
/* --> */
${loaderOptions}
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
`,
    scripts: [vueCdnUrl, loaderCdnUrl],
    imports: {
      vue: vueCdnUrl + '/dist/vue.runtime.esm-browser.prod.js',
    },
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
  editorLanguage: 'html',
};
