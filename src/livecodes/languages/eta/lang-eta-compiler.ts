import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { etaUrl } from '../../vendors';

(self as any).createEtaCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('eta', config);
    const data = config.customSettings.template?.data || {};
    const eta = new (self as any).eta.Eta(options);

    if (config.customSettings.template?.prerender !== false) {
      return eta.renderString(code, data);
    }

    return `<!-- ... compiling ... -->

<script src="${etaUrl}"></script>
<script>
window.addEventListener("load", () => {
const content = eta.renderString(\`${escapeCode(code)}\`, {
  ...${escapeCode(JSON.stringify(data || {}))},
  ...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'eta', content}}, '*');
});
</script>
`;
  };
