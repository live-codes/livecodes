/* eslint-disable no-console */
import { crystalWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// Crystal's compiler is a Crystal program compiled to WebAssembly, and it does the whole job
// itself: the compiler, LLVM's linker and the WASI sysroot are one package fetched from the CDN,
// so a browser needs nothing else — there is no separate runtime to compile first, and no host
// tool. The compiler arrives through `importScripts` (its distributed build defines
// `self.crystalWasm`), and because it blocks the thread it runs on it gets a worker of its own,
// which is also what makes stdin, stdout, stderr and the exit code work.

const SCRIPT_TYPE = 'text/crystal-wasm';

/**
 * Options read from `config.customSettings`: `compileArgs` is fixed when the compiler is created,
 * while `args` is a per-run option.
 */
interface CrystalWasmSettings {
  compileArgs?: string[];
  args?: string[];
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface CrystalWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner;
  settings?: Record<string, CrystalWasmSettings>;
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, CrystalWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(crystalWasmBaseUrl + 'dist/crystal-wasm.global.js')});

let compiler = null;
let compilerArgs = null;

const getCompiler = (compileArgs = []) => {
  const key = JSON.stringify(compileArgs);
  if (compiler && compilerArgs === key) return compiler;
  compilerArgs = key;
  const previous = compiler;
  const created = (async () => {
    const next = await self.crystalWasm.createCompiler({
      baseUrl: ${JSON.stringify(crystalWasmBaseUrl + 'assets/crystal/')},
      compileArgs,
    });
    // \`compileArgs\` is fixed when a compiler is created, so a change builds a new one and lets
    // the old go; its assets are the browser's cache to keep.
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
        // The compiler's and the linker's diagnostics; empty when the program built.
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
  crystalWasm.input = input;
  crystalWasm.output = output;
  crystalWasm.error = error;
  crystalWasm.exitCode = exitCode;
  crystalWasm.ready = true;

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }
  return { input, output, error, exitCode };
};

window.livecodes.crystalWasm ??= {} as CrystalWasmApi;

const crystalWasm = window.livecodes.crystalWasm;
crystalWasm.ready = false;
crystalWasm.failed = false;

/** The custom settings of the running language, injected by the language's `inlineScript`. */
const getSettings = (): CrystalWasmSettings => {
  const settings = crystalWasm.settings?.['crystal-wasm'];
  return settings != null && typeof settings === 'object' ? settings : {};
};

/** The program, which the result page writes inline as a `text/crystal-wasm` script. */
const getCode = () => {
  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.textContent ?? ''}\n`;
  });
  return code;
};

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = crystalWasm.init;
  if (!init) {
    crystalWasm.failed = false;
    init = (async () => {
      reportLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        reportLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download, and let `loaded` reject.
      crystalWasm.init = null;
      crystalWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    crystalWasm.init = init;
  }
  return init;
};

crystalWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (crystalWasm.failed) {
      clearInterval(interval);
      reject(new Error(crystalWasm.error || 'Failed to initialize the Crystal compiler'));
    } else if (crystalWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

crystalWasm.run = async (input?: string) => {
  const stdin = `${input ?? crystalWasm.input ?? ''}`;
  const code = getCode();
  if (!code.trim()) return setResult(stdin, null, null, null);

  const runner = (crystalWasm.runner =
    crystalWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'Crystal' }));

  return runCompiler(runner, ensureLoaded, code, stdin, setResult, getSettings());
};

window.addEventListener('load', async () => {
  reportLoading(true);
  await crystalWasm.run(crystalWasm.input);
  reportLoading(false);
});
