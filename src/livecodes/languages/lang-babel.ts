import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const babel: LanguageSpecs = {
  name: 'babel',
  title: 'Babel',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'https://cdn.jsdelivr.net/npm/@babel/standalone@7.16.2/babel.min.js',
    factory: () => async (code, { config }) =>
      (window as any).Babel.transform(code, {
        filename: 'script.tsx',
        presets: [['env', { modules: false }], 'typescript', 'react'],
        ...getLanguageCustomSettings('babel', config),
      }).code,
  },
  extensions: ['es', 'babel'],
  editor: 'script',
  editorLanguage: 'javascript',
};
