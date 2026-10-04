import { getErrorMessage } from '../../utils/utils';
import { blazorWasmBaseUrl } from '../../vendors';

// The C# console language and the Blazor language are backed by the same bundle
// (@live-codes/blazor-wasm): its host runs console programs through `RunCode` as well as rendering
// components. The bundle's loader boots the .NET WebAssembly runtime and patches `fetch` for
// `credentials: 'omit'` itself, so LiveCodes does not hand-roll the boot any more.

declare const window: Window & {
  BlazorRunner?: {
    create: (options?: { baseUrl?: string; root?: string | Element }) => CSharpRunner;
  };
};

interface Diagnostic {
  id?: string;
  message: string;
  severity?: string;
  line?: number;
  column?: number;
}

interface RunResult {
  success: boolean;
  output?: string;
  errors?: Diagnostic[];
}

interface CSharpRunner {
  ready: () => Promise<void>;
  run: (source: string, stdin?: string) => Promise<RunResult>;
}

livecodes.csharp ??= {};
livecodes.csharp.ready = false;

const BOOT_TIMEOUT_MS = 5 * 60_000;

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
    script.onerror = () => {
      // Remove the failed script so a later attempt can issue a fresh request.
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(script);
  });

const getRunner = async (): Promise<CSharpRunner> => {
  if (livecodes.csharp.runner) return livecodes.csharp.runner as CSharpRunner;
  await loadScript(`${blazorWasmBaseUrl}blazor-wasm.js`);
  const factory = window.BlazorRunner;
  if (!factory) throw new Error('Failed to load the C# WebAssembly runner.');
  livecodes.csharp.runner = factory.create({ baseUrl: blazorWasmBaseUrl });
  // The host always owns a mount element, even though a console program never renders into it.
  // Hide it so an empty node cannot affect the result page layout.
  const style = document.createElement('style');
  style.textContent = '#blazor-app { display: none; }';
  document.head.appendChild(style);
  return livecodes.csharp.runner as CSharpRunner;
};

const formatErrors = (errors?: Diagnostic[]) =>
  errors?.length
    ? errors
        .map((error) => `${error.message}${error.line ? ` (line ${error.line})` : ''}`)
        .join('\n')
    : null;

const initCSharp = (): Promise<void> => {
  if (!livecodes.csharp.init) {
    const init = (async () => {
      // eslint-disable-next-line no-console
      console.log('Initializing C# environment...');
      try {
        const runner = await getRunner();
        await withTimeout(
          runner.ready(),
          BOOT_TIMEOUT_MS,
          'Timed out while loading the C# WebAssembly runtime.',
          () => {
            livecodes.csharp.runner = undefined;
          },
        );
        // eslint-disable-next-line no-console
        console.log('C# environment initialized successfully');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize C# environment:', err);
        livecodes.csharp.ready = false;
        // Reset so a later run recreates the initialization and retries the download.
        livecodes.csharp.init = null;
        throw err;
      }
    })();
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    livecodes.csharp.init = init;
  }
  return livecodes.csharp.init;
};

const runCSharpCode = async (
  code: string,
  input = '',
): Promise<{ output: string | null; error: string | null }> => {
  try {
    await initCSharp();
    const { output, errors } = await (livecodes.csharp.runner as CSharpRunner).run(code, input);
    return { output: output ?? null, error: formatErrors(errors) };
  } catch (err) {
    return { output: null, error: 'Error: ' + getErrorMessage(err) };
  }
};

// Start downloading the runtime as soon as the result page loads.
initCSharp();

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
  return { output, error, exitCode: error ? 1 : 0 };
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
