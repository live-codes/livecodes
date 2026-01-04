import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const minizinc: LanguageSpecs = {
  name: 'minizinc',
  title: 'MiniZinc',
  parser: {
    name: 'minizinc',
    pluginUrls: [parserPlugins.minizinc],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-minizinc-script.js}}'],
    scriptType: 'text/minizinc',
    compiledCodeLanguage: 'minizinc',
  },
  extensions: ['mzn', 'dzn', 'minizinc'],
  editor: 'script',
};
