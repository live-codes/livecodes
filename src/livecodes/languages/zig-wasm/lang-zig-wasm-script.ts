/* eslint-disable no-console */
import { zigWasmBaseUrl } from '../../vendors';

const JS_UNTAR_URL = 'https://unpkg.com/js-untar@2.0.0/build/dist/untar.js';
const WASI_SHIM_URL = 'https://unpkg.com/@bjorn3/browser_wasi_shim@0.3.0/dist/index.js';

livecodes.zig ??= {};

// check if SharedArrayBuffer supported by the browser else it will use ArrayBuffer
const isSharedArrayBufferSupported = typeof SharedArrayBuffer !== 'undefined' && window.crossOriginIsolated;

// hashing function for cache validation
const createHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash * 31) + char) % 0x7fffffff;
  }
  return hash;
};

class ZigCompilationCache {
  // 32 MB
  private static readonly CACHE_SIZE = 32 * 1024 * 1024;
  // 256 bytes
  private static readonly META_SIZE = 256;

  private buffer: SharedArrayBuffer | ArrayBuffer;
  private metaView: Int32Array;
  private dataView: Uint8Array;
  private compiledModules: Map<string, WebAssembly.Module> = new Map();
  private useSharedMemory: boolean;

  public constructor() {
    this.useSharedMemory = isSharedArrayBufferSupported;

    if (this.useSharedMemory) {
      this.buffer = new SharedArrayBuffer(ZigCompilationCache.CACHE_SIZE);
    } else {
      this.buffer = new ArrayBuffer(ZigCompilationCache.CACHE_SIZE);
    }

    this.metaView = new Int32Array(this.buffer, 0, ZigCompilationCache.META_SIZE / 4);
    this.dataView = new Uint8Array(this.buffer, ZigCompilationCache.META_SIZE);


    if (this.metaView[0] === 0) {
      this.metaView[1] = 0;
    }
  }

  public getCachedWasm(code: string): Uint8Array | null {
    const hash = createHash(code);
    const entry = this.findEntry(hash);

    if (!entry) return null;

    return this.dataView.slice(entry.offset, entry.offset + entry.size);
  }

  public getCachedModule(code: string): WebAssembly.Module | null {
    const hash = createHash(code);
    return this.compiledModules.get(hash.toString()) || null;
  }

  public async cacheWasm(code: string, wasmData: Uint8Array): Promise<void> {
    const hash = createHash(code);
    const size = wasmData.length;
    const currentOffset = this.metaView[1];

    if (currentOffset + size > this.dataView.length) {
      console.warn('cache is full, clearing...');
      this.clear();
      return this.cacheWasm(code, wasmData);
    }

    this.dataView.set(wasmData, currentOffset);

    const entryCount = this.metaView[0];
    const baseIdx = 2 + (entryCount * 3);

    this.metaView[baseIdx] = hash;
    this.metaView[baseIdx + 1] = currentOffset;
    this.metaView[baseIdx + 2] = size;
    this.metaView[0] = entryCount + 1;
    this.metaView[1] = currentOffset + size;

    try {
      const module = await WebAssembly.compile(wasmData);
      this.compiledModules.set(hash.toString(), module);
    } catch (error) {
      console.warn('failed to pre-compile WASM module:', error);
    }
  }

  public clear(): void {
    this.metaView[0] = 0;
    this.metaView[1] = 0;
    this.compiledModules.clear();
  }

  public setCompiledModule(code: string, module: WebAssembly.Module): void {
    const hash = createHash(code);
    this.compiledModules.set(hash.toString(), module);
  }

  private findEntry(codeHash: number): { offset: number; size: number } | null {
    const entryCount = this.metaView[0];
    for (let i = 0; i < entryCount; i++) {
      const baseIdx = 2 + (i * 3);
      if (this.metaView[baseIdx] === codeHash) {
        return {
          offset: this.metaView[baseIdx + 1],
          size: this.metaView[baseIdx + 2]
        };
      }
    }
    return null;
  }
}

const compilationCache = new ZigCompilationCache();

const loadScript = (url: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });

const ensureDependencies = async (): Promise<void> => {
  if (!(window as any).untar) {
    await loadScript(JS_UNTAR_URL);
    if (!(window as any).untar) throw new Error('js-untar failed to load');
  }

  if (!(window as any).WASI) {
    const wasiModule = await import(WASI_SHIM_URL);
    ['WASI', 'File', 'Directory', 'OpenFile', 'PreopenDirectory', 'ConsoleStdout'].forEach(
      (key) => wasiModule[key] && ((window as any)[key] = wasiModule[key])
    );
  }
};

const createFile = (data: ArrayBuffer | Uint8Array): any => {
  const dataArray = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

  if (isSharedArrayBufferSupported) {
    const sharedBuffer = new SharedArrayBuffer(dataArray.length);
    const view = new Uint8Array(sharedBuffer);
    view.set(dataArray);

    return {
      get data() { return view; },
      get buffer() { return sharedBuffer; }
    };
  } else {
    const { File } = window as any;
    return new File(dataArray);
  }
};

const processZigArchive = async (response: Response): Promise<any> => {
  await ensureDependencies();
  const { File, Directory } = window as any;

  const arrayBuffer = await response.arrayBuffer();
  const entries = await (window as any).untar(arrayBuffer);
  const fs = new Map();

  for (const entry of entries) {
    if (!entry.name.startsWith('lib/') || entry.type !== '0' || !entry.buffer) continue;

    const path = entry.name.substring(4).split('/');
    let current = fs;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current.has(path[i])) current.set(path[i], new Map());
      current = current.get(path[i]);
    }

    const fileData = isSharedArrayBufferSupported
      ? createFile(entry.buffer)
      : new File(entry.buffer);

    current.set(path[path.length - 1], fileData);
  }

  const buildDirectory = (map: Map<string, any>): any =>
    new Directory(
      Array.from(map.entries()).map(([key, value]) => [
        key,
        value instanceof Map ? buildDirectory(value) : value,
      ])
    );

  return buildDirectory(fs);
};

