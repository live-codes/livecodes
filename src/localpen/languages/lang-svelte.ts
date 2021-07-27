import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
import { parserPlugins } from './parser-plugins';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  info: `
  <h3>Svelte</h3>
  <div>Cybernetically enhanced web apps.</div>
  <ul>
    <li><a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte official website</a></li>
    <li><a href="https://svelte.dev/docs" target="_blank" rel="noopener">Svelte documentation</a></li>
    <!-- <li><a href="#">Svelte usage in LocalPen</a></li> -->
    <li><a href="?template=svelte" target="_parent" data-template="svelte">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/svelte/svelte-compiler.3.37.0.min.js',
    factory: () => async (code, { options }) => {
      const customConfig = getCustomConfig('svelte-config', options.customConfigs);
      const customElement = customConfig.customElement;
      const init =
        customElement === true
          ? ''
          : `\n
let app = document.querySelector("#app") || document.body;
new Component({ target: app });
`;
      const { js } = (window as any).svelte.compile(code, {
        css: true,
        ...customConfig,
      });
      return js.code + init;
    },
    umd: true,
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
