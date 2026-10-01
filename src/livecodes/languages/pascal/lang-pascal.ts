import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, pascalWasmScriptUrl } from '../../vendors';

export const pascal: LanguageSpecs = {
  name: 'pascal',
  title: 'Pascal',
  compiler: {
    url: pascalWasmScriptUrl,
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-pascal-compiler.js}}');
      return (self as any).createPascalCompiler();
    },
  },
  extensions: ['pascal', 'pas', 'pp', 'pas2js'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'pascal.js' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-pascal.js')).pascal),
    },
  },
  largeDownload: true,
};
