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
    script.onerror = (err) => reject(new Error(`Failed to load Blazor script: ${err}`));
    document.head.appendChild(script);
  });

const isReady = async () => {
  try {
    await window.DotNet.invokeMethodAsync('Fanak.Runner', 'RunCode', 'Unit main() { }', '');
    return true;
  } catch {
    return false;
  }
};

const runFanakCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  await livecodes.fanak.init;
  try {
    const { output, errors } = await window.DotNet.invokeMethodAsync(
      'Fanak.Runner',
      'RunCode',
      code,
      input,
    );
    return { output: output ?? null, error: errors ?? null };
  } catch (err) {
    return { output: null, error: 'Error: ' + (err as Error).message };
  }
};

livecodes.fanak.init ??= (async () => {
  if (livecodes.fanak.ready) return;

  // eslint-disable-next-line no-console
  console.log('Initializing Fanak environment...');
  parent.postMessage({ type: 'loading', payload: true }, '*');
  try {
    await loadBlazorScript();

    if (!window.Blazor) throw new Error('Blazor failed to load properly');

    patchFetch();
    await window.Blazor.start({
      loadBootResource: (_type: string, name: string) => `${fanakBaseUrl}_framework/${name}`,
    });

    if (!(await waitFor(isReady))) {
      throw new Error('Timeout waiting for the Fanak runner to be ready');
    }

    // eslint-disable-next-line no-console
    console.log('Fanak environment initialized successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Fanak environment:', err);
    livecodes.fanak.ready = false;
    livecodes.fanak.init = null;
    throw err;
  } finally {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
})();

livecodes.fanak.run ??= async (input?: string) => {
  let code = '';
  livecodes.fanak.input = input;
  livecodes.fanak.output = null;
  livecodes.fanak.ready = false;
  const scripts = document.querySelectorAll('script[type="text/fanak"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  const { output, error } = !code.trim()
    ? { output: null, error: null }
    : await runFanakCode(code, input);

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

livecodes.fanak.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (livecodes.fanak.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.fanak.run(livecodes.fanak.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
