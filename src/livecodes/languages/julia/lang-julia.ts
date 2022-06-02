import type { LanguageSpecs } from '../../models';

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
  largeDownload: true,
};
