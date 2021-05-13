import { LanguageSpecs } from '../models';

export const haml: LanguageSpecs = {
  name: 'haml',
  title: 'Haml',
  info: `
  <h3>Haml</h3>
  <div>Haml compiler for client side javascript view templates using clientside-haml-js.</div>
  <ul>
    <li><a href="https://haml.info/" target="_blank" rel="noopener">Haml official website</a></li>
    <li><a href="https://haml.info/docs.html" target="_blank" rel="noopener">Haml documentation</a></li>
    <li><a href="https://github.com/uglyog/clientside-haml-js" target="_blank" rel="noopener">clientside-haml-js GitHub repo</a></li>
    <!-- <li><a href="#">Haml usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: {
    url: 'vendor/clientside-haml-js/haml.js',
    factory: () => (code: string) =>
      (window as any).haml.compileHaml({ source: code, tolerateFaults: true })(),
    umd: true,
  },
  extensions: ['haml'],
  editor: 'markup',
};
