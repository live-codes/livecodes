import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { escapeCode, getLanguageCustomSettings } from './utils';

export const pug: LanguageSpecs = {
  name: 'pug',
  title: 'Pug',
  info: `
  <h3>Pug</h3>
  <div>Robust, elegant, feature rich template engine.</div>
  <ul>
    <li><a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noopener">Pug documentation</a></li>
  </ul>
  `,
  parser: {
    name: 'pug',
    pluginUrls: [parserPlugins.pug],
  },
  compiler: {
    url: 'vendor/pug/pug.min.js',
    factory: () => async (code, { config }) => {
      const options = getLanguageCustomSettings('pug', config);
      const data = config.customSettings.template?.data || {};

      const fn = (window as any).pug.compile(code, options);
      if (config.customSettings.template?.prerender !== false) {
        return fn(data);
      }

      const clientFnSrc = (window as any).pug.compileClient(code, {
        ...options,
        name: 'clientFn',
      });

      return `<!-- ... compiling ... -->

  <script>
  window.addEventListener("load", () => {
    ${clientFnSrc}
    const content = clientFn({
      ...${escapeCode(JSON.stringify(data))},
      ...window.templateData,
    });
    document.body.innerHTML += content;
    parent.postMessage({type: 'compiled', payload: {language: 'pug', content}}, '*');
  });
  </script>
  `;
    },
  },
  extensions: ['pug', 'jade'],
  editor: 'markup',
};
