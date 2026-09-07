/* eslint-disable no-console */
import { getErrorMessage, loadScript } from '../../utils/utils';
import { jsUntarUrl, wasiShimUrl, zigWasmBaseUrl } from '../../vendors';

livecodes.zig ??= {};

// check if SharedArrayBuffer supported by the browser else it will use ArrayBuffer
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

const createZigCompilationCache = () => {
  // 32 MB
  const cacheSize = 32 * 1024 * 1024;
  // 256 bytes
  const metaSize = 256;
  const maxEntries = Math.floor((metaSize / 4 - 2) / 3);

  const buffer = isSharedArrayBufferSupported
    ? new SharedArrayBuffer(cacheSize)
    : new ArrayBuffer(cacheSize);

  const metaView = new Int32Array(buffer, 0, metaSize / 4);
  const dataView = new Uint8Array(buffer, metaSize);
  const compiledModules: Map<string, WebAssembly.Module> = new Map();

  const clear = () => {
    metaView[0] = 0;
    metaView[1] = 0;
    compiledModules.clear();
    sourceKeys.clear();
  };

  const findEntry = (codeHash: number): { offset: number; size: number } | null => {
    const entryCount = metaView[0];
    for (let i = 0; i < entryCount; i++) {
      const baseIdx = 2 + i * 3;
      if (metaView[baseIdx] === codeHash) {
        return {
          offset: metaView[baseIdx + 1],
          size: metaView[baseIdx + 2],
        };
      }
    }
    return null;
  };

  // store the exact source alongside the cached wasm so that hash collisions
  // (the hash is only a lookup aid, not the source identity) never return a
  // cached module compiled from different code
  const sourceKeys: Map<number, string> = new Map();

  const getCachedWasm = (code: string): Uint8Array | null => {
    const hash = createHash(code);
    const entry = findEntry(hash);
    if (!entry || sourceKeys.get(hash) !== code) return null;

    return dataView.slice(entry.offset, entry.offset + entry.size);
  };

  const getCachedModule = (code: string): WebAssembly.Module | null => {
    const hash = createHash(code);
    if (sourceKeys.get(hash) !== code) return null;
    return compiledModules.get(hash.toString()) || null;
  };

  const cacheWasm = async (
    code: string,
    wasmData: Uint8Array,
  ): Promise<WebAssembly.Module | null> => {
    const hash = createHash(code);
    const size = wasmData.length;

    // clear the cache if it is full, or if the metadata entries would overflow metaView
    if (metaView[0] >= maxEntries || metaView[1] + size > dataView.length) {
      console.warn('cache is full, clearing...');
      clear();
    }

    const currentOffset = metaView[1];
    const entryCount = metaView[0];
    const baseIdx = 2 + entryCount * 3;

    dataView.set(wasmData, currentOffset);

    metaView[baseIdx] = hash;
    metaView[baseIdx + 1] = currentOffset;
    metaView[baseIdx + 2] = size;
    metaView[0] = entryCount + 1;
    metaView[1] = currentOffset + size;
    sourceKeys.set(hash, code);

    try {
      const module = await WebAssembly.compile(wasmData as any);
      compiledModules.set(hash.toString(), module);
      return module;
    } catch (error) {
      console.warn('failed to pre-compile WASM module:', error);
      return null;
    }
  };

  const setCompiledModule = (code: string, module: WebAssembly.Module): void => {
    const hash = createHash(code);
    if (sourceKeys.get(hash) === code) {
      compiledModules.set(hash.toString(), module);
    }
  };

  return {
    getCachedWasm,
    getCachedModule,
    cacheWasm,
    setCompiledModule,
    clear,
  };
};

const compilationCache = createZigCompilationCache();

let untar: any;
let wasi: {
  WASI: any;
  File: any;
  Directory: any;
  OpenFile: any;
  PreopenDirectory: any;
  ConsoleStdout: any;
};

const ensureDependencies = async (): Promise<void> => {
  if (!untar) {
    await loadScript(jsUntarUrl, 'untar');
    untar = (window as any).untar;
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
  } else {
    const { File } = wasi;
    return new File(dataArray);
  }
};

