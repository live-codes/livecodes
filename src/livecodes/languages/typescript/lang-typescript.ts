import type { LanguageSpecs } from '../../models';
import { typescriptUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';
import { parserPlugins } from '../prettier';
// eslint-disable-next-line import/no-internal-modules
import { hasCustomJsxRuntime } from '../jsx/jsx-runtime';

export const typescriptOptions = {
  target: 'es2015',
  jsx: 'react-jsx',
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
      async (code, { config }) =>
        (window as any).ts.transpile(code, {
          ...typescriptOptions,
          ...(hasCustomJsxRuntime(code) ? { jsx: 'react' } : {}),
          ...getLanguageCustomSettings('typescript', config),
          ...getLanguageCustomSettings(config.script.language, config),
        }),
  },
  extensions: ['ts', 'typescript'],
  editor: 'script',
};
