import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';
import { vendorsBaseUrl } from '../../vendors';

export const phpWasm: LanguageSpecs = {
  name: 'php-wasm',
  title: 'PHP (Wasm)',
  parser: {
    name: 'php',
    pluginUrls: [parserPlugins.php],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      vendorsBaseUrl + 'php-wasm/php-wasm.js',
      baseUrl + '{{hash:lang-php-wasm-script.js}}',
    ],
    scriptType: 'text/php-wasm',
    compiledCodeLanguage: 'php',
  },
  extensions: ['wasm.php', 'phpwasm'],
  editor: 'script',
  editorLanguage: 'php',
};
