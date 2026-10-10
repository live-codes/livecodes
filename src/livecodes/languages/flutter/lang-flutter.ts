import type { LanguageSpecs } from '../../models';
import { dartWasmBaseUrl } from '../../vendors';
import { dart } from '../dart';

export const flutter: LanguageSpecs = {
  ...dart,
  name: 'flutter',
  title: 'Flutter',
  compiler: {
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
  },
  extensions: ['flutter'],
  editorLanguage: 'dart',
};
