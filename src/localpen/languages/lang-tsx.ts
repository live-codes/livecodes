import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const tsx: LanguageSpecs = {
  name: 'tsx',
  title: 'TSX',
  longTitle: 'React TSX',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['tsx'],
  editor: 'script',
};
