import { LanguageSpecs } from '../models';

export const stylus: LanguageSpecs = {
  name: 'stylus',
  title: 'Stylus',
  compiler: {
    url: 'vendor/stylus/stylus.min.js',
    factory: () => (window as any).stylus.render,
    umd: true,
  },
  extensions: ['styl'],
  editor: 'style',
};
