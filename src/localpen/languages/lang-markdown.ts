import { LanguageSpecs } from '../models';
import { parserPlugins } from './parser-plugins';

export const markdown: LanguageSpecs = {
  name: 'markdown',
  title: 'Markdown',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    url: 'vendor/marked/marked.min.js',
    factory: () => (window as any).marked,
    umd: true,
  },
  extensions: ['md', 'markdown', 'mdown', 'mkdn'],
  editor: 'markup',
  preset: 'github-markdown-css',
};
