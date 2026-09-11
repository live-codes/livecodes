import { codemirrorImports } from '../../editor/codemirror/utils';
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
      new RegExp(/\/\*\*[\s\*]*((@jsx)|(@jsxImportSource))\s/g).test(code),
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
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: {
    url: typescriptUrl,
    factory:
      () =>
      async (code, { config, language, options }) => {
        const ts = (window as any).ts;
        const rawOptions = {
          ...typescriptOptions,
          ...(['jsx', 'tsx', 'typescript'].includes(language) && !hasCustomJsxRuntime(code, config)
            ? { jsx: 'react-jsx' }
            : {}),
          ...getLanguageCustomSettings('typescript', config),
          ...getLanguageCustomSettings(language, config),
          sourceMap: true,
        };
        const { options: compilerOptions, errors } = ts.convertCompilerOptionsFromJson(
          rawOptions,
          '',
        );
        if (errors?.length) {
          // eslint-disable-next-line no-console
          console.warn('TypeScript compiler option errors:', errors);
        }
        const result = ts.transpileModule(code, { compilerOptions });
        const filename = options.filename || 'script';
        return {
          code: result.outputText.replace(/\n?\/\/# sourceMappingURL=\S+/m, ''),
          info: {
            sourceMaps: result.sourceMapText ? { [filename]: result.sourceMapText } : undefined,
          },
        };
      },
  },
  extensions: ['ts', 'mts', 'typescript'],
  editor: 'script',
  editorSupport: {
    codemirror: {
      languageSupport: async () => {
        const { javascript } = await import(codemirrorImports.javascript);
        return javascript({ typescript: true });
      },
    },
    compilerOptions: {
      checkJs: true,
      strictNullChecks: true,
    },
  },
  multiFileSupport: true,
};
