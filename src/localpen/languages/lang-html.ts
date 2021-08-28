import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';

export const html: LanguageSpecs = {
  name: 'html',
  title: 'HTML',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  extensions: ['html', 'htm'],
  editor: 'markup',
};
