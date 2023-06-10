import type { LanguageSpecs } from '../../models';
import { assemblyscriptLoaderUrl, vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

const assemblyscriptUrl = vendorsBaseUrl + 'assemblyscript/assemblyscript.js';

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel],
  },
  compiler: {
    url: assemblyscriptUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-assemblyscript-compiler.js}}');
      return (self as any).createAssemblyscriptCompiler();
    },
    scripts: ({ baseUrl }) => [
      assemblyscriptLoaderUrl,
      baseUrl + '{{hash:lang-assemblyscript-script.js}}',
    ],
    scriptType: 'application/wasm-uint8',
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
