import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const typescript: LanguageSpecs = {
  name: 'typescript',
  title: 'TS',
  longTitle: 'TypeScript',
  info: `
  <h3>TypeScript</h3>
  <div>A Typed Superset of JavaScript.</div>
  <ul>
    <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">Official website</a></li>
    <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">Typescript documentation</a></li>
    <!-- <li><a href="#">Typescript usage in LocalPen</a></li> -->
    <li><a href="?template=typescript" target="_parent" data-template="typescript">Load starter template</a></li>
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
