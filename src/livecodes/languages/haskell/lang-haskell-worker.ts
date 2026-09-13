import { getErrorMessage, handleFetchError } from '../../utils/utils';
import {
  bsdtarWasmSha256,
  bsdtarWasmUrl,
  ghcBrowserBaseUrl,
  ghcRootfsUrl,
  haskellWasiShimUrl,
} from '../../vendors';
import type { HaskellRequest, HaskellResponse } from './models';

let run: ((args: string, source: string) => Promise<void>) | undefined;
let output = '';
let error = '';

const reply = (message: HaskellResponse) => self.postMessage(message);
// GHC runs against an in-memory WASI filesystem; these are not host /tmp paths.
const ghcRuntimeDirectory = '/tmp'; // NOSONAR

const verifyBsdtarWasm = async (wasm: ArrayBuffer) => {
  const digest = await crypto.subtle.digest('SHA-256', wasm);
  const sha256 = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  if (sha256 !== bsdtarWasmSha256) {
    throw new Error('bsdtar.wasm integrity check failed.');
  }
  return wasm;
};

const init = async () => {
  const [{ ConsoleStdout, File, OpenFile, PreopenDirectory, WASI }, { DyLDBrowserHost, main }] =
    await Promise.all([import(haskellWasiShimUrl), import(ghcBrowserBaseUrl + 'dyld.mjs')]);
  const rootfs = new PreopenDirectory('/', []);
  const wasi = new WASI(
    ['bsdtar.wasm', '-x'],
    [],
    [
      new OpenFile(new File(new Uint8Array(), { readonly: true })),
      ConsoleStdout.lineBuffered(() => undefined),
      ConsoleStdout.lineBuffered((message: string) => {
        error += message + '\n';
      }),
      rootfs,
    ],
    { debug: false },
  );
  const [wasm, archive] = await Promise.all([
    fetch(bsdtarWasmUrl)
      .then(handleFetchError)
      .then((res) => res.arrayBuffer())
      .then(verifyBsdtarWasm),
    fetch(ghcRootfsUrl)
      .then(handleFetchError)
      .then((res) => res.arrayBuffer()),
  ]);
  const { instance } = await WebAssembly.instantiate(wasm, {
    wasi_snapshot_preview1: wasi.wasiImport,
  });
  wasi.fds[0] = new OpenFile(new File(new Uint8Array(archive), { readonly: true }));
  if (wasi.start(instance) !== 0) throw new Error(error);

  const dyld = await main({
    rpc: new DyLDBrowserHost({
      rootfs,
      stdout: (message: string) => {
        output += message + '\n';
      },
      stderr: (message: string) => {
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

self.onmessage = async ({ data }: MessageEvent<HaskellRequest>) => {
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
