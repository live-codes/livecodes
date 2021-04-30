import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const less: LanguageSpecs = {
  name: 'less',
  title: 'Less',
  parser: {
    name: 'less',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: 'vendor/less/less.js',
    factory: () => (window as any).less.render,
    umd: true,
  },
  extensions: ['less'],
  editor: 'style',
};
