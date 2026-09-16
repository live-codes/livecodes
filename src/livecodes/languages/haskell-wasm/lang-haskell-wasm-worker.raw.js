// @ts-nocheck
// Runs GHC in the browser (https://github.com/haskell-wasm/ghc-in-browser) inside a Web Worker.
// The asset URLs are injected by the main thread when the worker is created.

let dyld;
let run;
let output = '';
let error = '';

const reply = (message) => self.postMessage(message);

// GHC runs against an in-memory WASI filesystem; this is not a host path.
const ghcRuntimeDirectory = '/tmp';

const getErrorMessage = (err) => (err && err.message) || String(err);

const fetchArrayBuffer = async (url, assetName) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${assetName}: ${response.status}`);
  }
  return response.arrayBuffer();
};

const init = async () => {
  const { bsdtarUrl, ghcBrowserBaseUrl, ghcRootfsUrl, haskellWasiShimUrl } = self;
  const [{ ConsoleStdout, File, OpenFile, PreopenDirectory, WASI }, { DyLDBrowserHost, main }] =
    await Promise.all([import(haskellWasiShimUrl), import(ghcBrowserBaseUrl + 'dyld.mjs')]);
  const rootfs = new PreopenDirectory('/', []);
  const wasi = new WASI(
    ['bsdtar.wasm', '-x'],
    [],
    [
      new OpenFile(new File(new Uint8Array(), { readonly: true })),
      ConsoleStdout.lineBuffered(() => undefined),
      ConsoleStdout.lineBuffered((message) => {
        error += message + '\n';
      }),
      rootfs,
    ],
    { debug: false },
  );
  // bsdtar extracts the GHC rootfs archive into the in-memory filesystem.
  const [wasm, archive] = await Promise.all([
    fetchArrayBuffer(bsdtarUrl, 'bsdtar.wasm'),
    fetchArrayBuffer(ghcRootfsUrl, 'GHC rootfs'),
  ]);
  const { instance } = await WebAssembly.instantiate(wasm, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });
  wasi.fds[0] = new OpenFile(new File(new Uint8Array(archive), { readonly: true }));
  if (wasi.start(instance) !== 0) throw new Error(error);

  dyld = await main({
    rpc: new DyLDBrowserHost({
      rootfs,
      stdout: (message) => {
        output += message + '\n';
      },
      stderr: (message) => {
        error += message + '\n';
      },
    }),
    searchDirs: [
      `${ghcRuntimeDirectory}/clib`,
      `${ghcRuntimeDirectory}/hslib/lib/wasm32-wasi-ghc-9.14.0.20251031-inplace`,
    ],
    mainSoPath: `${ghcRuntimeDirectory}/libplayground001.so`,
    args: ['libplayground001.so', '+RTS', '-c', '-RTS'],
    isIserv: false,
  });
  run = await dyld.exportFuncs.myMain(`${ghcRuntimeDirectory}/hslib/lib`);
};

self.onmessage = async ({ data }) => {
  if (data.type === 'init') {
    try {
      await init();
      reply({ type: 'ready' });
    } catch (err) {
      reply({
        type: 'error',
        message: [error.trim(), getErrorMessage(err)].filter(Boolean).join('\n'),
      });
    }
    return;
  }

  try {
    if (!run) throw new Error('Haskell runtime is not initialized.');
    output = '';
    error = '';
    // `setStdin` is provided by the patched runtime to back fd 0 with the
    // current input; without it the program reads an empty stdin (EOF).
    if (typeof dyld.setStdin === 'function') {
      dyld.setStdin(typeof data.stdin === 'string' ? data.stdin : '');
    }
    await run('-v0', data.code);
    reply({ type: 'result', result: { output, error, exitCode: 0 } });
  } catch (err) {
    reply({
      type: 'result',
      result: {
        output,
        error: [error.trim(), getErrorMessage(err)].filter(Boolean).join('\n'),
        exitCode: 1,
      },
    });
  }
};
