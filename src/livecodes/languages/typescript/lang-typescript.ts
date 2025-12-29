import type { Config, LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { typescriptUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const hasCustomJsxRuntime = (code: string, config: Config) => {
  const customTSConfig = {
    ...getLanguageCustomSettings('typescript', config),
    ...getLanguageCustomSettings(config.script.language, config),
  };
  return Boolean(
    customTSConfig.jsx ||
      customTSConfig.jsxFactory ||
      new RegExp(/\/\*\*[\s\*]*@jsx\s/g).test(code),
  );
};

export const typescriptOptions = {
  target: 'es2020',
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
      async (code, { config }) =>
        (window as any).ts.transpile(code, {
          ...typescriptOptions,
          ...(['jsx', 'tsx'].includes(config.script.language) && !hasCustomJsxRuntime(code, config)
            ? { jsx: 'react-jsx' }
            : {}),
          ...getLanguageCustomSettings('typescript', config),
          ...getLanguageCustomSettings(config.script.language, config),
        }),
  },
  extensions: ['ts', 'mts', 'typescript'],
  editor: 'script',
};
