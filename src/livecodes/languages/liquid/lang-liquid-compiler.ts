import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { liquidJsUrl } from '../../vendors';

(self as any).createLiquidCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    if (config.customSettings.template?.prerender !== false) {
      const options = getLanguageCustomSettings('liquid', config);
      const liquid = new (self as any).liquidjs.Liquid(options);
      const html = await liquid.parseAndRender(
        escapeCode(code),
        config.customSettings.template?.data || {},
      );
      return html;
    }

    return `<!-- ... compiling ... -->

<script src="${liquidJsUrl}"></script>
<script>
window.addEventListener("load", () => {
new liquidjs.Liquid()
.parseAndRender(\`${escapeCode(code)}\`, {
...${escapeCode(JSON.stringify(config.customSettings.template?.data || {}))},
...window.livecodes?.templateData,
})
.then((content) => {
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'liquid', content}}, '*');
})
.catch((error) => {
console.log(error)
});
});
</script>
`;
  };
