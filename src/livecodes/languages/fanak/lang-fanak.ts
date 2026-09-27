import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, fanakMonacoUrl } from '../../vendors';

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
    monaco: {
      language: 'fanak',
      languageSupport: async (monaco: any) => {
        try {
          const module = await import(/* @vite-ignore */ fanakMonacoUrl);
          await module.default?.(monaco, () => undefined);
        } catch {
          monaco.languages.register({ id: 'fanak' });
        }
      },
    },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).csharp),
    },
    codejar: { language: 'csharp' },
  },
  largeDownload: true,
};
