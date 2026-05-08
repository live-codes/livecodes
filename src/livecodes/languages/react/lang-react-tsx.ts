import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const reactTsx: LanguageSpecs = {
  name: 'react-tsx',
  title: 'React (TSX)',
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: 'react',
  extensions: ['react.tsx'],
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
