import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';
import { json5 } from './lang-json5';

export const jsonc: LanguageSpecs = {
  ...json5,
  name: 'jsonc',
  title: 'JSONC',
  formatter: {
    prettier: {
      name: 'jsonc',
      pluginUrls: [parserPlugins.babel, parserPlugins.estree],
    },
  },
  extensions: ['jsonc'],
  editorSupport: {
    ...json5.editorSupport,
    monaco: { language: 'json5' },
  },
};
