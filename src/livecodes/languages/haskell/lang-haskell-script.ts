import { getErrorMessage } from '../../utils';
import type { HaskellResult } from './models';
import { createHaskellRunner } from './runner';

declare const window: Window & {
  livecodes: {
    haskell: {
      loaded?: Promise<void>;
      output?: string;
      error?: string;
      exitCode?: number;
      run?: () => Promise<HaskellResult>;
      runner?: ReturnType<typeof createHaskellRunner>;
    };
  };
};

const scriptUrl = (document.currentScript as HTMLScriptElement).src;
const workerUrl = new URL('{{hash:lang-haskell-worker.js}}', scriptUrl).href;
const bsdtarUrl = new URL('assets/wasm/bsdtar.wasm', scriptUrl).href;
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
window.livecodes.haskell ??= {};
const haskell = window.livecodes.haskell;
haskell.runner ??= createHaskellRunner(() => {
  const url = URL.createObjectURL(
    new Blob([`importScripts(${JSON.stringify(workerUrl)});`], { type: 'text/javascript' }),
  );
  try {
    return new Worker(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}, bsdtarUrl);

const postLoading = (payload: boolean) => {
  parent.postMessage({ type: 'loading', payload }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.
};

haskell.run = async () => {
  const code = Array.from(document.querySelectorAll('script[type="text/haskell"]'))
    .map((script) => script.textContent)
    .join('\n');
  if (!code.trim()) {
    haskell.output = '';
    haskell.error = '';
    haskell.exitCode = 0;
    return { output: '', error: '', exitCode: 0 };
  }
  postLoading(true);
  try {
    const result = await haskell.runner!.run(code);
    haskell.output = result.output;
    haskell.error = result.error;
    haskell.exitCode = result.exitCode;
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
    haskell.output = '';
    haskell.error = getErrorMessage(err);
    haskell.exitCode = 1;
    // eslint-disable-next-line no-console
    console.error(haskell.error);
    return { output: '', error: haskell.error, exitCode: 1 };
  } finally {
    postLoading(false);
  }
};

haskell.loaded = new Promise<void>((resolve, reject) => {
  window.addEventListener(
    'load',
    async () => {
      const result = await haskell.run!();
      if (result.exitCode !== 0) reject(new Error(result.error));
      else resolve();
    },
    { once: true },
  );
});
// Diagnostics are already displayed in the console when no consumer awaits loaded.
haskell.loaded.catch(() => undefined);
