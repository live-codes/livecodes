import type { LanguageSpecs } from '../../models';
import { codemirrorLegacy } from '../../editor/codemirror/utils';
import { codeMirrorLegacyModesBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

/**
 * Fortran, compiled to WebAssembly by LFortran and run in place by `@live-codes/lfortran-wasm`.
 *
 * There is no separate link step: a browser has no linker subprocess to hand a binary to, so the
 * compiler emits the program as a wasm side module and loads it with `dlopen`. That is also why
 * `largeDownload` is set — the compiler is ~19 MiB compressed and is fetched once per session.
 *
 * The shared implementation lives in `lang-fortran-wasm-script.ts`; like the Clang languages, the
 * spec's `factory` is a no-op and everything happens in the runner script in the result page.
 */
export const fortranWasm: LanguageSpecs = {
  name: 'fortran',
  title: 'Fortran',
  longTitle: 'Fortran (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-fortran-wasm-script.js}}'],
    scriptType: 'text/fortran-wasm',
    // The language the source is emitted as in the result page. Without it the result page carries no
    // script tag of this type, the runner finds no code and quietly does nothing. The Clang languages
    // set it for the same reason.
    compiledCodeLanguage: 'fortran',
    liveReload: true,
  },
  extensions: ['fortran', 'f90', 'f95', 'f03', 'f08', 'f', 'for', 'ftn', 'fortran-wasm', 'lfortran'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'fortran.js',
      language: 'fortran',
    },
    // CodeMirror's Fortran support lives in @codemirror/legacy-modes, which @live-codes/codemirror does
    // not build, so the legacy stream parser is imported directly. Prism, used by the CodeJar editor,
    // ships a Fortran grammar itself.
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy(
          (await import(codeMirrorLegacyModesBaseUrl + 'fortran.js')).fortran,
        ),
    },
    codejar: { language: 'fortran' },
  },
  largeDownload: true,
};
