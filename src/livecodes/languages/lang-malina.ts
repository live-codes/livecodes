import { compileAllBlocks } from '../compiler';
import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

const acornUrl = 'https://cdn.jsdelivr.net/npm/acorn@8.6.0/dist/acorn.min.js';
const astringUrl = 'https://cdn.jsdelivr.net/npm/astring@1.7.5/dist/astring.min.js';
const csstreeUrl = 'https://cdn.jsdelivr.net/npm/css-tree@1.1.3/dist/csstree.min.js';
const cjs2esUrl = 'https://cdn.jsdelivr.net/npm/cjs2es@1.1.1/dist/cjs2es.browser.min.js';
const malinaUrl = 'https://cdn.jsdelivr.net/npm/malinajs@0.6.51/malina.js';

export const malina: LanguageSpecs = {
  name: 'malina',
  title: 'Malina.js',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    factory: () => {
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

          const init = `\nComponent(document.querySelector("#app") || document.body);\n`;
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
    },
  },
  extensions: ['xht'],
  editor: 'script',
  editorLanguage: 'html',
};
