import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const janetWasm: LanguageSpecs = {
  name: 'janet-wasm',
  title: 'Janet (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-janet-wasm-script.js}}'],
    scriptType: 'text/janet-wasm',
    compiledCodeLanguage: 'janet-wasm',
    liveReload: true,
  },
  extensions: ['janet', 'wasm.janet'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'janet.js',
      language: 'janet',
    },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-janet.js')).janet(),
    },
    codejar: { language: 'clojure' },
  },
};
