import type { LanguageSpecs } from '../../models';

export const csharpWasm: LanguageSpecs = {
  name: 'csharp-wasm',
  title: 'C# (Wasm)',
  longTitle: 'C# (WebAssembly)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-csharp-wasm-script.js}}'],
    scriptType: 'text/csharp-wasm',
    compiledCodeLanguage: 'csharp-wasm',
    liveReload: true,
  },
  extensions: ['cs'],
  editor: 'script',
  editorLanguage: 'csharp-wasm',
  largeDownload: true,
};
