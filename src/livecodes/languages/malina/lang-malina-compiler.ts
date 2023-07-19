import type { CompilerFunction } from '../../models';
import { compileAllBlocks } from '../../compiler';
import { acornUrl, astringUrl, cjs2esUrl, csstreeUrl, malinaUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

(self as any).createMalinaCompiler = (): CompilerFunction => {
  (self as any).importScripts(acornUrl, astringUrl, csstreeUrl, cjs2esUrl);
  (self as any)['css-tree'] = (self as any).csstree; // yes, this is required!!
  (self as any).importScripts(malinaUrl);

  return async (code, { config }) => {
    const processedCode = await compileAllBlocks(code, config, {
      removeEnclosingTemplate: true,
    });

    try {
      const result = await (self as any).malina.compile(processedCode, {
        exportDefault: false,
        inlineTemplate: true,
        autoSubscribe: true,
        name: 'Component',
        localConfig: false,
        // autoimport: (name: string) => `import ${name} from './${name}.xht';`,
        ...getLanguageCustomSettings('malina', config),
      });

      const init = `\nComponent(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')));\n`;
      if (result.result) {
        return result.result + init;
      }
      return '';
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return '';
    }
  };
};
