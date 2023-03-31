import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';

(self as any).createHamlCompiler =
  (): CompilerFunction =>
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
  };
