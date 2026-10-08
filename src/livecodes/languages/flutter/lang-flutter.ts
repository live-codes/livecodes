import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, dartWasmBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const flutter: LanguageSpecs = {
  name: 'flutter',
  title: 'Flutter',
  compiler: {
    // Same worker compiler as Dart, on the Flutter toolchain: the SDK ships one worker with two
    // run modes, and the Flutter one compiles a wrapper that starts the engine.
    url: dartWasmBaseUrl + 'dart-wasm.iife.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-dart-compiler.js}}');
      return (self as any).createDartCompiler({
        engine: 'flutter',
        assetBaseUrl: dartWasmBaseUrl,
      });
    },
    scripts: ({ baseUrl }) => [
      dartWasmBaseUrl + 'dart-wasm.iife.js',
      baseUrl + '{{hash:lang-flutter-script.js}}',
    ],
    compiledCodeLanguage: 'javascript',
    liveReload: false,
  },
  extensions: ['flutter'],
  editor: 'script',
  editorLanguage: 'dart',
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
