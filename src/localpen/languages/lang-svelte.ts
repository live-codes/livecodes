import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const svelte: LanguageSpecs = {
  name: 'svelte',
  title: 'Svelte',
  info: `
  <h3>Svelte</h3>
  <div>Cybernetically enhanced web apps.</div>
  <ul>
    <li><a href="https://svelte.dev/" target="_blank">Svelte official website</a></li>
    <li><a href="https://svelte.dev/docs" target="_blank">Svelte documentation</a></li>
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
