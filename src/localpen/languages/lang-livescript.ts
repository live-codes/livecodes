import { LanguageSpecs } from '../models';

export const livescript: LanguageSpecs = {
  name: 'livescript',
  title: 'LiveScript',
  compiler: {
    url: 'vendor/livescript/livescript-min.js',
    factory: () => (window as any).require('livescript').compile,
    scripts: ['vendor/livescript/prelude-browser-min.js'],
    umd: true,
  },
  extensions: ['ls'],
  editor: 'script',
};
