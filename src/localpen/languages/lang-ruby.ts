import { LanguageSpecs } from '../models';

export const ruby: LanguageSpecs = {
  name: 'ruby',
  title: 'Ruby',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
    umd: true,
    scripts: [
      'vendor/opal/opal.min.js',
      'vendor/opal/native.min.js',
      'vendor/opal/opal-parser.min.js',
    ],
    inlineScript: `
      Opal.config.unsupported_features_severity = 'ignore';
      Opal.load('opal-parser');
      Opal.load('native');
    `,
    scriptType: 'text/ruby',
  },
  extensions: ['rb'],
  editor: 'script',
};
