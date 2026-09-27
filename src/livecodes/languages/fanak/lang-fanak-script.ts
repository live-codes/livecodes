import { getErrorMessage } from '../../utils';
import { fanakBaseUrl } from '../../vendors';

declare const livecodes: any;

declare global {
  interface Window {
    DotNet: any;
    Blazor: { start: (options: any) => Promise<void> };
  }
}

livecodes.fanak ??= {};
livecodes.fanak.ready = false;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitFor = async (condition: () => boolean | Promise<boolean>, timeout = 60_000) => {
  const startTime = Date.now();
  while (!(await condition())) {
    if (Date.now() - startTime > timeout) return false;
    await sleep(100);
  }
  return true;
};

// The result runs in an iframe; post status updates to the app origin. Mirrors
// the other WASM language scripts (`haskell-wasm`).
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

let activeRuns = 0;
const postLoading = (payload: boolean) => {
  activeRuns += payload ? 1 : -1;
  parent.postMessage({ type: 'loading', payload: activeRuns > 0 }, parentOrigin); // NOSONAR - fallback is safe with source/origin checks in the parent.
};

/**
 * Only patches Blazor's fetches with `credentials: 'omit'`, so a cross-origin
 * compiler URL does not send cookies (mirrors the C# (Wasm) integration).
 */
const patchFetch = () => {
  const originalFetch = window.fetch;
  window.fetch = (resource: string | Request | URL, init = {}) => {
    const url =
      typeof resource === 'string'
        ? resource
        : 'url' in resource // Request
          ? resource.url
          : resource.href; // URL
    if (url.startsWith(fanakBaseUrl)) {
      return originalFetch(resource, { ...init, credentials: 'omit' as RequestCredentials });
    }
    return originalFetch(resource, init);
  };
};

const loadBlazorScript = () =>
  new Promise<void>((resolve, reject) => {
    const scriptSrc = `${fanakBaseUrl}_framework/blazor.webassembly.js`;
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.setAttribute('autostart', 'false');
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load the Fanak compiler bundle from ${scriptSrc}`));
    document.head.appendChild(script);
  });

const isReady = async () => {
  if (!window.DotNet) return false;
  try {
    await window.DotNet.invokeMethodAsync('Fanak.Runner', 'RunCode', 'Unit main() { }', '');
    return true;
  } catch {
    return false;
  }
};

livecodes.fanak.init ??= (async () => {
  if (livecodes.fanak.ready) return;

  // eslint-disable-next-line no-console
  console.log('Initializing Fanak environment...');
  postLoading(true);
  try {
    await loadBlazorScript();

    if (!window.Blazor) {
      throw new Error(`The Fanak compiler bundle at ${fanakBaseUrl} did not load`);
    }

    patchFetch();
    await window.Blazor.start({
      loadBootResource: (_type: string, name: string) => `${fanakBaseUrl}_framework/${name}`,
    });

    if (!(await waitFor(isReady))) {
      throw new Error(`Timed out waiting for the Fanak runner at ${fanakBaseUrl}`);
    }

    // eslint-disable-next-line no-console
    console.log('Fanak environment initialized successfully');
  } catch (err) {
    livecodes.fanak.ready = false;
    livecodes.fanak.failed = true;
    livecodes.fanak.error = getErrorMessage(err);
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Fanak environment:', err);
    throw err;
  } finally {
    postLoading(false);
  }
})();

const runFanakCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  try {
    await livecodes.fanak.init;
    if (livecodes.fanak.failed) {
      throw new Error(livecodes.fanak.error || 'Fanak runner failed to initialize');
    }
    const { output, errors } = await window.DotNet.invokeMethodAsync(
      'Fanak.Runner',
      'RunCode',
      code,
      input,
    );
    return { output: output ?? null, error: errors ?? null };
  } catch (err) {
    return { output: null, error: 'Error: ' + getErrorMessage(err) };
  }
};

let runSequence = 0;

livecodes.fanak.run ??= async (input?: string) => {
  const runId = ++runSequence;
  livecodes.fanak.input = input;
  livecodes.fanak.output = null;
  livecodes.fanak.ready = false;

  let code = '';
  document
    .querySelectorAll('script[type="text/fanak"]')
    .forEach((script) => (code += script.innerHTML + '\n'));

  const { output, error } = !code.trim()
    ? { output: null, error: null }
    : await runFanakCode(code, input);

  // A newer run started while this one was awaiting; keep the newer result.
  if (runId !== runSequence) return { output: null, error: null, exitCode: 0 };

  if (error != null) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else if (output != null) {
    // eslint-disable-next-line no-console
    console.log(output);
  }

  livecodes.fanak.output = output;
  livecodes.fanak.error = error;
  livecodes.fanak.exitCode = error ? 1 : 0;
  livecodes.fanak.ready = true;
  return { output, error, exitCode: error ? 1 : 0 };
};

livecodes.fanak.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (livecodes.fanak.failed) {
      clearInterval(interval);
      reject(new Error(livecodes.fanak.error || 'Failed to initialize the Fanak environment'));
    } else if (livecodes.fanak.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  postLoading(true);
  try {
    await livecodes.fanak.run(livecodes.fanak.input);
  } finally {
    postLoading(false);
  }
});
