import { LanguageSpecs } from '../models';
import { getCustomConfig } from './custom-configs';
import { parserPlugins } from './parser-plugins';

export const markdown: LanguageSpecs = {
  name: 'markdown',
  title: 'Markdown',
  info: `
  <h3>Markdown</h3>
  <div>Markdown compiled to HTML using Marked.</div>
  <ul>
    <li><a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener">Markdown official website</a></li>
    <li><a href="https://marked.js.org/" target="_blank" rel="noopener">Marked documentation</a></li>
    <!-- <li><a href="#">Markdown usage in LocalPen</a></li> -->
    <li><a href="?template=markdown" target="_parent" data-template="markdown">Load Markdown Readme template</a></li>
  </ul>
  `,
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/marked/marked.min.js',
    factory: () => async (code, { options }) => {
      const customConfigs = getCustomConfig('marked-config', options.customConfigs);
      return (window as any).marked(code, customConfigs);
    },
    umd: true,
  },
  extensions: ['md', 'markdown', 'mdown', 'mkdn'],
  editor: 'markup',
  preset: 'github-markdown-css',
};
