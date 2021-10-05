import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/liquidjs@9.27.1/dist/liquid.browser.min.js';

export const liquid: LanguageSpecs = {
  name: 'liquid',
  title: 'Liquid',
  info: `
  <h3>LiquidJS</h3>
  <div>A simple, expressive and safe template engine.</div>
  <ul>
    <li><a href="https://liquidjs.com" target="_blank" rel="noopener">LiquidJS official website</a></li>
    <li><a href="https://liquidjs.com/tutorials/intro-to-liquid.html" target="_blank" rel="noopener">LiquidJS documentation</a></li>
  </ul>
  `,
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: () => async (code, { config }) => {
      if (config.customSettings.template?.prerender !== false) {
        const liquid = new (self as any).liquidjs.Liquid();
        const html = await liquid.parseAndRender(
          escapeCode(code),
          config.customSettings.template?.data || {},
        );
        return html;
      }

      return `<!-- ... compiling ... -->

<script src="${url}"></script>
<script>
window.addEventListener("load", () => {
  new liquidjs.Liquid()
    .parseAndRender(\`${escapeCode(code)}\`, {
      ...${escapeCode(JSON.stringify(config.customSettings.template?.data || {}))},
      ...window.templateData,
      })
    .then((content) => {
      document.body.innerHTML += content
      parent.postMessage({type: 'compiled', payload: {language: 'liquid', content}}, '*');
    })
    .catch((error) => {
      console.log(error)
    });
});
</script>
`;
    },
  },
  extensions: ['liquid', 'liquidjs'],
  editor: 'markup',
  editorLanguage: 'html',
};
