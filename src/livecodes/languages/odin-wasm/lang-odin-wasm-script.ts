/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { odinWasmBaseUrl } from '../../vendors';
import { createLoadingReporter, runCompiler } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';

// Odin's compiler is a WASI command module, built by wodin — the fork of Odin with a direct
// WebAssembly backend that emits wasm with no LLVM and no linker — and packaged with the standard
// library. The package (`@live-codes/odin-wasm`) is fetched from the CDN.
//
// Where the *program* runs depends on the target it was built for:
//
//   wasi_wasm32 (the default)  a WASI host inside the package, in this worker — which is what makes
//                              stdin, stdout, stderr and the exit code work.
//   js_wasm32                  this page, on Odin's own JS runtime. A worker has no `document`, and
//                              that runtime is written for the page, so a program that touches the
//                              DOM or a canvas can only run here.

const SCRIPT_TYPE = 'text/odin-wasm';
const DEFAULT_TARGET = 'wasi_wasm32';

/**
 * Options read from `config.customSettings`: `compileArgs` and `target` are fixed when the compiler
 * is created, while `args` is a per-run option.
 */
interface OdinWasmSettings {
  compileArgs?: string[];
  args?: string[];
  target?: string;
}

interface RunResult {
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface OdinWasmApi {
  ready: boolean;
  failed: boolean;
  input: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner;
  settings?: Record<string, OdinWasmSettings>;
  run: (input?: string) => Promise<RunResult>;
}

/** The compiled module, as a `js_wasm32` compile hands it back. */
interface CompiledModule {
  wasm?: ArrayBuffer | null;
  errors?: string[];
}

declare const window: Window & {
  livecodes: Record<string, OdinWasmApi>;
};

const getWorkerSrc = () => `
importScripts(${JSON.stringify(odinWasmBaseUrl + 'dist/odin-wasm.global.js')});

let compiler = null;
let compilerOptions = null;

const getCompiler = (options = {}) => {
  const key = JSON.stringify([options.compileArgs, options.target]);
  if (compiler && compilerOptions === key) return compiler;
  compilerOptions = key;
  const previous = compiler;
  const created = (async () => {
    const next = await self.odinWasm.createCompiler({
      baseUrl: ${JSON.stringify(odinWasmBaseUrl + 'assets/')},
      compileArgs: options.compileArgs || [],
      target: options.target,
    });
    // \`compileArgs\` and \`target\` are fixed when a compiler is created, so a change builds a new
    // one and lets the old go; its assets are the browser's cache to keep.
    if (previous) previous.then((old) => old.dispose()).catch(() => undefined);
    return next;
  })();
  created.catch(() => {
    if (compiler === created) {
      compiler = null;
      compilerOptions = null;
    }
  });
  compiler = created;
  return compiler;
};

addEventListener('message', async (event) => {
  const { id, code, input, options } = event.data;
  try {
    const compiler = await getCompiler(options);
    // The js target is compiled here but run by the page, which is the only place with a DOM.
    if (options && options.kind === 'compile') {
      const compiled = await compiler.compile(code, options);
      const bytes = compiled.wasm ? compiled.wasm.slice() : null;
      postMessage(
        { id, result: { wasm: bytes ? bytes.buffer : null, errors: compiled.errors } },
        bytes ? [bytes.buffer] : [],
      );
      return;
    }
    const result = await compiler.run(code, input, { args: options && options.args });
    postMessage({
      id,
      result: {
        output: result.output,
        // The compiler's diagnostics; empty when the program built.
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

/**
 * Records a run and, unless the caller logs the output itself (the js target streams it), reports it.
 */
const report = (
  input: string,
  output: string | null,
  error: string | null,
  exitCode: number | null,
  log = true,
): RunResult => {
  odinWasm.input = input;
  odinWasm.output = output;
  odinWasm.error = error;
  odinWasm.exitCode = exitCode;
  odinWasm.ready = true;

  if (log) {
    if (error != null) {
      console.error(error);
    } else if (output != null) {
      console.log(output);
    }
  }
  return { input, output, error, exitCode };
};

window.livecodes.odinWasm ??= {} as OdinWasmApi;

const odinWasm = window.livecodes.odinWasm;
odinWasm.ready = false;
odinWasm.failed = false;

/** The custom settings of the running language, injected by the language's `inlineScript`. */
const getSettings = (): OdinWasmSettings => {
  const settings = odinWasm.settings?.['odin-wasm'];
  return settings != null && typeof settings === 'object' ? settings : {};
};

/** The program, which the result page writes inline as a `text/odin-wasm` script. */
const getCode = () => {
  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.textContent ?? ''}\n`;
  });
  return code;
};

