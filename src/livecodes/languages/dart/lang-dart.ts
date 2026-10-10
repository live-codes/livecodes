import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, dartWasmBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const dart: LanguageSpecs = {
  name: 'dart',
  title: 'Dart',
  formatter: {
    factory: async () => {
      (self as any).importScripts(dartWasmBaseUrl + 'dart-wasm.iife.js');
      const formatter = await (self as any).DartWasm.createCompiler({
        baseUrl: dartWasmBaseUrl,
      });
      return async (code) => ({ formatted: await formatter?.format(code) });
    },
  },
  compiler: {
    url: dartWasmBaseUrl + 'dart-wasm.iife.js',
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-dart-compiler.js}}');
      return (self as any).createDartCompiler({ engine: 'dart', assetBaseUrl: dartWasmBaseUrl });
    },
    scripts: ({ baseUrl }) => [
      dartWasmBaseUrl + 'dart-wasm.iife.js',
      baseUrl + '{{hash:lang-dart-script.js}}',
    ],
  },
  extensions: ['dart', 'dartlang'],
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
