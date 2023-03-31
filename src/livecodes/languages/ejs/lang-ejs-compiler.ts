import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { ejsUrl } from '../../vendors';

(self as any).createEjsCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('ejs', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const template = (self as any).ejs.compile(code, options);
      return template(data);
    }

    return `<!-- ... compiling ... -->

<script src="${ejsUrl}"></script>
<script>
window.addEventListener("load", () => {
const template = ejs.compile(\`${escapeCode(code)}\`, ${escapeCode(JSON.stringify(options))});
const content = template({
  ...${escapeCode(JSON.stringify(data || {}))},
  ...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'ejs', content}}, '*');
});
</script>
`;
  };
