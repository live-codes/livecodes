import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/nunjucks.min.js';
const runtimeUrl = 'https://cdn.jsdelivr.net/npm/nunjucks@3.2.3/browser/nunjucks-slim.min.js';

export const nunjucks: LanguageSpecs = {
  name: 'nunjucks',
  title: 'Nunjucks',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    url,
    factory: () => async (code, { config }) => {
      const options = getLanguageCustomSettings('nunjucks', config);
      (self as any).nunjucks.configure(options);
      const data = config.customSettings.template?.data || {};

      if (config.customSettings.template?.prerender !== false) {
        const template = (self as any).nunjucks.compile(code);
        return template.render(data);
      }

      const clientFn = (self as any).nunjucks.precompileString(code, { name: 'template' });
      return `<!-- ... compiling ... -->

  <script src="${runtimeUrl}"></script>
  <script>
  window.addEventListener("load", () => {
    ${clientFn}
    const content = nunjucks.render('template', {
      ...${escapeCode(JSON.stringify(data || {}))},
      ...window.livecodes?.templateData,
    });
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'nunjucks', content}}, '*');
  });
  </script>
  `;
    },
  },
  extensions: ['njk'],
  editor: 'markup',
  editorLanguage: 'html',
};
