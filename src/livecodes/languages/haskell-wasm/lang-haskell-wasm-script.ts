import { getErrorMessage } from '../../utils/utils';
import { ghcBrowserBaseUrl, haskellWasiShimUrl } from '../../vendors';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerContent from './lang-haskell-wasm-worker.raw.js?raw';

interface HaskellWasmResult {
  output: string;
  error: string;
  exitCode: number;
}

type HaskellWasmResponse =
  | { type: 'ready' }
  | { type: 'result'; result: HaskellWasmResult }
  | { type: 'error'; message: string };

declare const window: Window & {
  livecodes: {
    haskellWasm: {
      loaded?: Promise<void>;
      input?: string;
      output?: string;
      error?: string;
      exitCode?: number;
      run?: (input?: string) => Promise<HaskellWasmResult>;
      runner?: ReturnType<typeof createRunner>;
    };
  };
};

// GHC and its libraries are downloaded on first use (~49 MB compressed).
const BOOT_TIMEOUT_MS = 300_000;
const RUN_TIMEOUT_MS = 120_000;

const createHaskellWorker = () => {
  const config = [
    `self.bsdtarUrl = ${JSON.stringify(ghcBrowserBaseUrl + 'bsdtar.wasm')};`,
    `self.ghcBrowserBaseUrl = ${JSON.stringify(ghcBrowserBaseUrl)};`,
    `self.ghcRootfsUrl = ${JSON.stringify(ghcBrowserBaseUrl + 'rootfs.tar.zst')};`,
    `self.haskellWasiShimUrl = ${JSON.stringify(haskellWasiShimUrl)};`,
  ].join('\n');
  const workerUrl = `data:text/javascript;charset=UTF-8;base64,${btoa(
    `${config}\n\n${workerContent}`,
  )}`;
  return new Worker(workerUrl);
};

/** Creates a serialized GHC worker runner that recovers after boot or execution failures. */
const createRunner = (createWorker: () => Worker) => {
  let worker: Worker | undefined;
  let ready: Promise<void> | undefined;
  let pending:
    | {
        resolve: (response: HaskellWasmResponse) => void;
        reject: (error: Error) => void;
        timer: ReturnType<typeof setTimeout>;
      }
    | undefined;
  let queue: Promise<unknown> = Promise.resolve();

  const fail = (error: Error) => {
    worker?.terminate();
    worker = undefined;
    ready = undefined;
    if (pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
      pending = undefined;
    }
  };

  const request = (
    message: { type: 'init' } | { type: 'run'; code: string; stdin: string },
    timeout: number,
    timeoutMessage: string,
  ) =>
    new Promise<HaskellWasmResponse>((resolve, reject) => {
      pending = {
        resolve,
        reject,
        timer: setTimeout(() => fail(new Error(timeoutMessage)), timeout),
      };
      try {
        worker!.postMessage(message);
      } catch (err) {
        fail(new Error(getErrorMessage(err)));
      }
    });

  const init = (): Promise<void> => {
    if (ready) return ready;
    try {
      worker = createWorker();
      worker.onerror = (event) => fail(new Error(event.message));
      worker.onmessageerror = () => fail(new Error('Invalid Haskell worker response.'));
      worker.onmessage = ({ data }: MessageEvent<HaskellWasmResponse>) => {
        if (data.type === 'error') {
          fail(new Error(data.message));
          return;
        }
        if (!pending) return;
        clearTimeout(pending.timer);
        pending.resolve(data);
        pending = undefined;
      };
      ready = request({ type: 'init' }, BOOT_TIMEOUT_MS, 'Haskell initialization timed out.')
        .then(() => undefined)
        .catch((err) => {
          ready = undefined;
          throw err;
        });
      return ready;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const run = (code: string, stdin: string): Promise<HaskellWasmResult> => {
    const result = queue.then(async () => {
      await init();
      const response = await request(
        { type: 'run', code, stdin },
        RUN_TIMEOUT_MS,
        'Haskell execution timed out.',
      );
      if (response.type !== 'result') throw new Error('Invalid Haskell worker response.');
      return response.result;
    });
    // GHC's interactive session must not be entered concurrently.
    queue = result.catch(() => undefined);
    return result;
  };

  return { init, run };
};

const parentOrigin =
  window.parent === window
    ? window.location.origin
    : window.location.ancestorOrigins?.[0] ||
      (() => {
        if (!document.referrer) return '*';
        try {
          return new URL(document.referrer).origin;
        } catch {
          // Ignore malformed referrers and use the wildcard fallback below.
          return '*';
        }
      })();

window.livecodes.haskellWasm ??= {};
const haskellWasm = window.livecodes.haskellWasm;
haskellWasm.runner ??= createRunner(createHaskellWorker);
haskellWasm.input ??= '';

let activeRuns = 0;

const postLoading = (payload: boolean) => {
  activeRuns += payload ? 1 : -1;
  parent.postMessage({ type: 'loading', payload: activeRuns > 0 }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.
};

haskellWasm.run = async (input?: string) => {
  const code = Array.from(document.querySelectorAll('script[type="text/haskell-wasm"]'))
    .map((script) => script.textContent)
    .join('\n');
  haskellWasm.input = input ?? haskellWasm.input ?? '';
  if (!code.trim()) {
    haskellWasm.output = '';
    haskellWasm.error = '';
    haskellWasm.exitCode = 0;
    return { output: '', error: '', exitCode: 0 };
  }
  postLoading(true);
  try {
    const result = await haskellWasm.runner!.run(code, haskellWasm.input);
    haskellWasm.output = result.output;
    haskellWasm.error = result.error;
    haskellWasm.exitCode = result.exitCode;
    if (result.output) {
      // eslint-disable-next-line no-console
      console.log(result.output);
    }
    if (result.error) {
      // eslint-disable-next-line no-console
      console.error(result.error);
    }
    return result;
  } catch (err) {
    haskellWasm.output = '';
    haskellWasm.error = getErrorMessage(err);
    haskellWasm.exitCode = 1;
    // eslint-disable-next-line no-console
    console.error(haskellWasm.error);
    return { output: '', error: haskellWasm.error, exitCode: 1 };
  } finally {
    postLoading(false);
  }
};

haskellWasm.loaded = new Promise<void>((resolve, reject) => {
  window.addEventListener(
    'load',
    async () => {
      const result = await haskellWasm.run!(haskellWasm.input);
      if (result.exitCode !== 0) reject(new Error(result.error));
      else resolve();
    },
    { once: true },
  );
});
// Diagnostics are already displayed in the console when no consumer awaits loaded.
haskellWasm.loaded.catch(() => undefined);
