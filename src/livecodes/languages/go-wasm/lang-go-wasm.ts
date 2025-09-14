import type { LanguageSpecs } from '../../models';
import { go } from '../go/lang-go';

export const goWasm: LanguageSpecs = {
  name: 'go-wasm',
  title: 'Go (Wasm)',
  formatter: go.formatter,
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-go-wasm-script.js}}'],
    liveReload: true,
    scriptType: 'text/go-wasm',
    compiledCodeLanguage: 'go',
  },
  extensions: ['wasm.go', 'go-wasm', 'gowasm'],
  editor: 'script',
  editorLanguage: 'go',
  largeDownload: true,
};
