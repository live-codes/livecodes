import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const javascript: LanguageSpecs = {
  name: 'javascript',
  title: 'JS',
  longTitle: 'JavaScript',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code,
  },
  extensions: ['js', 'mjs'],
  editor: 'script',
};
