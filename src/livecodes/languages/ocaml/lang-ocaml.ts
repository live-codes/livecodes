import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { Language, LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

export const ocaml: LanguageSpecs = {
  name: 'ocaml',
  title: 'OCaml',
  compiler: 'rescript',
  // This entry runs the ReScript compiler, not OCaml. `ocaml-js` is the real one;
  // until the swap, `ocaml` still resolves here, with a warning.
  deprecation: (lang: Language) =>
    ['ocaml', 'ml', 'mli'].includes(lang) ? { old: 'rescript-ocaml', new: 'ocaml-js' } : undefined,
  extensions: ['ml', 'mli', 'rescript-ocaml'],
  editor: 'script',
  editorSupport: {
    monaco: { language: 'csharp' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-mllike.js')).oCaml),
    },
  },
};
