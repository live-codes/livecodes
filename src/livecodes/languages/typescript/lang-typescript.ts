import type { LanguageSpecs } from '../../models';
import { typescriptUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';
import { parserPlugins } from '../prettier';

export const typescriptOptions = {
  target: 'es2015',
  jsx: 'react',
  allowUmdGlobalAccess: true,
  esModuleInterop: true,
};

export const typescript: LanguageSpecs = {
  name: 'typescript',
  title: 'TS',
  longTitle: 'TypeScript',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: typescriptUrl,
    factory:
      () =>
      async (code, { config, language }) =>
        (window as any).ts.transpile(code, {
          ...typescriptOptions,
          ...getLanguageCustomSettings('typescript', config),
          ...getLanguageCustomSettings(language, config),
        }),
  },
  extensions: ['ts', 'typescript'],
  editor: 'script',
};
