import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
import { parserPlugins } from './parser-plugins';

export const less: LanguageSpecs = {
  name: 'less',
  title: 'Less',
  info: `
  <h3>Less</h3>
  <div>It's CSS, with just a little more.</div>
  <ul>
    <li><a href="https://lesscss.org/" target="_blank" rel="noopener">Less official website</a></li>
    <!-- <li><a href="#">Less usage in LocalPen</a></li> -->
  </ul>
  `,
  parser: {
    name: 'less',
    pluginUrls: [parserPlugins.postcss],
  },
  compiler: {
    url: 'vendor/less/less.js',
    factory: () => async (code, { options }) =>
      (
        await (window as any).less.render(code, {
          ...getCustomConfig('less-config', options.customConfigs),
        })
      ).css,
    umd: true,
  },
  extensions: ['less'],
  editor: 'style',
};
