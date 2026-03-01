import { codemirrorImports } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const css: LanguageSpecs = {
  name: 'css',
  title: 'CSS',
  info: false,
  formatter: {
    prettier: {
      name: 'css',
      pluginUrls: [parserPlugins.postcss],
    },
  },
  compiler: {
    factory: () => async (code) => code,
  },
  extensions: ['css'],
  editor: 'style',
  editorSupport: {
    codemirror: {
      languageSupport: async () => {
        const { css } = await import(codemirrorImports.css);
        return css();
      },
    },
  },
  multiFileSupport: true,
};
