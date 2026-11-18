/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { createLoadingReporter } from '../wasm-runtime';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerSource from './lang-beam-wasm-worker.raw.js?raw';

export interface RunResult {
  output: string | null;
  error: string | null;
  exitCode: number | null;
  value?: string | null;
  warnings?: string | null;
  cancelled?: boolean;
}

export interface ParsedResult {
  value: string | null;
  error: string | null;
  exitCode: number;
}

export interface BeamTiming {
  name: string;
  at: number;
  detail?: Record<string, unknown>;
}

export interface BeamApi {
  ready: boolean;
  failed?: boolean;
  input?: string;
  output: string | null;
  error: string | null;
  exitCode: number | null;
  value?: string | null;
  warnings?: string | null;
  loaded: Promise<void>;
  evals?: number;
  runId?: number;
  currentRun?: Promise<void> | null;
  init?: Promise<void>;
  ensureInit?: () => Promise<void>;
  retry?: () => Promise<void>;
  popcorn?: any;
  stdout?: string[];
  stderr?: string[];
  timings?: BeamTiming[];
  run: (input?: string) => Promise<RunResult>;
}

export interface BeamRuntimeConfig {
  /** Key on `window.livecodes` used by the public API, e.g. `elixir`. */
  apiKey: string;
  /** Optional alias key, e.g. `elixir-wasm`. */
  apiAlias?: string;
  /** Human-readable language name used in error messages. */
  label: string;
  /** Result script tag type, e.g. `text/elixir-wasm`. */
  scriptType: string;
  /** Pinned runtime bundle URL. */
  bundleUrl: string;
  /** Language prelude, compiled once per worker with `eval_elixir`. */
  prelude: string;
  /** Builds the runtime call payload for a run. */
  buildCall: (code: string, stdin: string) => unknown[];
  /** Parses the language-specific result protocol. */
  parseResult: (text: string) => ParsedResult;
  /** Parses the Elixir prelude result. Defaults to `parseTaggedResult`. */
  parsePreludeResult?: (text: string) => ParsedResult;
  /** Normalizes the raw runtime result before parsing. */
  normalizeResult?: (data: unknown) => string;
  /** Whether the wrapping language adds a trailing newline that should be dropped. */
  stripTrailingNewline?: boolean;
}

declare const window: Window & {
  livecodes: Record<string, any>;
};

const EVAL_TIMEOUT_MS = 60_000;
// First boot downloads ~8MB (bundle.avm + AtomVM.wasm) and starts the VM,
// so allow generous time before giving up.
const INIT_VM_TIMEOUT_MS = 120_000;
const SUPERSEDE_TIMEOUT_MS = 10_000;

// Message protocol spoken by the runtime worker (same types as upstream Popcorn).
const bridgeMessages = {
  init: 'popcorn-init',
  startVm: 'popcorn-startVm',
  call: 'popcorn-call',
  callAck: 'popcorn-callAck',
  stdout: 'popcorn-stdout',
  stderr: 'popcorn-stderr',
  heartbeat: 'popcorn-heartbeat',
  reload: 'popcorn-reload',
  timing: 'popcorn-timing',
  fatal: 'popcorn-fatal',
} as const;

export const OK_TAG = '__LC_OK__';
export const ERROR_TAG = '__LC_ERROR__';
export const EXIT_TAG = '__LC_EXIT__';
const LEGACY_EXIT_TAG = /^\{:?lc_exit, (-?\d+)\}$/;
const LEGACY_ERROR_TAG = /^\{:?lc_error, ([\s\S]*)\}$/;

export const decodeBase64 = (value: string): string => {
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return value;
  }
};

// Popcorn serializes a returned Elixir string as a JSON string. A tagged
// protocol string therefore arrives as `"\"__LC_OK__...\""`; unwrap it before
// parsing. Atoms/tuples arrive without the extra quoting.
export const normalizeResultText = (data: unknown): string => {
  if (data == null) return '';
  let text = String(data);
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed === 'string') text = parsed;
    } catch {
      // Keep the original text if it is not valid JSON.
    }
  }
  return text;
};

