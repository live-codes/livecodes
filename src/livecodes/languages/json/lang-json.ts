import { codemirrorImports } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const json: LanguageSpecs = {
  name: 'json',
  title: 'JSON',
  info: false,
  formatter: {
    prettier: {
      name: 'json',
      pluginUrls: [parserPlugins.babel, parserPlugins.estree],
    },
  },
  compiler: {
    factory: () => async (code) => code,
  },
  extensions: ['json'],
  editor: '',
  editorSupport: {
    codemirror: {
      languageSupport: async () => {
        const { json } = await import(codemirrorImports.json);
        return json();
      },
    },
  },
  multiFileSupport: true,
};
