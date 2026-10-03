/* eslint-disable no-console */
import { createWorkerFromContent, getErrorMessage } from '../../utils/utils';
import { adaWasmBaseUrl } from '../../vendors';

// Ada is compiled and run by HAC (@live-codes/ada-wasm), a single self-contained
// WebAssembly bundle. It runs inside a dedicated worker so a non-terminating
// program can be torn down without hanging the result page.

const SCRIPT_TYPE = 'text/ada-wasm';

const BOOT_TIMEOUT_MS = 2 * 60_000;
const RUN_TIMEOUT_MS = 60_000;

interface WorkerRunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
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
  destroy: () => void;
}

interface AdaWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, AdaWasmApi>;
};

const withTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  message: string,
  onTimeout?: () => void,
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      onTimeout?.();
      reject(new Error(message));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });

const getWorkerSrc = () => `
importScripts(${JSON.stringify(adaWasmBaseUrl + 'dist/ada-wasm.iife.js')});

let runtimePromise = null;
const getRuntime = () => {
  runtimePromise = runtimePromise || self.AdaWasm.createRuntime();
  return runtimePromise;
};

addEventListener('message', async (event) => {
  const { id, code, input } = event.data;
  try {
    const runtime = await getRuntime();
    const result = await runtime.run(code, { input });
    postMessage({
      id,
      result: {
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
      },
    });
  } catch (error) {
    postMessage({ id, error: String((error && error.message) || error) });
  }
});

getRuntime().then(
  () => postMessage({ type: 'ready' }),
  (error) => postMessage({ type: 'error', message: String((error && error.message) || error) }),
);
`;

interface Pending {
  resolve: (result: WorkerRunResult) => void;
  reject: (error: Error) => void;
}

const createRunner = (): Runner => {
  let worker: Worker | null = null;
  let ready: Promise<void> | null = null;
  let settleReady: ((error?: Error) => void) | null = null;
  let pending: Record<number, Pending> = {};
  let nextId = 1;

  const failAll = (error: Error) => {
    for (const id of Object.keys(pending)) {
      pending[Number(id)].reject(error);
    }
    pending = {};
  };

  const teardown = (error?: Error) => {
    worker?.terminate();
    worker = null;
    ready = null;
    settleReady?.(error);
    settleReady = null;
    if (error) failAll(error);
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
    worker.onerror = (event) => teardown(new Error(`The Ada worker crashed: ${event.message}`));
  };

  const ensureReady = async () => {
    if (!ready) spawn();
    await ready;
  };

  const run = (code: string, input: string) =>
    ensureReady().then(
      () =>
        new Promise<WorkerRunResult>((resolve, reject) => {
          const id = nextId++;
          pending[id] = { resolve, reject };
          worker?.postMessage({ id, code, input });
        }),
    );

  return { ensureReady, run, destroy: () => teardown() };
};

const setResult = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
): RunResult => {
  adaWasm.input = input;
  adaWasm.output = output;
  adaWasm.error = error;
  adaWasm.exitCode = exitCode;
  adaWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.adaWasm ??= {} as AdaWasmApi;

const adaWasm = window.livecodes.adaWasm;
adaWasm.ready = false;
adaWasm.failed = false;

/** Start (once) loading the runtime in a worker, showing the loading indicator. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = adaWasm.init;
  if (!init) {
    adaWasm.failed = false;
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await withTimeout(
          runner.ensureReady(),
          BOOT_TIMEOUT_MS,
          'Timed out while loading the Ada compiler.',
          () => runner.destroy(),
        );
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      adaWasm.init = null;
      adaWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    adaWasm.init = init;
  }
  return init;
};

adaWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (adaWasm.failed) {
      clearInterval(interval);
      reject(new Error(adaWasm.error || 'Failed to initialize the Ada environment'));
    } else if (adaWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

adaWasm.run = async (input?: string) => {
  const stdin = `${input ?? adaWasm.input ?? ''}`;
  adaWasm.input = stdin;

  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  if (!code.trim()) return setResult(stdin, null, null, 0);

  const runner = (adaWasm.runner = adaWasm.runner || createRunner());

  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await withTimeout(
      runner.run(code, stdin),
      RUN_TIMEOUT_MS,
      'Ada execution timed out.',
      () => {
        // A non-terminating program leaves the worker busy, so tear it down and
        // let the next run start from a fresh worker.
        runner.destroy();
        adaWasm.runner = undefined;
        adaWasm.init = null;
      },
    );

    // Compiler diagnostics (and runtime errors) go to stderr; a clean compile
    // produces none.
    const stderr = result.stderr.trim();
    if (stderr) {
      return setResult(stdin, result.stdout || null, stderr, result.exitCode || 1);
    }
    return setResult(stdin, result.stdout, null, result.exitCode);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};

// Alias so both `livecodes.adaWasm` and `livecodes.ada` are available.
window.livecodes.ada = adaWasm;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await adaWasm.run(adaWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
