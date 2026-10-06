/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { cobolWasmBaseUrl, cobolWasmClangBaseUrl } from '../../vendors';
import { createWorkerRunner, type Runner } from '../worker-runner';

// One runner for one language. GnuCOBOL is the real compiler (@live-codes/cobol-wasm), loaded from
// its CDN build: the IIFE defines `self.cobolWasm`, which the worker reaches with importScripts.
// It translates COBOL to C, compiles that with Clang and links libcob/GMP, then runs the resulting
// WASI module in place, because a browser has no linker subprocess to hand a binary to.
const SCRIPT_TYPE = 'text/cobol-wasm';

/** Per-run options forwarded to `@live-codes/cobol-wasm`'s `run`, read from `config.customSettings`. */
interface CobolWasmSettings {
  sourceFormat?: 'free' | 'fixed';
  compileArgs?: string[];
  cCompileArgs?: string[];
  args?: string[];
  fileName?: string;
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface CobolWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner: Runner | null;
  settings?: CobolWasmSettings;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, CobolWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(cobolWasmBaseUrl + 'dist/cobol-wasm.global.js')});

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    self.cobolWasm.createCompiler({
      baseUrl: ${JSON.stringify(cobolWasmBaseUrl + 'assets/')},
      // The Clang half is pinned by the package, so it comes from that exact version's assets.
      clangBaseUrl: ${JSON.stringify(cobolWasmClangBaseUrl)},
    });
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input, options } = event.data;
  try {
    const result = await (await getCompiler()).run(code, input, options);
    postMessage({
      id,
      result: {
        output: result.output,
        // The package reports the compiler's diagnostics here; empty when the program compiled.
        errors: result.errors || [],
        exitCode: result.exitCode,
      },
    });
  } catch (error) {
    postMessage({ id, error: String((error && error.message) || error) });
  }
});

getCompiler().then(
  () => postMessage({ type: 'ready' }),
  (error) => postMessage({ type: 'error', message: String((error && error.message) || error) }),
);
`;

// A single compile + run is normally quick; a long timeout guards against hangs (e.g. an infinite
// loop in the user program) by killing and respawning the worker.
const RUN_TIMEOUT_MS = 120000;

/**
 * Reads the program out of the result page.
 *
 * The result page writes the code inline as the `innerHTML` of a
 * `<script type="text/cobol-wasm">` element: core forces `singleFile` for non-module script types,
 * so the tag never points at `./script.js`.
 */
const readCode = () => {
  let code = '';
  document
    .querySelectorAll<HTMLScriptElement>(`script[type="${SCRIPT_TYPE}"]`)
    .forEach((script) => {
      code += `${script.textContent ?? ''}\n`;
    });
  return code;
};

const setResult = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
): RunResult => {
  cobolWasm.input = input;
  cobolWasm.output = output;
  cobolWasm.error = error;
  cobolWasm.exitCode = exitCode;
  cobolWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.cobol ??= {} as CobolWasmApi;

const cobolWasm = window.livecodes.cobol;
cobolWasm.ready = false;
cobolWasm.failed = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm worker, and the
// ~25 MiB toolchain is not downloaded again, instead of spawning a new one.
cobolWasm.runner ??= null;

// The result runs in an iframe; post status updates to the app origin. Mirrors
// the other WASM language scripts (`fanak`, `haskell-wasm`).
const parentOrigin =
  window.parent === window
    ? window.location.origin
    : window.location.ancestorOrigins?.[0] ||
      (() => {
        if (!document.referrer) return '*';
        try {
          return new URL(document.referrer).origin;
        } catch {
          // Ignore malformed referrers and use the wildcard fallback below.
          return '*';
        }
      })();

const postLoading = (payload: boolean) => {
  parent.postMessage({ type: 'loading', payload }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.
};

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = cobolWasm.init;
  if (!init) {
    cobolWasm.failed = false;
    init = (async () => {
      postLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        postLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      cobolWasm.init = null;
      cobolWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    cobolWasm.init = init;
  }
  return init;
};

cobolWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (cobolWasm.failed) {
      clearInterval(interval);
      reject(new Error(cobolWasm.error || 'Failed to initialize the COBOL environment'));
    } else if (cobolWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

cobolWasm.run = async (input?: string) => {
  const stdin = `${input ?? cobolWasm.input ?? ''}`;
  cobolWasm.input = stdin;

  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[cobol] no code to run — no program script found on the result page');
    return setResult(stdin, null, null, null);
  }

  const runner = (cobolWasm.runner =
    cobolWasm.runner ||
    createWorkerRunner({ getWorkerSrc, label: 'COBOL', timeoutMs: RUN_TIMEOUT_MS }));

  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await runner.run(code, stdin, cobolWasm.settings);
    // `errors` holds the compiler's diagnostics and is empty when the program ran.
    const errors = (result.errors || []).filter(Boolean);
    if (errors.length) {
      return setResult(stdin, null, errors.join('\n'), result.exitCode ?? 1);
    }
    return setResult(stdin, result.output ?? '', null, result.exitCode ?? 0);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};

// Aliases so both `livecodes.cobol` and `livecodes.cobolWasm` are available.
window.livecodes.cobolWasm = cobolWasm;

window.addEventListener('load', async () => {
  postLoading(true);
  await cobolWasm.run(cobolWasm.input);
  postLoading(false);
});
