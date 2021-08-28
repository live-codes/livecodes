import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';

export const php: LanguageSpecs = {
  name: 'php',
  title: 'PHP',
  info: `
  <h3>PHP</h3>
  <div>PHP running in the browser using Uniter.</div>
  <ul>
    <li><a href="https://www.php.net/" target="_blank" rel="noopener">PHP official website</a></li>
    <li><a href="https://www.php.net/manual/en/" target="_blank" rel="noopener">PHP documentation</a></li>
    <li><a href="https://github.com/asmblah/uniter" target="_blank" rel="noopener">Uniter GitHub repo</a></li>
    <!-- <li><a href="#">PHP usage in LocalPen</a></li> -->
    <li><a href="?template=php" target="_parent" data-template="php">Load starter template</a></li>
  </ul>
  `,
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
    scripts: ['vendor/uniter/uniter.js'],
    deferScripts: true,
    scriptType: 'text/x-uniter-php',
  },
  extensions: ['php'],
  editor: 'script',
};
