import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, dartWasmBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const dart: LanguageSpecs = {
  name: 'dart',
  title: 'Dart',
  compiler: {
    // The package's IIFE is importScripts'd into the compile worker; it is DOM-free, which is why
    // the compiler can run there. `lang-dart-compiler.js` drives it.
    url: dartWasmBaseUrl + 'dart-wasm.iife.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-dart-compiler.js}}');
      return (self as any).createDartCompiler({ engine: 'dart', assetBaseUrl: dartWasmBaseUrl });
    },
    // The compiled JavaScript is a DDC bundle that binds against the precompiled SDK runtime, so
    // the result page loads the package and the runtime loader before it.
    scripts: ({ baseUrl }) => [
      dartWasmBaseUrl + 'dart-wasm.iife.js',
      baseUrl + '{{hash:lang-dart-script.js}}',
    ],
  },
  extensions: ['dart'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'dart.js', language: 'dart' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).dart),
    },
    codejar: { language: 'dart' },
  },
  largeDownload: true,
};
