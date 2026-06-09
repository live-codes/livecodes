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

livecodes.runeWasm.run ??= async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');

  let code = '';
  const scripts = document.querySelectorAll('script[type="text/rune"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  if (!code.trim()) {
    parent.postMessage({ type: 'loading', payload: false }, '*');
    return;
  }

  try {
    if (!rune.module) {
      // eslint-disable-next-line no-console
      console.log('Initializing Rune WASM environment...');
      await rune.init();
    }

    // eslint-disable-next-line no-console
    console.log('Running Rune code...');
    await rune.module!.compile(code, {});
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
};

window.addEventListener('load', () => livecodes.runeWasm.run?.());
