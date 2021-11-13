import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/dot@1.1.3/doT.min.js';

export const dot: LanguageSpecs = {
  name: 'dot',
  title: 'doT',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: () => async (code, { config }) => {
      const dotOptions = getLanguageCustomSettings('dot', config);
      const options = Object.keys(dotOptions).length === 0 ? null : dotOptions;
      const data = config.customSettings.template?.data || {};

      if (config.customSettings.template?.prerender !== false) {
        const template = (self as any).doT.template(code, options);
        return template(data);
      }

      return `<!-- ... compiling ... -->

  <script src="${url}"></script>
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
