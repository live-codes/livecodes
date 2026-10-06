import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const vWasm: LanguageSpecs = {
  name: 'v-wasm',
  title: 'V (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-v-wasm-script.js}}'],
    scriptType: 'text/v-wasm',
    compiledCodeLanguage: 'v',
    liveReload: true,
  },
  extensions: ['v', 'vlang', 'v-wasm', 'wasm.v', 'vsh'],
  editor: 'script',
  editorSupport: {
    // There is no dedicated V mode in either editor, so the Go mode stands in: V's syntax is
    // deliberately close to Go's. Prism does ship a real V grammar, so CodeJar uses that.
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'go.js',
      language: 'go',
    },
    codemirror: {
      languageSupport: async () => (await import(codeMirrorBaseUrl + 'codemirror-lang-go.js')).go(),
    },
    codejar: { language: 'v' },
  },
  largeDownload: true,
};
