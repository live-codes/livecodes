import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const pug: LanguageSpecs = {
  name: 'pug',
  title: 'Pug',
  info: `
  <h3>Pug</h3>
  <div>Robust, elegant, feature rich template engine.</div>
  <ul>
    <li><a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noopener">Pug documentation</a></li>
    <!-- <li><a href="#">Pug usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'pug',
    pluginUrls: [parserPlugins.pug],
  },
  compiler: {
    url: 'vendor/pug/pug.min.js',
    factory: () => async (code) => (window as any).pug.render(code),
    umd: true,
  },
  extensions: ['pug', 'jade'],
  editor: 'markup',
};
