import type { Language, LanguageSpecs } from '../../models';

export const gleam: LanguageSpecs = {
  name: 'gleam',
  title: 'Gleam',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-gleam-compiler.js}}');
      return (self as any).createGleamCompiler();
    },
    loadAsExternalModule: true,
    inlineModule: `(async() => {
      const main = (await import('./script')).main;
      if (typeof main === "function") main();
    })();
`,
  },
  extensions: ['gleam'],
  editor: 'script',
  editorLanguage: 'swift' as Language,
};
