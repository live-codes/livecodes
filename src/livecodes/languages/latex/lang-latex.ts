import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codemirrorLegacyModesBaseUrl, latexBaseUrl } from '../../vendors';
import { runOutsideWorker } from './lang-latex-compiler';
import { registerLatexMonaco } from './lang-latex-monaco';

export const latex: LanguageSpecs = {
  name: 'latex',
  title: 'LaTeX',
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    scripts: [latexBaseUrl + 'js/base.js'],
    compiledCodeLanguage: 'html',
  },
  extensions: ['tex', 'latex', 'ltx'],
  editor: 'markup',
  editorSupport: {
    monaco: {
      language: 'latex',
      languageSupport: registerLatexMonaco,
    },
    codemirror: {
      language: 'latex',
      languageSupport: async () =>
        codemirrorLegacy((await import(codemirrorLegacyModesBaseUrl + 'stex.js')).stex),
    },
    codejar: { language: 'latex' },
  },
};
