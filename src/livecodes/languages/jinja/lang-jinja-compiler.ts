import type { CompilerFunction } from '../../models';
import { escapeCode } from '../../utils';
import { jinjaUrl } from './lang-jinja';

(self as any).createJinjaCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const data = config.customSettings.template?.data || {};
    if (config.customSettings.template?.prerender !== false) {
      const template = new (self as any).Jinja.Template(code);
      return template.render(data);
    }
    return `<!-- ... compiling ... -->

<script src="${jinjaUrl}"></script>
<script>
window.addEventListener("load", () => {
const template = new Jinja.Template(\`${escapeCode(code)}\`);
const content = template.render({
...${escapeCode(JSON.stringify(data || {}))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'jinja', content}}, '*');
});
</script>
`;
  };
