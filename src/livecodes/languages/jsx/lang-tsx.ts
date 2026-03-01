import { codemirrorImports } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const tsx: LanguageSpecs = {
  name: 'tsx',
  title: 'TSX',
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: 'typescript',
  extensions: ['tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
  editorSupport: {
    codemirror: {
      languageSupport: async () => {
        const { javascript } = await import(codemirrorImports.javascript);
        return javascript({ jsx: true, typescript: true });
      },
    },
    compilerOptions: {
      checkJs: true,
      strictNullChecks: true,
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
};
