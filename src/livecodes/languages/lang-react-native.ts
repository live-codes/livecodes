import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { typescriptOptions } from './lang-typescript';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const reactNativeWebUrl = vendorsBaseUrl + 'react-native-web/react-native-web.js';

export const reactNative: LanguageSpecs = {
  name: 'react-native',
  title: 'RN',
  longTitle: 'React Native',
  info: `
  <h3>React Native for Web</h3>
  <div>
    React Native for Web is an accessible implementation of React Native's Components and APIs that is interoperable with React DOM.
  </div>
  <ul>
    <li><a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a></li>
    <li><a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a></li>
    <li><a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener">React Native for Web website</a></li>
    <li><a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener">React Native documentation</a></li>
    <li><a href="?template=react-native" target="_parent" data-template="react-native">Load starter template</a></li>
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
  extensions: ['react-native.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
};
