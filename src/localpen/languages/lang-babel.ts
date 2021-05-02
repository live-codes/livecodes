import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const babel: LanguageSpecs = {
  name: 'babel',
  title: 'Babel',
  info: `
  <h3>Babel</h3>
  <div>The JavaScript compiler</div>
  <ul>
    <li><a href="https://babeljs.io/" target="_blank">Official website</a></li>
    <li><a href="https://babeljs.io/docs/en/" target="_blank">Babel documentation</a></li>
    <!-- <li><a href="#">Babel usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'babel',
    pluginUrls: [parserPlugins.babel, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/babel/babel.min.js',
    factory: () => (window as any).Babel.transform,
    umd: true,
  },
  extensions: ['es', 'babel'],
  editor: 'script',
};
