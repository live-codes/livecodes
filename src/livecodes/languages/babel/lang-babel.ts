import type { LanguageSpecs } from '../../models';
import { babelUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';
import { parserPlugins } from '../prettier';

export const babel: LanguageSpecs = {
  name: 'babel',
  title: 'Babel',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: babelUrl,
    factory:
      () =>
      async (code, { config }) =>
        (window as any).Babel.transform(code, {
          filename: 'script.tsx',
          presets: [['env', { modules: false }], 'typescript', 'react'],
          ...getLanguageCustomSettings('babel', config),
        }).code,
  },
  extensions: ['es', 'babel'],
  editor: 'script',
  editorLanguage: 'typescript',
};
