import { LanguageSpecs, Pen } from '../models';
import { parserPlugins } from './parser-plugins';

export const scss: LanguageSpecs = {
  name: 'scss',
  title: 'SCSS',
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
