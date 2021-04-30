import { LanguageSpecs } from '../models';

export const python: LanguageSpecs = {
  name: 'python',
  title: 'Python',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code) => code,
    scripts: ['vendor/brython/brython.min.js', 'vendor/brython/brython_stdlib.js'],
    inlineScript: `window.addEventListener("load", () => {brython({ indexedDB: false })})`,
    scriptType: 'text/python',
  },
  extensions: ['py'],
  editor: 'script',
};
