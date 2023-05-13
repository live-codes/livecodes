import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';
import { parserPlugins } from '../prettier';

export const sucrase: LanguageSpecs = {
  name: 'sucrase',
  title: 'Sucrase',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: vendorsBaseUrl + 'sucrase/sucrase.js',
    factory:
      () =>
      async (code, { config }) =>
        (window as any).sucrase.transform(code, {
          transforms: ['jsx', 'typescript'],
          ...getLanguageCustomSettings('sucrase', config),
        }).code,
  },
  extensions: ['sucrase'],
  editor: 'script',
  editorLanguage: 'typescript',
};
