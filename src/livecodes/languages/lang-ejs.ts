import { LanguageSpecs } from '../models';
import { ejsUrl } from '../vendors';
import { escapeCode, getLanguageCustomSettings } from '../utils';
import { parserPlugins } from './prettier';

export const ejs: LanguageSpecs = {
  name: 'ejs',
  title: 'EJS',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url: ejsUrl,
    factory:
      () =>
      async (code, { config }) => {
        const options = getLanguageCustomSettings('ejs', config);
        const data = config.customSettings.template?.data || {};

        if (config.customSettings.template?.prerender !== false) {
          const template = (self as any).ejs.compile(code, options);
          return template(data);
        }

        return `<!-- ... compiling ... -->

  <script src="${ejsUrl}"></script>
  <script>
  window.addEventListener("load", () => {
    const template = ejs.compile(\`${escapeCode(code)}\`, ${escapeCode(JSON.stringify(options))});
    const content = template({
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.livecodes?.templateData,
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
