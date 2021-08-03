import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';
import { getLanguageCustomSettings } from './utils';

export const solid: LanguageSpecs = {
  name: 'solid',
  title: 'Solid',
  info: `
  <h3>Solid</h3>
  <div>A declarative, efficient and flexible JavaScript library for building user interfaces.</div>
  <ul>
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>
    <li><a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Documentation</a></li>
    <!-- <li><a href="#">Solid usage in LocalPen</a></li> -->
    <li><a href="?template=solid" target="_parent" data-template="solid">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    dependencies: ['babel'],
    url: 'vendor/babel-preset-solid/babel-preset-solid.js',
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
            'solid',
          ],
        }).code;
      };
    },
    umd: true,
  },
  extensions: ['solid.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
};
