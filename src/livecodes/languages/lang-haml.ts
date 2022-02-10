import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { getLanguageCustomSettings } from './utils';

export const haml: LanguageSpecs = {
  name: 'haml',
  title: 'Haml',
  compiler: {
    url: vendorsBaseUrl + 'clientside-haml-js/haml.js',
    factory:
      () =>
      async (code, { config }) => {
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

<script src="${vendorsBaseUrl}clientside-haml-js/haml.js"></script>
<script>
window.addEventListener("load", () => {
  const clientFn = ${clientFnSrc};
  const content = clientFn({
    ...${JSON.stringify(data)},
    ...window.livecodes?.templateData,
  });
  document.body.innerHTML += content;
  parent.postMessage({type: 'compiled', payload: {language: 'haml', content}}, '*');
});
</script>
    `;
      },
  },
  extensions: ['haml'],
  editor: 'markup',
};