const processZigArchive = async (response: Response): Promise<any> => {
  await ensureDependencies();
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

const lazyCompileZig = async (
  code: string,
): Promise<{ wasmData: Uint8Array; module: WebAssembly.Module }> => {
  const cachedModule = compilationCache.getCachedModule(code);
  const cachedWasm = compilationCache.getCachedWasm(code);
  if (cachedWasm) {
    if (cachedModule) {
      return { wasmData: cachedWasm, module: cachedModule };
    }
    const module = await WebAssembly.compile(cachedWasm as any);
    compilationCache.setCompiledModule(code, module);
    return { wasmData: cachedWasm, module };
  }

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
      new PreopenDirectory('/lib', livecodes.zig.zigStdLib.contents),
      new PreopenDirectory('/cache', new Map()),
    ],
    { debug: false },
  );

  const wasmResponse = await fetch(livecodes.zig.zigWasmUrl);
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

  const module = await compilationCache.cacheWasm(code, wasmData);
  if (!module) throw new Error('Failed to compile WASM module');
  return { wasmData, module };
};

const runZigCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  const output: string[] = [];
  const errors: string[] = [];

  try {
    await ensureZigInit();

    if (!livecodes.zig.zigStdLib) {
      return { output: null, error: 'Zig environment not ready' };
    }

    const { WASI, OpenFile, PreopenDirectory, ConsoleStdout } = wasi;

    const stdout = ConsoleStdout.lineBuffered((line: string) => output.push(line));
    const stderr = ConsoleStdout.lineBuffered((line: string) => errors.push(line));

    const { module } = await lazyCompileZig(code);

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
    compilationCache.clear();
    const error = 'Error: ' + getErrorMessage(err);
    return { output: null, error };
  }
};

const initZigEnvironment = async (): Promise<void> => {
  if (livecodes.zig.ready) return;

  console.log('Initializing Zig environment...');
  try {
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

    livecodes.zig.zigStdLib = await processZigArchive(decompressed);
    livecodes.zig.zigWasmUrl = `${zigWasmBaseUrl}zig.wasm`;

    console.log('Zig environment initialized successfully');
  } catch (err) {
    console.error('failed to initialize Zig environment:', err);
    livecodes.zig.ready = false;
    livecodes.zig.failed = true;
    livecodes.zig.error = getErrorMessage(err);
    throw err;
  }
};

const ensureZigInit = (): Promise<void> => {
  if (!livecodes.zig.init || livecodes.zig.failed) {
    // clear the failure state so a retried initialization can succeed
    livecodes.zig.failed = false;
    livecodes.zig.error = undefined;
    livecodes.zig.init = initZigEnvironment().catch((err) => {
      livecodes.zig.init = null;
      throw err;
    });
  }
  return livecodes.zig.init;
};

livecodes.zig.run ??= async (input?: string) => {
  let code = '';
  livecodes.zig.input = input;
  livecodes.zig.output = null;
  livecodes.zig.ready = false;
  const scripts = document.querySelectorAll('script[type="text/zig-wasm"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  const { output, error } = !code.trim()
    ? { output: null, error: null }
    : await runZigCode(code, input);

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }

  livecodes.zig.output = output;
  livecodes.zig.error = error;
  livecodes.zig.exitCode = error ? 1 : 0;
  livecodes.zig.ready = true;
  return { output, error, exitCode: error ? 1 : 0 };
};

let loadedInterval: ReturnType<typeof setInterval> | undefined;
let loadedReject: ((reason?: unknown) => void) | undefined;

const failLoaded = (error: unknown) => {
  if (loadedInterval) {
    clearInterval(loadedInterval);
    loadedInterval = undefined;
  }
  loadedReject?.(error instanceof Error ? error : new Error(String(error)));
};

// start loading the Zig environment (the run function also ensures it on demand)
ensureZigInit();

livecodes.zig.loaded ??= new Promise<void>((resolve, reject) => {
  loadedReject = reject;
  const check = () => {
    if (livecodes.zig.failed) {
      failLoaded(livecodes.zig.error);
    } else if (livecodes.zig.ready) {
      clearInterval(loadedInterval);
      loadedInterval = undefined;
      resolve();
    }
  };
  loadedInterval = setInterval(check, 50);
  check();
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.zig.run(livecodes.zig.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
