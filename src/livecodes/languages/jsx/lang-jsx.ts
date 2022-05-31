import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const jsx: LanguageSpecs = {
  name: 'jsx',
  title: 'JSX',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
};
