import type { LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';

export const java: LanguageSpecs = {
  name: 'java',
  title: 'Java',
  parser: {
    name: 'java',
    pluginUrls: [parserPlugins.java],
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-java-script.js}}'],
    scriptType: 'text/java',
    compiledCodeLanguage: 'java',
    liveReload: true,
  },
  extensions: ['java'],
  editor: 'script',
  largeDownload: true,
};
