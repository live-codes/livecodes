import { createWorkerFromContent } from '../utils/utils';

/** The result a language worker reports for a single compile + run. */
export interface WorkerRunResult {
  output: string;
  errors: string[];
  exitCode: number | null;
}

export interface Runner<TResult = WorkerRunResult> {
  ensureReady: () => Promise<void>;
  run: (code: string, input: string, options?: unknown) => Promise<TResult>;
  destroy: () => void;
}

export interface WorkerRunnerOptions {
  /**
   * The classic worker that loads the runtime. It must post `{ type: 'ready' | 'error' }` when the
   * runtime has loaded (or failed to), and a run result keyed by the request id otherwise.
   */
  getWorkerSrc: () => string;
  /** Shown in crash, timeout and unavailability messages, e.g. `Fortran`. */
  label: string;
  /** Kill the worker when a single run does not settle within this many milliseconds. */
  timeoutMs?: number;
}

interface Pending<TResult> {
  resolve: (result: TResult) => void;
  reject: (error: Error) => void;
  timer?: ReturnType<typeof setTimeout>;
}

/**
 * A serialized worker runner shared by the WASM languages. It keeps one worker for the compiler's
 * lifetime, tears it down on crashes/timeouts and respawns it on the next run.
 */
export const createWorkerRunner = <TResult = WorkerRunResult>({
  getWorkerSrc,
  label,
  timeoutMs,
}: WorkerRunnerOptions): Runner<TResult> => {
  let worker: Worker | null = null;
  let ready: Promise<void> | null = null;
  let settleReady: ((error?: Error) => void) | null = null;
  let pending: Record<number, Pending<TResult>> = {};
  let nextId = 1;

  const failAll = (error: Error) => {
    for (const id of Object.keys(pending)) {
      const request = pending[Number(id)];
      if (request.timer) clearTimeout(request.timer);
      request.reject(error);
    }
    pending = {};
  };

  const teardown = (error?: Error) => {
    worker?.terminate();
    worker = null;
    ready = null;
    settleReady?.(error);
    settleReady = null;
    if (error) failAll(error);
  };

  const onMessage = (event: MessageEvent) => {
    const message = event.data ?? {};
    if (message.type === 'ready') {
      settleReady?.();
      settleReady = null;
      return;
    }
    if (message.type === 'error') {
      // The runtime failed to load (network, or the browser is unsupported).
      teardown(new Error(message.message));
      return;
    }
    const request = pending[message.id];
    if (!request) return;
    delete pending[message.id];
    if (request.timer) clearTimeout(request.timer);
    if (message.error != null) {
      request.reject(new Error(message.error));
    } else {
      request.resolve(message.result);
    }
  };

  const spawn = () => {
    ready = new Promise<void>((resolve, reject) => {
      settleReady = (error?: Error) => (error ? reject(error) : resolve());
    });
    worker = createWorkerFromContent(getWorkerSrc());
    worker.onmessage = onMessage;
    worker.onerror = (event) =>
      teardown(new Error(`The ${label} worker crashed: ${event.message}`));
  };

  /** Spawn the worker if needed and resolve once the runtime has loaded. */
  const ensureReady = async () => {
    if (!ready) spawn();
    await ready;
  };

  const run = (code: string, input: string, options?: unknown) =>
    ensureReady().then(
      () =>
        new Promise<TResult>((resolve, reject) => {
          // `ensureReady` can resolve after the worker has been torn down (crash or timeout), so
          // the worker may be gone by the time the request is registered.
          if (!worker) {
            reject(new Error(`The ${label} worker is not available`));
            return;
          }
          const id = nextId++;
          const request: Pending<TResult> = { resolve, reject };
          if (timeoutMs != null) {
            request.timer = setTimeout(() => {
              // The worker hung, so kill it and reject; the next run respawns a fresh worker.
              teardown(new Error(`The ${label} compiler timed out`));
            }, timeoutMs);
          }
          pending[id] = request;
          worker.postMessage({ id, code, input, options });
        }),
    );

  return { ensureReady, run, destroy: () => teardown() };
};