export const parseTaggedResult = (text: string, defaultError = 'Runtime error'): ParsedResult => {
  if (text.startsWith(OK_TAG)) {
    return { value: decodeBase64(text.slice(OK_TAG.length)), error: null, exitCode: 0 };
  }
  if (text.startsWith(EXIT_TAG)) {
    const exitCode = Number(text.slice(EXIT_TAG.length));
    return { value: null, error: null, exitCode: Number.isFinite(exitCode) ? exitCode : 1 };
  }
  if (text.startsWith(ERROR_TAG)) {
    const [kind, message, stack] = text
      .slice(ERROR_TAG.length)
      .split('|')
      .map((part) => decodeBase64(part));
    const detail = message || stack || defaultError;
    const prefix = kind && kind !== 'error' && kind !== 'syntax' ? `${kind}: ` : '';
    return { value: null, error: `${prefix}${detail}`, exitCode: 1 };
  }
  const legacyExit = LEGACY_EXIT_TAG.exec(text);
  if (legacyExit) {
    return { value: null, error: null, exitCode: Number(legacyExit[1]) };
  }
  const legacyError = LEGACY_ERROR_TAG.exec(text);
  if (legacyError) {
    return { value: null, error: legacyError[1], exitCode: 1 };
  }
  return { value: text === '' ? null : text, error: null, exitCode: 0 };
};

export const readBeamCode = (scriptType: string): string => {
  let code = '';
  document.querySelectorAll<HTMLScriptElement>(`script[type="${scriptType}"]`).forEach((script) => {
    code += `${script.textContent ?? script.innerHTML}\n`;
  });
  return code;
};

const drain = (arr: string[]) => {
  const out = arr.join('\n');
  arr.length = 0;
  return out;
};

interface PendingCall {
  startTimeMs: number;
  resolve: (data: any) => void;
  reject: (reason?: unknown) => void;
  timer: ReturnType<typeof setTimeout> | null;
}

interface Waiter {
  resolve: (value: any) => void;
  reject: (reason?: unknown) => void;
  timer: ReturnType<typeof setTimeout> | null;
}

