/* eslint-disable no-console */
import { getErrorMessage } from '../../utils/utils';
import { elixirWasmBaseUrl } from '../../vendors';
import { createLoadingReporter } from '../wasm-runtime';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import workerSource from './lang-elixir-wasm-worker.raw.js?raw';

interface RunResult {
  output: string | null;
  error: string | null;
  exitCode: number | null;
  value?: string | null;
  warnings?: string | null;
  cancelled?: boolean;
}

interface ElixirTiming {
  name: string;
  at: number;
  detail?: Record<string, unknown>;
}

interface ElixirWasmApi {
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
  timings?: ElixirTiming[];
  run: (input?: string) => Promise<RunResult>;
}

declare const window: Window & {
  livecodes: Record<string, any>;
};

const BUNDLE_URL = `${elixirWasmBaseUrl}bundle.avm`;
const EVAL_TIMEOUT_MS = 60_000;
// First boot downloads ~8MB (bundle.avm + AtomVM.wasm) and starts the VM,
// so allow generous time before giving up.
const INIT_VM_TIMEOUT_MS = 120_000;

const SCRIPT_TYPE = 'text/elixir-wasm';

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

const postLoading = createLoadingReporter();

const existingElixir = window.livecodes?.elixir as ElixirWasmApi | undefined;
const timings: ElixirTiming[] = existingElixir?.timings ?? [];
const mark = (name: string, detail?: Record<string, unknown>) => {
  timings.push({ name, at: performance.now(), ...(detail == null ? {} : { detail }) });
  if (timings.length > 1000) timings.splice(0, timings.length - 1000);
};

const readCode = () => {
  let code = '';
  document
    .querySelectorAll<HTMLScriptElement>(`script[type="${SCRIPT_TYPE}"]`)
    .forEach((script) => {
      code += `${script.textContent ?? script.innerHTML}\n`;
    });
  return code;
};

const escapeElixirString = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/#{/g, '#\\{');

const wrapElixir = (code: string, input: string) => {
  // The user source is embedded as a string and parsed first with
  // Code.string_to_quoted/1: a syntax error becomes a tagged value instead of
  // an exception that would wedge (or kill) the VM with no reply.
  const source = escapeElixirString(code);
  const stdin = escapeElixirString(input);
  return `livecodes_input = "${stdin}"
livecodes_source = "${source}"
gl = Process.group_leader()
dev = :livecodes_io.start(livecodes_input)
Process.group_leader(self(), dev)
result =
  try do
    case Code.string_to_quoted(livecodes_source) do
      {:error, {meta, message, _token}} ->
        line = if is_list(meta), do: Keyword.get(meta, :line, 0), else: 0
        {:lc_error, :syntax, "SyntaxError: " <> to_string(message) <> " (line " <> to_string(line) <> ")", ""}
      {:error, err} ->
        {:lc_error, :syntax, "SyntaxError: " <> inspect(err), ""}
      {:ok, _} ->
        try do
          {value, _binding} = Code.eval_string(livecodes_source, livecodes_input: livecodes_input)
          {:lc_ok, value}
        rescue
          e -> {:lc_error, :error, inspect(e.__struct__) <> ": " <> Exception.message(e), ""}
        catch
          :throw, {:lc_exit, status} -> {:lc_exit, status}
          kind, other -> {:lc_error, kind, inspect(other), ""}
        end
    end
  after
    Process.group_leader(self(), gl)
    # Terminals are line buffered: a final newline flushes an IO.write/1 that
    # did not end in a newline. The main thread drops the resulting trailing
    # newline so the observable output does not change.
    IO.write("\\n")
  end
:livecodes_io.stop(dev)
case result do
  {:lc_ok, value} ->
    text = inspect(value)
    text = if byte_size(text) > 1500, do: binary_part(text, 0, 1500) <> "...", else: text
    "__LC_OK__" <> Base.encode64(text)
  {:lc_error, kind, message, _stack} ->
    message = if byte_size(message) > 1000, do: binary_part(message, 0, 1000) <> "...", else: message
    "__LC_ERROR__" <> Base.encode64(to_string(kind)) <> "|" <> Base.encode64(message)
  {:lc_exit, status} ->
    "__LC_EXIT__" <> Integer.to_string(status)
end`;
};

const OK_TAG = '__LC_OK__';
const ERROR_TAG = '__LC_ERROR__';
const EXIT_TAG = '__LC_EXIT__';
const LEGACY_EXIT_TAG = /^\{:?lc_exit, (-?\d+)\}$/;
const LEGACY_ERROR_TAG = /^\{:?lc_error, ([\s\S]*)\}$/;

