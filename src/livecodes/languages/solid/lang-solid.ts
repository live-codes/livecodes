import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

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
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-solid-compiler.js}}');
      return (self as any).createSolidCompiler();
    },
  },
  extensions: ['solid.jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
};
