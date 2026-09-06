import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

export const ocaml: LanguageSpecs = {
  name: 'ocaml',
  title: 'OCaml',
  compiler: 'rescript',
  extensions: ['ml', 'mli'],
  editor: 'script',
  editorSupport: {
    monaco: { language: 'csharp' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-mllike.js')).oCaml),
    },
  },
};
