import type { LanguageSpecs } from '../../models';
import {
  codeMirrorBaseUrl,
  monacoLanguagesBaseUrl,
  vendorsBaseUrl,
  vueRuntimeUrl,
  vueSDKUrl,
} from '../../vendors';
import { parserPlugins } from '../prettier';

const compilerUrl = vendorsBaseUrl + 'vue-compiler-sfc/vue-compiler-sfc.js';

export const vue: LanguageSpecs = {
  name: 'vue',
  title: 'Vue',
  longTitle: 'Vue SFC',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: compilerUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-vue-compiler.js}}');
      return (self as any).createVueCompiler();
    },
    imports: {
      vue: vueRuntimeUrl,
      'livecodes/vue': vueSDKUrl,
    },
  },
  extensions: ['vue', 'vue3'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'vue.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-vue.js')).vue(),
    },
    codejar: { language: 'html' },
  },
};

export const vueApp: LanguageSpecs = {
  ...vue,
  name: 'vue-app',
  compiler: 'vue',
  extensions: ['app.vue'],
  editor: 'markup',
  editorSupport: { ...vue.editorSupport, monaco: { language: 'vue' } }, // avoid duplicate registration
};
