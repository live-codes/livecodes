import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const pug: LanguageSpecs = {
  name: 'pug',
  title: 'Pug',
  parser: {
    name: 'pug',
    pluginUrls: [parserPlugins.pug],
  },
  compiler: {
    url: 'vendor/pug/pug.min.js',
    factory: () => (window as any).pug.render,
    umd: true,
  },
  extensions: ['pug', 'jade'],
  editor: 'markup',
};
