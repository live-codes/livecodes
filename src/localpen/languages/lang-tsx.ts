import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const tsx: LanguageSpecs = {
  name: 'tsx',
  title: 'TSX',
  longTitle: 'React TSX',
  info: `
  <h3>React TSX</h3>
  <div>TypeScript in JSX. TSX is compiled to JavaScript in LocalPen using the TypeScript Compiler.</div>
  <ul>
    <li><a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a></li>
    <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener">React documentation</a></li>
    <li><a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener">JSX in React documentation</a></li>
    <li><a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">Typescript documentation</a></li>
    <!-- <li><a href="#">JSX/TSX usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'babel-ts',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['tsx'],
  editor: 'script',
};
