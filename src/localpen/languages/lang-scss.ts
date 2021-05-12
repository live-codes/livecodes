import { LanguageSpecs, Pen } from '../models';
import { parserPlugins } from './parser-plugins';

export const scss: LanguageSpecs = {
  name: 'scss',
  title: 'SCSS',
  info: `
  <h3>SCSS</h3>
  <div>Syntactically Awesome Style Sheets.</div>
  <ul>
    <li><a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass official website</a></li>
    <li><a href="https://sass-lang.com/documentation" target="_blank" rel="noopener">Sass documentation</a></li>
    <li><a href="https://sass-lang.com/documentation/syntax#scss" target="_blank" rel="noopener">SCSS syntax</a></li>
    <!-- <li><a href="#">SCSS usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'scss',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: 'vendor/sass.js/sass.js',
    factory: (_: any, config: Pen) => {
      const Sass = (window as any).Sass;
      const baseUrl = config.baseUrl || '/localpen/';
      Sass.setWorkerUrl(baseUrl + 'vendor/sass.js/sass.worker.js');
      const sass = new Sass();
      return (code, options = {}): Promise<string> =>
        new Promise((resolve) => {
          sass.compile(code, options, (result: string) => {
            resolve(result);
          });
        });
    },
    umd: true,
  },
  extensions: ['scss'],
  editor: 'style',
};
