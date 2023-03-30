import type { LanguageSpecs } from '../../models';

export const r: LanguageSpecs = {
  name: 'r',
  title: 'R',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-r-script-esm.js}}'],
    liveReload: true,
    scriptType: 'text/r',
    compiledCodeLanguage: 'r',
  },
  extensions: ['r', 'rlang', 'rstats'],
  editor: 'script',
  largeDownload: true,
};
