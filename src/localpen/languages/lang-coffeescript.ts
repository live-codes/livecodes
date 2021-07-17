import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';

export const coffeescript: LanguageSpecs = {
  name: 'coffeescript',
  title: 'Coffee',
  longTitle: 'CoffeeScript',
  info: `
  <h3>CoffeeScript</h3>
  <div>Unfancy JavaScript.</div>
  <ul>
    <li><a href="https://coffeescript.org/" target="_blank" rel="noopener">CoffeeScript official website</a></li>
    <li><a href="?template=coffeescript" target="_parent" data-template="coffeescript">Load starter template</a></li>
    <!-- <li><a href="#">CoffeeScript usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: {
    url: 'vendor/coffeescript/coffeescript.js',
    factory: () => async (code, { options }) =>
      (window as any).CoffeeScript.compile(code, {
        bare: true,
        ...getCustomConfig('coffeescript-config', options.customConfigs),
      }),
    umd: true,
  },
  extensions: ['coffee'],
  editor: 'script',
};
