import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const typst: LanguageSpecs = {
  name: 'typst',
  title: 'Typst',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-typst-compiler.js}}');
      return (self as any).createTypstCompiler();
    },
  },
  extensions: ['typ'],
  editor: 'markup',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'typst.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-typst.js')).typst(),
    },
    codejar: { language: 'markdown' },
  },
  largeDownload: true,
};
