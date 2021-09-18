import { LanguageSpecs } from '../models';

const cdnUrl = 'https://cdn.jsdelivr.net/npm/biwascheme@0.7.4/release/biwascheme-min.js';

export const scheme: LanguageSpecs = {
  name: 'scheme',
  title: 'Scheme',
  info: `
  <h3>Scheme</h3>
  <div>Scheme running in the browser using biwascheme.</div>
  <ul>
    <li><a href="https://www.scheme.com/tspl4/" target="_blank" rel="noopener">The Scheme Programming Language</a></li>
    <li><a href="https://www.biwascheme.org/" target="_blank" rel="noopener">BiwaScheme official website</a></li>
    <li><a href="https://www.biwascheme.org/doc/reference.html" target="_blank" rel="noopener">BiwaScheme reference</a></li>
    <li><a href="?template=scheme" target="_parent" data-template="scheme">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    factory: () => async (code) => code,
    scripts: [cdnUrl],
    scriptType: 'text/biwascheme',
    compiledCodeLanguage: 'scheme',
  },
  extensions: ['scm'],
  editor: 'script',
};
