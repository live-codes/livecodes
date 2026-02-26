import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';
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
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'java.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-java.js')).java(),
    },
  },
  largeDownload: true,
};
