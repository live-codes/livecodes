import type { LanguageSpecs } from '../../models';

export const fsharpWasm: LanguageSpecs = {
  name: 'fsharp-wasm',
  title: 'F# (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-fsharp-wasm-script.js}}'],
    scriptType: 'text/fsharp-wasm',
    compiledCodeLanguage: 'fsharp',
    // The compiler runs inside a Web Worker that is respawned every few runs, so
    // live reload (in-place updates) is safe: the runtime never accumulates.
    liveReload: true,
  },
  extensions: ['fs', 'fsharp', 'fsx', 'wasm.fs', 'fs-wasm', 'wasm.fsx'],
  editor: 'script',
  editorSupport: {
    monaco: { language: 'fsharp' },
    codemirror: { language: 'fsharp' },
    codejar: { language: 'fsharp' },
  },
  largeDownload: true,
};
