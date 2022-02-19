import { LanguageSpecs } from '../models';
import { mustacheUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

export const mustache: LanguageSpecs = {
  name: 'mustache',
  title: 'Mustache',
  parser: {
    name: 'glimmer',
    pluginUrls: [parserPlugins.glimmer],
  },
  compiler: {
    url: mustacheUrl,
    factory:
      () =>
      async (code, { config }) => {
        const options = getLanguageCustomSettings('mustache', config);
        const data = config.customSettings.template?.data || {};

        if (config.customSettings.template?.prerender !== false) {
          return (self as any).Mustache.render(code, data, undefined, options);
        }
        return `<!-- ... compiling ... -->

  <script src="${mustacheUrl}"></script>
  <script>
  window.addEventListener("load", () => {
    const content = Mustache.render(\`${escapeCode(code)}\`, {
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.livecodes?.templateData,
    },
    undefined,
    ${escapeCode(JSON.stringify(options || {}))}
    );
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'mustache', content}}, '*');
  });
  </script>
  `;
      },
  },
  extensions: ['mustache'],
  editor: 'markup',
  editorLanguage: 'html',
};
