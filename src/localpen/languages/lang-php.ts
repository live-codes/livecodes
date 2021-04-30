import { LanguageSpecs } from '../models';

export const php: LanguageSpecs = {
  name: 'php',
  title: 'PHP',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => {
      code = code.trim();
      if (code.startsWith('<?php')) {
        code = code.replace('<?php', '/* <?php */');
        if (code.endsWith('?>')) {
          code = code.replace('?>', '/* ?> */');
        }
      }
      return code;
    },
    umd: true,
    scripts: ['vendor/uniter/uniter.js'],
    deferScripts: true,
    scriptType: 'text/x-uniter-php',
  },
  extensions: ['php'],
  editor: 'script',
};
