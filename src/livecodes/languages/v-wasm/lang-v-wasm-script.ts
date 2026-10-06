/* eslint-disable no-console */
import { createWorkerFromContent, getErrorMessage } from '../../utils/utils';
import { vWasmBaseUrl, vWasmClangBaseUrl } from '../../vendors';

// One runner for one language. The compiler is @live-codes/v-wasm, loaded from its CDN build: the
// IIFE defines `self.vWasm`, which the worker reaches with importScripts. It compiles V to C and
// hands that to the same Clang toolchain the C/C++ languages use, then runs the linked module in
// place, because a browser has no linker subprocess to hand a binary to.
//
// The V compiler is a classic Emscripten bundle: it decides it is in a worker by finding
// `importScripts`, so it has to run in a classic worker (the one createWorkerFromContent builds).
const SCRIPT_TYPE = 'text/v-wasm';

interface WorkerRunResult {
  output: string;
  errors: string[];
  exitCode: number | null;
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface Runner {
  ensureReady: () => Promise<void>;
  run: (code: string, input: string) => Promise<WorkerRunResult>;
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
      clangBaseUrl: ${JSON.stringify(vWasmClangBaseUrl)},
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

interface Pending {
  resolve: (result: WorkerRunResult) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

const createRunner = (): Runner => {
  let worker: Worker | null = null;
  let ready: Promise<void> | null = null;
  let settleReady: ((error?: Error) => void) | null = null;
  let pending: Record<number, Pending> = {};
  let nextId = 1;

  const failAll = (error: Error) => {
    for (const id of Object.keys(pending)) {
      const request = pending[Number(id)];
      clearTimeout(request.timer);
      request.reject(error);
    }
    pending = {};
  };

  const teardown = (error: Error) => {
    worker?.terminate();
    worker = null;
    ready = null;
    settleReady?.(error);
    settleReady = null;
    failAll(error);
  };

  const onMessage = (event: MessageEvent) => {
    const message = event.data ?? {};
    if (message.type === 'ready') {
      settleReady?.();
      settleReady = null;
      return;
    }
    if (message.type === 'error') {
      // The runtime failed to load (network, or the browser is unsupported).
      teardown(new Error(message.message));
      return;
    }
    const request = pending[message.id];
    if (!request) return;
    delete pending[message.id];
    clearTimeout(request.timer);
    if (message.error != null) {
      request.reject(new Error(message.error));
    } else {
      request.resolve(message.result);
    }
  };

  const spawn = () => {
    ready = new Promise<void>((resolve, reject) => {
      settleReady = (error?: Error) => (error ? reject(error) : resolve());
    });
    worker = createWorkerFromContent(getWorkerSrc());
    worker.onmessage = onMessage;
    worker.onerror = (event) => teardown(new Error(`The V worker crashed: ${event.message}`));
  };

  /** Spawn the worker if needed and resolve once the compiler has loaded. */
  const ensureReady = async () => {
    if (!ready) spawn();
    await ready;
  };

  const run = (code: string, input: string) =>
    ensureReady().then(
      () =>
        new Promise<WorkerRunResult>((resolve, reject) => {
          // `ensureReady` can resolve after the worker has been torn down (crash or timeout), so
          // the worker may be gone by the time the request is registered.
          if (!worker) {
            reject(new Error('The V worker is not available'));
            return;
          }
          const id = nextId++;
          const timer = setTimeout(() => {
            // The worker hung — kill it and reject, so the next run respawns a fresh worker.
            teardown(new Error('The V compiler timed out'));
          }, RUN_TIMEOUT_MS);
          pending[id] = { resolve, reject, timer };
          worker.postMessage({ id, code, input });
        }),
    );

  return { ensureReady, run };
};

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

  const runner = (vWasm.runner = vWasm.runner || createRunner());

  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await runner.run(code, stdin);
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

window.livecodes.v = vWasm;
// `vlang` is the language's longer name, and is a valid identifier here.
window.livecodes.vlang = vWasm;

window.addEventListener('load', async () => {
  postLoading(true);
  await vWasm.run(vWasm.input);
  postLoading(false);
});
