import type { LanguageSpecs } from '../../models';
import { monacoLanguagesBaseUrl } from '../../vendors';

export const haskell: LanguageSpecs = {
  name: 'haskell',
  title: 'Haskell',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-haskell-script.js}}'],
    scriptType: 'text/haskell',
    compiledCodeLanguage: 'haskell',
    liveReload: true,
  },
  extensions: ['hs'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'haskell.js', language: 'haskell' },
  },
  largeDownload: true,
};
