/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { blazorWasmBaseUrl } from '../../vendors';

// Razor markup (and C#) is compiled and rendered in the result page by
// @live-codes/blazor-wasm. The bundle loads the .NET WebAssembly runtime, Roslyn and the Razor
// compiler into the page (no server), which is why the language is marked `largeDownload`.
//
// The language source arrives in a `text/razor` script tag. This script loads the bundle's
// loader (`blazor-wasm.js`), creates a runner and renders the component. `baseUrl` is passed
// explicitly so the payloads (refs.zip / razor.zip) are fetched from the pinned version; the
// loader patches `fetch` for `credentials: 'omit'` on its own.
//
// The component tree is bound to the result page DOM, so the language does not use live reload:
// a code change reloads the result page (see the docs).

const SCRIPT_TYPE = 'text/razor';
// Downloading the .NET runtime, Roslyn and the Razor compiler is a large download.
const BOOT_TIMEOUT_MS = 5 * 60_000;

interface Diagnostic {
  id?: string;
  message: string;
  severity?: string;
  line?: number;
  column?: number;
}

interface RenderResult {
  success: boolean;
  routes?: string[];
  errors?: Diagnostic[];
}

interface Runner {
  ready: () => Promise<void>;
  renderRazor: (source: string, componentName?: string) => Promise<RenderResult>;
  navigateTo: (url: string) => Promise<unknown>;
}

interface RunResult {
  output: string | null;
  error: string | null;
  exitCode: number;
}

interface BlazorWasmApi {
  ready: boolean;
  failed: boolean;
  error: string | null;
  routes: string[];
  loaded: Promise<void>;
  init: Promise<void> | null;
  runner?: Runner;
  render: (source?: string) => Promise<RunResult>;
  navigateTo: (url: string) => Promise<void>;
}

declare const window: Window & {
  livecodes: Record<string, BlazorWasmApi>;
  BlazorRunner?: {
    create: (options?: { baseUrl?: string; root?: string | Element }) => Runner;
  };
};

window.livecodes.blazorWasm ??= {} as BlazorWasmApi;

const blazorWasm = window.livecodes.blazorWasm;
blazorWasm.ready = false;
blazorWasm.failed = false;
blazorWasm.routes = [];
blazorWasm.error = null;

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

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

const getSource = () => {
  let code = '';
  document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).forEach((script) => {
    code += `${script.innerHTML}\n`;
  });
  return code;
};

const formatErrors = (errors?: Diagnostic[]) =>
  errors?.length ? errors.map((error) => error.message).join('\n') : null;

const getRunner = async (): Promise<Runner> => {
  if (blazorWasm.runner) return blazorWasm.runner;
  await loadScript(`${blazorWasmBaseUrl}blazor-wasm.js`);
  const factory = window.BlazorRunner;
  if (!factory) throw new Error('Failed to load the Blazor WebAssembly runner.');
  blazorWasm.runner = factory.create({ baseUrl: blazorWasmBaseUrl });
  return blazorWasm.runner;
};

/** Boot the runtime once (downloading it). */
const ensureLoaded = (): Promise<void> => {
  let init = blazorWasm.init;
  if (!init) {
    blazorWasm.failed = false;
    init = (async () => {
      const runner = await getRunner();
      await withTimeout(
        runner.ready(),
        BOOT_TIMEOUT_MS,
        'Timed out while loading the Blazor WebAssembly runtime.',
        () => {
          blazorWasm.runner = undefined;
        },
      );
      blazorWasm.ready = true;
    })().catch((error: Error) => {
      // Reset so a later render can retry the download.
      blazorWasm.init = null;
      blazorWasm.failed = true;
      throw error;
    });
    // The failure is surfaced through `render`; do not also report it unhandled.
    init.catch(() => undefined);
    blazorWasm.init = init;
  }
  return init;
};

blazorWasm.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (blazorWasm.failed) {
      clearInterval(interval);
      reject(new Error(blazorWasm.error || 'Failed to initialize Blazor WebAssembly'));
    } else if (blazorWasm.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

blazorWasm.render = async (source?: string): Promise<RunResult> => {
  const razor = source ?? getSource();
  blazorWasm.error = null;
  blazorWasm.routes = [];

  if (!razor.trim()) {
    blazorWasm.ready = true;
    return { output: null, error: null, exitCode: 0 };
  }

  // The runtime download and the first compile are both slow; keep the loading indicator up.
  parent.postMessage({ type: 'loading', payload: true }, '*');
  try {
    await ensureLoaded();
    const result = await (blazorWasm.runner as Runner).renderRazor(razor);
    blazorWasm.routes = result?.routes ?? [];

    const error = formatErrors(result?.errors);
    if (error != null) {
      blazorWasm.error = error;
      console.error(error);
      return { output: null, error, exitCode: 1 };
    }
    if (result && result.success === false) {
      const failure = 'Failed to render the Blazor component.';
      blazorWasm.error = failure;
      console.error(failure);
      return { output: null, error: failure, exitCode: 1 };
    }
    return { output: null, error: null, exitCode: 0 };
  } catch (error) {
    const message = `Error: ${getErrorMessage(error)}`;
    blazorWasm.error = message;
    console.error(message);
    return { output: null, error: message, exitCode: 1 };
  } finally {
    parent.postMessage({ type: 'loading', payload: false }, '*');
  }
};

blazorWasm.navigateTo = async (url: string) => {
  await ensureLoaded();
  await blazorWasm.runner?.navigateTo(url);
};

window.addEventListener('load', async () => {
  await blazorWasm.render();
});
