import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const io: LanguageSpecs = {
  name: 'io',
  title: 'Io',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-io-script.js}}'],
    scriptType: 'text/io',
    compiledCodeLanguage: 'io',
  },
  extensions: ['io', 'iolang'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'io.js' },
    codemirror: {
      languageSupport: async () => (await import(codeMirrorBaseUrl + 'codemirror-lang-io.js')).io(),
    },
    codejar: { language: 'io' },
  },
};
