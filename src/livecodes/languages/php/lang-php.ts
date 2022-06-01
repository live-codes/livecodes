import type { LanguageSpecs } from '../../models';
import { uniterUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

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
    scripts: [uniterUrl],
    deferScripts: true,
    scriptType: 'text/x-uniter-php',
    compiledCodeLanguage: 'php',
  },
  extensions: ['php'],
  editor: 'script',
};
