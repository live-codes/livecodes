import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

export const julia: LanguageSpecs = {
  name: 'julia',
  title: 'Julia',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-julia-script.js}}'],
    liveReload: true,
    scriptType: 'text/julia',
    compiledCodeLanguage: 'julia',
  },
  extensions: ['jl'],
  editor: 'script',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-julia.js')).julia),
    },
  },
  largeDownload: true,
};
