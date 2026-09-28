import { swiftWasmBaseUrl } from '../../vendors';

interface SwiftDiagnostic {
  file: string;
  line: number;
  column: number;
  severity: string;
  message: string;
}

interface SwiftResult {
  ok: boolean;
  output: string;
  error: string;
  exitCode: number;
  diagnostics: SwiftDiagnostic[];
}

interface SwiftRuntime {
  warmUp: () => Promise<void>;
  run: (files: string, options?: { input?: string }) => Promise<SwiftResult>;
  destroy: () => void;
}

interface SwiftRunResult {
  output: string | null;
  error: string | null;
  exitCode: number;
}

declare const window: Window & {
  SwiftWasm?: {
    createRuntime: (options?: { baseUrl?: string }) => Promise<SwiftRuntime>;
  };
  livecodes: {
    swift?: {
      ready?: boolean;
      failed?: boolean;
      init?: Promise<void> | null;
      runtime?: SwiftRuntime;
      run?: (input?: string) => Promise<SwiftRunResult>;
      loaded?: Promise<void>;
      input?: string;
      output?: string | null;
      error?: string | null;
      exitCode?: number | null;
    };
  };
};

// The toolchain is ~70 MB on first use, so boot gets a generous budget; a single compile
// takes seconds, so anything far beyond that means the worker is stuck.
const BOOT_TIMEOUT_MS = 5 * 60_000;
const RUN_TIMEOUT_MS = 60_000;

const formatDiagnostic = (diagnostic: SwiftDiagnostic) =>
  `${diagnostic.file}:${diagnostic.line}:${diagnostic.column}: ${diagnostic.severity}: ${diagnostic.message}`;

const withTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  message: string,
  onTimeout?: () => void,
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      onTimeout?.();
      reject(new Error(message));
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });

window.livecodes.swift ??= {};

const swift = window.livecodes.swift;
swift.ready = false;

/** Start (once) loading the runtime and its toolchain. */
const ensureLoaded = (): Promise<void> => {
  let init = swift.init;
  if (!init) {
    init = (async () => {
      parent.postMessage({ type: 'loading', payload: true }, '*');
      try {
        // Injected by the language's `scripts`; it installs `window.SwiftWasm`.
        const createRuntime = window.SwiftWasm?.createRuntime;
        if (!createRuntime) {
          throw new Error('the swift-wasm runtime failed to load');
        }
        const runtime = await createRuntime({ baseUrl: `${swiftWasmBaseUrl}toolchain/` });
        await runtime.warmUp();
        swift.runtime = runtime;
      } finally {
        parent.postMessage({ type: 'loading', payload: false }, '*');
      }
    })().catch((err: Error) => {
      // Reset so a later run can retry the download, and record the failure so
      // `loaded` can reject instead of resolving into a broken environment.
      swift.init = null;
      swift.failed = true;
      swift.error = err.message;
      throw err;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    swift.init = init;
  }
  return init;
};

const setResult = (output: string | null, error: string | null, exitCode: number) => {
  swift.output = output;
  swift.error = error;
  swift.exitCode = exitCode;
  swift.ready = true;

  if (error != null) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else if (output != null) {
    // eslint-disable-next-line no-console
    console.log(output);
  }
  return { output, error, exitCode };
};

swift.run = async (input?: string) => {
  let code = '';
  document.querySelectorAll('script[type="text/swift-wasm"]').forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  swift.input = input;

  if (!code.trim()) return setResult(null, null, 0);

  try {
    await withTimeout(
      ensureLoaded(),
      BOOT_TIMEOUT_MS,
      'Timed out while loading the Swift toolchain.',
    );
  } catch (err) {
    return setResult(null, `Error: ${(err as Error).message}`, 1);
  }

  try {
    const result = await withTimeout(
      swift.runtime!.run(code, { input: input ?? '' }),
      RUN_TIMEOUT_MS,
      'Swift execution timed out.',
      () => {
        // The package has no per-run timeout and dispatches every run to a single
        // worker, so a hung program (e.g. an infinite loop) leaves that worker busy.
        // Tear it down so the next run starts from a fresh worker.
        swift.runtime?.destroy();
        swift.runtime = undefined;
        swift.init = null;
      },
    );

    const diagnostics = result.diagnostics.map(formatDiagnostic).join('\n');
    if (!result.ok) {
      // Compiler diagnostics are the useful message; fall back to raw stderr.
      return setResult(
        result.output || null,
        diagnostics || result.error.trim() || `Exited with code ${result.exitCode}`,
        result.exitCode || 1,
      );
    }

    if (diagnostics) {
      // Warnings on a successful run are worth surfacing, but are not errors.
      // eslint-disable-next-line no-console
      console.warn(diagnostics);
    }
    return setResult(result.output, null, 0);
  } catch (err) {
    return setResult(null, `Error: ${(err as Error).message}`, 1);
  }
};

ensureLoaded();

swift.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (swift.failed) {
      clearInterval(interval);
      reject(new Error(swift.error || 'Failed to initialize the Swift environment'));
    } else if (swift.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await swift.run?.(swift.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
