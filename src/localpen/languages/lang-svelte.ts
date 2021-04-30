import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: 'vendor/svelte/svelte-compiler.3.37.0.min.js',
    factory: () => (code: string) => {
      const options = { css: true };
      const { js } = (window as any).svelte.compile(code, options);
      return `${js.code}

let app = document.querySelector("#app") || document.body;
new Component({ target: app });
`;
    },
    umd: true,
  },
  extensions: ['svelte'],
  editor: 'script',
};
