import { LanguageSpecs } from '../models';
import { dotUrl } from '../vendors';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

export const dot: LanguageSpecs = {
  name: 'dot',
  title: 'doT',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: dotUrl,
    factory:
      () =>
      async (code, { config }) => {
        const dotOptions = getLanguageCustomSettings('dot', config);
        const options = Object.keys(dotOptions).length === 0 ? null : dotOptions;
        const data = config.customSettings.template?.data || {};

        if (config.customSettings.template?.prerender !== false) {
          const template = (self as any).doT.template(code, options);
          return template(data);
        }

        return `<!-- ... compiling ... -->

  <script src="${dotUrl}"></script>
  <script>
  window.addEventListener("load", () => {
    const template = doT.template(\`${escapeCode(code)}\`, ${
          options ? escapeCode(JSON.stringify(options)) : 'null'
        });
    const content = template({
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.livecodes?.templateData,
    });
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'dot', content}}, '*');
  });
  </script>
  `;
      },
  },
  extensions: ['dot'],
  editor: 'markup',
  editorLanguage: 'html',
};
