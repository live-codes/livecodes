import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const markdown: LanguageSpecs = {
  name: 'markdown',
  title: 'Markdown',
  formatter: {
    prettier: {
      name: 'markdown',
      pluginUrls: [parserPlugins.markdown, parserPlugins.html],
    },
  },
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-markdown-compiler.js}}');
      return (self as any).createMarkdownCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-markdown-script.js}}'],
  },
  extensions: ['md', 'markdown', 'mdown', 'mkdn'],
  editor: 'markup',
  editorSupport: {
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-markdown.js')).markdown(),
    },
  },
  multiFileSupport: true,
};
