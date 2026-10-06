/* eslint-disable no-console */
import {
  assemblyWasmBaseUrl,
  keystoneJsUrl,
  keystoneJsWasmUrl,
  unicornJsX86Url,
} from '../../vendors';
import { runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// x86-64 assembly is assembled and executed by @live-codes/assembly-wasm, which loads
// Keystone (the assembler) and Unicorn (the CPU emulator) as separate WebAssembly
// runtimes. That package bundles neither of them, so the URLs are passed here — see
// `vendors.ts`.
//
// It runs in a dedicated worker: the emulator is synchronous, and a program that loops
// would otherwise block the result page. The guest's `syscall`s are served by the
// package, so `write` becomes stdout and `read` reads the input box.

const SCRIPT_TYPE = 'text/assembly';

const BOOT_TIMEOUT_MS = 2 * 60_000;

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface AssemblyWasmApi {
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
  livecodes: Record<string, AssemblyWasmApi>;
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
importScripts(${JSON.stringify(assemblyWasmBaseUrl + 'dist/assembly-wasm.global.js')});

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    self.assemblyWasm.createCompiler({
      keystoneUrl: ${JSON.stringify(keystoneJsUrl)},
      keystoneWasmUrl: ${JSON.stringify(keystoneJsWasmUrl)},
      unicornUrl: ${JSON.stringify(unicornJsX86Url)},
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
        errors: result.errors,
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

const setResult = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
): RunResult => {
  assemblyWasm.input = input;
  assemblyWasm.output = output;
  assemblyWasm.error = error;
  assemblyWasm.exitCode = exitCode;
  assemblyWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.assemblyWasm ??= {} as AssemblyWasmApi;

const assemblyWasm = window.livecodes.assemblyWasm;
assemblyWasm.ready = false;
assemblyWasm.failed = false;

/** Start (once) downloading the runtimes, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = assemblyWasm.init;
  if (!init) {
    assemblyWasm.failed = false;
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await withTimeout(
          runner.ensureReady(),
          BOOT_TIMEOUT_MS,
          'Timed out while loading the Assembly runtimes.',
          () => runner.destroy(),
        );
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      assemblyWasm.init = null;
      assemblyWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    assemblyWasm.init = init;
  }
  return init;
};

assemblyWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (assemblyWasm.failed) {
      clearInterval(interval);
      reject(new Error(assemblyWasm.error || 'Failed to initialize the assembler'));
    } else if (assemblyWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

assemblyWasm.run = async (input?: string) => {
  const stdin = `${input ?? assemblyWasm.input ?? ''}`;
  assemblyWasm.input = stdin;

  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  if (!code.trim()) return setResult(stdin, null, null, 0);

  // Park the runner on the persisted namespace so a live reload reuses the warm
  // worker instead of loading the runtimes again.
  const runner = (assemblyWasm.runner =
    assemblyWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'Assembly' }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult);
};

// Alias, so both `livecodes.assemblyWasm` and `livecodes.asm` are available in markup.
window.livecodes.asm = assemblyWasm;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await assemblyWasm.run(assemblyWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
