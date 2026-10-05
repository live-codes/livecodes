/* eslint-disable no-console */
import { createWorkerFromContent, getErrorMessage } from '../../utils/utils';
import { fortranWasmBaseUrl } from '../../vendors';

// One runner for one language. The compiler itself is @live-codes/lfortran-wasm, loaded from its
// CDN build: the IIFE defines `self.lfortranWasm`, which the worker reaches with importScripts.
// It compiles to WebAssembly and runs the program in place, because a browser has no linker
// subprocess to hand a binary to.
const SCRIPT_TYPE = 'text/fortran-wasm';

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

interface FortranWasmApi {
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
  livecodes: Record<string, FortranWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(fortranWasmBaseUrl + 'dist/lfortran-wasm.global.js')});

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    self.lfortranWasm.createCompiler({
      baseUrl: ${JSON.stringify(fortranWasmBaseUrl + 'assets/')},
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
        output: result.stdout,
        // The package reports diagnostics as one rendered string; the runner's contract is a list.
        errors: result.errors ? [result.errors] : [],
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
    worker.onerror = (event) => teardown(new Error(`The Fortran worker crashed: ${event.message}`));
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
          const id = nextId++;
          pending[id] = { resolve, reject };
          worker?.postMessage({ id, code, input });
        }),
    );

  return { ensureReady, run };
};

/**
 * Reads the program out of the result page.
 *
 * The result page writes the code inline as the `innerHTML` of a
 * `<script type="text/fortran-wasm">` element: core forces `singleFile` for non-module script types,
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
  fortranWasm.input = input;
  fortranWasm.output = output;
  fortranWasm.error = error;
  fortranWasm.exitCode = exitCode;
  fortranWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.fortran ??= {} as FortranWasmApi;

const fortranWasm = window.livecodes.fortran;
fortranWasm.ready = false;
// The runner is parked on the persisted namespace so a live reload reuses the warm worker, and the
// 19 MiB compiler is not downloaded again, instead of spawning a new one.
fortranWasm.runner ??= null;

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = fortranWasm.init;
  if (!init) {
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await runner.ensureReady();
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      fortranWasm.init = null;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    fortranWasm.init = init;
  }
  return init;
};

fortranWasm.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (fortranWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

fortranWasm.run = async (input?: string) => {
  const stdin = `${input ?? fortranWasm.input ?? ''}`;

  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[fortran] no code to run — no program script found on the result page');
    return setResult(stdin, null, null, null);
  }

  const runner = (fortranWasm.runner = fortranWasm.runner || createRunner());

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

window.livecodes.fortran = fortranWasm;
// `f90` is the extension most Fortran in the wild is written as, and is a valid identifier here.
window.livecodes.f90 = fortranWasm;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await fortranWasm.run(fortranWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
