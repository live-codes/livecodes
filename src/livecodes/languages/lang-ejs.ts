import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/ejs@3.1.6/ejs.min.js';

export const ejs: LanguageSpecs = {
  name: 'ejs',
  title: 'EJS',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: () => async (code, { config }) => {
      const options = getLanguageCustomSettings('ejs', config);
      const data = config.customSettings.template?.data || {};

      if (config.customSettings.template?.prerender !== false) {
        const template = (self as any).ejs.compile(code, options);
        return template(data);
      }

      return `<!-- ... compiling ... -->

  <script src="${url}"></script>
  <script>
  window.addEventListener("load", () => {
    const template = ejs.compile(\`${escapeCode(code)}\`, ${escapeCode(JSON.stringify(options))});
    const content = template({
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.templateData,
    });
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'ejs', content}}, '*');
  });
  </script>
  `;
    },
  },
  extensions: ['ejs'],
  editor: 'markup',
  editorLanguage: 'html',
};
