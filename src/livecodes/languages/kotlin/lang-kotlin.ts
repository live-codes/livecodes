import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const kotlin: LanguageSpecs = {
  name: 'kotlin',
  title: 'Kotlin',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-kotlin-compiler.js}}');
      return (self as any).createKotlinCompiler();
    },
  },
  extensions: ['kt', 'kts', 'kotlin'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'kotlin.js', language: 'kotlin' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-clike.js')).kotlin),
    },
    codejar: { language: 'kotlin' },
  },
  largeDownload: true,
};
