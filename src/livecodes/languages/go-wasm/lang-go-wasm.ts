import type { LanguageSpecs } from '../../models';

export const goWasm: LanguageSpecs = {
  name: 'go-wasm',
  title: 'Go (Wasm)',
  longTitle: 'Go (Yaegi WebAssembly)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-go-wasm-script.js}}'],
    liveReload: true,
    scriptType: 'text/go-wasm',
    compiledCodeLanguage: 'go',
  },
  extensions: ['wasm.go', 'yaegi', 'go-wasm', 'gowasm', 'goyae'],
  editor: 'script',
  editorLanguage: 'go',
  largeDownload: true,
};
