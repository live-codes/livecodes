import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { browserHaskellBaseUrl, codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const haskell: LanguageSpecs = {
  name: 'haskell',
  title: 'Haskell',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      browserHaskellBaseUrl + 'browser-haskell.iife.js',
      baseUrl + '{{hash:lang-haskell-script.js}}',
    ],
    scriptType: 'text/haskell',
  },
  extensions: ['hs', 'lhs', 'haskell'],
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
