import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, wasmFmtZigBaseUrl } from '../../vendors';

export const zigWasm: LanguageSpecs = {
  name: 'zig-wasm',
  title: 'Zig (Wasm)',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtZigBaseUrl + 'zig_fmt_web.js');
      await formatter.default();
      return async (code) => ({ formatted: await formatter.format(code) });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-zig-wasm-script.js}}'],
    scriptType: 'text/zig-wasm',
    compiledCodeLanguage: 'zig',
    liveReload: true,
  },
  extensions: ['zig'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'zig.js', language: 'zig' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-rust.js')).rust),
    },
    codejar: { language: 'zig' },
  },
  largeDownload: true,
};
