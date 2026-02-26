import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const csharpWasm: LanguageSpecs = {
  name: 'csharp-wasm',
  title: 'C# (Wasm)',
  parser: {
    name: 'java',
    pluginUrls: [parserPlugins.java],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-csharp-wasm-script.js}}'],
    scriptType: 'text/csharp-wasm',
    compiledCodeLanguage: 'csharp-wasm',
    liveReload: true,
  },
  extensions: ['cs', 'csharp', 'wasm.cs', 'cs-wasm'],
  editor: 'script',
  editorLanguage: 'csharp',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'csharp.js' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).csharp),
    },
  },
  largeDownload: true,
};
