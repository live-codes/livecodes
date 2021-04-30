import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const stencil: LanguageSpecs = {
  name: 'stencil',
  title: 'Stencil',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/stencil/stencil.2.5.2.min.js',
    factory: () => async (code: string) => {
      const result = await (window as any).stencil.transpile(code, {
        sourceMap: false,
      });
      return result.code;
    },
    umd: true,
  },
  extensions: ['stencil.tsx'],
  editor: 'script',
};