const lazyCompileZig = async (code: string): Promise<{ wasmData: Uint8Array; module: WebAssembly.Module }> => {
  const cachedModule = compilationCache.getCachedModule(code);
  if (cachedModule) {
    const cachedWasm = compilationCache.getCachedWasm(code);
    if (cachedWasm) {
      return { wasmData: cachedWasm, module: cachedModule };
    }
  }

  const cachedWasm = compilationCache.getCachedWasm(code);
  if (cachedWasm) {
    const module = await WebAssembly.compile(cachedWasm);
    compilationCache.setCompiledModule(code, module);
    return { wasmData: cachedWasm, module };
  }

  const { WASI, OpenFile, PreopenDirectory, ConsoleStdout } = window as any;
  const errors: string[] = [];
  const stderr = ConsoleStdout.lineBuffered((line: string) => errors.push(line));

  let codeFile: any;
  if (isSharedArrayBufferSupported) {
    const codeBuffer = new SharedArrayBuffer(new TextEncoder().encode(code).length);
    const codeView = new Uint8Array(codeBuffer);
    codeView.set(new TextEncoder().encode(code));
    codeFile = createFile(codeView);
  } else {
    codeFile = createFile(new TextEncoder().encode(code));
  }

  const compileWasi = new WASI(
    ['zig.wasm', 'build-exe', 'main.zig', '-target', 'wasm32-wasi', '-fno-entry', '-O', 'ReleaseSmall'],
    [],
    [
      new OpenFile(createFile(new TextEncoder().encode(''))),
      createFile(new TextEncoder().encode('')),
      stderr,
      new PreopenDirectory('.', new Map([['main.zig', codeFile]])),
      new PreopenDirectory('/lib', livecodes.zig!.zigStdLib.contents),
      new PreopenDirectory('/cache', new Map()),
    ],
    { debug: false }
  );

  const wasmResponse = await fetch(livecodes.zig!.zigWasmUrl!);
  const wasmArrayBuffer = await wasmResponse.arrayBuffer();

  let compilerModule: WebAssembly.Module;
  if (isSharedArrayBufferSupported) {
    const sharedWasmBuffer = new SharedArrayBuffer(wasmArrayBuffer.byteLength);
    const sharedWasmView = new Uint8Array(sharedWasmBuffer);
    sharedWasmView.set(new Uint8Array(wasmArrayBuffer));
    compilerModule = await WebAssembly.compile(sharedWasmView);
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

  const wasmData = mainWasm.data instanceof Uint8Array ? mainWasm.data : new Uint8Array(mainWasm.data);

  await compilationCache.cacheWasm(code, wasmData);

  const module = await WebAssembly.compile(wasmData);
  return { wasmData, module };
};

const runZigCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  await livecodes.zig.init;

  if (!livecodes.zig.zigStdLib) {
    return { output: null, error: 'Zig environment not ready' };
  }

  const { WASI, OpenFile, PreopenDirectory, ConsoleStdout } = window as any;
  const output: string[] = [];
  const errors: string[] = [];

  const stdout = ConsoleStdout.lineBuffered((line: string) => output.push(line));
  const stderr = ConsoleStdout.lineBuffered((line: string) => errors.push(line));

  try {
    const { module } = await lazyCompileZig(code);

    let inputFile: any;
    if (isSharedArrayBufferSupported) {
      const inputBuffer = new SharedArrayBuffer(new TextEncoder().encode(input).length);
      const inputView = new Uint8Array(inputBuffer);
      inputView.set(new TextEncoder().encode(input));
      inputFile = createFile(inputView);
    } else {
      inputFile = createFile(new TextEncoder().encode(input));
    }

    const executeWasi = new WASI(
      ['main.wasm'],
      [],
      [
        new OpenFile(inputFile),
        stdout,
        stderr,
        new PreopenDirectory('.', new Map()),
      ],
      { debug: false }
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
    const error = 'Error: ' + (err as Error).message;
    return { output: null, error };
  }
};

livecodes.zig.init ??= (async () => {
  if (livecodes.zig.ready) return;

  console.log('Initializing Zig environment...');
  try {
    await ensureDependencies();

    const response = await fetch(`${zigWasmBaseUrl}zig.tar.gz`);
    if (!response.ok) throw new Error(`Failed to fetch zig.tar.gz: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();

    let decompressed: Response;
    if (isSharedArrayBufferSupported) {
      const sharedBuffer = new SharedArrayBuffer(arrayBuffer.byteLength);
      const sharedView = new Uint8Array(sharedBuffer);
      sharedView.set(new Uint8Array(arrayBuffer));

      decompressed = new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(sharedView);
            controller.close();
          },
        }).pipeThrough(new DecompressionStream('gzip'))
      );
    } else {
      decompressed = new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(arrayBuffer));
            controller.close();
          },
        }).pipeThrough(new DecompressionStream('gzip'))
      );
    }

    livecodes.zig!.zigStdLib = await processZigArchive(decompressed);
    livecodes.zig!.zigWasmUrl = `${zigWasmBaseUrl}zig.wasm`;

    console.log('Zig environment initialized successfully');
  } catch (err) {
    console.error('failed to initialize Zig environment:', err);
    livecodes.zig!.ready = false;
    livecodes.zig!.init = null;
    throw err;
  }
})();

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

livecodes.zig.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (livecodes.zig.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.zig.run(livecodes.zig.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});