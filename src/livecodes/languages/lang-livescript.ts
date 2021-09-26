import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { getLanguageCustomSettings } from './utils';

export const livescript: LanguageSpecs = {
  name: 'livescript',
  title: 'LiveScript',
  info: `
  <h3>LiveScript</h3>
  <div>A language which compiles to JavaScript.</div>
  <ul>
    <li><a href="https://livescript.net/" target="_blank" rel="noopener">LiveScript official website</a></li>
    <li><a href="?template=livescript" target="_parent" data-template="livescript">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: vendorsBaseUrl + 'livescript/livescript-min.js',
    factory: () => async (code, { config }) =>
      (window as any).require('livescript').compile(code, {
        bare: true,
        ...getLanguageCustomSettings('livescript', config),
      }),
    scripts: [vendorsBaseUrl + 'livescript/prelude-browser-min.js'],
  },
  extensions: ['ls'],
  editor: 'script',
};
