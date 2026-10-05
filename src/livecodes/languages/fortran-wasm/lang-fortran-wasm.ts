import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const fortranWasm: LanguageSpecs = {
  name: 'fortran-wasm',
  title: 'Fortran (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-fortran-wasm-script.js}}'],
    scriptType: 'text/fortran-wasm',
    compiledCodeLanguage: 'fortran',
    liveReload: true,
  },
  extensions: ['f90', 'f95', 'f03', 'f08', 'f', 'for', 'ftn', 'fortran', 'lfortran'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'fortran.js',
      language: 'fortran',
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-fortran.js')).fortran),
    },
    codejar: { language: 'fortran' },
  },
  largeDownload: true,
};
