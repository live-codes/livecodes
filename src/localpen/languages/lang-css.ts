import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';

export const css: LanguageSpecs = {
  name: 'css',
  title: 'CSS',
  parser: {
    name: 'css',
    pluginUrls: [parserPlugins.postcss],
  },
  extensions: ['css'],
  editor: 'style',
};
