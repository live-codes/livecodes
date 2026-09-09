(async function () {
  let ready = false;
  let wasi = null;
  let zigStdLib = null;
  let zigCompilerModule = null;
  /** @type {any[]} */
  const queue = [];
  /** @type {Map<number, { source: string; module: WebAssembly.Module }>} */
  const compiledModules = new Map();
  // compiled user modules are small; bound the map to avoid unbounded growth
  // when many distinct sources are compiled over a long-lived worker
  const MAX_CACHED_MODULES = 16;

  // injected by the main thread when the worker is created
  const { wasiShimUrl, zigWasmBaseUrl } = self;
  const isSharedArrayBufferSupported = typeof SharedArrayBuffer !== 'undefined';

  // hashing function for cache validation
  const createHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash * 31 + char) % 0x7fffffff;
    }
    return hash;
  };

  const getErrorMessage = (err) => (err && err.message) || String(err);

  const createFile = (data) => {
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
    return new wasi.File(dataArray);
  };

  const ensureDependencies = async () => {
    if (!wasi) {
      wasi = await import(wasiShimUrl);
    }
  };

  // Parse the (plain ustar) stdlib archive. js-untar cannot be used inside a
  // worker (it references `window`, and cross-origin importScripts is blocked
  // for data-URL workers), so extract the entries we need directly.
  const parseTar = (buffer) => {
    const decoder = new TextDecoder();
    const entries = [];
    const readString = (offset, length) => {
      let end = offset + length;
      for (let i = offset; i < offset + length; i++) {
        if (buffer[i] === 0) {
          end = i;
          break;
        }
      }
      return decoder.decode(buffer.subarray(offset, end));
    };

    let offset = 0;
    while (offset + 512 <= buffer.length) {
      const name = readString(offset, 100);
      if (!name) break; // end-of-archive marker (zero block)

      const size = parseInt(readString(offset + 124, 12).trim(), 8) || 0;
      const type = String.fromCharCode(buffer[offset + 156]);
      const prefix = readString(offset + 345, 155);
      const dataStart = offset + 512;

      entries.push({
        name: prefix ? prefix + '/' + name : name,
        type,
        data: buffer.subarray(dataStart, dataStart + size),
      });

      offset = dataStart + Math.ceil(size / 512) * 512;
    }
    return entries;
  };

  const processZigArchive = async (response) => {
    const arrayBuffer = await response.arrayBuffer();
    const entries = parseTar(new Uint8Array(arrayBuffer));
    const fsMap = new Map();

    for (const entry of entries) {
      if (!entry.name.startsWith('lib/') || entry.type !== '0') continue;

      const path = entry.name.substring(4).split('/');
      let current = fsMap;

      for (let i = 0; i < path.length - 1; i++) {
        if (!current.has(path[i])) current.set(path[i], new Map());
        current = current.get(path[i]);
      }

      // copy the bytes so each file has its own buffer
      const fileData = createFile(entry.data.slice());

      current.set(path[path.length - 1], fileData);
    }

    const buildDirectory = (map) =>
      new wasi.Directory(
        Array.from(map.entries()).map(([key, value]) => [
          key,
          value instanceof Map ? buildDirectory(value) : value,
        ]),
      );

    return buildDirectory(fsMap);
  };

  const fetchArrayBuffer = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch ' + url + ': ' + response.statusText);
    return response.arrayBuffer();
  };

  const loadToolchain = async () => {
    const archiveData = await fetchArrayBuffer(zigWasmBaseUrl + 'zig.tar.gz');

    const decompressed = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(archiveData));
          controller.close();
        },
      }).pipeThrough(new DecompressionStream('gzip')),
    );

    zigStdLib = await processZigArchive(decompressed);

    // pre-compile the compiler once; it is instantiated for every compilation
    const compilerData = await fetchArrayBuffer(zigWasmBaseUrl + 'zig.wasm');
    zigCompilerModule = await WebAssembly.compile(compilerData);
  };

  // compile the user code to a WebAssembly module (cached for identical source,
  // e.g. interactive re-runs that only provide new stdin)
  const compileZig = async (code) => {
    const hash = createHash(code);
    const cached = compiledModules.get(hash);
    if (cached && cached.source === code) return cached.module;

    const errors = [];
    const stderr = wasi.ConsoleStdout.lineBuffered((line) => errors.push(line));

    const codeFile = createFile(new TextEncoder().encode(code));

    const compileWasi = new wasi.WASI(
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
        new wasi.OpenFile(createFile(new TextEncoder().encode(''))),
        createFile(new TextEncoder().encode('')),
        stderr,
        new wasi.PreopenDirectory('.', new Map([['main.zig', codeFile]])),
        new wasi.PreopenDirectory('/lib', zigStdLib.contents),
        new wasi.PreopenDirectory('/cache', new Map()),
      ],
      { debug: false },
    );

    const instance = await WebAssembly.instantiate(zigCompilerModule, {
      wasi_snapshot_preview1: compileWasi.wasiImport,
    });

    const exitCode = compileWasi.start(instance);
    if (exitCode !== 0) throw new Error('Compilation failed: ' + errors.join('\n'));

    const mainWasm = compileWasi.fds[3].dir.contents.get('main.wasm');
    if (!mainWasm || !mainWasm.data) throw new Error('Compilation output not found');

    const wasmData =
      mainWasm.data instanceof Uint8Array ? mainWasm.data : new Uint8Array(mainWasm.data);
    const module = await WebAssembly.compile(wasmData);

    if (compiledModules.size >= MAX_CACHED_MODULES) {
      compiledModules.clear();
    }
    compiledModules.set(hash, { source: code, module });
    return module;
  };

  // compile and run the user code, returning the same result shape the
  // main-thread implementation used to produce
  const runZig = async (code, stdin) => {
    const output = [];
    const errors = [];

    try {
      const module = await compileZig(code);

      const stdout = wasi.ConsoleStdout.lineBuffered((line) => output.push(line));
      const stderr = wasi.ConsoleStdout.lineBuffered((line) => errors.push(line));

      const inputFile = createFile(new TextEncoder().encode(stdin || ''));

      const executeWasi = new wasi.WASI(
        ['main.wasm'],
        [],
        [new wasi.OpenFile(inputFile), stdout, stderr, new wasi.PreopenDirectory('.', new Map())],
        { debug: false },
      );

      const instance = await WebAssembly.instantiate(module, {
        wasi_snapshot_preview1: executeWasi.wasiImport,
      });

      executeWasi.start(instance);
    } catch (err) {
      compiledModules.clear();
      return { output: null, error: 'Error: ' + getErrorMessage(err) };
    }

    return {
      output: output.join('\n') || null,
      error: errors.join('\n') || null,
    };
  };

  self.onmessage = function (e) {
    const data = e.data || {};
    if (data.type !== 'compile') return;
    if (!ready || !zigStdLib || !zigCompilerModule) queue.push(data);
    else compile(data);
  };

  /** @param {{ source: string; stdin?: string; id: number; }} msg */
  async function compile(msg) {
    try {
      const result = await runZig(msg.source, msg.stdin);
      self.postMessage({ type: 'result', id: msg.id, json: JSON.stringify(result) });
    } catch (err) {
      // unexpected failure (runZig handles expected compile/run errors)
      self.postMessage({
        type: 'error',
        id: msg.id,
        // @ts-ignore
        message: String((err && err.stack) || err),
      });
    }
  }

  async function boot() {
    try {
      await ensureDependencies();
      await loadToolchain();
      ready = true;
      queue.splice(0).forEach(compile);
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({
        type: 'fatal',
        // @ts-ignore
        message: String((err && err.stack) || err),
      });
    }
  }

  boot();
})();
