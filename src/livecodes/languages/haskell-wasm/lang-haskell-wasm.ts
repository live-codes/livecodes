import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const haskellWasm: LanguageSpecs = {
  name: 'haskell-wasm',
  title: 'Haskell (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-haskell-wasm-script.js}}'],
    scriptType: 'text/haskell-wasm',
    compiledCodeLanguage: 'haskell',
    liveReload: true,
  },
  extensions: ['wasm.hs', 'hs-wasm', 'hswasm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'haskell.js', language: 'haskell' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-haskell.js')).haskell),
    },
    codejar: { language: 'haskell' },
  },
  largeDownload: true,
};
