import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

const brythonUrl = 'https://cdn.jsdelivr.net/npm/brython@3.10.0/brython.min.js';
const stdlibUrl = 'https://cdn.jsdelivr.net/npm/brython@3.10.0/brython_stdlib.js';

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
    <li><a href="?template=python" target="_parent" data-template="python">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, ...options } = getLanguageCustomSettings('python', config);
      const importsPattern = /^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm;
      const stdlib = autoloadStdlib !== false && compiled.match(importsPattern) ? [stdlibUrl] : [];
      const loader = `window.addEventListener("load", () => {brython(${JSON.stringify(options)})})`;
      const loaderUrl = 'data:text/plain;base64,' + btoa(loader);
      return [brythonUrl, ...stdlib, loaderUrl];
    },
    scriptType: 'text/python',
    compiledCodeLanguage: 'python',
  },
  extensions: ['py'],
  editor: 'script',
};
