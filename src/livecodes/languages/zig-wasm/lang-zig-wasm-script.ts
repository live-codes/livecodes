import { getErrorMessage } from '../../utils/utils';
import { wasiShimUrl, zigWasmBaseUrl } from '../../vendors';
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
// (tens of MB), so allow generous time before giving up.
const BOOT_TIMEOUT_MS = 180000;
// A single compile + run is normally quick; a long timeout guards against hangs
// (e.g. an infinite loop in the user program) by killing and respawning the worker.
const RUN_TIMEOUT_MS = 120000;

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
      // Boot failed — tear down so the next init spawns a fresh worker.
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

// ---- LiveCodes integration ----------------------------------------------
window.livecodes.zig ??= {};

const livecodesApi = window.livecodes.zig;
livecodesApi.ready = false;
livecodesApi.runner ??= createWorkerRunner();

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
