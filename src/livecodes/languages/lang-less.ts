import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const less: LanguageSpecs = {
  name: 'less',
  title: 'Less',
  parser: {
    name: 'less',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: vendorsBaseUrl + 'less/less.js',
    factory:
      () =>
      async (code, { config }) =>
        (
          await (window as any).less.render(code, {
            ...getLanguageCustomSettings('less', config),
          })
        ).css,
  },
  extensions: ['less'],
  editor: 'style',
};
