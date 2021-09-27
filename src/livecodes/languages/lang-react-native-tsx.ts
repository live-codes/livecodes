import { LanguageSpecs } from '../models';
import { reactNativeWebUrl } from './lang-react-native';
import { typescriptOptions } from './lang-typescript';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const reactNativeTsx: LanguageSpecs = {
  name: 'react-native-tsx',
  title: 'RN (TSX)',
  longTitle: 'React Native (TSX)',
  info: `
  <h3>React Native for Web (with TypeScript)</h3>
  <div>
    React Native for Web is an accessible implementation of React Native's Components and APIs that is interoperable with React DOM.
  </div>
  <ul>
    <li><a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a></li>
    <li><a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a></li>
    <li><a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener">React Native for Web website</a></li>
    <li><a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener">React Native documentation</a></li>
    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript website</a></li>
    <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">TypeScript documentation</a></li>
    <li><a href="?template=react-native" target="_parent" data-template="react-native">Load starter template (JSX)</a></li>
  </ul>
  `,
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
