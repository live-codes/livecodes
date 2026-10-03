import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const adaWasm: LanguageSpecs = {
  name: 'ada-wasm',
  title: 'Ada (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-ada-wasm-script.js}}'],
    scriptType: 'text/ada-wasm',
    compiledCodeLanguage: 'ada-wasm',
    liveReload: true,
  },
  extensions: ['ada', 'adb', 'ads', 'hac', 'wasm.ada'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'ada.js', language: 'ada' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-pascal.js')).pascal),
    },
    codejar: { language: 'ada' },
  },
};
