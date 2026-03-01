import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { stencilUrl, vendorsBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const stencil: LanguageSpecs = {
  name: 'stencil',
  title: 'Stencil',
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: {
    url: stencilUrl,
    factory:
      () =>
      async (code, { config }) => {
        const result = await (window as any).stencil.transpile(code, {
          // TranspileOptions interface
          // https://github.com/ionic-team/stencil/blob/1b8b7ec21f2622d05c9aafa417b2abdd4f2597a4/src/declarations/stencil-public-compiler.ts#L2311
          sourceMap: false,
          target: 'es2019',
          ...getLanguageCustomSettings('stencil', config),
        });
        return result.code;
      },
    types: {
      '@stencil/core': {
        url: vendorsBaseUrl + 'types/stencil-core.d.ts',
        declareAsModule: false,
      },
    },
  },
  extensions: ['stencil.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
  editorSupport: {
    compilerOptions: {
      jsx: 1, // monaco.languages.typescript.JsxEmit.Preserve,
      jsxFactory: 'h',
      jsxFragmentFactory: 'Fragment',
    },
  },
  multiFileSupport: true,
};
