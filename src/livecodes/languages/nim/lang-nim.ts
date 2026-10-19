import type { Language, LanguageSpecs, ScriptType } from '../../models';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl, nimWasmBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../utils';

// Nim's JavaScript backend, for pages that want a document: the compiler emits one self-sufficient
// file, so it is compiled with `execute: false` and the result is run in the result page, the same
// shape as the TypeScript compiler's factory. External packages are fetched on first import.
export const nim: LanguageSpecs = {
  name: 'nim',
  title: 'Nim',
  compiler: {
    url: nimWasmBaseUrl + 'dist/nim-wasm.global.js',
    factory: () => {
      const compilers = new Map<string, Promise<any>>();
      const libraryCache = new Map<string, Promise<any>>();
      const getCompiler = async (
        target: 'js' | 'c' | 'cpp' = 'js',
        packages = true,
        libraries?: unknown,
      ) => {
        const key = `${target}:${packages}:${JSON.stringify(libraries ?? null)}`;
        let compiler = compilers.get(key);
        if (!compiler) {
          const created: Promise<any> = (async () => {
            const entries = libraries
              ? await (self as any).nimWasm.resolveLibraries(libraries, { cache: libraryCache })
              : {};
            return (self as any).nimWasm.createCompiler({
              target,
              emit: 'single',
              baseUrl: nimWasmBaseUrl + 'assets/nim/',
              // An object is merged with the bundled registry; a user library therefore enables the
              // package loader even if `packages` was false.
              packages: Object.keys(entries).length ? entries : packages,
            });
          })();
          // do not keep a failed boot (e.g. a transient network error)
          created.catch(() => {
            if (compilers.get(key) === created) compilers.delete(key);
          });
          compilers.set(key, created);
          compiler = created;
        }
        return compiler;
      };
      return async (code: string, { config }) => {
        const settings = getLanguageCustomSettings('nim', config) ?? {};
        const target = settings.target || 'js';
        const packages = settings.packages !== false;
        let compiler: any;
        try {
          compiler = await getCompiler(target, packages, settings.libraries);
        } catch (error) {
          return {
            code: '',
            info: {
              errors: [`Could not load Nim libraries: ${(error as Error)?.message ?? error}`],
            },
          };
        }
        const result = await compiler.run(code, '', { execute: false });
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
