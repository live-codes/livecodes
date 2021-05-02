import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  info: `
  <h3>MDX</h3>
  <div>Markdown for the component era. <br />MDX lets you seamlessly write JSX in your Markdown documents.</div>
  <ul>
    <li><a href="https://mdxjs.com/" target="_blank">MDX documentation</a></li>
    <!-- <li><a href="#">MDX usage in LocalPen</a></li> -->
    <li><a href="?template=mdx" target="_parent" data-template="mdx">Load starter template</a></li>
  </ul>
  `,
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
