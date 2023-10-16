import type { LanguageSpecs } from '../../models';

export const r: LanguageSpecs = {
  name: 'r',
  title: 'R',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-r-script-esm.js}}'],
    inlineScript: `
    livecodes.r = livecodes.r || {config: {}};
    // reset config before next load
    livecodes.r.config = {};
    livecodes.r.evaluated = new Promise((resolve) => {
      addEventListener('load', async () => {
        await livecodes.r.loaded;
        if (livecodes.r.config?.autoEvaluate !== false) {
          await livecodes.r.run();
          resolve();
        }
      });
    });
    `,
    liveReload: true,
    scriptType: 'text/r',
    compiledCodeLanguage: 'r',
  },
  extensions: ['r', 'rlang', 'rstats', 'r-wasm'],
  editor: 'script',
  largeDownload: true,
};
