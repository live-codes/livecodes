import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
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
      return async (code, { options }): Promise<string> =>
        new Promise((resolve) => {
          const { language, customConfigs } = options;
          const opt =
            language === 'sass'
              ? {
                  ...getCustomConfig('sass-config', customConfigs),
                  indentedSyntax: true,
                }
              : {
                  ...getCustomConfig('sass-config', customConfigs),
                };
          Sass.compile(code, opt, (result: { text: string }) => {
            resolve(result.text);
          });
        });
    },
    umd: true,
  },
  extensions: ['scss'],
  editor: 'style',
};
