import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const rustWasm: LanguageSpecs = {
  name: 'rust-wasm',
  title: 'Rust (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-rust-wasm-script.js}}'],
    scriptType: 'text/rust-wasm',
    compiledCodeLanguage: 'rust',
    liveReload: true,
  },
  extensions: ['rs', 'rust', 'wasm.rs', 'rs-wasm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'rust.js', language: 'rust' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-rust.js')).rust),
    },
    codejar: { language: 'rust' },
  },
  largeDownload: true,
};
