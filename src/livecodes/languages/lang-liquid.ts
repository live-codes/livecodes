import { LanguageSpecs } from '../models';
import { liquidJsUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { escapeCode } from './utils';

export const liquid: LanguageSpecs = {
  name: 'liquid',
  title: 'Liquid',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: liquidJsUrl,
    factory:
      () =>
      async (code, { config }) => {
        if (config.customSettings.template?.prerender !== false) {
          const liquid = new (self as any).liquidjs.Liquid();
          const html = await liquid.parseAndRender(
            escapeCode(code),
            config.customSettings.template?.data || {},
          );
          return html;
        }

        return `<!-- ... compiling ... -->

<script src="${liquidJsUrl}"></script>
<script>
window.addEventListener("load", () => {
  new liquidjs.Liquid()
    .parseAndRender(\`${escapeCode(code)}\`, {
      ...${escapeCode(JSON.stringify(config.customSettings.template?.data || {}))},
      ...window.livecodes?.templateData,
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
