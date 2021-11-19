import { LanguageSpecs } from '../models';
import { reactNativeWebUrl } from './lang-react-native';
import { typescriptOptions } from './lang-typescript';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const reactNativeTsx: LanguageSpecs = {
  name: 'react-native-tsx',
  title: 'RN (TSX)',
  longTitle: 'React Native (TSX)',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    dependencies: ['typescript'],
    factory: () => async (code, { config, language }) =>
      (window as any).ts.transpile(code, {
        ...typescriptOptions,
        ...getLanguageCustomSettings('typescript', config),
        ...getLanguageCustomSettings(language, config),
      }),
    imports: {
      react: reactNativeWebUrl,
      'react-native': reactNativeWebUrl,
    },
  },
  extensions: ['react-native.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
};
