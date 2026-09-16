import { vbWasmBaseUrl } from '../../vendors';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerContent from './lang-vb-wasm-worker.raw.js?raw';

declare const window: Window & {
  livecodes: {
    vb: {
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

// Worker boot timeout: the .NET runtime and the Roslyn VB compiler (~43 MB) are
// downloaded on first use, so allow for a slow connection.
const BOOT_TIMEOUT_MS = 120000;
// Per-run timeout: the .NET runtime is single-threaded, so user code that blocks
// on async work (`.Result`, `.Wait()`, `Thread.Sleep`) deadlocks a compile. A run
// that never answers kills the worker, and the next run boots a fresh one.
const RUN_TIMEOUT_MS = 60000;

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

  function onMessage(e: MessageEvent) {
    const msg = e.data || {};
    if (msg.type === 'ready') {
      if (resolveReady) {
        resolveReady('');
        resolveReady = null;
        rejectReady = null;
      }
    } else if (msg.type === 'fatal') {
      // Boot failed: tear down so that a later run spawns a fresh worker.
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (rejectReady) {
        rejectReady(new Error('VB.NET worker failed to start: ' + msg.message));
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

  function onError(err: Error) {
    rejectAll(
      new Error('VB.NET worker crashed: ' + (err && err.message ? err.message : 'unknown')),
    );
    if (worker) {
      worker.terminate();
      worker = null;
    }
  }

  function spawn() {
    readyPromise = new Promise(function (resolve, reject) {
      resolveReady = resolve;
      rejectReady = reject;
    });
    try {
      const toDataUrl = (content: string, type = 'text/javascript') => {
        // `btoa` alone throws on any character outside Latin1, so encode the UTF-8
        // bytes instead. The worker is inlined verbatim (comments included).
        const bytes = new TextEncoder().encode(content);
        let binary = '';
        bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
        return `data:${type};charset=UTF-8;base64,` + btoa(binary);
      };

      // The worker fetches the compiler bundle from the CDN, so it needs the base URL.
      const workerUrl = toDataUrl(`self.baseUrl = "${vbWasmBaseUrl}";\n\n${workerContent}`);
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
        reject(new Error('VB.NET worker failed to start (timeout)'));
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

  function runNow(source: string, input?: string) {
    const id = nextId++;
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
        // The runtime hung (blocking call in user code); drop the worker so that
        // the next run starts from a clean one.
        delete pending[id];
        if (worker) {
          worker.terminate();
          worker = null;
        }
        reject(new Error('VB.NET compile timed out; restarted the compiler.'));
      }, RUN_TIMEOUT_MS);
      pending[id] = { resolve, reject, timer };
      worker?.postMessage({ type: 'compile', source, stdin: input ?? '', id });
    });
  }

  function run(source: string, input?: string): Promise<any> {
    try {
      ensureWorker();
    } catch (err) {
      return Promise.reject(err);
    }
    return readyPromise!.then(function () {
      return runNow(source, input);
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
window.livecodes.vb ??= {};

const livecodesApi = window.livecodes.vb;
const runner = (livecodesApi.runner ??= createWorkerRunner());
livecodesApi.ready = false;

livecodesApi.init ??= (function () {
  if (livecodesApi.ready) return;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  return runner
    .init()
    .then(function () {
      parent.postMessage({ type: 'loading', payload: false }, '*');
    })
    .catch(function (err) {
      parent.postMessage({ type: 'loading', payload: false }, '*');
      livecodesApi.ready = false;
      livecodesApi.init = null;
      // eslint-disable-next-line no-console
      console.error('Failed to initialize VB.NET environment:', err);
      throw err;
    });
})();

livecodesApi.run = async function (input: string | undefined) {
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/vb-wasm"]');
  scripts.forEach(function (script) {
    code += script.innerHTML + '\n';
  });
  if (!code.trim()) return { output: null, error: null, exitCode: 0 };

  await livecodesApi.init;
  try {
    const result = await runner.run(code, input);
    if (!result.ok) {
      const error = (result.errors || []).map(formatError).join('\n');
      livecodesApi.output = result.output ?? null;
      livecodesApi.error = error;
      livecodesApi.exitCode = 1;
      livecodesApi.ready = true;
      // eslint-disable-next-line no-console
      console.error(error);
      return { output: result.output ?? null, error, exitCode: 1 };
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

function formatError(diagnostic: any) {
  const where = diagnostic.line
    ? ' (line ' + diagnostic.line + ', column ' + diagnostic.column + ')'
    : '';
  return 'error ' + diagnostic.id + where + ': ' + diagnostic.message;
}
