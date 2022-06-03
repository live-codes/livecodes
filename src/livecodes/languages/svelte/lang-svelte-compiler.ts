import type { CompilerFunction } from '../../models';
import { compileAllBlocks } from '../../compiler';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createSvelteCompiler =
  (): CompilerFunction =>
  async (code, { config }) => {
    const processedCode = await compileAllBlocks(code, config, {
      removeEnclosingTemplate: true,
    });
    const customSettings = getLanguageCustomSettings('svelte', config);
    const customElement = customSettings.customElement;
    const init =
      customElement === true
        ? ''
        : `\n
let app = document.querySelector("#app") || document.body;
new Component({ target: app });
`;
    const { js } = (window as any).svelte.compile(processedCode, {
      css: true,
      ...customSettings,
    });
    return js.code + init;
  };
