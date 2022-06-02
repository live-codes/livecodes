import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const tsx: LanguageSpecs = {
  name: 'tsx',
  title: 'TSX',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
};
