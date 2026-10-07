/* eslint-disable no-console */
import { janetWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// Janet runs on the Janet interpreter compiled to WebAssembly (@live-codes/janet-wasm), loaded from
// its CDN build. The IIFE defines `self.janetWasm`, which the worker reaches with importScripts.
//
// The interpreter is a single instance - one stdout, one stdin, one environment - so it runs in a
// worker of its own. A Janet program that never returns cannot be interrupted, so Stop discards the
// worker rather than trying to stop the run inside it.
const SCRIPT_TYPE = 'text/janet-wasm';

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface JanetWasmApi {
  ready: boolean;
  failed: boolean;
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
  livecodes: Record<string, JanetWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(janetWasmBaseUrl + 'dist/janet-wasm.global.js')});

let interpreter = null;

const getInterpreter = () => {
  interpreter =
    interpreter ||
    self.janetWasm.createInterpreter({
      // Absolute, because inside the worker a relative URL would resolve against the worker's own
      // URL rather than the page. The interpreter loads its glue and wasm from here.
      baseUrl: ${JSON.stringify(janetWasmBaseUrl + 'assets/janet/')},
    });
  return interpreter;
};

addEventListener('message', async (event) => {
  const { id, code, input } = event.data;
  try {
    const result = await (await getInterpreter()).run(code, input);
    postMessage({
      id,
      result: {
        output: result.output,
        // The interpreter's diagnostics as a list of lines, empty when the program ran.
        errors: result.errors || [],
        exitCode: result.exitCode,
      },
    });
  } catch (error) {
    postMessage({ id, error: String((error && error.message) || error) });
  }
});

getInterpreter().then(
  () => postMessage({ type: 'ready' }),
  (error) => postMessage({ type: 'error', message: String((error && error.message) || error) }),
);
`;

// A single run is normally quick; a long timeout guards against hangs (e.g. an infinite loop in the
// user program) by killing and respawning the worker.
const RUN_TIMEOUT_MS = 120000;

/**
 * Reads the program out of the result page.
 *
 * The result page writes the code inline as the `innerHTML` of a `<script type="text/janet-wasm">`
 * element: core forces `singleFile` for non-module script types, so the tag never points at
 * `./script.js`.
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
  janetWasm.input = input;
  janetWasm.output = output;
  janetWasm.error = error;
  janetWasm.exitCode = exitCode;
  janetWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.janetWasm ??= {} as JanetWasmApi;

const janetWasm = window.livecodes.janetWasm;
janetWasm.ready = false;
janetWasm.failed = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm worker, instead
// of downloading and booting the interpreter again.
janetWasm.runner ??= null;

// The result runs in an iframe; post status updates to the app origin.
const postLoading = createLoadingReporter();

/** Start (once) downloading the interpreter, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = janetWasm.init;
  if (!init) {
    janetWasm.failed = false;
    init = (async () => {
      postLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        postLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      janetWasm.init = null;
      janetWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    janetWasm.init = init;
  }
  return init;
};

janetWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (janetWasm.failed) {
      clearInterval(interval);
      reject(new Error(janetWasm.error || 'Failed to initialize the Janet interpreter'));
    } else if (janetWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

janetWasm.run = async (input?: string) => {
  const stdin = `${input ?? janetWasm.input ?? ''}`;

  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[janet] no code to run — no program script found on the result page');
    return setResult(stdin, null, null, null);
  }

  const runner = (janetWasm.runner =
    janetWasm.runner ||
    createWorkerRunner({ getWorkerSrc, label: 'Janet', timeoutMs: RUN_TIMEOUT_MS }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult);
};

window.addEventListener('load', async () => {
  postLoading(true);
  await janetWasm.run(janetWasm.input);
  postLoading(false);
});
