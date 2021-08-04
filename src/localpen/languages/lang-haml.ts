import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

export const haml: LanguageSpecs = {
  name: 'haml',
  title: 'Haml',
  info: `
  <h3>Haml</h3>
  <div>Haml compiler for client side javascript view templates using clientside-haml-js.</div>
  <ul>
    <li><a href="https://haml.info/" target="_blank" rel="noopener">Haml official website</a></li>
    <li><a href="https://haml.info/docs.html" target="_blank" rel="noopener">Haml documentation</a></li>
    <li><a href="https://github.com/uglyog/clientside-haml-js" target="_blank" rel="noopener">clientside-haml-js GitHub repo</a></li>
    <!-- <li><a href="#">Haml usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: {
    url: 'vendor/clientside-haml-js/haml.js',
    factory: () => async (code, { config, baseUrl }) => {
      const options = {
        tolerateFaults: true,
        ...getLanguageCustomSettings('haml', config),
        source: code,
      };
      const data = config.customSettings.template?.data || {};

      if (config.customSettings.template?.prerender !== false) {
        const fn = (window as any).haml.compileHaml(options);
        return fn(data);
      }

      const clientFnSrc = (window as any).haml.compileHaml({
        ...options,
        outputFormat: 'string',
      });

      return `<!-- ... compiling ... -->

<script src="${baseUrl}vendor/clientside-haml-js/haml.js"></script>
<script>
window.addEventListener("load", () => {
  const clientFn = ${clientFnSrc};
  const content = clientFn({
    ...${JSON.stringify(data)},
    ...window.templateData,
  });
  document.body.innerHTML += content;
  parent.postMessage({type: 'compiled', payload: {language: 'haml', content}}, '*');
});
</script>
    `;
    },
    umd: true,
  },
  extensions: ['haml'],
  editor: 'markup',
};
