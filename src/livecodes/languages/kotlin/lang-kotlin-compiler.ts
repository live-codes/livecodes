import type { CompileResult, CompilerFunction } from '../../models';
import { kotlinWasmBaseUrl } from '../../vendors';

// Runs in the compile worker. The real K2 compiler is a GraalVM Web Image loaded
// into this worker by `createInWorkerCompiler`, so it compiles in place instead
// of starting a worker of its own. The emitted JavaScript is what the result page
// executes, so this is the only place the toolchain is touched.
//
// Parked on the worker's global because the worker outlives edits, and reset on
// failure so a transient load error can be retried.
let compilerPromise: Promise<{ compile: (code: string) => Promise<CompileOutcome> }> | undefined;

interface CompiledFile {
  name: string;
  content: string;
  encoding: 'utf8' | 'base64';
}

interface CompileOutcome {
  ok: boolean;
  compileMs: number;
  errors: string[];
  files: CompiledFile[];
}

(self as any).createKotlinCompiler =
  (): CompilerFunction =>
  async (code): Promise<CompileResult | string> => {
    if (!code.trim()) return '';

    try {
      compilerPromise ??= (async () => {
        (self as any).importScripts(kotlinWasmBaseUrl + 'dist/kotlin-wasm.global.js');
        return (self as any).kotlinWasm.createInWorkerCompiler({
          target: 'js',
          baseUrl: kotlinWasmBaseUrl + 'assets/',
        });
      })().catch((error: Error) => {
        compilerPromise = undefined;
        throw error;
      });

      const compiler = await compilerPromise;
      const result: CompileOutcome = await compiler.compile(code);

      if (!result.ok) {
        return {
          code: '',
          info: {
            errors: result.errors?.length ? result.errors : ['Kotlin compilation failed.'],
          },
        };
      }

      const module = result.files.find((file) => file.name === 'main.mjs');
      if (!module) {
        return { code: '', info: { errors: ['The Kotlin compiler produced no JavaScript.'] } };
      }

      // Wrap the module so its top-level declarations stay out of the result page's
      // global scope (Nim's JavaScript backend is wrapped the same way).
      return { code: `(() => {\n${module.content}\n})();`, info: {} };
    } catch (error: any) {
      return { code: '', info: { errors: [String((error && error.message) || error)] } };
    }
  };
