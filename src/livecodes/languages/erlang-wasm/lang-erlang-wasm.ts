import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const erlangWasm: LanguageSpecs = {
  name: 'erlang-wasm',
  title: 'Erlang (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-erlang-wasm-script.js}}'],
    scriptType: 'text/erlang-wasm',
    compiledCodeLanguage: 'erlang',
    liveReload: true,
  },
  extensions: ['erl', 'erlang', 'erlang-wasm', 'wasm.erl'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'erlang.js',
      language: 'erlang',
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-erlang.js')).erlang),
    },
    codejar: { language: 'erlang' },
  },
  largeDownload: true,
};
