import { LanguageSpecs } from '../models';
import { escapeCode, getLanguageCustomSettings } from './utils';

const url = 'https://mozilla.github.io/nunjucks/files/nunjucks.min.js';
const runtimeUrl = 'https://mozilla.github.io/nunjucks/files/nunjucks-slim.min.js';

export const nunjucks: LanguageSpecs = {
  name: 'nunjucks',
  title: 'Nunjucks',
  info: `
  <h3>Nunjucks</h3>
  <div>
    A rich and powerful templating language for JavaScript.
    Nunjucks is essentially a port of <a href="http://jinja.pocoo.org/docs/" target="_blank" rel="noopener">jinja2</a>.</div>
  <ul>
    <li><a href="https://mozilla.github.io/nunjucks/" target="_blank" rel="noopener">Official website</a></li>
    <!-- <li><a href="#">Nunjucks usage in LocalPen</a></li> -->
  </ul>
  `,
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
      ...window.templateData,
    });
    document.body.innerHTML += content
    parent.postMessage({type: 'compiled', payload: {language: 'nunjucks', content}}, '*');
  });
  </script>
  `;
    },
    umd: true,
  },
  extensions: ['njk'],
  editor: 'markup',
  editorLanguage: 'html',
};
