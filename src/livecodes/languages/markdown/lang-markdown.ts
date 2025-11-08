import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { markedUrl } from '../../vendors';
import { parserPlugins } from '../prettier';

export const markdown: LanguageSpecs = {
  name: 'markdown',
  title: 'Markdown',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    url: markedUrl,
    factory:
      () =>
      async (code, { config }) =>
        (window as any).marked.parse(code, { ...getLanguageCustomSettings('markdown', config) }),
  },
  extensions: ['md', 'markdown', 'mdown', 'mkdn'],
  editor: 'markup',
  multiFileSupport: true,
};
