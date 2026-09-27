import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const fanak: LanguageSpecs = {
  name: 'fanak',
  title: 'Fanak',
  compiler: {
    // The compiler runs in a Blazor WASM runner that is fetched from
    // `fanakBaseUrl` at run time (see lang-fanak-script.ts); LiveCodes just
    // hands the source through and the runner reports output/errors.
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-fanak-script.js}}'],
    scriptType: 'text/fanak',
    compiledCodeLanguage: 'fanak',
    liveReload: true,
  },
  extensions: ['fnk', 'fanak'],
  editor: 'script',
  editorSupport: {
    // Fanak's syntax is C-like (`Unit main() { ... }`), so reuse the C#
    // highlighting until a dedicated Monarch grammar is added.
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'csharp.js', language: 'csharp' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).csharp),
    },
    codejar: { language: 'csharp' },
  },
  largeDownload: true,
};
