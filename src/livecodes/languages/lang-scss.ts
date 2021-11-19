import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const scss: LanguageSpecs = {
  name: 'scss',
  title: 'SCSS',
  parser: {
    name: 'scss',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js',
    factory: () => {
      const Sass = (window as any).Sass;
      return async (code, { config, language }): Promise<string> =>
        new Promise((resolve) => {
          const opt =
            language === 'sass'
              ? {
                  ...getLanguageCustomSettings('sass', config),
                  indentedSyntax: true,
                }
              : getLanguageCustomSettings('scss', config);
          Sass.compile(code, opt, (result: { text: string }) => {
            resolve(result.text);
          });
        });
    },
  },
  extensions: ['scss'],
  editor: 'style',
};
