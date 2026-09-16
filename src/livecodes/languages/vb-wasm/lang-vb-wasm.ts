import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const vbWasm: LanguageSpecs = {
  name: 'vb-wasm',
  title: 'VB.NET (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-vb-wasm-script.js}}'],
    scriptType: 'text/vb-wasm',
    compiledCodeLanguage: 'vb-wasm',
    liveReload: true,
  },
  extensions: ['vb', 'vbnet', 'wasm.vb', 'vb-wasm'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'vb.js', language: 'vb' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-vb.js')).vb),
    },
    codejar: { language: 'vbnet' },
  },
  largeDownload: true,
};
