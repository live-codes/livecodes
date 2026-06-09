/* eslint-disable no-console */
import { runeWasmWasmUrl } from '../../vendors';

const originalFetch = window.fetch;

window.fetch = ((resource: string | Request | URL, init: RequestInit | undefined) => {
  if (typeof resource === 'string' && resource.includes('/js/assets/rune_wasm-')) {
    return originalFetch(runeWasmWasmUrl, { ...init, credentials: 'omit' as RequestCredentials });
  }
  return originalFetch(resource, init);
}) as typeof window.fetch;

declare const rune: {
  init: () => Promise<void>;
  module:
    | ({
        compile: (input: string, config: Record<string, unknown>) => Promise<unknown>;
      } & Record<string, unknown>)
    | null;
};

livecodes.runeWasm ??= {};
let initPromise: Promise<void> | null = null;

const init = async () => {
  if (typeof rune.module?.compile === 'function') return;
  if (!initPromise) {
    console.log('Initializing Rune WASM environment...');
    initPromise = rune.init();
  }
  await initPromise;
  if (typeof rune.module?.compile !== 'function') {
    throw new Error('Failed to initialize Rune WASM environment');
  }
  console.log('Rune WASM environment initialized successfully');
};

const runCode = async (
  code: string,
  input?: string,
): Promise<{ output: string | null; error: string | null; exitCode: number }> => {
  try {
    console.log('Running Rune code...');
    const compiledCode =
      input != null && input !== '' ? `let __input = ${Number(input)};\n${code}` : code;
    const result = await rune.module!.compile(compiledCode, {});
    const output = result != null ? String(result) : '';
    return { output, error: null, exitCode: 0 };
  } catch (err) {
    const error = (err as Error).message ?? String(err);
    return { output: null, error, exitCode: (err as any).code ?? 1 };
  }
};

livecodes.runeWasm.run ??= async (input?: string) => {
  parent.postMessage({ type: 'loading', payload: true }, '*');

  let code = '';
  livecodes.runeWasm.input = input;
  livecodes.runeWasm.output = null;
  livecodes.runeWasm.ready = false;
  const scripts = document.querySelectorAll('script[type="text/rune"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  const { output, error, exitCode } = !code.trim()
    ? { output: null, error: null, exitCode: 0 }
    : await (async () => {
        try {
          await init();
          return await runCode(code, input);
        } catch (err) {
          const error = (err as Error).message ?? String(err);
          return { output: null, error, exitCode: 1 };
        }
      })();

  if (error != null) {
    console.error(error);
  } else if (output != null) {
    console.log(output);
  }

  livecodes.runeWasm.input = input;
  livecodes.runeWasm.output = output;
  livecodes.runeWasm.error = error;
  livecodes.runeWasm.exitCode = exitCode;
  livecodes.runeWasm.ready = true;

  parent.postMessage({ type: 'loading', payload: false }, '*');
};

livecodes.runeWasm.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (livecodes.runeWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', () => livecodes.runeWasm.run?.());
