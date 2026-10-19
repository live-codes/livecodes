import type { Language, LanguageSpecs, ScriptType } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, nimWasmBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../utils';

// Nim's JavaScript backend, for pages that want a document: the compiler emits one self-sufficient
// file, so it is compiled with `execute: false` and the result is run in the result page, the same
// shape as the TypeScript compiler's factory.
export const nim: LanguageSpecs = {
  name: 'nim',
  title: 'Nim',
  compiler: {
    url: nimWasmBaseUrl + 'dist/nim-wasm.global.js',
    factory: () => {
      const compilers: Record<'js' | 'c' | 'cpp', Promise<any> | null> = {
        js: null,
        c: null,
        cpp: null,
      };
      const getCompiler = (target: 'js' | 'c' | 'cpp' = 'js') => {
        if (!compilers[target]) {
          const created: Promise<any> = (self as any).nimWasm.createCompiler({
            target,
            emit: 'single',
            baseUrl: nimWasmBaseUrl + 'assets/nim/',
          });
          // do not keep a failed boot (e.g. a transient network error)
          created.catch(() => {
            compilers[target] = null;
          });
          compilers[target] = created;
        }
        return compilers[target];
      };
      return async (code: string, { config }) => {
        const target = getLanguageCustomSettings('nim', config)?.target || 'js';
        const result = await (await getCompiler(target)).run(code, '', { execute: false });
        if (!result.compiledCode) {
          return { code: '', info: { errors: result.errors || ['Nim produced no output.'] } };
        }
        if (target === 'js') {
          return { code: '(() => {\n' + result.compiledCode + '\n})();', info: {} };
        }
        return { code: result.compiledCode, info: {} };
      };
    },
    compiledCodeLanguage: ({ config }) => {
      const target = getLanguageCustomSettings('nim', config)?.target || 'js';
      return target === 'js' ? 'javascript' : ((target + '-wasm') as Language);
    },
    scripts: ({ baseUrl, config }) => {
      const target = getLanguageCustomSettings('nim', config)?.target || 'js';
      return target === 'js' ? [] : [baseUrl + '{{hash:lang-clang-wasm-script.js}}'];
    },
    scriptType: ({ config }) => {
      const target = getLanguageCustomSettings('nim', config)?.target || 'js';
      return target === 'js' ? undefined : (`text/${target}-wasm` as ScriptType);
    },
  },
  extensions: ['nim', 'nims', 'nimble', 'nim-js', 'js.nim'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'nim.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-nim.js')).nim(),
    },
  },
};
