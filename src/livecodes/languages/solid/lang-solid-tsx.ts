import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const solidTsx: LanguageSpecs = {
  name: 'solid.tsx',
  title: 'Solid (TS)',
  formatter: {
    prettier: {
      name: 'babel-ts',
      pluginUrls: [parserPlugins.babel, parserPlugins.html],
    },
  },
  compiler: 'solid',
  extensions: ['solid.tsx'],
  editor: 'script',
  editorLanguage: 'typescript',
  editorSupport: {
    compilerOptions: {
      checkJs: true,
      strictNullChecks: true,
      jsx: 1, // monaco.languages.typescript.JsxEmit.Preserve,
      jsxImportSource: 'solid-js',
      jsxFactory: 'JSX',
      jsxFragmentFactory: 'Fragment',
    },
  },
};
