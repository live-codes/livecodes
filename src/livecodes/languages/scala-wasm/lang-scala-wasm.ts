import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, scalaWasmBaseUrl } from '../../vendors';

export const scalaWasm: LanguageSpecs = {
  name: 'scala-wasm',
  title: 'Scala (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      scalaWasmBaseUrl + 'dist/scala-wasm.iife.js',
      baseUrl + '{{hash:lang-scala-wasm-script.js}}',
    ],
    scriptType: 'text/scala-wasm',
    compiledCodeLanguage: 'scala',
    liveReload: true,
  },
  extensions: ['scala', 'scala-wasm', 'wasm.scala'],
  editor: 'script',
  editorLanguage: 'scala',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'scala.js', language: 'scala' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).scala),
    },
    codejar: { language: 'scala' },
  },
  largeDownload: true,
};
