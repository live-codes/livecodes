import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { runtimeUrl } from './lang-nunjucks';

(self as any).createNunjucksCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('nunjucks', config);
    (self as any).nunjucks.configure(options);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const template = (self as any).nunjucks.compile(code);
      return template.render(data);
    }

    const clientFn = (self as any).nunjucks.precompileString(code, { name: 'template' });
    return `<!-- ... compiling ... -->

<script src="${runtimeUrl}"></script>
<script>
window.addEventListener("load", () => {
${clientFn}
const content = nunjucks.render('template', {
  ...${escapeCode(JSON.stringify(data || {}))},
  ...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'nunjucks', content}}, '*');
});
</script>
`;
  };
