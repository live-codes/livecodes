import type { LanguageSpecs } from '../../models';

export const zigWasm: LanguageSpecs = {
  name: 'zig-wasm',
  title: 'Zig (Wasm)',
  parser: {
    name: 'zig',
    pluginUrls: []
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-zig-wasm-script.js}}'],
    scriptType: 'text/zig-wasm',
    compiledCodeLanguage: 'zig-wasm',
    liveReload: true,
  },
  extensions: ['zig'],
  editor: 'script',
  largeDownload: true,
};
