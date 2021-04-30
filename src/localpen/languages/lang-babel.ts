import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const babel: LanguageSpecs = {
  name: 'babel',
  title: 'Babel',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/babel/babel.min.js',
    factory: () => (window as any).Babel.transform,
    umd: true,
  },
  extensions: ['es', 'babel'],
  editor: 'script',
};
