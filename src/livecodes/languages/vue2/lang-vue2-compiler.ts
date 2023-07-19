/* eslint-disable import/no-internal-modules */
import type { CDN, CompilerFunction } from '../../models';
import { compileAllBlocks } from '../../compiler/compile-blocks';
import { modulesService } from '../../services/modules';
import { escapeCode } from '../../utils';

const getLoaderOptions = (defaultCDN?: CDN) => `const options = {
  moduleCache: {
    vue: Vue,
  },
  pathResolve({ refPath, relPath }) {
    if ( relPath === '.' ) {
      return refPath;
    }
    if ( relPath.startsWith('http') || relPath === 'vue' ) {
      return relPath;
    }
    // relPath is a module name ?
    if ( relPath[0] !== '.' && relPath[0] !== '/' ) {
      const importMapScript = document.querySelector('script[type="importmap"]')?.innerHTML.trim();
      if (importMapScript) {
        try {
          const importMap = JSON.parse(importMapScript);
          if (importMap?.imports?.[relPath]) {
            return importMap.imports[relPath];
          }
        } catch {}
      }
      return '${modulesService.getModuleUrl('', { defaultCDN })}' + relPath;
    }

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
    if ( path.endsWith('.vue') || path.endsWith('.css') || path.endsWith('.scss') ) return;
    if ( !['http://', 'https://'].some(x => path.startsWith(x)) ) return;
    return import(path).catch(() => import(path + '.js'));
  },
  handleModule: async function (type, getContentData, path, options) {
    switch (type) {
      case '.css':
        options.addStyle(await getContentData(false));
        return null;
    }
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
};
`;

(self as any).createVueCompiler =
  (): CompilerFunction =>
  async (code, { config }) =>
    `(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(await compileAllBlocks(code, config))}\`;
/* --> */
${getLoaderOptions(config.customSettings.defaultCDN)}
const { loadModule } = window['vue3-sfc-loader'];
const App = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
App.mount(app)
App.config.devtools = true;
})();
`;

(self as any).createVue2Compiler =
  (): CompilerFunction =>
  async (code, { config }) =>
    `(() => {
let app = document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div'));

/* <!-- */
let content = \`${escapeCode(await compileAllBlocks(code, config))}\`;
/* --> */
${getLoaderOptions(config.customSettings.defaultCDN)}
const { loadModule, vueVersion } = window['vue2-sfc-loader'];
loadModule('/component.vue', options)
.then(component => new Vue(component).$mount(app));
Vue.config.devtools = true;
})();
`;
