import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { getLanguageCustomSettings } from './utils';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  compiler: {
    url: vendorsBaseUrl + 'coffeescript/coffeescript.js',
    factory: () => async (code, { config }) =>
      (window as any).CoffeeScript.compile(code, {
        bare: true,
        ...getLanguageCustomSettings('coffeescript', config),
      }),
  },
  extensions: ['coffee'],
  editor: 'script',
};
