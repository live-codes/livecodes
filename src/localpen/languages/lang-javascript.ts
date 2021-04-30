import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const javascript: LanguageSpecs = {
  name: 'javascript',
  title: 'JS',
  longTitle: 'JavaScript',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
  },
  extensions: ['js'],
  editor: 'script',
};
