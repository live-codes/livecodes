import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const sucrase: LanguageSpecs = {
  name: 'sucrase',
  title: 'Sucrase',
  formatter: {
    prettier: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
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
  editorSupport: {
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
};
