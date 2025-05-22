import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { coffeeScriptUrl } from '../../vendors';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  compiler: {
    url: coffeeScriptUrl,
    factory:
      () =>
      async (code, { config }) =>
        (window as any).CoffeeScript.compile(code, {
          bare: true,
          ...getLanguageCustomSettings('coffeescript', config),
        }),
  },
  extensions: ['coffee'],
  editor: 'script',
};