const decodeBase64 = (value: string): string => {
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
const normalizeResultText = (data: unknown): string => {
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

const parseElixirResult = (
  text: string,
): { value: string | null; error: string | null; exitCode: number } => {
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
    const detail = message || stack || 'Elixir error';
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

window.livecodes ??= {};
window.livecodes.elixir ??= {} as ElixirWasmApi;
const elixir = window.livecodes.elixir;
elixir.ready = false;
elixir.evals = (elixir.evals ?? 0) + 1;
const thisEval = elixir.evals;
console.log(
  `[elixir-wasm] script evaluated (#${thisEval}), ` +
    `elixir script tags: ${document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`).length}, ` +
    `isolated: ${window.crossOriginIsolated}, SAB: ${typeof SharedArrayBuffer !== 'undefined'}`,
);
mark('script-eval', {
  evalId: thisEval,
  isolated: window.crossOriginIsolated,
  sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
});

// LiveReload updates rewrite the result document in rapid succession and the
// window `load` event is not reliably fired after coalesced rewrites, so runs
// are scheduled by polling the parser state instead of listening for `load`.
// Only the latest evaluation runs; superseded ones abort silently.
const waitForParseThenRun = async (evalId: number): Promise<void> => {
  const start = Date.now();
  while (document.readyState === 'loading' && Date.now() - start < 30_000) {
    if (elixir.evals !== evalId) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  if (elixir.evals !== evalId) return;
  postLoading(true);
  try {
    await elixir.run(elixir.input);
  } finally {
    postLoading(false);
  }
};
void waitForParseThenRun(thisEval);

// AtomVM compiles this module on first boot, and compile time is the dominant
// cold-start cost. Keep it small; the worker keeps the compiled module alive
// across LiveReload edits.
const PRELUDE = `defmodule :livecodes_io do
  def start(stdin) do
    lines =
      stdin
      |> to_string()
      |> String.split("\\n", trim: true)
      |> Enum.map(&(&1 <> "\\n"))

    spawn(fn -> loop(lines) end)
  end

  def stop(dev), do: send(dev, :lc_stop)

  def halt, do: throw({:lc_exit, 0})
  def halt(status), do: throw({:lc_exit, status})

  defp loop(lines) do
    receive do
      :lc_stop -> :ok
      {:io_request, from, reply_as, req} ->
        {reply, rest} = handle(req, lines)
        send(from, {:io_reply, reply_as, reply})
        loop(rest)
    end
  end

  defp handle({:get_line, _enc, _prompt}, [line | rest]), do: {line, rest}
  defp handle({:get_line, _enc, _prompt}, []), do: {:eof, []}
  defp handle({:put_chars, _enc, chars}, lines) do
    IO.write(chars)
    {:ok, lines}
  end
  defp handle({:put_chars, chars}, lines) do
    IO.write(chars)
    {:ok, lines}
  end
  defp handle(other, lines), do: {{:error, {:enotsup, other}}, lines}
end`;

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

/**
 * Main-thread side of the Elixir runtime.
 *
 * The runtime runs in a Worker owned by the result window. LiveReload rewrites
 * the result document with `document.open()/write()/close()`, which keeps the
 * window (and therefore this Worker) alive; editing code no longer destroys
 * the VM. The bridge is stored on `window.livecodes.elixir`, which also
 * survives document rewrites.
 */
class ElixirBridge {
  private bundlePath: string;
  private onStdout: (text: string) => void;
  private onStderr: (text: string) => void;
  private onReady: ((bridge: ElixirBridge) => Promise<void>) | null;
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
    onStdout?: (text: string) => void;
    onStderr?: (text: string) => void;
    onReady?: (bridge: ElixirBridge) => Promise<void>;
  }) {
    this.bundlePath = options.bundlePath;
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
    onStdout?: (text: string) => void;
    onStderr?: (text: string) => void;
    onReady?: (bridge: ElixirBridge) => Promise<void>;
  }): Promise<ElixirBridge> {
    const bridge = new ElixirBridge(options);
    await bridge.start();
    return bridge;
  }

  public ensureReady(): Promise<void> {
    return this.start();
  }

  public async call(args: unknown, options: { timeoutMs?: number } = {}): Promise<any> {
    await this.start();
    if (!this.isReady || this.initProcess == null) {
      throw new Error(this.failed || 'Elixir runtime is not ready');
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
        this.stopWorker(`Elixir evaluation timed out after ${timeoutMs} ms`);
        reject(new Error(`Elixir evaluation timed out after ${timeoutMs} ms`));
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
    if (this.destroyed) throw new Error('Elixir runtime was destroyed');
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
    mark('worker-create-start');
    const source = String(workerSource).replace('__LIVECODES_ELIXIR_BUNDLE_URL__', this.bundlePath);
    const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    this.workerUrl = url;
    try {
      const worker = new Worker(url, { type: 'module' });
      this.worker = worker;
      worker.addEventListener('message', this.onWorkerMessage);
      worker.addEventListener('error', this.onWorkerError);
      worker.addEventListener('messageerror', this.onWorkerMessageError);
      mark('worker-created');
      const initPromise = this.waitFor(bridgeMessages.init, INIT_VM_TIMEOUT_MS);
      const startPromise = this.waitFor(bridgeMessages.startVm, INIT_VM_TIMEOUT_MS);
      await initPromise;
      mark('worker-init-message');
      console.log('[elixir-wasm] worker started, waiting for the VM…');
      this.initProcess = await startPromise;
      if (generation !== this.generation) {
        throw new Error('Elixir runtime was restarted');
      }
      mark('worker-vm-ready');
      console.log('[elixir-wasm] VM is ready.');
      this.ready = true;
      if (this.onReady != null) {
        await this.onReady(this);
      }
      mark('worker-prelude-ready');
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
    if (this.worker == null) throw new Error('Elixir worker is not running');
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
        this.stopWorker('Elixir runtime requested a restart');
        break;
      case bridgeMessages.fatal:
        {
          const detail =
            typeof value?.message === 'string' ? value.message : 'unknown runtime failure';
          this.onStderr(`Runtime failed: ${detail}\n`);
          this.stopWorker(`Elixir runtime failed: ${detail}`);
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
    const message = `Elixir worker error: ${detail}`;
    this.onStderr(`${message}\n`);
    this.stopWorker(message);
  };

  private onWorkerMessageError = (): void => {
    const message = 'Elixir worker message could not be deserialized';
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
    mark(`worker:${value.name}`, {
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

const drain = (arr: string[]) => {
  const out = arr.join('\n');
  arr.length = 0;
  return out;
};

const initBridge = async (): Promise<void> => {
  mark('init-start');
  postLoading(true);
  const stdout: string[] = elixir.stdout ?? [];
  const stderr: string[] = elixir.stderr ?? [];
  elixir.stdout = stdout;
  elixir.stderr = stderr;
  try {
    const bridge = await ElixirBridge.init({
      bundlePath: BUNDLE_URL,
      onStdout: (text: string) => stdout.push(text),
      onStderr: (text: string) => stderr.push(text),
      onReady: async (readyBridge) => {
        // Drop boot chatter (module import, fetches, wasm init) so it does not
        // leak into the first run's output after a boot or crash recovery.
        drain(stdout);
        drain(stderr);
        mark('prelude-start');
        const prelude = await readyBridge.call(['eval_elixir', PRELUDE], {
          timeoutMs: EVAL_TIMEOUT_MS,
        });
        mark('prelude-end');
        const preludeText = normalizeResultText(prelude?.data);
        const preludeError = parseElixirResult(preludeText).error;
        if (preludeError != null) {
          throw new Error(`Elixir prelude failed: ${preludeError}`);
        }
        // Warnings emitted while compiling the prelude are not user output.
        drain(stdout);
        drain(stderr);
      },
    });
    elixir.popcorn = bridge;
    elixir.failed = false;
    mark('init-ready');
  } catch (err) {
    // Surface anything the runtime reported before dying (e.g. bundle/AtomVM fetch failures).
    if (stderr.length > 0) console.error(drain(stderr));
    if (stdout.length > 0) console.log(drain(stdout));
    elixir.failed = true;
    elixir.error = getErrorMessage(err);
    mark('init-failed', { error: elixir.error });
    throw err;
  } finally {
    postLoading(false);
  }
};

// `ensureInit` is stored on the Elixir API object so it survives LiveReload
// document rewrites and can reuse the existing worker. A rejected attempt is
// cleared, so the next run (or retry()) starts a fresh boot instead of
// replaying a memoized failure forever.
elixir.ensureInit ??= async () => {
  const existing = elixir.popcorn as ElixirBridge | undefined;
  if (existing != null) {
    await existing.ensureReady();
    return;
  }
  if (elixir.init == null) {
    const attempt = initBridge();
    elixir.init = attempt;
    attempt.catch(() => {
      if (elixir.init === attempt) elixir.init = undefined;
    });
  }
  await elixir.init;
};

const runOnce = async (input?: string, runId?: number): Promise<RunResult> => {
  if (input !== undefined) elixir.input = input;
  const stdin = `${input ?? elixir.input ?? ''}`;
  const isLatest = () => runId == null || runId === elixir.runId;
  elixir.output = null;
  elixir.error = null;
  elixir.exitCode = null;
  elixir.value = null;
  elixir.warnings = null;
  elixir.ready = false;

  const code = readCode();
  mark('run-start', { runId, codeBytes: code.length, inputBytes: stdin.length });
  console.log(`[elixir-wasm] run requested, code bytes: ${code.length}`);
  if (!code.trim()) {
    console.log('[elixir-wasm] empty code, skipping run.');
    mark('run-empty', { runId });
    if (isLatest()) {
      elixir.output = null;
      elixir.error = null;
      elixir.exitCode = 0;
      elixir.value = null;
      elixir.warnings = null;
      elixir.ready = true;
      elixir.failed = false;
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
  if (!window.crossOriginIsolated) {
    const message =
      'Error: Elixir needs a cross-origin isolated result page ' +
      '(COOP/COEP headers). The AtomVM runtime cannot boot without SharedArrayBuffer.';
    console.error(message);
    mark('run-not-isolated', { runId });
    if (isLatest()) {
      elixir.error = message;
      elixir.exitCode = 1;
      elixir.ready = true;
      elixir.failed = true;
    }
    return { output: null, error: message, exitCode: 1, value: null, warnings: null };
  }

  try {
    await elixir.ensureInit?.();
    const popcorn = elixir.popcorn as ElixirBridge | undefined;
    if (popcorn == null) throw new Error('Elixir runtime is not initialized');
    elixir.stdout!.length = 0;
    elixir.stderr!.length = 0;
    mark('eval-start', { runId });
    const { data } = await popcorn.call(['eval_elixir', wrapElixir(code, stdin)], {
      timeoutMs: EVAL_TIMEOUT_MS,
    });
    const printed = drain(elixir.stdout!);
    const errPrinted = drain(elixir.stderr!);
    const parsed = parseElixirResult(normalizeResultText(data));
    // The wrapper appends one newline to flush line-buffered IO.write/1. Drop
    // exactly that newline; a single IO.puts chunk may include it.
    const outputText = printed.endsWith('\n') ? printed.slice(0, -1) : printed;
    const output = outputText || null;
    const warnings = errPrinted || null;
    const latest = isLatest();
    if (latest) {
      elixir.output = output;
      elixir.error = parsed.error;
      elixir.exitCode = parsed.exitCode;
      elixir.value = parsed.value;
      elixir.warnings = warnings;
      elixir.ready = true;
      elixir.failed = false;
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
    const runtimeStderr = latest ? drain(elixir.stderr ?? []) : '';
    const base = 'Error: ' + getErrorMessage(err);
    const message = runtimeStderr.trim() ? `${base}\n${runtimeStderr.trim()}` : base;
    if (latest) {
      elixir.output = null;
      elixir.error = message;
      elixir.exitCode = 1;
      elixir.value = null;
      elixir.warnings = null;
      elixir.ready = true;
      elixir.failed = true;
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

const SUPERSEDE_TIMEOUT_MS = 10_000;
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
    const bridge = elixir.popcorn as ElixirBridge | undefined;
    mark('run-supersede-timeout', { pendingRunId: pendingRun.runId });
    bridge?.cancel('superseded by a newer run');
  }, SUPERSEDE_TIMEOUT_MS);
};

const finishRun = (task: Promise<RunResult>) => {
  if (activeRun !== task) return;
  activeRun = null;
  elixir.currentRun = null;
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
  elixir.currentRun = task.then(
    () => undefined,
    () => undefined,
  );
  void task.then(
    () => finishRun(task),
    () => finishRun(task),
  );
  return task;
};

elixir.run ??= async (input?: string): Promise<RunResult> => {
  const runId = (elixir.runId ?? 0) + 1;
  elixir.runId = runId;
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

elixir.retry ??= async () => {
  elixir.failed = false;
  elixir.error = null;
  elixir.ready = false;
  elixir.init = undefined;
  const bridge = elixir.popcorn as ElixirBridge | undefined;
  try {
    if (bridge != null) {
      await bridge.restart();
    } else {
      await elixir.ensureInit?.();
    }
  } catch (err) {
    elixir.failed = true;
    elixir.error = getErrorMessage(err);
    throw err;
  }
};

elixir.timings = timings;
const LOADED_TIMEOUT_MS = INIT_VM_TIMEOUT_MS + EVAL_TIMEOUT_MS;
elixir.loaded = new Promise<void>((resolve, reject) => {
  const started = performance.now();
  const interval = setInterval(() => {
    if (elixir.failed) {
      clearInterval(interval);
      mark('loaded-rejected', { error: elixir.error });
      reject(new Error(elixir.error || 'Failed to initialize the Elixir environment'));
    } else if (elixir.ready) {
      clearInterval(interval);
      mark('loaded-resolved');
      resolve();
    } else if (performance.now() - started > LOADED_TIMEOUT_MS) {
      clearInterval(interval);
      elixir.failed = true;
      elixir.error = 'Timed out initializing the Elixir runtime';
      mark('loaded-timeout');
      reject(new Error(elixir.error));
    }
  }, 50);
});
// The starter awaits `loaded` and may not catch. Attaching a no-op handler
// keeps a recoverable boot failure from becoming an unhandled rejection; the
// original promise still rejects for callers that want the error.
void elixir.loaded.catch(() => undefined);

window.livecodes['elixir-wasm'] = elixir;
