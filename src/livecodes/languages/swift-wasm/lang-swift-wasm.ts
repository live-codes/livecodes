import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, swiftWasmBaseUrl } from '../../vendors';

export const swiftWasm: LanguageSpecs = {
  name: 'swift-wasm',
  title: 'Swift (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      swiftWasmBaseUrl + 'dist/swift-wasm.iife.js',
      baseUrl + '{{hash:lang-swift-wasm-script.js}}',
    ],
    scriptType: 'text/swift-wasm',
    compiledCodeLanguage: 'swift',
    liveReload: true,
  },
  extensions: ['swift', 'wasm.swift', 'swift-wasm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'swift.js', language: 'swift' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-swift.js')).swift),
    },
    codejar: { language: 'swift' },
  },
  largeDownload: true,
};
