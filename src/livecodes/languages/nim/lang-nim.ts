import type { CompileResult, LanguageSpecs } from '../../models';
import { nimWasmBaseUrl } from '../../vendors';
import { nimEditorSupport } from './nim-editor';

// Nim's JavaScript backend, for pages that want a document: the compiler emits one self-sufficient
// file, so it is compiled with `execute: false` and the result is run in the result page. That is
// the shape the TypeScript compiler's factory has; `compiledCodeLanguage` says the output is JS.
export const nim: LanguageSpecs = {
  name: 'nim',
  title: 'Nim',
  compiler: {
    url: nimWasmBaseUrl + 'dist/nim-wasm.global.js',
    factory: () => {
      let compiler: Promise<any> | null = null;
      const getCompiler = () => {
        if (!compiler) {
          const created: Promise<any> = (self as any).nimWasm.createCompiler({
            target: 'js',
            baseUrl: nimWasmBaseUrl + 'assets/nim/',
          });
          // do not keep a failed boot (e.g. a transient network error)
          created.catch(() => {
            compiler = null;
          });
          compiler = created;
        }
        return compiler;
      };
      return async (code: string): Promise<CompileResult> => {
        const result = await (await getCompiler()).run(code, '', { execute: false });
        if (!result.compiledCode) {
          return { code: '', info: { errors: result.errors || ['Nim produced no output.'] } };
        }
        // The emitted program declares its runtime at the top level and calls `main()` at the
        // end, so it gets a scope of its own rather than sharing the page's globals.
        return { code: `(() => {\n${result.compiledCode}\n})();`, info: {} };
      };
    },
    compiledCodeLanguage: 'javascript',
    liveReload: true,
  },
  extensions: ['nim', 'nims', 'nimble'],
  editor: 'script',
  editorSupport: nimEditorSupport,
};
