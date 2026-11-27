import type { CompileResult, CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils/utils';
import { kotlinWasmBaseUrl } from '../../vendors';

// Runs in the compile worker. The real K2 compiler is a GraalVM Web Image; what
// reaches the result page differs per target:
//
//   js   - one self-contained ES module, run as a plain script.
//   wasm - four interdependent files that the result page rebuilds and imports.
//
// Each target gets its own nested worker rather than loading the image into this
// one. A GraalVM image installs itself on the worker's global and cannot be
// replaced in place, so switching target in a shared worker would compile one
// target's stdlib with the other's image - every program then fails with
// "Missing stdlib class". A nested worker per target keeps them apart, and costs
// one extra worker only for the target you actually use.
//
// Parked on the worker's global because the worker outlives edits, and reset on
// failure so a transient load error can be retried.
type KotlinTarget = 'js' | 'wasm';

interface KotlinCompiler {
  target: KotlinTarget;
  compile: (code: string) => Promise<CompileOutcome>;
}

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

const compilers: Partial<Record<KotlinTarget, Promise<KotlinCompiler>>> = {};

/**
 * The target a program is compiled for, from `customSettings.kotlin.target`.
 *
 * `js` stays the default so existing projects keep working, and anything
 * unrecognised falls back to it rather than failing at compile time.
 */
const getTarget = (config: any): KotlinTarget =>
  getLanguageCustomSettings('kotlin', config).target === 'wasm' ? 'wasm' : 'js';

const getCompiler = (target: KotlinTarget): Promise<KotlinCompiler> => {
  compilers[target] ??= (async () => {
    (self as any).importScripts(kotlinWasmBaseUrl + 'dist/kotlin-wasm.global.js');
    // `createCompiler` starts a worker of its own for the image, so the two
    // targets never share a global. `warm: false` skips its throwaway compile.
    return (self as any).kotlinWasm.createCompiler({
      target,
      baseUrl: kotlinWasmBaseUrl + 'assets/',
      warm: false,
    });
  })().catch((error: Error) => {
    compilers[target] = undefined;
    throw error;
  });
  return compilers[target] as Promise<KotlinCompiler>;
};

const compileFailure = (errors: string[]): CompileResult => ({
  code: '',
  info: { errors: errors.length ? errors : ['Kotlin compilation failed.'] },
});

/**
 * `js`: one module, wrapped so its declarations stay out of the page's global scope.
 *
 * The trailing flush matters: Kotlin/JS writes console output through a line
 * buffer that only flushes on a newline. A program that ends with `print` — which
 * tutorials do constantly — would otherwise lose everything after its last
 * `println`. `mainWrapper()` is the compiler's own top-level call, so flushing
 * immediately after it covers the end of `main`.
 */
const jsResult = (files: CompiledFile[]): CompileResult => {
  const module = files.find((file) => file.name === 'main.mjs');
  if (!module) {
    return { code: '', info: { errors: ['The Kotlin compiler produced no JavaScript.'] } };
  }
  const flush = [
    '  // Kotlin/JS buffers stdout until a newline; flush whatever `print` left.',
    '  try { get_output().flush_shahbo_k$(); } catch (e) {}',
  ].join('\n');
  // A module without `main` has no wrapper to hook; `replace` then leaves it alone.
  const content = module.content.replace(/^mainWrapper\(\);$/m, `mainWrapper();\n${flush}`);
  // Nim's JavaScript backend is wrapped the same way.
  return { code: `(() => {\n${content}\n})();`, info: {} };
};

/**
 * `wasm`: all four files, so the result page can rebuild the module graph.
 *
 * The output is not standalone — `main.mjs` imports `main.import-object.mjs`,
 * which imports `main.js-builtins.mjs`, and `main.wasm` is fetched by URL. The
 * result page cannot serve sibling files, so it receives every part and rebuilds
 * them as Blob modules with their specifiers rewritten.
 *
 * A single `JSON.parse` round trip keeps the payload one script tag while
 * preserving line breaks inside each file, which the compiler's own output
 * depends on.
 */
const wasmResult = (files: CompiledFile[]): CompileResult => {
  const required = ['main.mjs', 'main.import-object.mjs', 'main.js-builtins.mjs', 'main.wasm'];
  const missing = required.filter((name) => !files.some((file) => file.name === name));
  if (missing.length) {
    return {
      code: '',
      info: { errors: [`The Kotlin compiler did not emit ${missing.join(', ')}.`] },
    };
  }
  const payload = required.map((name) => {
    const file = files.find((entry) => entry.name === name) as CompiledFile;
    return { name, content: file.content, encoding: file.encoding };
  });
  // Escaped so the JSON cannot close the script element it is embedded in.
  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  return { code: json, info: {} };
};

(self as any).createKotlinCompiler =
  (): CompilerFunction =>
  async (code, { config }): Promise<CompileResult | string> => {
    if (!code.trim()) return '';

    const target = getTarget(config);

    try {
      const compiler = await getCompiler(target);
      // The package appends the JVM compatibility shims (both targets) and, on wasm,
      // the stdin prelude. They are appended after the program, so diagnostics keep
      // the user's line numbers without any offset mapping here.
      const result: CompileOutcome = await compiler.compile(code);

      if (!result.ok) return compileFailure(result.errors);
      return target === 'wasm' ? wasmResult(result.files) : jsResult(result.files);
    } catch (error: any) {
      return { code: '', info: { errors: [String((error && error.message) || error)] } };
    }
  };
