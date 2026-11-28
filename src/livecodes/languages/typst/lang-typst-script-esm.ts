/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { typstBaseUrl, typstCompilerWasmUrl, typstRendererWasmUrl } from '../../vendors';
import { withTimeout } from '../wasm-runtime';
import { createWorkerRunner, type Runner } from '../worker-runner';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerSource from './lang-typst-worker.raw.js?raw';

const SCRIPT_TYPE = 'text/typst';
const CONTAINER_ID = 'livecodes-typst';
const BOOT_TIMEOUT_MS = 180_000;
const RUN_TIMEOUT_MS = 120_000;

const TYPST_BUNDLE_URL = typstBaseUrl + 'dist/esm/contrib/all-in-one-lite.bundle.js';

interface WorkerResult {
  svg: string;
}

interface RunResult {
  output: string | null;
  error: string | null;
  exitCode: number | null;
}

interface TypstApi {
  ready: boolean;
  failed: boolean;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  loaded: Promise<void>;
  init?: Promise<void> | null;
  runner?: Runner<WorkerResult>;
  queue?: Promise<unknown>;
  run: (code?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, any>;
};

window.livecodes.typst ??= {} as TypstApi;
const typst = window.livecodes.typst as TypstApi;
typst.ready = false;
typst.failed = false;
typst.output = null;
typst.error = null;
typst.exitCode = null;

const getContainer = (): HTMLElement => {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = CONTAINER_ID;
    container.style.cssText = [
      'box-sizing: border-box',
      'display: flex',
      'flex-direction: column',
      'align-items: center',
      'min-height: 100vh',
      'padding: 1rem',
      'background: #ececec',
    ].join(';');
    document.body.appendChild(container);
  }
  return container;
};

const clearOutput = () => {
  getContainer().innerHTML = '';
};

const renderError = (error: string) => {
  const container = getContainer();
  container.innerHTML = '';
  const pre = document.createElement('pre');
  pre.textContent = error;
  pre.style.cssText = [
    'box-sizing: border-box',
    'max-width: 100%',
    'padding: 1rem',
    'border-radius: 4px',
    'background: #fff',
    'color: #b00020',
    'font-family: monospace',
    'white-space: pre-wrap',
  ].join(';');
  container.appendChild(pre);
};

const renderSvg = (svg: string) => {
  const container = getContainer();
  container.innerHTML = svg;
  const element = container.querySelector('svg');
  if (!element) return;
  element.style.cssText = [
    'display: block',
    'width: 100%',
    'height: auto',
    'max-width: 800px',
    'background: #fff',
    'box-shadow: 0 0 8px rgba(0, 0, 0, 0.15)',
  ].join(';');
};

const setResult = (svg: string | null, error: string | null): RunResult => {
  typst.output = svg;
  typst.error = error;
  typst.exitCode = error == null ? 0 : 1;
  typst.ready = true;

  if (error != null) {
    console.error(error);
    renderError(error);
  } else if (svg != null) {
    renderSvg(svg);
  } else {
    clearOutput();
  }

  return { output: svg, error, exitCode: typst.exitCode };
};

const createTypstWorker = (): Worker => {
  // The result page lives on a different origin than the app, so the worker
  // source is inlined and started from a Blob URL (same-origin workers only).
  const url = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
  const worker = new Worker(url, { type: 'module' });
  // Keep the URL alive until the worker has started.
  worker.addEventListener('message', () => URL.revokeObjectURL(url), { once: true });
  worker.addEventListener('error', () => URL.revokeObjectURL(url), { once: true });
  return worker;
};

const getRunner = (): Runner<WorkerResult> =>
  (typst.runner ??= createWorkerRunner<WorkerResult>({
    getWorker: createTypstWorker,
    initMessage: {
      type: 'init',
      bundleUrl: TYPST_BUNDLE_URL,
      compilerWasmUrl: typstCompilerWasmUrl,
      rendererWasmUrl: typstRendererWasmUrl,
    },
    label: 'Typst',
    timeoutMs: RUN_TIMEOUT_MS,
  }));

/** Start (once) loading the runtime in a worker, showing the loading indicator. */
const ensureLoaded = (runner: Runner<WorkerResult>): Promise<void> => {
  let init = typst.init;
  if (!init) {
    typst.failed = false;
    init = withTimeout(
      runner.ensureReady(),
      BOOT_TIMEOUT_MS,
      'Timed out while loading the Typst compiler.',
      () => runner.destroy(),
    ).catch((error: Error) => {
      // Reset so a later run can retry the download.
      typst.init = null;
      typst.failed = true;
      throw error;
    });
    // The failure is surfaced through `run`; do not also report it unhandled.
    init.catch(() => undefined);
    typst.init = init;
  }
  return init;
};

const readCode = (): string => {
  let code = '';
  document
    .querySelectorAll<HTMLScriptElement>(`script[type="${SCRIPT_TYPE}"]`)
    .forEach((script) => {
      code += `${script.textContent ?? script.innerHTML}\n`;
    });
  return code;
};

const runOnce = async (code: string): Promise<RunResult> => {
  if (!code.trim()) return setResult(null, null);

  const runner = getRunner();
  try {
    await ensureLoaded(runner);
  } catch (error) {
    return setResult(null, `Error: ${getErrorMessage(error)}`);
  }

  try {
    const result = await runner.run(code, '');
    typst.failed = false;
    return setResult(result.svg, null);
  } catch (error) {
    // A timeout or crash tears the worker down; the next run must boot a new one.
    typst.init = null;
    return setResult(null, `Error: ${getErrorMessage(error)}`);
  }
};

typst.run = async (code?: string) => {
  const source = code ?? readCode();
  typst.ready = false;
  typst.error = null;
  typst.exitCode = null;
  typst.output = null;

  // Runs share the compiler instance, so serialize them (the queue survives LiveReload).
  const previous = typst.queue ?? Promise.resolve();
  const task = previous.then(
    () => runOnce(source),
    () => runOnce(source),
  );
  typst.queue = task.then(
    () => undefined,
    () => undefined,
  );
  return task;
};

typst.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (typst.failed) {
      clearInterval(interval);
      reject(new Error(typst.error || 'Failed to initialize the Typst environment'));
    } else if (typst.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});
// The starter awaits `loaded` and may not catch.
void typst.loaded.catch(() => undefined);
