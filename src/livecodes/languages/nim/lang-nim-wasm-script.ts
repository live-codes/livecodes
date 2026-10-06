/* eslint-disable no-console */
import { clangWasmBaseUrl, nimWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// Nim's WebAssembly target: Nim compiles to C, and Clang and the linker turn that into a wasm
// module. Both block the thread they run on, so they run in a worker of their own — and the
// program runs there too, which is why stdin, stdout, stderr and the exit code all work.

const SCRIPT_TYPE = 'text/nim-wasm';

/** Options forwarded to `@live-codes/nim-wasm`'s `run`, read from `config.customSettings`. */
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

let compiler = null;

const getCompiler = () => {
  compiler =
    compiler ||
    (async () => {
      // Compile through the Clang runtime this page already uses, rather than the second copy the
      // Nim IIFE carries inside it, so only one runtime is ever loaded.
      const toolchain = await self.clangWasmToolchain.createToolchain({
        baseUrl: ${JSON.stringify(clangWasmBaseUrl + 'assets/')},
      });
      return self.nimWasm.createCompiler({
        target: 'wasm',
        baseUrl: ${JSON.stringify(nimWasmBaseUrl + 'assets/nim/')},
        toolchain,
      });
    })();
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input, options } = event.data;
  try {
    const result = await (await getCompiler()).run(code, input, options);
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
    init = (async () => {
      reportLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        reportLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download.
      nimWasm.init = null;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    nimWasm.init = init;
  }
  return init;
};

nimWasm.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (nimWasm.ready) {
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
