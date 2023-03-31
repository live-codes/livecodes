import type { LanguageSpecs } from '../../models';

export const r: LanguageSpecs = {
  name: 'r',
  title: 'R',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-r-script-esm.js}}'],
    inlineScript: `
    livecodes.r = livecodes.r || {config: {}};
    addEventListener('load', async () => {
      await livecodes.r.loaded;
      if (livecodes.r.config?.autoEvaluate !== false) {
        await livecodes.r.run();
      }
      // reset config before next load
      livecodes.r.config = {};
    });
    `,
    liveReload: true,
    scriptType: 'text/r',
    compiledCodeLanguage: 'r',
  },
  extensions: ['r', 'rlang', 'rstats'],
  editor: 'script',
  largeDownload: true,
};
