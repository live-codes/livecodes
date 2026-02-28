import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';
import { typescriptOptions } from '../typescript';
import { getLanguageCustomSettings } from '../utils';

const reactNativeWebUrl = vendorsBaseUrl + 'react-native-web/react-native-web.js';

export const reactNative: LanguageSpecs = {
  name: 'react-native',
  title: 'RN',
  longTitle: 'React Native',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    dependencies: ['typescript'],
    factory:
      () =>
      async (code, { config, language }) =>
        (window as any).ts.transpile(code, {
          ...typescriptOptions,
          ...{ jsx: 'react-jsx' },
          ...getLanguageCustomSettings('typescript', config),
          ...getLanguageCustomSettings(language, config),
        }),
    imports: {
      react: reactNativeWebUrl,
      'react-native': reactNativeWebUrl,
    },
  },
  extensions: ['react-native.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
  editorSupport: {
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
};
