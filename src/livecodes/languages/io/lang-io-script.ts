/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { ioBaseUrl } from '../../vendors';
import { createLoadingReporter } from '../wasm-runtime';

const ioModuleUrl = ioBaseUrl + 'src/index.js';
const ioWasmUrl = ioBaseUrl + 'io_browser.wasm';

// Io runs on its virtual machine compiled to WebAssembly (@iolanguage/io), loaded from its npm
// package on the CDN. The VM is a reactor module: one instance keeps the objects defined between
// evaluations, and `eval` resolves when the code finishes (including code that waits on a Promise).
const SCRIPT_TYPE = 'text/io';
// Hand control back to the page regularly, so long-running code does not freeze the result.
const TIME_SLICE_MS = 50;

interface EvalResult {
  status: number;
  output: string;
}

interface IoVm {
  eval: (code: string) => Promise<EvalResult>;
  onOutput: (listener: (text: string) => void) => () => void;
}

interface IoConstructor {
  load: (options: { wasm: WebAssembly.Module; timeSlice?: number }) => Promise<IoVm>;
}

interface IoRunResult {
  output: string;
  error: string | null;
  status: number;
}

interface IoApi {
  ready: boolean;
  failed: boolean;
  output: string | null;
  error: string | null;
  status: number | null;
  loaded: Promise<void>;
  run: () => Promise<IoRunResult>;
}

declare const livecodes: any;

livecodes.io ??= {} as IoApi;
const api = livecodes.io as IoApi;

// The result runs in an iframe; post status updates to the app origin.
const postLoading = createLoadingReporter();

/**
 * Reads the program out of the result page.
 *
 * The result page writes the code inline as the `innerHTML` of a `<script type="text/io">`
 * element: core forces `singleFile` for non-module script types, so the tag never points at
 * `./script.js`.
 */
const readCode = () => {
  let code = '';
  document
    .querySelectorAll<HTMLScriptElement>(`script[type="${SCRIPT_TYPE}"]`)
    .forEach((script) => {
      code += `${script.textContent ?? ''}\n`;
    });
  return code;
};

const createVm = async () => {
  const [module, wasm] = await Promise.all([
    import(ioModuleUrl) as Promise<{ Io: IoConstructor }>,
    (async () => {
      const response = await fetch(ioWasmUrl);
      if (!response.ok) {
        throw new Error(`Failed to load the Io VM (HTTP ${response.status})`);
      }
      return WebAssembly.compile(await response.arrayBuffer());
    })(),
  ]);
  const vm = await module.Io.load({ wasm, timeSlice: TIME_SLICE_MS });
  // Output printed by callbacks run outside an eval (timers, event handlers).
  vm.onOutput((text) => console.log(text));
  return vm;
};

let vmPromise: Promise<IoVm> | null = null;

const getVm = () => {
  vmPromise ??= createVm().catch((error) => {
    // Reset so a later run can retry loading the VM.
    vmPromise = null;
    throw error;
  });
  return vmPromise;
};

const report = (result: EvalResult): IoRunResult => {
  api.status = result.status;
  api.output = result.output;
  api.error = result.status === 0 ? null : result.output.trim() || 'Io error';
  api.ready = true;

  if (result.status !== 0) {
    console.error(api.error);
  } else if (result.output) {
    console.log(result.output);
  }
  return { output: result.output, error: api.error, status: result.status };
};

api.ready = false;
api.failed = false;

api.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (api.failed) {
      clearInterval(interval);
      reject(new Error(api.error || 'Failed to initialize the Io VM'));
    } else if (api.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});
// Surface the failure through `run` and `loaded` without also reporting an unhandled rejection.
api.loaded.catch(() => undefined);

api.run = async () => {
  const code = readCode();
  if (!code.trim()) {
    // Loud on purpose: an empty program and a result page whose code could not be located look
    // identical from the outside otherwise, and the second is a bug.
    console.error('[io] no code to run — no program script found on the result page');
    return report({ status: 0, output: '' });
  }

  api.ready = false;
  api.failed = false;

  postLoading(true);
  try {
    return report(await (await getVm()).eval(code));
  } catch (error) {
    // Start from a fresh VM next time.
    vmPromise = null;
    api.failed = true;
    return report({ status: 1, output: `Error: ${getErrorMessage(error)}` });
  } finally {
    postLoading(false);
  }
};

window.addEventListener('load', async () => {
  await api.run();
});
