import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';
import { parserPlugins } from '../prettier';

export const flow: LanguageSpecs = {
  name: 'flow',
  title: 'Flow',
  parser: {
    name: 'babel-flow',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: vendorsBaseUrl + 'flow-remove-types/flow-remove-types.js',
    factory:
      () =>
      async (code, { config }) =>
        (window as any).flowRemoveTypes
          .transpile(code, {
            all: true,
            ...getLanguageCustomSettings('flow', config),
          })
          .toString(),
  },
  extensions: ['flow'],
  editor: 'script',
  editorLanguage: 'typescript',
};
