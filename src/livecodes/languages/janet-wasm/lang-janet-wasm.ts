import type { LanguageSpecs } from '../../models';

export const janetWasm: LanguageSpecs = {
  name: 'janet-wasm',
  title: 'Janet (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-janet-wasm-script.js}}'],
    scriptType: 'text/janet-wasm',
    compiledCodeLanguage: 'janet-wasm',
    liveReload: true,
  },
  extensions: ['janet', 'wasm.janet'],
  editor: 'script',
};
