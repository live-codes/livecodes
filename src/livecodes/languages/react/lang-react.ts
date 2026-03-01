import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';
import { getLanguageCustomSettings } from '../utils';

export const react: LanguageSpecs = {
  name: 'react',
  title: 'React',
  formatter: {
    prettier: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: {
    dependencies: ['babel'],
    url: vendorsBaseUrl + 'babel-plugin-react-compiler/babel-plugin-react-compiler.js',
    factory:
      () =>
      async (code, { config, language }) => {
        const babelConfig = getLanguageCustomSettings('babel', config);
        const presetEnvConfig = getLanguageCustomSettings('@babel/preset-env' as any, config);
        const presetTsConfig = getLanguageCustomSettings('@babel/preset-typescript' as any, config);
        const presetReactConfig = getLanguageCustomSettings('@babel/preset-react' as any, config);
        const reactCompilerConfig = getLanguageCustomSettings(
          'babel-plugin-react-compiler' as any,
          config,
        );
        return (window as any).Babel.transform(code, {
          filename: 'script.tsx',
          presets: [
            ['env', { modules: false, ...presetEnvConfig }],
            ...(language === 'react-tsx' ? ['typescript', presetTsConfig] : []),
            ['react', { runtime: 'automatic', ...presetReactConfig }],
          ],
          plugins: [[(window as any).reactCompiler.reactCompiler, reactCompilerConfig]],
          ...babelConfig,
        }).code;
      },
  },
  extensions: ['react.jsx', 'react-jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
  editorSupport: {
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
  multiFileSupport: true,
};
