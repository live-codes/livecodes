import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';
declare const importScripts: (...args: string[]) => void;

export const solidTsx: LanguageSpecs = {
  name: 'solid.tsx',
  title: 'Solid TSX',
  info: `
  <h3>Solid</h3>
  <div>A declarative, efficient and flexible JavaScript library for building user interfaces.</div>
  <ul>
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>
    <li><a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Documentation</a></li>
    <!-- <li><a href="#">Solid usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'solid',
  extensions: ['solid.tsx'],
  editor: 'script',
};
