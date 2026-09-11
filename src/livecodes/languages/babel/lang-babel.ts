import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { babelUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const babel: LanguageSpecs = {
  name: 'babel',
  title: 'Babel',
  formatter: {
    prettier: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: {
    url: babelUrl,
    factory:
      () =>
      async (code, { config }) => {
        const babelConfig = getLanguageCustomSettings('babel', config);
        const presetEnvConfig = getLanguageCustomSettings('@babel/preset-env' as any, config);
        const presetTsConfig = getLanguageCustomSettings('@babel/preset-typescript' as any, config);
        const presetReactConfig = getLanguageCustomSettings('@babel/preset-react' as any, config);
        return (window as any).Babel.transform(code, {
          filename: 'script.tsx',
          presets: [
            ['env', { modules: false, ...presetEnvConfig }],
            ['typescript', presetTsConfig],
            ['react', presetReactConfig],
          ],
          ...babelConfig,
        }).code;
      },
  },
  extensions: ['es', 'babel'],
  editor: 'script',
  editorLanguage: 'typescript',
  editorSupport: {
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
  multiFileSupport: true,
};
