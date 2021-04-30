import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const typescript: LanguageSpecs = {
  name: 'typescript',
  title: 'TS',
  longTitle: 'TypeScript',
  info: `
  <div>Typed JavaScript at Any Scale</div>
  <ul>
    <li><a href="#">Typescript Documentation</a></li>
    <li><a href="#">Typescript usage in LocalPen</a></li>
    <li><a href="#">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/typescript/typescript.min.js',
    factory: () => (window as any).typescript.transpile,
    umd: true,
  },
  extensions: ['ts', 'typescript'],
  editor: 'script',
};