/** Start (once) downloading the compiler, showing the loading indicator while it happens. */
const ensureLoaded = (runner: Runner): Promise<void> => {
  let init = odinWasm.init;
  if (!init) {
    odinWasm.failed = false;
    init = (async () => {
      reportLoading(true);
      try {
        await runner.ensureReady();
      } finally {
        reportLoading(false);
      }
    })().catch((error: Error) => {
      // Reset so a later run can retry the download, and let `loaded` reject.
      odinWasm.init = null;
      odinWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    odinWasm.init = init;
  }
  return init;
};

/** Odin's own JS runtime, loaded into this page once. */
let odinRuntime: Promise<any> | null = null;
const loadOdinRuntime = (): Promise<any> => {
  if ((window as any).odin) return Promise.resolve((window as any).odin);
  odinRuntime ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = odinWasmBaseUrl + 'assets/odin.js';
    script.onload = () => resolve((window as any).odin);
    script.onerror = () => reject(new Error('Failed to load the Odin JS runtime (assets/odin.js)'));
    document.head.appendChild(script);
  });
  // A failed load must not be cached, so a later run can retry it.
  odinRuntime.catch(() => {
    odinRuntime = null;
  });
  return odinRuntime;
};

/**
 * Instantiate a `js_wasm32` module on this page with Odin's runtime, so the program reaches the DOM
 * and a canvas. Output is streamed to the console as the program writes it; a program that exports
 * `step` is driven once per animation frame, as Odin's own runtime does.
 */
const runModuleOnPage = async (wasm: Uint8Array, input: string): Promise<RunResult> => {
  const odin = await loadOdinRuntime();
  const memory = new odin.WasmMemoryInterface();
  memory.setIntSize(4);
  const imports = odin.setupDefaultImports(memory, null, memory.memory);

  const inputBytes = new TextEncoder().encode(input);
  let inputOffset = 0;
  const output: string[] = [];

  imports.odin_env.write = (fd: number, ptr: number, len: number) => {
    const text = memory.loadString(ptr, len);
    if (fd === 2) {
      console.error(text);
    } else {
      output.push(text);
      console.log(text);
    }
  };
  imports.odin_env.read = (fd: number, ptr: number, len: number) => {
    if (fd !== 0) return 0;
    const count = Math.max(0, Math.min(len, inputBytes.length - inputOffset));
    if (count > 0) {
      new Uint8Array(memory.memory.buffer, ptr, count).set(
        inputBytes.subarray(inputOffset, inputOffset + count),
      );
      inputOffset += count;
    }
    return count;
  };

  const { instance } = await WebAssembly.instantiate(wasm.slice(), imports);
  const exports = instance.exports as Record<string, any>;
  memory.setExports(exports);
  if (exports.memory) memory.setMemory(exports.memory);

  /** Call one of the runtime's own entry points by name (`_start`, `_end`) when it is there. */
  const call = (name: string) => {
    const fn = exports[name];
    return typeof fn === 'function' ? fn() : undefined;
  };

  const finish = (exitCode: number, error: string | null = null) =>
    report(input, output.join(''), error, exitCode, /* log = */ false);

  try {
    call('_start');
  } catch (error) {
    return finish(1, `The program trapped: ${getErrorMessage(error)}`);
  }

  if (exports.step) {
    // An interactive program: drive it once per frame, and let it keep writing to the console.
    const context = exports.default_context_ptr ? exports.default_context_ptr() : 0;
    let previous: number | undefined;
    const frame = (timestamp: number) => {
      if (previous === undefined) previous = timestamp;
      const dt = (timestamp - previous) * 0.001;
      previous = timestamp;
      let keepGoing = false;
      try {
        keepGoing = exports.step(dt, context);
      } catch (error) {
        odinWasm.error = `The program trapped: ${getErrorMessage(error)}`;
        console.error(odinWasm.error);
        return;
      }
      if (!keepGoing) {
        call('_end');
        odinWasm.output = output.join('');
        return;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    return finish(0);
  }

  call('_end');
  return finish(0);
};

/** Compile in the worker, then run the module here — the only place with a DOM. */
const runOnPage = async (
  code: string,
  input: string,
  settings: OdinWasmSettings,
  runner: Runner,
): Promise<RunResult> => {
  try {
    await ensureLoaded(runner);
    const compiled = (await runner.run(code, '', {
      ...settings,
      kind: 'compile',
    })) as unknown as CompiledModule;
    if (!compiled?.wasm) {
      return report(input, null, (compiled?.errors ?? ['Odin produced no module']).join('\n'), 1);
    }
    return await runModuleOnPage(new Uint8Array(compiled.wasm), input);
  } catch (error) {
    return report(input, null, `Error: ${getErrorMessage(error)}`, 1);
  }
};

odinWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (odinWasm.failed) {
      clearInterval(interval);
      reject(new Error(odinWasm.error || 'Failed to initialize the Odin compiler'));
    } else if (odinWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

odinWasm.run = async (input?: string) => {
  const stdin = `${input ?? odinWasm.input ?? ''}`;
  const code = getCode();
  if (!code.trim()) return report(stdin, null, null, null);

  const settings = getSettings();
  const runner = (odinWasm.runner =
    odinWasm.runner || createWorkerRunner({ getWorkerSrc, label: 'Odin' }));

  if ((settings.target ?? DEFAULT_TARGET) === 'js_wasm32') {
    return runOnPage(code, stdin, settings, runner);
  }
  return runCompiler(runner, ensureLoaded, code, stdin, report, settings);
};

window.addEventListener('load', async () => {
  reportLoading(true);
  await odinWasm.run(odinWasm.input);
  reportLoading(false);
});
