import type { HaskellRequest, HaskellResponse, HaskellResult } from './models';

// GHC and its libraries are downloaded on first use (~49 MB compressed).
const BOOT_TIMEOUT_MS = 300_000;
const RUN_TIMEOUT_MS = 120_000;

/** Creates a serialized GHC worker runner that recovers after boot or execution failures. */
export const createHaskellRunner = (createWorker: () => Worker, bsdtarUrl: string) => {
  let worker: Worker | undefined;
  let ready: Promise<void> | undefined;
  let pending:
    | {
        resolve: (response: HaskellResponse) => void;
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

  const request = (message: HaskellRequest, timeout: number) =>
    new Promise<HaskellResponse>((resolve, reject) => {
      pending = {
        resolve,
        reject,
        timer: setTimeout(() => fail(new Error('Haskell execution timed out.')), timeout),
      };
      try {
        worker!.postMessage(message);
      } catch (err) {
        fail(err as Error);
      }
    });

  const init = (): Promise<void> => {
    if (ready) return ready;
    try {
      worker = createWorker();
      worker.onerror = (event) => fail(new Error(event.message));
      worker.onmessageerror = () => fail(new Error('Invalid Haskell worker response.'));
      worker.onmessage = ({ data }: MessageEvent<HaskellResponse>) => {
        if (data.type === 'error') {
          fail(new Error(data.message));
          return;
        }
        if (!pending) return;
        clearTimeout(pending.timer);
        pending.resolve(data);
        pending = undefined;
      };
      ready = request({ type: 'init', bsdtarUrl }, BOOT_TIMEOUT_MS)
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

  const run = (code: string): Promise<HaskellResult> => {
    const result = queue.then(async () => {
      await init();
      const response = await request({ type: 'run', code }, RUN_TIMEOUT_MS);
      if (response.type !== 'result') throw new Error('Invalid Haskell worker response.');
      return response.result;
    });
    // GHC's interactive session must not be entered concurrently.
    queue = result.catch(() => undefined);
    return result;
  };

  return { init, run };
};
