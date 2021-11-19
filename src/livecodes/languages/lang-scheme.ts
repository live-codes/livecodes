import { LanguageSpecs } from '../models';

const cdnUrl = 'https://cdn.jsdelivr.net/npm/biwascheme@0.7.4/release/biwascheme-min.js';

export const scheme: LanguageSpecs = {
  name: 'scheme',
  title: 'Scheme',
  compiler: {
    factory: () => async (code) => code,
    scripts: [cdnUrl],
    scriptType: 'text/biwascheme',
    compiledCodeLanguage: 'scheme',
  },
  extensions: ['scm'],
  editor: 'script',
};
