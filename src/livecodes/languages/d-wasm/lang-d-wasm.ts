import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const dWasm: LanguageSpecs = {
  name: 'd-wasm',
  title: 'D (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-d-wasm-script.js}}'],
    scriptType: 'text/d-wasm',
    compiledCodeLanguage: 'd-wasm',
    liveReload: true,
  },
  extensions: ['d', 'di', 'dlang', 'dmd'],
  editor: 'script',
  editorSupport: {
    // Monaco has no D language, so D is highlighted as C++ (its closest built-in relative).
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'cpp.js', language: 'cpp' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-d.js')).d),
    },
    codejar: { language: 'd' },
  },
  largeDownload: true,
};
