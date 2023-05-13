import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';

(self as any).createPugCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('pug', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const fn = (window as any).pug.compile(code, options);
      return fn(data);
    }

    const clientFnSrc = (window as any).pug.compileClient(code, {
      ...options,
      name: 'clientFn',
    });

    return `<!-- ... compiling ... -->

<script>
window.addEventListener("load", () => {
${clientFnSrc}
const content = clientFn({
...${escapeCode(JSON.stringify(data))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content;
parent.postMessage({type: 'compiled', payload: {language: 'pug', content}}, '*');
});
</script>
`;
  };
