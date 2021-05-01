import { LanguageSpecs } from '../models';

export const livescript: LanguageSpecs = {
  name: 'livescript',
  title: 'LiveScript',
  info: `
  <h3>LiveScript</h3>
  <div>A language which compiles to JavaScript.</div>
  <ul>
    <li><a href="https://livescript.net/" target="_blank">LiveScript official website</a></li>
    <!-- <li><a href="#">LiveScript usage in LocalPen</a></li> -->
    <li><a href="?template=livescript" target="_parent" data-template="livescript">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'vendor/livescript/livescript-min.js',
    factory: () => (window as any).require('livescript').compile,
    scripts: ['vendor/livescript/prelude-browser-min.js'],
    umd: true,
  },
  extensions: ['ls'],
  editor: 'script',
};
