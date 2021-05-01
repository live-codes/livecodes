import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const jsx: LanguageSpecs = {
  name: 'jsx',
  title: 'JSX',
  longTitle: 'React JSX',
  info: `
  <h3>React JSX</h3>
  <div>JSX is compiled to JavaScript in LocalPen using the TypeScript Compiler.</div>
  <ul>
    <li><a href="https://reactjs.org/" target="_blank">React official website</a></li>
    <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank">React documentation</a></li>
    <li><a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank">JSX in React documentation</a></li>
    <!-- <li><a href="#">JSX/TSX usage in LocalPen</a></li> -->
    <li><a href="?template=react" target="_parent" data-template="react">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: 'typescript',
  extensions: ['jsx'],
  editor: 'script',
};
