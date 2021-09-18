import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  info: `
  <h3>Svelte</h3>
  <div>Cybernetically enhanced web apps.</div>
  <ul>
    <li><a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte official website</a></li>
    <li><a href="https://svelte.dev/docs" target="_blank" rel="noopener">Svelte documentation</a></li>
    <li><a href="?template=svelte" target="_parent" data-template="svelte">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: 'vendor/svelte/svelte-compiler.3.42.4.min.js',
    factory: () => async (code, { config }) => {
      const customSettings = getLanguageCustomSettings('svelte', config);
      const customElement = customSettings.customElement;
      const init =
        customElement === true
          ? ''
          : `\n
let app = document.querySelector("#app") || document.body;
new Component({ target: app });
`;
      const { js } = (window as any).svelte.compile(code, {
        css: true,
        ...customSettings,
      });
      return js.code + init;
    },
  },
  extensions: ['svelte'],
  editor: 'script',
  editorLanguage: 'html',
};
