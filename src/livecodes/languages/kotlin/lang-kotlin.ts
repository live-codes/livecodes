import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils/utils';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

/**
 * The Kotlin target, from `customSettings.kotlin.target`.
 *
 * `js` is the default so existing projects are unaffected; it runs the emitted
 * module directly in the result page. `wasm` emits a real WebAssembly module that
 * the result page rebuilds and instantiates.
 */
const isWasm = (config: Parameters<typeof getLanguageCustomSettings>[1]) =>
  getLanguageCustomSettings('kotlin', config).target === 'wasm';

export const kotlin: LanguageSpecs = {
  name: 'kotlin',
  title: 'Kotlin',
  compiler: {
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-kotlin-compiler.js}}');
      return (self as any).createKotlinCompiler();
    },
    // Only the wasm target needs a result-page runtime; the JS target's output is
    // a plain script the page can execute by itself.
    scripts: ({ baseUrl, config }) =>
      isWasm(config) ? [baseUrl + '{{hash:lang-kotlin-wasm-script.js}}'] : [],
    // A non-module script type also makes the result page inline the compiled
    // output, which is how the runtime can read the emitted files back.
    scriptType: ({ config }) => (isWasm(config) ? 'text/kotlin-wasm' : undefined),
    // Mirrors `scriptType`: the compiled tab shows the emitted files as JSON.
    compiledCodeLanguage: ({ config }) => (isWasm(config) ? 'json' : undefined),
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