export const createBeamRuntime = (config: BeamRuntimeConfig): BeamApi => {
  const postLoading = createLoadingReporter();
  const normalizeResult = config.normalizeResult ?? normalizeResultText;
  const stripTrailingNewline = config.stripTrailingNewline ?? true;

  window.livecodes ??= {};
  const existing = window.livecodes[config.apiKey] as BeamApi | undefined;
  const timings: BeamTiming[] = existing?.timings ?? [];
  const mark = (name: string, detail?: Record<string, unknown>) => {
    timings.push({ name, at: performance.now(), ...(detail == null ? {} : { detail }) });
    if (timings.length > 1000) timings.splice(0, timings.length - 1000);
  };

  const api = (window.livecodes[config.apiKey] ??= {} as BeamApi);
  api.ready = false;
  api.evals = (api.evals ?? 0) + 1;
  const thisEval = api.evals;
  mark('script-eval', {
    evalId: thisEval,
    isolated: window.crossOriginIsolated,
    sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
  });

  const readCode = () => readBeamCode(config.scriptType);

  /**
   * Main-thread side of the Beam runtime.
   *
   * The runtime runs in a Worker owned by the result window. LiveReload rewrites
   * the result document with `document.open()/write()/close()`, which keeps the
   * window (and therefore this Worker) alive; editing code no longer destroys
   * the VM. The bridge is stored on `window.livecodes[apiKey]`, which also
   * survives document rewrites.
   */
  class BeamBridge {
    private bundlePath: string;
    private label: string;
    private markTiming: (name: string, detail?: Record<string, unknown>) => void;
    private onStdout: (text: string) => void;
    private onStderr: (text: string) => void;
    private onReady: ((bridge: BeamBridge) => Promise<void>) | null;
    private worker: Worker | null = null;
    private workerUrl: string | null = null;
    private initProcess: string | null = null;
    private requestId = 0;
    private calls = new Map<number, PendingCall>();
    private waiters = new Map<string, Waiter[]>();
    private booting: Promise<void> | null = null;
    private ready = false;
    private failed: string | null = null;
    private generation = 0;
    private destroyed = false;

    private constructor(options: {
      bundlePath: string;
      label: string;
      mark: (name: string, detail?: Record<string, unknown>) => void;
      onStdout?: (text: string) => void;
      onStderr?: (text: string) => void;
      onReady?: (bridge: BeamBridge) => Promise<void>;
    }) {
      this.bundlePath = options.bundlePath;
      this.label = options.label;
      this.markTiming = options.mark;
      this.onStdout = options.onStdout ?? console.log;
      this.onStderr = options.onStderr ?? console.warn;
      this.onReady = options.onReady ?? null;
    }

    public get error(): string | null {
      return this.failed;
    }

    public get isReady(): boolean {
      return this.ready && this.worker != null;
    }

    public static async init(options: {
      bundlePath: string;
      label: string;
      mark: (name: string, detail?: Record<string, unknown>) => void;
      onStdout?: (text: string) => void;
      onStderr?: (text: string) => void;
      onReady?: (bridge: BeamBridge) => Promise<void>;
    }): Promise<BeamBridge> {
      const bridge = new BeamBridge(options);
      await bridge.start();
      return bridge;
    }

    public ensureReady(): Promise<void> {
      return this.start();
    }

    public async call(args: unknown, options: { timeoutMs?: number } = {}): Promise<any> {
      await this.start();
      if (!this.isReady || this.initProcess == null) {
        throw new Error(this.failed || `${this.label} runtime is not ready`);
      }
      const requestId = this.requestId;
      this.requestId += 1;
      const targetProcess = this.initProcess;
      const timeoutMs = options.timeoutMs ?? EVAL_TIMEOUT_MS;
      const callPromise = new Promise<any>((resolve, reject) => {
        const timer = setTimeout(() => {
          this.calls.delete(requestId);
          // Module.call is synchronous inside the worker. If it does not return,
          // terminating the worker is the only reliable way to unblock newer
          // work. This happens on timeouts only, never on a normal edit.
          this.stopWorker(`${this.label} evaluation timed out after ${timeoutMs} ms`);
          reject(new Error(`${this.label} evaluation timed out after ${timeoutMs} ms`));
        }, timeoutMs);
        this.calls.set(requestId, { startTimeMs: performance.now(), resolve, reject, timer });
      });
      try {
        this.post(bridgeMessages.call, { requestId, process: targetProcess, args });
      } catch (err) {
        const call = this.calls.get(requestId);
        if (call != null) {
          this.calls.delete(requestId);
          if (call.timer != null) clearTimeout(call.timer);
          call.reject(err);
        }
      }
      return callPromise;
    }

    /** Terminate the worker without waiting for the current evaluation. */
    public cancel(reason = 'superseded by a newer run'): void {
      if (this.worker == null) return;
      this.stopWorker(reason);
    }

    public async restart(): Promise<void> {
      this.stopWorker('manual restart');
      await this.start();
    }

    public destroy(): void {
      this.destroyed = true;
      this.stopWorker('destroyed');
    }

    private async start(): Promise<void> {
      if (this.destroyed) throw new Error(`${this.label} runtime was destroyed`);
      if (this.isReady) return;
      if (this.booting != null) return this.booting;
      const attempt = this.boot();
      this.booting = attempt;
      try {
        await attempt;
      } finally {
        if (this.booting === attempt) this.booting = null;
      }
    }

    private async boot(): Promise<void> {
      this.stopWorker('restarting');
      this.failed = null;
      const generation = this.generation;
      this.markTiming('worker-create-start');
      const source = String(workerSource).replace('__LIVECODES_BEAM_BUNDLE_URL__', this.bundlePath);
      const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      this.workerUrl = url;
      try {
        const worker = new Worker(url, { type: 'module' });
        this.worker = worker;
        worker.addEventListener('message', this.onWorkerMessage);
        worker.addEventListener('error', this.onWorkerError);
        worker.addEventListener('messageerror', this.onWorkerMessageError);
        this.markTiming('worker-created');
        const initPromise = this.waitFor(bridgeMessages.init, INIT_VM_TIMEOUT_MS);
        const startPromise = this.waitFor(bridgeMessages.startVm, INIT_VM_TIMEOUT_MS);
        await initPromise;
        this.markTiming('worker-init-message');
        this.initProcess = await startPromise;
        if (generation !== this.generation) {
          throw new Error(`${this.label} runtime was restarted`);
        }
        this.markTiming('worker-vm-ready');
        this.ready = true;
        if (this.onReady != null) {
          await this.onReady(this);
        }
        this.markTiming('worker-prelude-ready');
      } catch (err) {
        this.stopWorker(`boot failed: ${getErrorMessage(err)}`);
        throw err;
      }
    }

    private waitFor(type: string, timeoutMs: number): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        const waiter: Waiter = { resolve, reject, timer: null };
        waiter.timer = setTimeout(() => {
          const list = this.waiters.get(type);
          const index = list?.indexOf(waiter) ?? -1;
          if (list != null && index >= 0) list.splice(index, 1);
          reject(new Error(`Timed out waiting for ${type}`));
        }, timeoutMs);
        const list = this.waiters.get(type) ?? [];
        list.push(waiter);
        this.waiters.set(type, list);
      });
    }

    private resolveWaiter(type: string, value: any): void {
      const list = this.waiters.get(type);
      const waiter = list?.shift();
      if (list != null && list.length === 0) this.waiters.delete(type);
      if (waiter == null) return;
      if (waiter.timer != null) clearTimeout(waiter.timer);
      waiter.resolve(value);
    }

    private post(type: string, value: unknown): void {
      if (this.worker == null) throw new Error(`${this.label} worker is not running`);
      this.worker.postMessage({ type, value });
    }

    private onWorkerMessage = (event: MessageEvent): void => {
      const data = event.data as { type?: unknown; value?: any } | null;
      if (data == null || typeof data.type !== 'string') return;
      const value = data.value;
      switch (data.type) {
        case bridgeMessages.init:
        case bridgeMessages.startVm:
          this.resolveWaiter(data.type, value);
          break;
        case bridgeMessages.stdout:
          this.onStdout(typeof value === 'string' ? value : String(value));
          break;
        case bridgeMessages.stderr:
          this.onStderr(typeof value === 'string' ? value : String(value));
          break;
        case bridgeMessages.call:
          this.handleCall(value);
          break;
        case bridgeMessages.callAck:
          break;
        case bridgeMessages.heartbeat:
          break;
        case bridgeMessages.reload:
          this.stopWorker(`${this.label} runtime requested a restart`);
          break;
        case bridgeMessages.fatal:
          {
            const detail =
              typeof value?.message === 'string' ? value.message : 'unknown runtime failure';
            this.onStderr(`Runtime failed: ${detail}\n`);
            this.stopWorker(`${this.label} runtime failed: ${detail}`);
          }
          break;
        case bridgeMessages.timing:
          this.recordWorkerTiming(value);
          break;
        default:
          break;
      }
    };

    private onWorkerError = (event: ErrorEvent): void => {
      const detail =
        event.error instanceof Error && event.error.message
          ? event.error.message
          : event.message || 'unknown error';
      const message = `${this.label} worker error: ${detail}`;
      this.onStderr(`${message}\n`);
      this.stopWorker(message);
    };

    private onWorkerMessageError = (): void => {
      const message = `${this.label} worker message could not be deserialized`;
      this.onStderr(`${message}\n`);
      this.stopWorker(message);
    };

    private handleCall(value: { requestId: number; error?: unknown; data?: unknown }): void {
      const call = this.calls.get(value.requestId);
      if (call == null) return;
      this.calls.delete(value.requestId);
      if (call.timer != null) clearTimeout(call.timer);
      if (value.error !== undefined) {
        call.reject(value.error);
      } else {
        call.resolve({ data: value.data });
      }
    }

    private recordWorkerTiming(value: {
      name?: unknown;
      at?: unknown;
      detail?: Record<string, unknown>;
    }): void {
      if (typeof value?.name !== 'string') return;
      this.markTiming(`worker:${value.name}`, {
        workerAt: typeof value.at === 'number' ? value.at : null,
        ...(value.detail ?? {}),
      });
    }

    private stopWorker(reason: string): void {
      const pendingCalls = this.calls.size;
      this.generation += 1;
      this.ready = false;
      this.initProcess = null;
      this.failed = reason;
      if (this.worker != null) {
        this.worker.removeEventListener('message', this.onWorkerMessage);
        this.worker.removeEventListener('error', this.onWorkerError);
        this.worker.removeEventListener('messageerror', this.onWorkerMessageError);
        this.worker.terminate();
        this.worker = null;
      }
      if (this.workerUrl != null) {
        URL.revokeObjectURL(this.workerUrl);
        this.workerUrl = null;
      }
      for (const call of this.calls.values()) {
        if (call.timer != null) clearTimeout(call.timer);
        call.reject(new Error(reason));
      }
      this.calls.clear();
      for (const list of this.waiters.values()) {
        for (const waiter of list) {
          if (waiter.timer != null) clearTimeout(waiter.timer);
          waiter.reject(new Error(reason));
        }
      }
      this.waiters.clear();
      mark('worker-stopped', { reason, pendingCalls });
    }
  }

  const initBridge = async (): Promise<void> => {
    mark('init-start');
    postLoading(true);
    const stdout: string[] = api.stdout ?? [];
    const stderr: string[] = api.stderr ?? [];
    api.stdout = stdout;
    api.stderr = stderr;
    try {
      const bridge = await BeamBridge.init({
        bundlePath: config.bundleUrl,
        label: config.label,
        mark,
        onStdout: (text: string) => stdout.push(text),
        onStderr: (text: string) => stderr.push(text),
        onReady: async (readyBridge) => {
          // Drop boot chatter (module import, fetches, wasm init) so it does not
          // leak into the first run's output after a boot or crash recovery.
          drain(stdout);
          drain(stderr);
          mark('prelude-start');
          const prelude = await readyBridge.call(['eval_elixir', config.prelude], {
            timeoutMs: EVAL_TIMEOUT_MS,
          });
          mark('prelude-end');
          const preludeText = normalizeResultText(prelude?.data);
          const parsePrelude = config.parsePreludeResult ?? parseTaggedResult;
          const preludeError = parsePrelude(preludeText).error;
          if (preludeError != null) {
            throw new Error(`${config.label} prelude failed: ${preludeError}`);
          }
          // Warnings emitted while compiling the prelude are not user output.
          drain(stdout);
          drain(stderr);
        },
      });
      api.popcorn = bridge;
      api.failed = false;
      mark('init-ready');
    } catch (err) {
      // Surface anything the runtime reported before dying (e.g. bundle/AtomVM fetch failures).
      if (stderr.length > 0) console.error(drain(stderr));
      if (stdout.length > 0) console.log(drain(stdout));
      api.failed = true;
      api.error = getErrorMessage(err);
      mark('init-failed', { error: api.error });
      throw err;
    } finally {
      postLoading(false);
    }
  };

  // `ensureInit` is stored on the API object so it survives LiveReload
  // document rewrites and can reuse the existing worker. A rejected attempt is
  // cleared, so the next run (or retry()) starts a fresh boot instead of
  // replaying a memoized failure forever.
  api.ensureInit ??= async () => {
    const existingBridge = api.popcorn as BeamBridge | undefined;
    if (existingBridge != null) {
      await existingBridge.ensureReady();
      return;
    }
    if (api.init == null) {
      const attempt = initBridge();
      api.init = attempt;
      attempt.catch(() => {
        if (api.init === attempt) api.init = undefined;
      });
    }
    await api.init;
  };

  const runOnce = async (input?: string, runId?: number): Promise<RunResult> => {
    if (input !== undefined) api.input = input;
    const stdin = `${input ?? api.input ?? ''}`;
    const isLatest = () => runId == null || runId === api.runId;
    api.output = null;
    api.error = null;
    api.exitCode = null;
    api.value = null;
    api.warnings = null;
    api.ready = false;

    const code = readCode();
    mark('run-start', { runId, codeBytes: code.length, inputBytes: stdin.length });
    if (!code.trim()) {
      mark('run-empty', { runId });
      if (isLatest()) {
        api.output = null;
        api.error = null;
        api.exitCode = 0;
        api.value = null;
        api.warnings = null;
        api.ready = true;
        api.failed = false;
      }
      mark('run-end', {
        runId,
        exitCode: 0,
        stdoutBytes: 0,
        stderrBytes: 0,
        hasError: false,
        latest: isLatest(),
        empty: true,
      });
      return { output: null, error: null, exitCode: 0, value: null, warnings: null };
    }

    try {
      await api.ensureInit?.();
      const bridge = api.popcorn as BeamBridge | undefined;
      if (bridge == null) throw new Error(`${config.label} runtime is not initialized`);
      api.stdout!.length = 0;
      api.stderr!.length = 0;
      mark('eval-start', { runId });
      const { data } = await bridge.call(config.buildCall(code, stdin), {
        timeoutMs: EVAL_TIMEOUT_MS,
      });
      const printed = drain(api.stdout!);
      const errPrinted = drain(api.stderr!);
      const parsed = config.parseResult(normalizeResult(data));
      // The wrapper appends one newline to flush line-buffered IO.write/1. Drop
      // exactly that newline; a single IO.puts chunk may include it.
      const outputText =
        stripTrailingNewline && printed.endsWith('\n') ? printed.slice(0, -1) : printed;
      const output = outputText || null;
      const warnings = errPrinted || null;
      const latest = isLatest();
      if (latest) {
        api.output = output;
        api.error = parsed.error;
        api.exitCode = parsed.exitCode;
        api.value = parsed.value;
        api.warnings = warnings;
        api.ready = true;
        api.failed = false;
        if (parsed.error != null) console.error(parsed.error);
        if (output != null) console.log(output);
      }
      mark('run-end', {
        runId,
        exitCode: parsed.exitCode,
        stdoutBytes: printed.length,
        stderrBytes: errPrinted.length,
        hasError: parsed.error != null,
        latest,
      });
      return {
        output,
        error: parsed.error,
        exitCode: parsed.exitCode,
        value: parsed.value,
        warnings,
        ...(latest ? {} : { cancelled: true }),
      };
    } catch (err) {
      const latest = isLatest();
      const runtimeStderr = latest ? drain(api.stderr ?? []) : '';
      const base = 'Error: ' + getErrorMessage(err);
      const message = runtimeStderr.trim() ? `${base}\n${runtimeStderr.trim()}` : base;
      if (latest) {
        api.output = null;
        api.error = message;
        api.exitCode = 1;
        api.value = null;
        api.warnings = null;
        api.ready = true;
        api.failed = true;
        console.error(message);
      }
      mark('run-error', { runId, error: message, latest });
      return {
        output: null,
        error: message,
        exitCode: 1,
        value: null,
        warnings: null,
        ...(latest ? {} : { cancelled: true }),
      };
    }
  };

  let activeRun: Promise<RunResult> | null = null;
  let pendingRun: {
    input?: string;
    runId: number;
    resolve: (result: RunResult) => void;
    reject: (reason?: unknown) => void;
  } | null = null;
  let supersedeTimer: ReturnType<typeof setTimeout> | null = null;

  const clearSupersedeTimer = () => {
    if (supersedeTimer == null) return;
    clearTimeout(supersedeTimer);
    supersedeTimer = null;
  };

  const scheduleSupersede = () => {
    if (supersedeTimer != null) return;
    supersedeTimer = setTimeout(() => {
      supersedeTimer = null;
      if (activeRun == null || pendingRun == null) return;
      const bridge = api.popcorn as BeamBridge | undefined;
      mark('run-supersede-timeout', { pendingRunId: pendingRun.runId });
      bridge?.cancel('superseded by a newer run');
    }, SUPERSEDE_TIMEOUT_MS);
  };

  const finishRun = (task: Promise<RunResult>) => {
    if (activeRun !== task) return;
    activeRun = null;
    api.currentRun = null;
    clearSupersedeTimer();
    const next = pendingRun;
    pendingRun = null;
    if (next != null) {
      mark('run-dequeued', { runId: next.runId });
      const nextTask = startRun(next.input, next.runId);
      void nextTask.then(next.resolve, next.reject);
    }
  };

  const startRun = (input: string | undefined, runId: number): Promise<RunResult> => {
    const task = runOnce(input, runId);
    activeRun = task;
    api.currentRun = task.then(
      () => undefined,
      () => undefined,
    );
    void task.then(
      () => finishRun(task),
      () => finishRun(task),
    );
    return task;
  };

  api.run ??= async (input?: string): Promise<RunResult> => {
    const runId = (api.runId ?? 0) + 1;
    api.runId = runId;
    mark('run-queued', { runId, hasInput: input != null });
    if (activeRun == null) {
      return startRun(input, runId);
    }
    if (pendingRun != null) {
      const superseded = pendingRun;
      pendingRun = null;
      mark('run-superseded', { runId: superseded.runId, by: runId });
      superseded.resolve({
        output: null,
        error: null,
        exitCode: null,
        value: null,
        warnings: null,
        cancelled: true,
      });
    }
    scheduleSupersede();
    return new Promise<RunResult>((resolve, reject) => {
      pendingRun = { input, runId, resolve, reject };
      mark('run-pending', { runId });
    });
  };

  api.retry ??= async () => {
    api.failed = false;
    api.error = null;
    api.ready = false;
    api.init = undefined;
    const bridge = api.popcorn as BeamBridge | undefined;
    try {
      if (bridge != null) {
        await bridge.restart();
      } else {
        await api.ensureInit?.();
      }
    } catch (err) {
      api.failed = true;
      api.error = getErrorMessage(err);
      throw err;
    }
  };

  // LiveReload updates rewrite the result document in rapid succession and the
  // window `load` event is not reliably fired after coalesced rewrites, so runs
  // are scheduled by polling the parser state instead of listening for `load`.
  // Only the latest evaluation runs; superseded ones abort silently.
  const waitForParseThenRun = async (evalId: number): Promise<void> => {
    const start = Date.now();
    while (document.readyState === 'loading' && Date.now() - start < 30_000) {
      if (api.evals !== evalId) return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (api.evals !== evalId) return;
    postLoading(true);
    try {
      await api.run(api.input);
    } finally {
      postLoading(false);
    }
  };
  void waitForParseThenRun(thisEval);

  api.timings = timings;
  const LOADED_TIMEOUT_MS = INIT_VM_TIMEOUT_MS + EVAL_TIMEOUT_MS;
  api.loaded = new Promise<void>((resolve, reject) => {
    const started = performance.now();
    const interval = setInterval(() => {
      if (api.failed) {
        clearInterval(interval);
        mark('loaded-rejected', { error: api.error });
        reject(new Error(api.error || `Failed to initialize the ${config.label} environment`));
      } else if (api.ready) {
        clearInterval(interval);
        mark('loaded-resolved');
        resolve();
      } else if (performance.now() - started > LOADED_TIMEOUT_MS) {
        clearInterval(interval);
        api.failed = true;
        api.error = `Timed out initializing the ${config.label} runtime`;
        mark('loaded-timeout');
        reject(new Error(api.error));
      }
    }, 50);
  });
  // The starter awaits `loaded` and may not catch. Attaching a no-op handler
  // keeps a recoverable boot failure from becoming an unhandled rejection; the
  // original promise still rejects for callers that want the error.
  void api.loaded.catch(() => undefined);

  window.livecodes[config.apiKey] = api;
  if (config.apiAlias != null) {
    window.livecodes[config.apiAlias] = api;
  }
  return api;
};
