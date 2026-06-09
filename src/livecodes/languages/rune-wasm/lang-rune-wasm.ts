import type { LanguageSpecs } from '../../models';
import { runeWasmUrl } from '../../vendors';

export const runeWasm: LanguageSpecs = {
  name: 'rune-wasm',
  title: 'Rune',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [runeWasmUrl, baseUrl + '{{hash:lang-rune-wasm-script.js}}'],
    liveReload: true,
    scriptType: 'text/rune',
    compiledCodeLanguage: 'rune-wasm',
  },
  extensions: ['rune', 'rn'],
  editor: 'script',
  editorLanguage: 'rust',
  largeDownload: true,
};
