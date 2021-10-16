import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';

export const javascript: LanguageSpecs = {
  name: 'javascript',
  title: 'JS',
  longTitle: 'JavaScript',
  info: false,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  extensions: ['js'],
  editor: 'script',
};
