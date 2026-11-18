import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const elixirWasm: LanguageSpecs = {
  name: 'elixir-wasm',
  title: 'Elixir (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-elixir-wasm-script.js}}'],
    scriptType: 'text/elixir-wasm',
    compiledCodeLanguage: 'elixir',
    liveReload: true,
  },
  extensions: ['ex', 'exs', 'elixir', 'elixir-wasm', 'wasm.ex'],
  editor: 'script',
  editorSupport: {
    monaco: {
      languageSupport: monacoLanguagesBaseUrl + 'elixir.js',
      language: 'elixir',
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-ruby.js')).ruby),
    },
    codejar: { language: 'elixir' },
  },
  largeDownload: true,
};
