import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/npm/@hatemhosny/astro-internal@0.0.3/';
const compilerURL = cdnBaselUrl + 'compiler.min.js';
const internalURL = cdnBaselUrl + 'index.min.js';
const wasmURL = 'https://cdn.jsdelivr.net/npm/@astrojs/compiler@0.2.23/astro.wasm';

export const astro: LanguageSpecs = {
  name: 'astro',
  title: 'Astro',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html, parserPlugins.babel],
  },
  compiler: {
    url: compilerURL,
    factory: () => {
      const { transform, initialize, renderAstroToHTML } = (self as any).astroCompiler;
      const compilerReady = initialize({ wasmURL });
      return async (code, { config }) => {
        await compilerReady;
        const result = await transform(code, {
          ...getLanguageCustomSettings('astro', config),
          sourcefile: 'file.astro',
          sourcemap: 'both',
          internalURL,
        });
        const output = await renderAstroToHTML(result.code);
        if (output.errors) {
          for (const err of output.errors) {
            // eslint-disable-next-line no-console
            console.warn(err);
          }
          return '';
        }
        return output;
      };
    },
  },
  extensions: ['astro'],
  editor: 'markup',
  editorLanguage: 'html',
};
