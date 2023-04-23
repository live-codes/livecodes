import type { CompilerFunction } from '../../models';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { twigUrl } from '../../vendors';

(self as any).createTwigCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const options = getLanguageCustomSettings('twig', config);
    const data = config.customSettings.template?.data || {};

    if (config.customSettings.template?.prerender !== false) {
      const template = (self as any).Twig.twig({ ...options, data: code });
      return template.render(data);
    }

    return `<!-- ... compiling ... -->

<script src="${twigUrl}"></script>
<script>
window.addEventListener("load", () => {
const template = Twig.twig({
...${escapeCode(JSON.stringify(options))},
data:\`${escapeCode(code)}\`
});
const content = template.render({
...${escapeCode(JSON.stringify(data || {}))},
...window.livecodes?.templateData,
});
document.body.innerHTML += content
parent.postMessage({type: 'compiled', payload: {language: 'twig', content}}, '*');
});
</script>
`;
  };
