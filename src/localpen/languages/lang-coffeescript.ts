import { LanguageSpecs } from '../models';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  compiler: {
    url: 'vendor/coffeescript/coffeescript.js',
    factory: () => (window as any).CoffeeScript.compile,
    umd: true,
  },
  extensions: ['coffee'],
  editor: 'script',
};
