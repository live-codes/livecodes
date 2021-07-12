import { LanguageSpecs } from '../models';

export const python: LanguageSpecs = {
  name: 'python',
  title: 'Python',
  info: `
  <h3>Python</h3>
  <div>Python running in the browser using Brython.</div>
  <ul>
    <li><a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a></li>
    <li><a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a></li>
    <li><a href="https://brython.info/" target="_blank" rel="noopener">Brython documentation</a></li>
    <!-- <li><a href="#">Python usage in LocalPen</a></li> -->
    <li><a href="?template=python" target="_parent" data-template="python">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => async (code) => code,
    scripts: ['vendor/brython/brython.min.js', 'vendor/brython/brython_stdlib.js'],
    inlineScript: `window.addEventListener("load", () => {brython({ indexedDB: false })})`,
    scriptType: 'text/python',
  },
  extensions: ['py'],
  editor: 'script',
};
