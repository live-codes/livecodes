import type { LanguageSpecs } from '../../models';
import {
  codeMirrorBaseUrl,
  javaWasmBaseUrl,
  monacoLanguagesBaseUrl,
  wasmFmtClangBaseUrl,
} from '../../vendors';

export const javaWasm: LanguageSpecs = {
  name: 'java-wasm',
  title: 'Java (Wasm)',
  formatter: {
    factory: async () => {
      const formatter = await import(wasmFmtClangBaseUrl + 'clang-format-web.js');
      await formatter.default();
      return async (code) => ({
        formatted: await formatter.format(code, 'main.java', 'Google'),
      });
    },
  },
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [
      javaWasmBaseUrl + 'dist/java-wasm.iife.js',
      baseUrl + '{{hash:lang-java-wasm-script.js}}',
    ],
    scriptType: 'text/java-wasm',
    compiledCodeLanguage: 'java-wasm',
    liveReload: true,
  },
  // `java` is the canonical name: it used to select DoppioJVM and now selects this engine.
  extensions: ['java', 'java-wasm'],
  editor: 'script',
  editorLanguage: 'java',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'java.js', language: 'java' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-java.js')).java(),
    },
    codejar: { language: 'java' },
  },
  largeDownload: true,
};
