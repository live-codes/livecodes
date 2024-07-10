import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';

(self as any).createVentoCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('vento', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const env = (self as any).vento.vento(options);
      const result = await env.runString(code, data);
      return result.content;
    }
    return `<!-- ... compiling ... -->

<script src="${vendorsBaseUrl}vento/vento.js"></script>
<script>
window.addEventListener("load", async () => {
const env = vento.vento(${escapeCode(JSON.stringify(options || {}))});
const result = await env.runString(\`${escapeCode(code)}\`, {
  ...${escapeCode(JSON.stringify(data || {}))},
  ...window.livecodes?.templateData,
});
const content = result.content;
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'vento', content}}, '*');
});
</script>
`;
  };
