import type { LanguageSpecs } from '../../models';

export const java: LanguageSpecs = {
  name: 'java',
  title: 'java',
  longTitle: 'Java',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-java-script.js}}'],
    scriptType: 'text/java',
    compiledCodeLanguage: 'java',
    liveReload: false,
  },
  extensions: ['java'],
  editor: 'script',
  editorLanguage: 'java',
  largeDownload: true,
};
