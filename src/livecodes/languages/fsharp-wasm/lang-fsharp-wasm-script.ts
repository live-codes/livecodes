import { fsharpWasmBaseUrl } from '../../vendors';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerContent from './lang-fsharp-wasm-worker.raw.js?raw';

declare const window: Window & {
  livecodes: {
    fsharp: {
      ready?: boolean;
      init?: Promise<void> | null;
      run?: (source: string | undefined) => Promise<any>;
      runner?: ReturnType<typeof createWorkerRunner>;
      loaded?: Promise<void>;
      input?: string;
      output?: string | null;
      error?: string | null;
      exitCode?: number | null;
    };
  };
};

// Safe number of compiles per worker before respawning (the 4th one hangs).
const MAX_RUNS = 3;
// Per-run timeout: if a compile never answers (hang), kill + respawn the worker.
const RUN_TIMEOUT_MS = 30000;
// Worker boot timeout: if it never becomes ready, give up.
const BOOT_TIMEOUT_MS = 60000;

// ---- worker runner -------------------------------------------------------
function createWorkerRunner() {
  let worker: Worker | null = null;
  let readyPromise: Promise<string> | null = null;
  let resolveReady: ((v: string) => void) | null = null;
  let rejectReady: ((error?: Error) => void) | null = null;
  let pending: {
    [id: number]: {
      resolve: (result: any) => void;
      reject: (error: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    };
  } = {};
  let nextId = 1;
  let runsOnWorker = 0;

  function onMessage(e: MessageEvent) {
    const msg = e.data || {};
    if (msg.type === 'ready') {
      if (resolveReady) {
        resolveReady('');
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
        rejectReady(new Error('F# worker failed to start: ' + msg.message));
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
    rejectAll(new Error('F# worker crashed: ' + (err && err.message ? err.message : 'unknown')));
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
    runsOnWorker = 0;
    readyPromise = new Promise(function (resolve, reject) {
      resolveReady = resolve;
      rejectReady = reject;
    });
    try {
      const toDataUrl = (content: string, type = 'text/javascript') =>
        `data:${type};charset=UTF-8;base64,` + btoa(content);

      const workerUrl = toDataUrl(`self.baseUrl = "${fsharpWasmBaseUrl}";\n\n${workerContent}`);
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

  function init() {
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
        reject(new Error('F# worker failed to start (timeout)'));
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

  function run(source: string, input?: string): Promise<any> {
    try {
      ensureWorker();
    } catch (err) {
      return Promise.reject(err);
    }
    return readyPromise!.then(function () {
      if (runsOnWorker >= MAX_RUNS) {
        // Respawn a fresh runtime before the next compile (avoid the hang).
        worker?.terminate();
        worker = null;
        spawn();
        return readyPromise?.then(() => runNow(source, input));
      }
      return runNow(source, input);
    });
  }

  function runNow(source: string, input?: string) {
    const id = nextId++;
    runsOnWorker++;
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
        // The worker hung (FCS deadlock) — kill it and let the next run respawn.
        delete pending[id];
        if (worker) {
          worker.terminate();
          worker = null;
        }
        reject(new Error('F# compile timed out; restarted the compiler.'));
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
window.livecodes.fsharp ??= {};

const livecodesApi = window.livecodes.fsharp;
livecodesApi.ready = false;
livecodesApi.runner ??= createWorkerRunner();

livecodesApi.init ??= (function () {
  if (livecodesApi.ready) return;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  return livecodesApi.runner
    .init()
    ?.then(function () {
      parent.postMessage({ type: 'loading', payload: false }, '*');
    })
    .catch(function (err) {
      parent.postMessage({ type: 'loading', payload: false }, '*');
      livecodesApi.ready = false;
      livecodesApi.init = null;
      // eslint-disable-next-line no-console
      console.error('Failed to initialize F# environment:', err);
      throw err;
    });
})();

livecodesApi.run = async function (input: string | undefined) {
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/fsharp-wasm"]');
  scripts.forEach(function (script) {
    code += script.innerHTML + '\n';
  });
  if (!code.trim()) return { output: null, error: null, exitCode: 0 };

  await livecodesApi.init;
  try {
    const result = await livecodesApi.runner?.run(code, input);
    if (!result.ok) {
      const error = (result.errors || []).map(formatError).join('\n');
      livecodesApi.output = null;
      livecodesApi.error = error;
      livecodesApi.exitCode = 1;
      livecodesApi.ready = true;
      // eslint-disable-next-line no-console
      console.error(error);
      return { output: null, error, exitCode: 1 };
    }
    livecodesApi.output = result.output;
    livecodesApi.error = null;
    livecodesApi.exitCode = 0;
    livecodesApi.ready = true;
    // eslint-disable-next-line no-console
    console.log(result.output || '');
    return { output: result.output, error: null, exitCode: 0 };
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

livecodesApi.loaded = new Promise<void>(function (resolve) {
  const interval = setInterval(function () {
    if (livecodesApi.ready) {
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

function formatError(e: any) {
  const line = e.line ? ' (line ' + e.line + ')' : '';
  return 'error FS' + e.errorNumber + line + ': ' + e.message;
}
