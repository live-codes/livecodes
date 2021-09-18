import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const less: LanguageSpecs = {
  name: 'less',
  title: 'Less',
  info: `
  <h3>Less</h3>
  <div>It's CSS, with just a little more.</div>
  <ul>
    <li><a href="https://lesscss.org/" target="_blank" rel="noopener">Less official website</a></li>
  </ul>
  `,
  parser: {
    name: 'less',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: 'vendor/less/less.js',
    factory: () => async (code, { config }) =>
      (
        await (window as any).less.render(code, {
          ...getLanguageCustomSettings('less', config),
        })
      ).css,
  },
  extensions: ['less'],
  editor: 'style',
};
