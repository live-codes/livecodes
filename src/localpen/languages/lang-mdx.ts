import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/mdx/mdx.js',
    factory: () => async (code: string) => {
      const compiled = await (window as any).MDX.mdx(code, { skipExport: true });
      const removeShortcode = (str: string) => str.replace(/^.+= makeShortcode\(".+$/gm, '');
      const jsx = removeShortcode(compiled);
      return `import React from "react";
                import ReactDOM from "react-dom";
                ${jsx}
                ReactDOM.render(<MDXContent />, document.body);
                `;
    },
    umd: true,
  },
  extensions: ['mdx'],
  editor: 'markup',
};
