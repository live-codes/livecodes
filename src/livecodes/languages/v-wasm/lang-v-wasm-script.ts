/* eslint-disable no-console */
import { clangWasmBaseUrl, vWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// One runner for one language. The compiler is @live-codes/v-wasm, loaded from its CDN build: the
// IIFE defines `self.vWasm`, which the worker reaches with importScripts. It compiles V to C and
// hands that to the same Clang toolchain the C/C++ languages use, then runs the linked module in
// place, because a browser has no linker subprocess to hand a binary to.
//
// The V compiler is a classic Emscripten bundle: it decides it is in a worker by finding
// `importScripts`, so it has to run in a classic worker (the one createWorkerFromContent builds).
const SCRIPT_TYPE = 'text/v-wasm';

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface VWasmApi {
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
  livecodes: Record<string, VWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(vWasmBaseUrl + 'dist/v-wasm.global.js')});

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    self.vWasm.createCompiler({
      baseUrl: ${JSON.stringify(vWasmBaseUrl + 'assets/v/')},
      // The Clang half is pinned by the package, so it comes from that exact version's assets.
      clangBaseUrl: ${JSON.stringify(clangWasmBaseUrl + 'assets/')},
    });
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input } = event.data;
  try {
    const result = await (await getCompiler()).run(code, input);
    postMessage({
      id,
      result: {
        output: result.output,
        // The package reports V's, clang's and the linker's diagnostics as a list of lines, empty
        // when the program built and ran.
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
 * `<script type="text/v-wasm">` element: core forces `singleFile` for non-module script types,
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
  vWasm.input = input;
  vWasm.output = output;
  vWasm.error = error;
  vWasm.exitCode = exitCode;
  vWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.v ??= {} as VWasmApi;

const vWasm = window.livecodes.v;
vWasm.ready = false;
vWasm.failed = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm worker, and the
// V compiler plus Clang toolchain are not downloaded again, instead of spawning a new one.
vWasm.runner ??= null;

// The result runs in an iframe; post status updates to the app origin.
const postLoading = createLoadingReporter();

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = vWasm.init;
  if (!init) {
    vWasm.failed = false;
    init = (async () => {
      postLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        postLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      vWasm.init = null;
      vWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    vWasm.init = init;
  }
  return init;
};

vWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (vWasm.failed) {
      clearInterval(interval);
      reject(new Error(vWasm.error || 'Failed to initialize the V environment'));
    } else if (vWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

vWasm.run = async (input?: string) => {
  const stdin = `${input ?? vWasm.input ?? ''}`;

  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[v] no code to run — no program script found on the result page');
    return setResult(stdin, null, null, null);
  }

  const runner = (vWasm.runner =
    vWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'V', timeoutMs: RUN_TIMEOUT_MS }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult);
};

window.livecodes.v = vWasm;
// `vlang` is the language's longer name, and is a valid identifier here.
window.livecodes.vlang = vWasm;

window.addEventListener('load', async () => {
  postLoading(true);
  await vWasm.run(vWasm.input);
  postLoading(false);
});
