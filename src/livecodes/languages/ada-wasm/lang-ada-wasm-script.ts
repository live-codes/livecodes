/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { adaWasmBaseUrl } from '../../vendors';
import { createWorkerRunner, type Runner } from '../worker-runner';

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

interface AdaWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner<WorkerRunResult>;
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
const ensureLoaded = (runner: Runner<WorkerRunResult>): Promise<void> => {
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

  const runner = (adaWasm.runner =
    adaWasm.runner || createWorkerRunner<WorkerRunResult>({ getWorkerSrc, label: 'Ada' }));

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
