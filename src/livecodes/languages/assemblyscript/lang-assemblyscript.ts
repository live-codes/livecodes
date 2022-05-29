import type { LanguageSpecs } from '../../models';
import { assemblyscriptLoaderUrl, vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';
import { getLanguageCustomSettings } from '../utils';

declare const importScripts: (...args: string[]) => void;
declare const compileAssemblyscript: any;

const scriptType = 'application/wasm-uint8';

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel],
  },
  compiler: {
    factory: (_config, baseUrl) => {
      importScripts(baseUrl + '{{hash:lang-assemblyscript-factory.js}}');
      return (code, { config }) =>
        compileAssemblyscript(code, {
          optimizeLevel: 3,
          ...getLanguageCustomSettings('assemblyscript', config),
        });
    },
    scripts: ({ baseUrl }) => [
      assemblyscriptLoaderUrl,
      baseUrl + '{{hash:lang-assemblyscript-script.js}}',
    ],
    scriptType,
    compiledCodeLanguage: 'wat',
    types: {
      assemblyscript: {
        url: vendorsBaseUrl + 'types/assemblyscript.d.ts',
        declareAsModule: false,
        autoload: true,
      },
    },
  },
  extensions: ['as', 'ts'],
  editor: 'script',
  editorLanguage: 'typescript',
};
