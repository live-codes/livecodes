import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const solidTsx: LanguageSpecs = {
  name: 'solid.tsx',
  title: 'Solid (TS)',
  info: `
  <h3>Solid (with TypeScript)</h3>
  <div>A declarative, efficient and flexible JavaScript library for building user interfaces.</div>
  <ul>
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>
    <li><a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Solid documentation</a></li>
    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript website</a></li>
    <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">TypeScript documentation</a></li>
    <!-- <li><a href="#">Solid usage in LocalPen</a></li> -->
    <li><a href="?template=solid" target="_parent" data-template="solid">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'solid',
  extensions: ['solid.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
};
