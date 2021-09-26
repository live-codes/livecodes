import { LanguageSpecs } from '../models';
import { parserPlugins } from './prettier';
import { getLanguageCustomSettings } from './utils';

export const markdown: LanguageSpecs = {
  name: 'markdown',
  title: 'Markdown',
  info: `
  <h3>Markdown</h3>
  <div>Markdown compiled to HTML using Marked.</div>
  <ul>
    <li><a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener">Markdown official website</a></li>
    <li><a href="https://marked.js.org/" target="_blank" rel="noopener">Marked documentation</a></li>
    <li><a href="?template=markdown" target="_parent" data-template="markdown">Load Markdown Readme template</a></li>
  </ul>
  `,
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    url: 'https://cdn.jsdelivr.net/npm/marked@3.0.4/lib/marked.min.js',
    factory: () => async (code, { config }) =>
      (window as any).marked(code, {
        ...getLanguageCustomSettings('markdown', config),
      }),
  },
  extensions: ['md', 'markdown', 'mdown', 'mkdn'],
  editor: 'markup',
  preset: 'github-markdown-css',
};
