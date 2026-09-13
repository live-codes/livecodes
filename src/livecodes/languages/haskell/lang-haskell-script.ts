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

const workerUrl = new URL(
  '{{hash:lang-haskell-worker.js}}',
  (document.currentScript as HTMLScriptElement).src,
).href;
const parentOrigin =
  window.location.ancestorOrigins?.[0] ||
  (document.referrer ? new URL(document.referrer).origin : window.location.origin);
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
});

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
  parent.postMessage({ type: 'loading', payload: true }, parentOrigin);
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
    parent.postMessage({ type: 'loading', payload: false }, parentOrigin);
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
