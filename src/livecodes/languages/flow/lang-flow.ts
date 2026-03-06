import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const flow: LanguageSpecs = {
  name: 'flow',
  title: 'Flow',
  formatter: {
    prettier: {
      name: 'babel-flow',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
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
  editorSupport: {
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
  multiFileSupport: true,
};
