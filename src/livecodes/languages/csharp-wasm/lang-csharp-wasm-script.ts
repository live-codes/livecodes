import { csharpWasmBaseUrl } from '../../vendors';

declare global {
  interface Window {
    DotNet: any;
    Blazor: { start: (options: any) => Promise<void> };
  }
}

livecodes.csharp ??= {};

const waitFor = (condition: () => boolean | Promise<boolean>, timeout = 30_000) =>
  new Promise<boolean>(async (resolve) => {
    const startTime = Date.now();
    const check = async () => {
      if (await condition()) resolve(true);
      else if (Date.now() - startTime > timeout) resolve(false);
      else setTimeout(check, 100);
    };
    await check();
  });

/**
 * Only patches Blazor's fetches with `credentials: 'omit'`
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
    if (url.startsWith(csharpWasmBaseUrl)) {
      return originalFetch(resource, { ...init, credentials: 'omit' as RequestCredentials });
    }
    return originalFetch(resource, init);
  };
};

const loadBlazorScript = () =>
  new Promise<void>((resolve, reject) => {
    const scriptSrc = `${csharpWasmBaseUrl}_framework/blazor.webassembly.js`;
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
    await window.DotNet.invokeMethodAsync('MyRunnyApp', 'RunCode', 'int x = 1 + 1;', '');
    return true;
  } catch (err) {
    return false;
  }
};

const runCSharpCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  await livecodes.csharp.init;
  try {
    const { output, errors } = await window.DotNet.invokeMethodAsync(
      'MyRunnyApp',
      'RunCode',
      code,
      input,
    );
    return { output, error: errors || null };
  } catch (err) {
    const error = 'Error: ' + (err as Error).message;
    return { output: null, error };
  }
};

livecodes.csharp.init ??= (async () => {
  if (livecodes.csharp.ready) return;

  // eslint-disable-next-line no-console
  console.log('Initializing C# environment...');
  try {
    await loadBlazorScript();

    if (!window.Blazor) throw new Error('Blazor failed to load properly');

    patchFetch();
    await window.Blazor.start({
      loadBootResource: (_type: string, name: string) => `${csharpWasmBaseUrl}_framework/${name}`,
    });

    if (!(await waitFor(isReady))) {
      throw new Error('Timeout waiting for DotNet to be ready');
    }

    // eslint-disable-next-line no-console
    console.log('C# environment initialized successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize C# environment:', err);
    livecodes.csharp.ready = false;
    livecodes.csharp.init = null;
    throw err;
  }
})();

livecodes.csharp.run ??= async (input?: string) => {
  let code = '';
  livecodes.csharp.input = input;
  livecodes.csharp.output = null;
  livecodes.csharp.ready = false;
  const scripts = document.querySelectorAll('script[type="text/csharp-wasm"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  const { output, error } = !code.trim()
    ? { output: null, error: null }
    : await runCSharpCode(code, input);

  if (error != null) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else if (output != null) {
    // eslint-disable-next-line no-console
    console.log(output);
  }

  livecodes.csharp.output = output;
  livecodes.csharp.error = error;
  livecodes.csharp.exitCode = error ? 1 : 0;
  livecodes.csharp.ready = true;
  return { output, error, exitCode: 0 };
};

livecodes.csharp.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (livecodes.csharp.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.csharp.run(livecodes.csharp.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
