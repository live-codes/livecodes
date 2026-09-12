import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtClangBaseUrl } from '../../vendors';

export const csharpWasm: LanguageSpecs = {
  name: 'csharp-wasm',
  title: 'C# (Wasm)',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({ formatted: await formatter.format(code, 'main.cs', 'Microsoft') });
    },
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
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'csharp.js', language: 'csharp' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).csharp),
    },
    codejar: { language: 'csharp' },
  },
  largeDownload: true,
};
