import { getWorkerDataURL } from '../../utils';
import { rustWasmUrl, wasmRustcBaseUrl } from '../../vendors';

// Miri cannot be interrupted once it is running, so a run that exceeds this
// budget means the worker is discarded and a fresh one is spawned next time.
const RUN_TIMEOUT_MS = 30_000;
// The first run downloads ~55 MB of toolchain, so boot gets a much larger budget.
const BOOT_TIMEOUT_MS = 5 * 60_000;

interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  trap?: string | null;
  durationMs: number;
}

interface Pending {
  resolve: (result: RunResult) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

declare const window: Window & {
  livecodes: {
    rust: {
      ready?: boolean;
      init?: Promise<void> | null;
      run?: (
        input?: string,
      ) => Promise<{ output: string | null; error: string | null; exitCode: number }>;
      loaded?: Promise<void>;
      input?: string;
      output?: string | null;
      stderr?: string | null;
      exitCode?: number | null;
      runner?: ReturnType<typeof createRunner>;
    };
  };
};

function createRunner() {
  let worker: Worker | null = null;
  let ready: Promise<void> | null = null;
  let settleReady: ((error?: Error) => void) | null = null;
  let bootTimer: ReturnType<typeof setTimeout> | null = null;
  let pending: Record<number, Pending> = {};
  let nextId = 1;

  const clearBootTimer = () => {
    if (bootTimer !== null) {
      clearTimeout(bootTimer);
      bootTimer = null;
    }
  };

  const teardown = () => {
    clearBootTimer();
    worker?.terminate();
    worker = null;
    ready = null;
    settleReady = null;
  };

  const failAll = (error: Error) => {
    for (const id of Object.keys(pending)) {
      const p = pending[Number(id)];
      clearTimeout(p.timer);
      p.reject(error);
    }
    pending = {};
  };

  function onMessage(e: MessageEvent) {
    const msg = e.data ?? {};
    if (msg.type === 'ready') {
      clearBootTimer();
      settleReady?.();
      settleReady = null;
    } else if (msg.type === 'result') {
      const p = pending[msg.id];
      if (p) {
        delete pending[msg.id];
        clearTimeout(p.timer);
        p.resolve(msg);
      }
    } else if (msg.type === 'run-error') {
      const p = pending[msg.id];
      if (p) {
        delete pending[msg.id];
        clearTimeout(p.timer);
        p.reject(new Error(msg.message));
      }
    } else if (msg.type === 'error') {
      // The runtime failed to load (network, or the browser is unsupported).
      clearBootTimer();
      settleReady?.(new Error(msg.message));
      settleReady = null;
      failAll(new Error(msg.message));
    }
  }

  function onError(err: ErrorEvent) {
    const error = new Error(`Rust worker crashed: ${err?.message ?? 'unknown error'}`);
    clearBootTimer();
    settleReady?.(error);
    settleReady = null;
    failAll(error);
    teardown();
  }

  async function spawn() {
    ready = new Promise<void>((resolve, reject) => {
      settleReady = (error?: Error) => (error ? reject(error) : resolve());
    });
    const workerUrl = getWorkerDataURL(rustWasmUrl);
    worker = new Worker(workerUrl);
    worker.onmessage = onMessage;
    worker.onerror = onError;
    // `gzipped` is true because the published package stores the artifacts with
    // a `.gz`suffix; unpkg serves them as-is and the worker inflates them.
    worker.postMessage({
      type: 'init',
      toolchain: { baseUrl: wasmRustcBaseUrl, gzipped: true },
    });

    bootTimer = setTimeout(() => {
      teardown();
      failAll(new Error('Timed out while loading the Rust toolchain.'));
    }, BOOT_TIMEOUT_MS);
  }

  /** Spawn the worker if needed and resolve once the toolchain is loaded. */
  async function ensureReady() {
    if (!ready) await spawn();
    await ready;
  }

  function run(code: string, input: string): Promise<RunResult> {
    return ensureReady().then(
      () =>
        new Promise<RunResult>((resolve, reject) => {
          const id = nextId++;
          const timer = setTimeout(() => {
            delete pending[id];
            // Miri has no way to be preempted, so abandon the worker entirely.
            teardown();
            failAll(new Error('Rust execution timed out; the interpreter was restarted.'));
          }, RUN_TIMEOUT_MS);
          pending[id] = { resolve, reject, timer };
          worker?.postMessage({ type: 'run', id, code, input });
        }),
    );
  }

  return { ensureReady, run };
}

window.livecodes.rust ??= {};

const rust = window.livecodes.rust;
rust.ready = false;
rust.runner ??= createRunner();

/** Start (once) loading the interpreter and sysroot. */
const ensureLoaded = (): Promise<void> => {
  let init = rust.init;
  if (!init) {
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        await rust.runner?.ensureReady();
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((err: Error) => {
      // Reset so a later run can retry the download.
      rust.init = null;
      throw err;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    rust.init = init;
  }
  return init;
};

const setResult = (output: string | null, error: string | null, exitCode: number) => {
  rust.output = output;
  rust.stderr = error;
  rust.exitCode = exitCode;
  rust.ready = true;

  if (error != null) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else if (output != null) {
    // eslint-disable-next-line no-console
    console.log(output);
  }
  return { output, error, exitCode };
};

rust.run = async (input?: string) => {
  let code = '';
  document.querySelectorAll('script[type="text/rust-wasm"]').forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  rust.input = input;

  if (!code.trim()) return setResult(null, null, 0);

  try {
    await ensureLoaded();
  } catch (err) {
    return setResult(null, `Error: ${(err as Error).message}`, 1);
  }

  try {
    const result = await rust.runner!.run(code, `${input ?? ''}`);
    const stdout = result.stdout ?? '';
    // Compiler diagnostics and a program's own stderr both arrive here, which is
    // how rustc behaves natively, so they share one stream.
    const stderr = (result.stderr ?? '').trim();

    if (result.exitCode !== 0) {
      return setResult(
        stdout || null,
        stderr || `Exited with code ${result.exitCode}`,
        result.exitCode,
      );
    }

    if (stderr) {
      // Warnings on a successful run are worth surfacing, but are not errors.
      // eslint-disable-next-line no-console
      console.warn(stderr);
    }
    return setResult(stdout, null, 0);
  } catch (err) {
    return setResult(null, `Error: ${(err as Error).message}`, 1);
  }
};

ensureLoaded();

rust.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (rust.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await rust.run?.(rust.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
