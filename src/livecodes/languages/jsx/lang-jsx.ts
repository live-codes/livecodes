import { codemirrorImports } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const jsx: LanguageSpecs = {
  name: 'jsx',
  title: 'JSX',
  formatter: {
    prettier: {
      name: 'babel',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: 'typescript',
  extensions: ['jsx'],
  editor: 'script',
  editorLanguage: 'javascript',
  editorSupport: {
    codemirror: {
      languageSupport: async () => {
        const { javascript } = await import(codemirrorImports.javascript);
        return javascript({ jsx: true });
      },
    },
    compilerOptions: {
      jsx: 4, // monaco.languages.typescript.JsxEmit.ReactJSX,
    },
  },
  multiFileSupport: true,
};
