import { getErrorMessage, loadScript } from '../../utils/utils';
import { jsUntarUrl, wasiShimUrl, zigWasmBaseUrl } from '../../vendors';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerContent from './lang-zig-wasm-worker.raw.js?raw';

interface ZigResult {
  output: string | null;
  error: string | null;
}

interface ZigRunResult extends ZigResult {
  exitCode: number;
}

interface ZigRunner {
  readonly ready: boolean;
  init(): Promise<void>;
  run(source: string, input?: string): Promise<ZigResult>;
}

declare const window: Window & {
  livecodes: {
    zig: {
      ready?: boolean;
      failed?: boolean;
      error?: string | null;
      init?: Promise<void> | null;
      runner?: ZigRunner;
      loaded?: Promise<void>;
      input?: string;
      output?: string | null;
      exitCode?: number | null;
      run?: (input?: string) => Promise<ZigRunResult>;
    };
  };
};

// Worker boot includes downloading and extracting the Zig toolchain
// (tens of MB), so allow generous time before falling back to the main thread.
const BOOT_TIMEOUT_MS = 180000;
// A single compile + run is normally quick; a long timeout guards against hangs
// (e.g. an infinite loop in the user program) by killing and respawning the worker.
const RUN_TIMEOUT_MS = 120000;

// ---- main-thread runner (fallback) -------------------------------------
// Used when Web Workers are not available in the result page.
function createMainThreadRunner(): ZigRunner {
  let ready = false;
  let initPromise: Promise<void> | null = null;
  let untar: any;
  let wasi: any;
  let zigStdLib: any;
  const compiledModules: Map<number, { source: string; module: WebAssembly.Module }> = new Map();
  // compiled user modules are small; bound the map to avoid unbounded growth
  // over a long-lived page (live reload reuses the same runner)
  const MAX_CACHED_MODULES = 16;
  const isSharedArrayBufferSupported = typeof SharedArrayBuffer !== 'undefined';

  // hashing function for cache validation
  const createHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash * 31 + char) % 0x7fffffff;
    }
    return hash;
  };

  const ensureDependencies = async (): Promise<void> => {
    if (!untar) {
      untar = await loadScript(jsUntarUrl, 'untar');
      if (!untar) throw new Error('js-untar failed to load');
    }

    if (!wasi) {
      wasi = await import(wasiShimUrl);
    }
  };

  const createFile = (data: ArrayBuffer | Uint8Array): any => {
    const dataArray = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

    if (isSharedArrayBufferSupported) {
      const sharedBuffer = new SharedArrayBuffer(dataArray.length);
      const view = new Uint8Array(sharedBuffer);
      view.set(dataArray);

      return {
        get data() {
          return view;
        },
        get buffer() {
          return sharedBuffer;
        },
      };
    }
    const { File } = wasi;
    return new File(dataArray);
  };

  const processZigArchive = async (response: Response): Promise<any> => {
    const { Directory } = wasi;

    const arrayBuffer = await response.arrayBuffer();
    const entries = await untar(arrayBuffer);
    const fsMap = new Map();

    for (const entry of entries) {
      if (!entry.name.startsWith('lib/') || entry.type !== '0' || !entry.buffer) continue;

      const path = entry.name.substring(4).split('/');
      let current = fsMap;

      for (let i = 0; i < path.length - 1; i++) {
        if (!current.has(path[i])) current.set(path[i], new Map());
        current = current.get(path[i]);
      }

      const fileData = createFile(entry.buffer);

      current.set(path[path.length - 1], fileData);
    }

    const buildDirectory = (map: Map<string, any>): any =>
      new Directory(
        Array.from(map.entries()).map(([key, value]) => [
          key,
          value instanceof Map ? buildDirectory(value) : value,
        ]),
      );

    return buildDirectory(fsMap);
  };

  const doInit = async (): Promise<void> => {
    await ensureDependencies();

    const response = await fetch(`${zigWasmBaseUrl}zig.tar.gz`);
    if (!response.ok) throw new Error(`Failed to fetch zig.tar.gz: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();

    const decompressed = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(arrayBuffer));
          controller.close();
        },
      }).pipeThrough(new DecompressionStream('gzip')),
    );

    zigStdLib = await processZigArchive(decompressed);
    ready = true;
  };

  const init = async (): Promise<void> => {
    if (ready) return;
    if (!initPromise) {
      initPromise = doInit().catch((err) => {
        initPromise = null;
        throw err;
      });
    }
    return initPromise;
  };

  // compile the user code to a WebAssembly module (cached for identical source,
  // e.g. interactive re-runs that only provide new stdin)
  const compileZig = async (code: string): Promise<WebAssembly.Module> => {
    const hash = createHash(code);
    const cached = compiledModules.get(hash);
    if (cached && cached.source === code) return cached.module;

    const { WASI, OpenFile, PreopenDirectory, ConsoleStdout } = wasi;
    const errors: string[] = [];
    const stderr = ConsoleStdout.lineBuffered((line: string) => errors.push(line));

    const codeFile = createFile(new TextEncoder().encode(code));

    const compileWasi = new WASI(
      [
        'zig.wasm',
        'build-exe',
        'main.zig',
        '-target',
        'wasm32-wasi',
        '-fno-entry',
        '-O',
        'ReleaseSmall',
      ],
      [],
      [
        new OpenFile(createFile(new TextEncoder().encode(''))),
        createFile(new TextEncoder().encode('')),
        stderr,
        new PreopenDirectory('.', new Map([['main.zig', codeFile]])),
        new PreopenDirectory('/lib', zigStdLib.contents),
        new PreopenDirectory('/cache', new Map()),
      ],
      { debug: false },
    );

    const wasmResponse = await fetch(`${zigWasmBaseUrl}zig.wasm`);
    const wasmArrayBuffer = await wasmResponse.arrayBuffer();

    let compilerModule: WebAssembly.Module;
    if (isSharedArrayBufferSupported) {
      const sharedWasmBuffer = new SharedArrayBuffer(wasmArrayBuffer.byteLength);
      const sharedWasmView = new Uint8Array(sharedWasmBuffer);
      sharedWasmView.set(new Uint8Array(wasmArrayBuffer));
      compilerModule = await WebAssembly.compile(sharedWasmView as any);
    } else {
      compilerModule = await WebAssembly.compile(wasmArrayBuffer);
    }

    const instance = await WebAssembly.instantiate(compilerModule, {
      wasi_snapshot_preview1: compileWasi.wasiImport,
    });

    const exitCode = compileWasi.start(instance);
    if (exitCode !== 0) {
      throw new Error(`Compilation failed: ${errors.join('\n')}`);
    }

    const mainWasm = (compileWasi.fds[3] as any).dir.contents.get('main.wasm');
    if (!mainWasm?.data) throw new Error('Compilation output not found');

    const wasmData =
      mainWasm.data instanceof Uint8Array ? mainWasm.data : new Uint8Array(mainWasm.data);

    const module = await WebAssembly.compile(wasmData);
    if (compiledModules.size >= MAX_CACHED_MODULES) {
      compiledModules.clear();
    }
    compiledModules.set(hash, { source: code, module });
    return module;
  };

  const runZig = async (code: string, input = ''): Promise<ZigResult> => {
    const output: string[] = [];
    const errors: string[] = [];

    try {
      await init();
      if (!zigStdLib) {
        return { output: null, error: 'Zig environment not ready' };
      }

      const { WASI, OpenFile, PreopenDirectory, ConsoleStdout } = wasi;

      const stdout = ConsoleStdout.lineBuffered((line: string) => output.push(line));
      const stderr = ConsoleStdout.lineBuffered((line: string) => errors.push(line));

      const module = await compileZig(code);

      const inputFile = createFile(new TextEncoder().encode(input));

      const executeWasi = new WASI(
        ['main.wasm'],
        [],
        [new OpenFile(inputFile), stdout, stderr, new PreopenDirectory('.', new Map())],
        { debug: false },
      );

      const instance = await WebAssembly.instantiate(module, {
        wasi_snapshot_preview1: executeWasi.wasiImport,
      });

      executeWasi.start(instance);
      const outputStr = output.join('\n') || null;
      const errorStr = errors.join('\n') || null;

      return { output: outputStr, error: errorStr };
    } catch (err) {
      compiledModules.clear();
      const error = 'Error: ' + getErrorMessage(err);
      return { output: null, error };
    }
  };

  const run = (source: string, input?: string): Promise<ZigResult> => runZig(source, input ?? '');

  return {
    init,
    run,
    get ready() {
      return ready;
    },
  };
}

// ---- worker runner -------------------------------------------------------
function createWorkerRunner(): ZigRunner {
  let worker: Worker | null = null;
  let readyPromise: Promise<void> | null = null;
  let resolveReady: (() => void) | null = null;
  let rejectReady: ((error?: Error) => void) | null = null;
  let pending: {
    [id: number]: {
      resolve: (result: ZigResult) => void;
      reject: (error: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    };
  } = {};
  let nextId = 1;

  function onMessage(e: MessageEvent) {
    const msg = e.data || {};
    if (msg.type === 'ready') {
      if (resolveReady) {
        resolveReady();
        resolveReady = null;
        rejectReady = null;
      }
    } else if (msg.type === 'fatal') {
      // Boot failed — tear down and reject init so the caller falls back.
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (rejectReady) {
        rejectReady(new Error('Zig worker failed to start: ' + msg.message));
        resolveReady = null;
        rejectReady = null;
      }
    } else if (msg.type === 'result') {
      const p = pending[msg.id];
      if (p) {
        delete pending[msg.id];
        clearTimeout(p.timer);
        p.resolve(JSON.parse(msg.json));
      }
    } else if (msg.type === 'error') {
      const pe = pending[msg.id];
      if (pe) {
        delete pending[msg.id];
        clearTimeout(pe.timer);
        pe.reject(new Error(msg.message));
      }
    }
  }

  function onError(err: Error) {
    rejectAll(new Error('Zig worker crashed: ' + (err && err.message ? err.message : 'unknown')));
    if (worker) {
      worker.terminate();
      worker = null;
    }
  }

  function rejectAll(err: Error) {
    for (const id in pending) {
      if (Object.prototype.hasOwnProperty.call(pending, id)) {
        const p = pending[id];
        clearTimeout(p.timer);
        p.reject(err);
      }
    }
    pending = {};
  }

  function spawn() {
    readyPromise = new Promise<void>(function (resolve, reject) {
      resolveReady = resolve;
      rejectReady = reject;
    });
    try {
      const toDataUrl = (content: string, type = 'text/javascript') =>
        `data:${type};charset=UTF-8;base64,` + btoa(content);

      const workerUrl = toDataUrl(
        `self.zigWasmBaseUrl = "${zigWasmBaseUrl}"; self.wasiShimUrl = "${wasiShimUrl}";\n\n${workerContent}`,
      );
      worker = new Worker(workerUrl);
      worker.onmessage = onMessage;
      worker.onerror = onError as any;
    } catch (err) {
      // Workers unavailable in this context (e.g. sandbox restrictions).
      worker = null;
      readyPromise = null;
      resolveReady = null;
      rejectReady = null;
      throw err;
    }
  }

  function ensureWorker() {
    if (!worker) spawn();
  }

  function init(): Promise<void> {
    try {
      ensureWorker();
    } catch (err) {
      return Promise.reject(err);
    }
    return new Promise<void>(function (resolve, reject) {
      const timer = setTimeout(function () {
        if (worker) {
          worker.terminate();
          worker = null;
        }
        reject(new Error('Zig worker failed to start (timeout)'));
      }, BOOT_TIMEOUT_MS);
      readyPromise?.then(
        function () {
          clearTimeout(timer);
          resolve();
        },
        function (err) {
          clearTimeout(timer);
          reject(err);
        },
      );
    });
  }

  function run(source: string, input?: string): Promise<ZigResult> {
    try {
      ensureWorker();
    } catch (err) {
      return Promise.reject(err);
    }
    if (!readyPromise) return Promise.reject(new Error('Zig worker is not ready'));
    return readyPromise.then(function () {
      if (!worker) {
        // the worker died while we were waiting (boot failure); respawn it
        spawn();
        return readyPromise!.then(() => runNow(source, input));
      }
      return runNow(source, input);
    });
  }

  function runNow(source: string, input?: string): Promise<ZigResult> {
    const id = nextId++;
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
        // the worker hung — kill it and let the next run respawn
        delete pending[id];
        if (worker) {
          worker.terminate();
          worker = null;
        }
        reject(new Error('Zig compile timed out; restarted the compiler.'));
      }, RUN_TIMEOUT_MS);
      pending[id] = { resolve, reject, timer };
      worker?.postMessage({ type: 'compile', source, stdin: input ?? '', id });
    });
  }

  return {
    init,
    run,
    get ready() {
      return !!worker && resolveReady === null;
    },
  };
}

// ---- choose runner --------------------------------------------------------
function isNode() {
  return (
    typeof process !== 'undefined' && process.versions != null && process.versions.node != null
  );
}

function createRunner(): ZigRunner {
  const useWorker = !isNode() && typeof Worker === 'function';
  let runner: ZigRunner | null = useWorker ? createWorkerRunner() : null;
  const mainRunner = createMainThreadRunner();
  let fellBack = false;

  function init(): Promise<void> {
    if (runner && !fellBack) {
      return runner.init().catch(function (err) {
        // eslint-disable-next-line no-console
        console.error('Zig worker unavailable, falling back to main thread:', getErrorMessage(err));
        fellBack = true;
        runner = null;
        return mainRunner.init();
      });
    }
    return mainRunner.init();
  }

  function run(source: string, input?: string): Promise<ZigResult> {
    return init().then(function () {
      return (runner && !fellBack ? runner : mainRunner).run(source, input);
    });
  }

  return {
    init,
    run,
    get ready() {
      return runner && !fellBack ? runner.ready : mainRunner.ready;
    },
  };
}

// ---- LiveCodes integration ----------------------------------------------
window.livecodes.zig ??= {};

const livecodesApi = window.livecodes.zig;
livecodesApi.ready = false;
livecodesApi.runner ??= createRunner();

livecodesApi.init ??= (function () {
  if (livecodesApi.ready) return;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  return livecodesApi.runner
    ?.init()
    .then(function () {
      parent.postMessage({ type: 'loading', payload: false }, '*');
    })
    .catch(function (err) {
      parent.postMessage({ type: 'loading', payload: false }, '*');
      livecodesApi.ready = false;
      livecodesApi.init = null;
      livecodesApi.failed = true;
      livecodesApi.error = getErrorMessage(err);
      // eslint-disable-next-line no-console
      console.error('Failed to initialize Zig environment:', err);
      throw err;
    });
})();

livecodesApi.run = async function (input: string | undefined) {
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/zig-wasm"]');
  scripts.forEach(function (script) {
    code += script.innerHTML + '\n';
  });
  if (!code.trim()) return { output: null, error: null, exitCode: 0 };

  livecodesApi.input = input;
  livecodesApi.output = null;
  livecodesApi.ready = false;
  try {
    await livecodesApi.init;
    const result = await livecodesApi.runner?.run(code, input);
    if (!result) throw new Error('Zig runner is not available');
    const error = result.error;
    livecodesApi.output = result.output;
    livecodesApi.error = error;
    livecodesApi.exitCode = error ? 1 : 0;
    livecodesApi.ready = true;
    if (error != null) {
      // eslint-disable-next-line no-console
      console.error(error);
    } else if (result.output != null) {
      // eslint-disable-next-line no-console
      console.log(result.output);
    }
    return { output: result.output, error, exitCode: error ? 1 : 0 };
  } catch (err: any) {
    const msg = 'Error: ' + (err && err.message ? err.message : String(err));
    livecodesApi.output = null;
    livecodesApi.error = msg;
    livecodesApi.exitCode = 1;
    livecodesApi.ready = true;
    // eslint-disable-next-line no-console
    console.error(msg);
    return { output: null, error: msg, exitCode: 1 };
  }
};

livecodesApi.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(function () {
    if (livecodesApi.failed) {
      clearInterval(interval);
      reject(new Error(livecodesApi.error || 'Failed to initialize the Zig environment'));
    } else if (livecodesApi.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async function () {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodesApi.run?.(livecodesApi.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
