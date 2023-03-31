import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { artTemplateUrl } from '../../vendors';

(self as any).createArtTemplateCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    if (!code) return '';

    const options = getLanguageCustomSettings('art-template', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const template = (self as any).template.compile(code, options);
      return template(data);
    }

    return `<!-- ... compiling ... -->

<script src="${artTemplateUrl}"></script>
<script>
window.addEventListener("load", () => {
const content = template.render(\`${escapeCode(code)}\`, {
    ...${escapeCode(JSON.stringify(data || {}))},
    ...window.livecodes?.templateData,
  },
  ${escapeCode(JSON.stringify(options))});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'art-template', content}}, '*');
});
</script>
`;
  };
