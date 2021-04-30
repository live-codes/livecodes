import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const jsx: LanguageSpecs = {
  name: 'jsx',
  title: 'JSX',
  longTitle: 'React JSX',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['jsx'],
  editor: 'script',
};
