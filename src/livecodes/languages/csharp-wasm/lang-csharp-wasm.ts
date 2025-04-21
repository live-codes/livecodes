import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const csharpWasm: LanguageSpecs = {
  name: 'csharp-wasm',
  title: 'C# (Wasm)',
  parser: {
    name: 'java',
    pluginUrls: [parserPlugins.java],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-csharp-wasm-script.js}}'],
    scriptType: 'text/csharp-wasm',
    compiledCodeLanguage: 'csharp-wasm',
    liveReload: true,
  },
  extensions: ['cs', 'csharp', 'wasm.cs', 'cs-wasm'],
  editor: 'script',
  editorLanguage: 'csharp',
  largeDownload: true,
};
