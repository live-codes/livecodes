import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { etaUrl } from '../../vendors';

(self as any).createEtaCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('eta', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      return (self as any).eta.render(code, data, options);
    }

    return `<!-- ... compiling ... -->

<script src="${etaUrl}"></script>
<script>
window.addEventListener("load", () => {
const content = eta.render(\`${escapeCode(code)}\`, {
  ...${escapeCode(JSON.stringify(data || {}))},
  ...window.livecodes?.templateData,
}, ${escapeCode(JSON.stringify(options))});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'eta', content}}, '*');
});
</script>
`;
  };
