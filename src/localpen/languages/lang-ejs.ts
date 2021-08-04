import { LanguageSpecs } from '../models';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/ejs@3.1.6/ejs.min.js';

export const ejs: LanguageSpecs = {
  name: 'ejs',
  title: 'EJS',
  info: `
  <h3>EJS</h3>
  <div>Embedded JavaScript templating.</div>
  <ul>
    <li><a href="https://ejs.co/" target="_blank" rel="noopener">Official website</a></li>
    <!-- <li><a href="#">EJS usage in LocalPen</a></li> -->
  </ul>
  `,
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
    umd: true,
  },
  extensions: ['ejs'],
  editor: 'markup',
  editorLanguage: 'html',
};
