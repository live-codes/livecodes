import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl } from '../../vendors';

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
  editorSupport: {
    monaco: { language: 'swift' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-swift.js')).swift),
    },
    codejar: { language: 'swift' },
  },
};
