import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const reactTsx: LanguageSpecs = {
  name: 'react-tsx',
  title: 'React (TSX)',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'react',
  extensions: ['react.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
  multiFileSupport: true,
};
