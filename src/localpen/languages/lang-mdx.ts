import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
import { typescriptOptions } from './lang-typescript';
import { parserPlugins } from './parser-plugins';

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  info: `
  <h3>MDX</h3>
  <div>Markdown for the component era. <br />MDX lets you seamlessly write JSX in your Markdown documents.</div>
  <ul>
    <li><a href="https://mdxjs.com/" target="_blank" rel="noopener">MDX documentation</a></li>
    <!-- <li><a href="#">MDX usage in LocalPen</a></li> -->
    <li><a href="?template=mdx" target="_parent" data-template="mdx">Load starter template</a></li>
  </ul>
  `,
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    dependencies: ['typescript'],
    url: 'vendor/mdx/mdx.js',
    factory: () => async (code, { options }) => {
      const customConfig = getCustomConfig('mdx-config', options.customConfigs);
      const compiled = await (window as any).MDX.mdx(code, {
        skipExport: true,
        ...customConfig,
      });
      const removeShortcode = (str: string) => str.replace(/^.+= makeShortcode\(".+$/gm, '');
      const jsx = removeShortcode(compiled);
      const result = `import React from "react";
import ReactDOM from "react-dom";
${jsx}
ReactDOM.render(<MDXContent />, document.body);
`;
      return (window as any).typescript.transpile(result, typescriptOptions);
    },
    umd: true,
  },
  extensions: ['mdx'],
  editor: 'markup',
  editorLanguage: 'markdown',
};
