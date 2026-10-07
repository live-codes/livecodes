/* eslint-disable no-console */
import { clangWasmBaseUrl, nimWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// Nim's WebAssembly target: Nim compiles to C, and Clang and the linker turn that into a wasm
// module. Both block the thread they run on, so they run in a worker of their own — and the
// program runs there too, which is why stdin, stdout, stderr and the exit code all work.

const SCRIPT_TYPE = 'text/nim-wasm';

/**
 * Options read from `config.customSettings`: `compileArgs` is fixed when the compiler is created,
 * while `args` is a per-run option.
 */
interface NimWasmSettings {
  compileArgs?: string[];
  args?: string[];
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface NimWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner;
  settings?: Record<string, NimWasmSettings>;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, NimWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(clangWasmBaseUrl + 'dist/clang-wasm-toolchain.global.js')});
importScripts(${JSON.stringify(nimWasmBaseUrl + 'dist/nim-wasm.global.js')});

let toolchain = null;
let compiler = null;
let compilerArgs = null;

const getToolchain = () => {
  toolchain =
    toolchain ||
    self.clangWasmToolchain.createToolchain({
      baseUrl: ${JSON.stringify(clangWasmBaseUrl + 'assets/')},
    });
  return toolchain;
};

const getCompiler = (compileArgs = []) => {
  const key = JSON.stringify(compileArgs);
  if (compiler && compilerArgs === key) return compiler;
  compilerArgs = key;
  const previous = compiler;
  const created = (async () => {
    // Compile through the Clang runtime this page already uses, rather than the second copy the
    // Nim IIFE carries inside it, so only one runtime is ever loaded.
    const built = await getToolchain();
    const next = await self.nimWasm.createCompiler({
      target: 'wasm',
      baseUrl: ${JSON.stringify(nimWasmBaseUrl + 'assets/nim/')},
      toolchain: built,
      compileArgs,
    });
    // compileArgs is fixed when a compiler is created, so a change builds a new one and
    // releases the old; the shared toolchain belongs to this page and is not released.
    if (previous) previous.then((old) => old.dispose()).catch(() => undefined);
    return next;
  })();
  created.catch(() => {
    if (compiler === created) {
      compiler = null;
      compilerArgs = null;
    }
  });
  compiler = created;
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input, options } = event.data;
  try {
    const result = await (await getCompiler(options && options.compileArgs)).run(
      code,
      input,
      options,
    );
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

const reportLoading = createLoadingReporter();

const setResult = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
): RunResult => {
  nimWasm.input = input;
  nimWasm.output = output;
  nimWasm.error = error;
  nimWasm.exitCode = exitCode;
  nimWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.nimWasm ??= {} as NimWasmApi;

const nimWasm = window.livecodes.nimWasm;
nimWasm.ready = false;
nimWasm.failed = false;

/** The custom settings of the running language, injected by the language's `inlineScript`. */
const getSettings = (): NimWasmSettings => {
  const settings = nimWasm.settings?.['nim-wasm'];
  return settings != null && typeof settings === 'object' ? settings : {};
};

const getCode = () => {
  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  return code;
};

/** Start (once) downloading the toolchain, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = nimWasm.init;
  if (!init) {
    nimWasm.failed = false;
    init = (async () => {
      reportLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        reportLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download, and let `loaded` reject.
      nimWasm.init = null;
      nimWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    nimWasm.init = init;
  }
  return init;
};

nimWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (nimWasm.failed) {
      clearInterval(interval);
      reject(new Error(nimWasm.error || 'Failed to initialize the Nim compiler'));
    } else if (nimWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

nimWasm.run = async (input?: string) => {
  const stdin = `${input ?? nimWasm.input ?? ''}`;
  const code = getCode();
  if (!code.trim()) return setResult(stdin, null, null, null);

  const runner = (nimWasm.runner =
    nimWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'Nim' }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult, getSettings());
};

window.addEventListener('load', async () => {
  reportLoading(true);
  await nimWasm.run(nimWasm.input);
  reportLoading(false);
});
