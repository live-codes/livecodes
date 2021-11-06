import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: vendorsBaseUrl + 'svelte/svelte-compiler.min.js',
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
