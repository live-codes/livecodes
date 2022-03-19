import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const solid: LanguageSpecs = {
  name: 'solid',
  title: 'Solid',
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    dependencies: ['babel'],
    url: vendorsBaseUrl + 'babel-preset-solid/babel-preset-solid.js',
    factory: () => {
      const Babel = (self as any).Babel;
      Babel.registerPreset('solid', (self as any).babelPresetSolid.solid);
      return async (code, { config, language }) => {
        const isTsx = language === 'solid.tsx';
        const customSettings = getLanguageCustomSettings('solid', config);
        return (window as any).Babel.transform(code, {
          ...customSettings,
          filename: 'script.' + (isTsx ? 'tsx' : 'jsx'),
          presets: [
            ['env', { modules: false }],
            ...(Array.isArray(customSettings.presets) ? customSettings.presets : []),
            ...(isTsx ? ['typescript'] : []),
            ['solid', { generate: 'dom', hydratable: true }],
          ],
        }).code;
      };
    },
    types: {
      'solid-js': {
        url: vendorsBaseUrl + 'types/solid-js.d.ts',
        declareAsModule: false,
      },
    },
  },
  extensions: ['solid.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
};
