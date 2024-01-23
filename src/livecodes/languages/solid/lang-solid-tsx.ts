import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const solidTsx: LanguageSpecs = {
  name: 'solid.tsx',
  title: 'Solid (TS)',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'solid',
  extensions: ['solid.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
};
