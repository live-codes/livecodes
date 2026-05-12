import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const reactNativeTsx: LanguageSpecs = {
  name: 'react-native-tsx',
  title: 'RN (TSX)',
  longTitle: 'React Native (TSX)',
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: 'react-native',
  extensions: ['react-native.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
  editorSupport: {
    compilerOptions: {
      checkJs: true,
      strictNullChecks: true,
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
};
