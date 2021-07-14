import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const jsx: LanguageSpecs = {
  name: 'jsx',
  title: 'JSX',
  info: `
  <h3>JSX</h3>
  <div>
    JSX is compiled to JavaScript in LocalPen using the TypeScript Compiler. <br />
    By default it uses <code>React.createElement</code>
  </div>
  <ul>
    <li><a href="https://reactjs.org/" target="_blank" rel="noopener">React official website</a></li>
    <li><a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener">React documentation</a></li>
    <li><a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener">JSX in React documentation</a></li>
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
