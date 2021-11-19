import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

const url =
  'https://cdn.jsdelivr.net/npm/coffeescript@2.6.1/lib/coffeescript-browser-compiler-legacy/coffeescript.js';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  compiler: {
    url,
    factory: () => async (code, { config }) =>
      (window as any).CoffeeScript.compile(code, {
        bare: true,
        ...getLanguageCustomSettings('coffeescript', config),
      }),
  },
  extensions: ['coffee'],
  editor: 'script',
};
