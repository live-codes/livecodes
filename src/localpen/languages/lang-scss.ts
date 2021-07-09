import { LanguageSpecs } from '../models';
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
    url: 'vendor/sass.js/sass.sync.js',
    factory: () => {
      const Sass = (window as any).Sass;
      return (code, { language }): Promise<string> =>
        new Promise((resolve) => {
          const options = language === 'sass' ? { indentedSyntax: true } : {};
          Sass.compile(code, options, (result: { text: string }) => {
            resolve(result.text);
          });
        });
    },
    umd: true,
  },
  extensions: ['scss'],
  editor: 'style',
};
