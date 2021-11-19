import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';

const cdnUrl = 'https://cdn.jsdelivr.net/npm/uniter@2.17.0/dist/uniter.js';

export const php: LanguageSpecs = {
  name: 'php',
  title: 'PHP',
  parser: {
    name: 'php',
    pluginUrls: [parserPlugins.php],
  },
  compiler: {
    factory: () => async (code) => {
      code = code.trim();
      if (code.startsWith('<?php')) {
        code = code.replace('<?php', '/* <?php */');
        if (code.endsWith('?>')) {
          code = code.replace('?>', '/* ?> */');
        }
      }
      return code;
    },
    scripts: [cdnUrl],
    deferScripts: true,
    scriptType: 'text/x-uniter-php',
    compiledCodeLanguage: 'php',
  },
  extensions: ['php'],
  editor: 'script',
};
