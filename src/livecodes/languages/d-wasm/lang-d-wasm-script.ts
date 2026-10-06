/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { dlangWasmBaseUrl } from '../../vendors';
import { createWorkerRunner, type Runner } from '../worker-runner';

// One runner for one language. The compiler itself is @live-codes/dlang-wasm (DMD compiled to
// WebAssembly), loaded from its CDN build: the IIFE defines `self.dlangWasm`, which the worker
// reaches with importScripts. It compiles and runs the program in place, because a browser has no
// linker subprocess to hand a binary to.
const SCRIPT_TYPE = 'text/d-wasm';

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface DWasmApi {
  ready: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner: Runner | null;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, DWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(dlangWasmBaseUrl + 'dist/dlang-wasm.global.js')});

let compilerPromise = null;

const getCompiler = () => {
  compilerPromise =
    compilerPromise ||
    self.dlangWasm
      .createCompiler('d', {
        baseUrl: ${JSON.stringify(dlangWasmBaseUrl + 'assets/')},
      })
      .then(async (compiler) => {
        // Compile druntime up front so the first Run only pays for the program.
        await compiler.warm();
        return compiler;
      });
  return compilerPromise;
};

addEventListener('message', async (event) => {
  const { id, code, input } = event.data;
  try {
    const compiler = await getCompiler();
    const result = await compiler.run(code, input);
    postMessage({
      id,
      result: {
        output: result.output,
        // The package reports diagnostics as an array; empty on a clean compile.
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
// loop in the user program) by killing and respawning the worker. The wasm call cannot be
// interrupted any other way.
const RUN_TIMEOUT_MS = 120000;

/**
 * Reads the program out of the result page.
 *
 * The result page writes the code inline as the `innerHTML` of a
 * `<script type="text/d-wasm">` element: core forces `singleFile` for non-module script types,
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
  dWasm.input = input;
  dWasm.output = output;
  dWasm.error = error;
  dWasm.exitCode = exitCode;
  dWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

// The result runs in an iframe; post status updates to the app origin. Mirrors
// the other WASM language scripts (`haskell-wasm`).
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

const postLoading = (payload: boolean) =>
  parent.postMessage({ type: 'loading', payload }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.

window.livecodes.d ??= {} as DWasmApi;

const dWasm = window.livecodes.d;
dWasm.ready = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm worker, and the
// runtime is not downloaded again, instead of spawning a new one.
dWasm.runner ??= null;

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = dWasm.init;
  if (!init) {
    init = (async () => {
      postLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        postLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      dWasm.init = null;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    dWasm.init = init;
  }
  return init;
};

dWasm.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (dWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

dWasm.run = async (input?: string) => {
  const stdin = `${input ?? dWasm.input ?? ''}`;

  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[d-wasm] no code to run — no program script found on the result page');
    return setResult(stdin, null, null, null);
  }

  const runner = (dWasm.runner =
    dWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'D', timeoutMs: RUN_TIMEOUT_MS }));

  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await runner.run(code, stdin);
    const errors = (result.errors || []).filter(Boolean);
    // `exitCode` is null when the program never ran, i.e. it failed to compile.
    if (result.exitCode === null) {
      return setResult(stdin, null, errors.join('\n') || 'Compilation failed', 1);
    }
    return setResult(stdin, result.output ?? '', null, result.exitCode);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};

// Alias so both `livecodes.d` and `livecodes.dlang` are available.
window.livecodes.dlang = dWasm;

window.addEventListener('load', async () => {
  postLoading(true);
  await dWasm.run(dWasm.input);
  postLoading(false);
});
