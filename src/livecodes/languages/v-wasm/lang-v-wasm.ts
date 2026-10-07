import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const vWasm: LanguageSpecs = {
  name: 'v-wasm',
  title: 'V (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-v-wasm-script.js}}'],
    scriptType: 'text/v-wasm',
    compiledCodeLanguage: 'v',
    liveReload: true,
  },
  extensions: ['v', 'vlang', 'v-wasm', 'wasm.v', 'vsh'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'v.js',
      language: 'v',
    },
    codemirror: {
      languageSupport: async () => (await import(codeMirrorBaseUrl + 'codemirror-lang-v.js')).v(),
    },
    codejar: { language: 'v' },
  },
  largeDownload: true,
};
