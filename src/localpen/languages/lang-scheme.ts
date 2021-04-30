import { LanguageSpecs } from '../models';

export const scheme: LanguageSpecs = {
  name: 'scheme',
  title: 'Scheme',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
    umd: true,
    scripts: ['vendor/biwascheme/biwascheme-min.js'],
    scriptType: 'text/biwascheme',
  },
  extensions: ['scm'],
  editor: 'script',
};
