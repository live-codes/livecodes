import { compileAllBlocks } from '../../compiler';
import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { acornUrl, astringUrl, cjs2esUrl, csstreeUrl, malinaBaseUrl } from '../../vendors';

(self as any).createMalinaCompiler = (): CompilerFunction => {
  (self as any).importScripts(acornUrl, astringUrl, csstreeUrl, cjs2esUrl);
  (self as any)['css-tree'] = (self as any).csstree; // yes, this is required!!
  (self as any).importScripts(malinaBaseUrl + 'malina.js');

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

      const $import = `import { mount as $mount } from 'malinajs/runtime.js';`;
      const $mount = `\n$mount(document.querySelector("#livecodes-app") || document.body.appendChild(document.createElement('div')), Component);\n`;
      if (result.result) {
        return $import + result.result + $mount;
      }
      return '';
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return '';
    }
  };
};
