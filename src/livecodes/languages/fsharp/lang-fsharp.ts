import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

export const fsharp: LanguageSpecs = {
  name: 'fsharp',
  title: 'F#',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-fsharp-compiler.js}}');
      return (self as any).createFSharpCompiler();
    },
  },
  extensions: ['fs', 'fsharp', 'fsx'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'fsharp.js' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-mllike.js')).fsharp),
    },
    codejar: { language: 'fsharp' },
  },
};
