import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';

export const stylus: LanguageSpecs = {
  name: 'stylus',
  title: 'Stylus',
  info: `
  <h3>Stylus</h3>
  <div>Expressive, Dynamic, Robust CSS.</div>
  <ul>
    <li><a href="https://stylus-lang.com/" target="_blank" rel="noopener">Stylus official website</a></li>
  </ul>
  `,
  compiler: {
    url: vendorsBaseUrl + 'stylus/stylus.min.js',
    factory: () => async (code) => (window as any).stylus.render(code),
  },
  extensions: ['styl'],
  editor: 'style',
};
