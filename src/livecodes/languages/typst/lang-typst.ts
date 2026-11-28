import type { LanguageSpecs } from '../../models';

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
  editorLanguage: 'markdown',
  largeDownload: true,
};
