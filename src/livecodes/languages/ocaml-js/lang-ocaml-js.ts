import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { CompilerFunction, LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const runOutsideWorker: CompilerFunction = async (code: string, { baseUrl, language }) => {
  const { ocamlCompiler } = await import(baseUrl + '{{hash:lang-ocaml-js-compiler-esm.js}}');
  return ocamlCompiler(code, { baseUrl, language });
};

export const ocamlJs: LanguageSpecs = {
  name: 'ocaml-js',
  title: 'OCaml (JS)',
  longTitle: 'OCaml (compiled to JavaScript)',
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
  },
  extensions: ['ocaml-js', 'js.ocaml', 'js.ml'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'ocaml.js', language: 'ocaml' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-mllike.js')).oCaml),
    },
    codejar: { language: 'ocaml' },
  },
  largeDownload: true,
};
