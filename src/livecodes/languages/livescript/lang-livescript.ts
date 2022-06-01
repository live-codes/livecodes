import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

export const livescript: LanguageSpecs = {
  name: 'livescript',
  title: 'LiveScript',
  compiler: {
    url: vendorsBaseUrl + 'livescript/livescript-min.js',
    factory:
      () =>
      async (code, { config }) =>
        (window as any).require('livescript').compile(code, {
          bare: true,
          ...getLanguageCustomSettings('livescript', config),
        }),
    scripts: [vendorsBaseUrl + 'livescript/prelude-browser-min.js'],
  },
  extensions: ['ls'],
  editor: 'script',
};
