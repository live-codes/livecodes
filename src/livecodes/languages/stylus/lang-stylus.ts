import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

export const stylus: LanguageSpecs = {
  name: 'stylus',
  title: 'Stylus',
  compiler: {
    url: vendorsBaseUrl + 'stylus/stylus.min.js',
    factory: () => async (code) => (window as any).stylus.render(code),
  },
  extensions: ['styl'],
  editor: 'style',
};
