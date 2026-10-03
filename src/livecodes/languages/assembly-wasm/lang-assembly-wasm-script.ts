/* eslint-disable no-console */
import { createWorkerFromContent, getErrorMessage } from '../../utils/utils';
import {
  assemblyWasmBaseUrl,
  keystoneJsUrl,
  keystoneJsWasmUrl,
  unicornJsX86Url,
} from '../../vendors';

// x86-64 assembly is assembled and executed by @live-codes/assembly-wasm, which loads
// Keystone (the assembler) and Unicorn (the CPU emulator) as separate WebAssembly
// runtimes. That package bundles neither of them, so the URLs are passed here — see
// `vendors.ts`.
//
// It runs in a dedicated worker: the emulator is synchronous, and a program that loops
// would otherwise block the result page. The guest's `syscall`s are served by the
// package, so `write` becomes stdout and `read` reads the input box.

const SCRIPT_TYPE = 'text/assembly';

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
    worker.onerror = (event) =>
      teardown(new Error(`The Assembly worker crashed: ${event.message}`));
  };

  /** Spawn the worker if needed and resolve once the runtime has loaded. */
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

  return { ensureReady, run };
};

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
// The runner is parked on the persisted namespace so a live reload reuses the warm
// worker instead of loading the runtimes again.
assemblyWasm.runner ??= undefined;

/** Start (once) downloading the runtimes, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = assemblyWasm.init;
  if (!init) {
    assemblyWasm.failed = false;
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await runner.ensureReady();
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

  const runner = (assemblyWasm.runner = assemblyWasm.runner || createRunner());

  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }

  try {
    const result = await runner.run(code, stdin);
    // `errors` holds the assembler's diagnostics and any runtime fault, and is empty
    // when the program assembled and exited cleanly.
    const errors = (result.errors || []).filter(Boolean);
    if (errors.length) {
      return setResult(stdin, null, errors.join('\n'), result.exitCode ?? 1);
    }
    return setResult(stdin, result.output ?? '', null, result.exitCode ?? 0);
  } catch (error) {
    return setResult(stdin, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};

// Alias, so both `livecodes.assemblyWasm` and `livecodes.asm` are available in markup.
window.livecodes.asm = assemblyWasm;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await assemblyWasm.run(assemblyWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
