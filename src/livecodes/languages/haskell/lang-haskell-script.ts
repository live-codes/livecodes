import { browserHaskellBaseUrl } from '../../vendors';

interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
  output: string;
  exitCode: number;
  packages: string[];
  durationMs: number;
}

interface HaskellInstance {
  run: (options: { code: string; stdin?: string }) => Promise<RunResult>;
}

interface BrowserHaskellApi {
  createHaskell: (options: { baseUrl: string; timeout?: number }) => Promise<HaskellInstance>;
}

interface HaskellApi {
  init?: Promise<HaskellInstance> | null;
  ready?: boolean;
  input?: string;
  output?: string | null;
  error?: string | null;
  exitCode?: number | null;
  run?: (
    input?: string,
  ) => Promise<{ output: string | null; error: string | null; exitCode: number }>;
  loaded?: Promise<void>;
}

declare const window: Window & {
  livecodes: {
    haskell?: HaskellApi;
  };
};

// MicroHs has no way to preempt a running program, so this only bounds runs
// that yield to the event loop; a hard loop still blocks the result page.
const RUN_TIMEOUT_MS = 30_000;

const getCode = () => {
  let code = '';
  document.querySelectorAll('script[type="text/haskell"]').forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  return code;
};

const haskell = (window.livecodes.haskell ??= {});
haskell.ready = false;
haskell.input ??= '';

const getInstance = async (): Promise<HaskellInstance> => {
  let init = haskell.init;
  if (!init) {
    const lib = (globalThis as any).BrowserHaskell as BrowserHaskellApi | undefined;
    if (!lib?.createHaskell) {
      throw new Error('the Haskell runtime failed to load');
    }
    init = lib.createHaskell({
      baseUrl: browserHaskellBaseUrl,
      timeout: RUN_TIMEOUT_MS,
    });
    haskell.init = init;
  }
  try {
    return await init;
  } catch (err) {
    // Reset so a later run can retry the download.
    haskell.init = null;
    throw err;
  }
};

const setResult = (output: string | null, error: string | null, exitCode: number) => {
  haskell.output = output;
  haskell.error = error;
  haskell.exitCode = exitCode;
  haskell.ready = true;

  if (error != null) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else if (output != null) {
    // eslint-disable-next-line no-console
    console.log(output);
  }
  return { output, error, exitCode };
};

haskell.run = async (input?: string) => {
  const code = getCode();
  haskell.input = input ?? haskell.input ?? '';

  if (!code.trim()) return setResult(null, null, 0);

  parent.postMessage({ type: 'loading', payload: true }, '*');
  try {
    const haskellInstance = await getInstance();
    const result = await haskellInstance.run({ code, stdin: `${haskell.input ?? ''}` });

    if (result.error != null || result.exitCode !== 0) {
      return setResult(
        result.stdout || null,
        result.error || `Exited with code ${result.exitCode}`,
        result.exitCode || 1,
      );
    }

    if (result.stderr) {
      // eslint-disable-next-line no-console
      console.warn(result.stderr);
    }
    return setResult(result.stdout || null, null, 0);
  } catch (err) {
    return setResult(null, `Error: ${(err as Error).message}`, 1);
  } finally {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
};

// Start downloading the wasm bundle right away.
getInstance().catch(() => undefined);

haskell.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (haskell.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  await haskell.run?.(haskell.input);
});
