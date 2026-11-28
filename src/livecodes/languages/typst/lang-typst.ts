import type { LanguageSpecs } from '../../models';

export const typst: LanguageSpecs = {
  name: 'typst',
  title: 'Typst',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-typst-script-esm.js}}'],
    // Module scripts are cached by the browser, so a LiveReload document rewrite
    // does not re-evaluate the runner. This classic inline script re-executes and
    // triggers a render once the rewritten document has been parsed.
    inlineScript: `
      livecodes.typst = livecodes.typst || {};
      livecodes.typst.evaluated = (async () => {
        const start = Date.now();
        while (document.readyState === 'loading') {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        while (!(livecodes.typst && livecodes.typst.run)) {
          if (Date.now() - start > 30000) return;
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        await livecodes.typst.run();
      })();
    `,
    scriptType: 'text/typst',
    compiledCodeLanguage: 'typst',
    liveReload: true,
  },
  extensions: ['typ'],
  editor: 'script',
  editorLanguage: 'markdown',
  largeDownload: true,
};
