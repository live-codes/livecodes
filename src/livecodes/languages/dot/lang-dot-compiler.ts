import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { dotUrl } from '../../vendors';

(self as any).createDotCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const dotOptions = getLanguageCustomSettings('dot', config);
    const options = Object.keys(dotOptions).length === 0 ? null : dotOptions;
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const template = (self as any).doT.template(code, options);
      return template(data);
    }

    return `<!-- ... compiling ... -->

<script src="${dotUrl}"></script>
<script>
window.addEventListener("load", () => {
const template = doT.template(\`${escapeCode(code)}\`, ${
      options ? escapeCode(JSON.stringify(options)) : 'null'
    });
const content = template({
...${escapeCode(JSON.stringify(data || {}))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'dot', content}}, '*');
});
</script>
`;
  };
