import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const css: LanguageSpecs = {
  name: 'css',
  title: 'CSS',
  info: false,
  parser: {
    name: 'css',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    factory: () => async (code) => code,
  },
  extensions: ['css'],
  editor: 'style',
};
