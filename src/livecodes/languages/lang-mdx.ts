import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';
import { typescriptOptions } from './lang-typescript';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    dependencies: ['typescript'],
    url: vendorsBaseUrl + 'mdx/mdx.js',
    factory: () => async (code, { config }) => {
      const compiled = await (window as any).MDX.mdx(code, {
        skipExport: true,
        ...getLanguageCustomSettings('mdx', config),
      });
      const removeShortcode = (str: string) => str.replace(/^.+= makeShortcode\(".+$/gm, '');
      const jsx = removeShortcode(compiled);
      const result = `import React from "react";
import ReactDOM from "react-dom";
${jsx}
ReactDOM.render(<MDXContent />, document.body);
`;
      return (window as any).ts.transpile(result, typescriptOptions);
    },
    compiledCodeLanguage: 'javascript',
  },
  extensions: ['mdx'],
  editor: 'markup',
  editorLanguage: 'markdown',
};
