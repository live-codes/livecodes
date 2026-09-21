import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, scittleUrl } from '../../vendors';

export const cljsScittle: LanguageSpecs = {
  name: 'cljs-scittle',
  title: 'CLJS (scittle)',
  longTitle: 'ClojureScript (SCI, via Scittle)',
  compiler: {
    factory: () => async (code) => code,
    scripts: [scittleUrl],
    scriptType: 'application/x-scittle',
  },
  extensions: ['cljs-scittle', 'scittle'],
  editor: 'script',
  editorLanguage: 'clojure',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clojure.js')).clojure),
    },
  },
};
