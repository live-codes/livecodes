import { expect, type Frame, type Page } from '@playwright/test';
import { test } from '../test-fixtures';

const APP_URL = `${process.env.TEST_URL || 'http://localhost:8080'}?template=elixir-wasm`;

interface RunEnd {
  runId?: number;
  exitCode?: number;
  latest?: boolean;
  hasError?: boolean;
  stdoutBytes?: number;
  stderrBytes?: number;
  empty?: boolean;
}

interface ElixirState {
  evals?: number;
  runId?: number;
  ready?: boolean;
  failed?: boolean;
  output?: string | null;
  value?: string | null;
  warnings?: string | null;
  error?: string | null;
  exitCode?: number | null;
  popcornReady?: boolean;
  timings: Array<{ name: string; detail?: Record<string, any> }>;
}

const getResultFrame = (page: Page): Frame | null => page.frame('result');

const requireResultFrame = (page: Page): Frame => {
  const frame = getResultFrame(page);
  if (frame == null) throw new Error('Result frame is not available');
  return frame;
};

const readState = async (page: Page): Promise<ElixirState | null> => {
  const frame = getResultFrame(page);
  if (frame == null) return null;
  try {
    return await frame.evaluate(() => {
      const elixir = (window as any).livecodes?.elixir;
      if (elixir == null) return null;
      return {
        evals: elixir.evals,
        runId: elixir.runId,
        ready: elixir.ready,
        failed: elixir.failed,
        output: elixir.output,
        value: elixir.value,
        warnings: elixir.warnings,
        error: elixir.error,
        exitCode: elixir.exitCode,
        popcornReady: elixir.popcorn?.isReady,
        timings: elixir.timings ?? [],
      };
    });
  } catch {
    // LiveReload may be replacing the document; retry from the caller.
    return null;
  }
};

const latestRunEnd = (state: ElixirState, runId: number): RunEnd | undefined =>
  [...state.timings]
    .reverse()
    .find((timing) => timing.name === 'run-end' && timing.detail?.runId === runId)?.detail;

const waitForState = async (
  page: Page,
  predicate: (state: ElixirState) => boolean,
  timeout = 120_000,
): Promise<ElixirState> => {
  const start = Date.now();
  let last: ElixirState | null = null;
  while (Date.now() - start < timeout) {
    last = await readState(page);
    if (last != null && predicate(last)) return last;
    await page.waitForTimeout(25);
  }
  throw new Error(`Timed out waiting for Elixir state: ${JSON.stringify(last)}`);
};

const waitForRun = async (page: Page, runId: number, timeout = 120_000) =>
  waitForState(
    page,
    (state) =>
      latestRunEnd(state, runId)?.latest === true ||
      state.timings.some(
        (timing) =>
          timing.name === 'run-error' &&
          timing.detail?.runId === runId &&
          timing.detail?.latest === true,
      ),
    timeout,
  );

const installApiHook = async (page: Page) => {
  await page.addInitScript(() => {
    window.addEventListener('livecodes-app-loaded', (event) => {
      (window as any).livecodesApi = (event as CustomEvent).detail;
    });
  });
};

const waitForApi = async (page: Page) => {
  await page.waitForFunction(() => (window as any).livecodesApi != null, undefined, {
    timeout: 30_000,
  });
};

const setSource = async (frame: Frame, source: string) => {
  await frame.evaluate((content) => {
    const scripts = document.querySelectorAll<HTMLScriptElement>('script[type="text/elixir-wasm"]');
    if (scripts.length === 0) throw new Error('No Elixir script tag found');
    scripts[scripts.length - 1].textContent = content;
  }, source);
};

const runDirect = async (page: Page, source: string, input?: string) => {
  const frame = requireResultFrame(page);
  await setSource(frame, source);
  const runId = await frame.evaluate((value) => {
    const elixir = (window as any).livecodes.elixir;
    if (value === undefined) {
      void elixir.run();
    } else {
      void elixir.run(value);
    }
    return elixir.runId;
  }, input);
  return waitForRun(page, runId);
};

const setConfigAndTrigger = async (page: Page, source: string) => {
  const before = await readState(page);
  await page.evaluate(async (content) => {
    const api = (window as any).livecodesApi;
    await api.setConfig({ script: { content } });
    await api.run();
  }, source);
  return before;
};

const setConfigAndRun = async (page: Page, source: string) => {
  const before = await setConfigAndTrigger(page, source);
  return waitForState(
    page,
    (state) =>
      state.evals != null &&
      before?.evals != null &&
      state.evals > before.evals &&
      state.runId != null &&
      before?.runId != null &&
      state.runId > before.runId &&
      latestRunEnd(state, state.runId)?.latest === true,
    30_000,
  );
};

const boot = async (page: Page) => {
  await installApiHook(page);
  await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await waitForApi(page);
  return waitForRun(page, 1, 180_000);
};

test.describe('Elixir (Wasm)', () => {
  test.describe.configure({ timeout: 120_000 });

  test('runs, keeps the VM alive across edits, and reports IO/errors', async ({ page }) => {
    const initial = await boot(page);
    expect(initial.ready).toBe(true);
    expect(initial.failed).toBe(false);
    expect(initial.output).toBe('Elixir\n0');
    expect(initial.value).toBe(':ok');
    expect(initial.error).toBeNull();

    const isolation = await requireResultFrame(page).evaluate(() => ({
      isolated: window.crossOriginIsolated,
      sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
    }));
    expect(isolation).toEqual({ isolated: false, sharedArrayBuffer: false });

    const warm = await requireResultFrame(page).evaluate(async () => {
      const elixir = (window as any).livecodes.elixir;
      const start = performance.now();
      const result = await elixir.run();
      return { ms: performance.now() - start, ...result };
    });
    expect(warm.output).toBe('Elixir\n0');
    expect(warm.ms).toBeLessThan(5_000);

    const stdout = await runDirect(page, 'IO.puts("hello")');
    expect(stdout.output).toBe('hello');
    expect(stdout.value).toBe(':ok');

    const returnValue = await runDirect(page, '1 + 1');
    expect(returnValue.output).toBeNull();
    expect(returnValue.value).toBe('2');
    expect(returnValue.exitCode).toBe(0);

    const stdin = await runDirect(page, 'IO.puts(String.trim(IO.gets("")))', 'hello');
    expect(stdin.output).toBe('hello');
    const stdinReused = await runDirect(page, 'IO.puts(String.trim(IO.gets("")))');
    expect(stdinReused.output).toBe('hello');

    const write = await runDirect(page, 'IO.write("abc")');
    expect(write.output).toBe('abc');
    const next = await runDirect(page, 'IO.puts("next")');
    expect(next.output).toBe('next');

    const syntax = await runDirect(page, 'defmodule broken do');
    expect(syntax.error).toContain('SyntaxError');
    expect(syntax.exitCode).toBe(1);
    expect(syntax.failed).toBe(false);

    const runtime = await runDirect(page, 'raise "boom"');
    expect(runtime.error).toBe('RuntimeError: boom');
    expect(runtime.exitCode).toBe(1);
    expect(runtime.failed).toBe(false);

    const warning = await runDirect(page, 'IO.warn("careful")');
    expect(warning.error).toBeNull();
    expect(warning.exitCode).toBe(0);
    expect(warning.warnings).toContain('careful');

    const empty = await runDirect(page, '');
    expect(empty.output).toBeNull();
    expect(empty.error).toBeNull();
    expect(empty.exitCode).toBe(0);
    expect(empty.ready).toBe(true);
  });

  test('keeps the VM alive across config edits', async ({ page }) => {
    const initial = await boot(page);
    const workerCreatesBefore = initial.timings.filter(
      (timing) => timing.name === 'worker-create-start',
    ).length;

    const edited = await setConfigAndRun(page, 'IO.puts("edited")\n:edited_value');
    expect(edited.output).toBe('edited');
    expect(edited.value).toBe(':edited_value');
    expect(edited.error).toBeNull();
    expect(edited.timings.filter((timing) => timing.name === 'worker-create-start').length).toBe(
      workerCreatesBefore,
    );
  });

  test('coalesces rapid edits and recovers from a VM crash', async ({ page }) => {
    const initial = await boot(page);
    const workerCreates = initial.timings.filter(
      (timing) => timing.name === 'worker-create-start',
    ).length;

    const beforeSlow = await readState(page);
    await page.evaluate(async () => {
      const api = (window as any).livecodesApi;
      await api.setConfig({
        script: { content: 'Process.sleep(3000)\nIO.puts("slow")\n:slow' },
      });
      await api.run();
    });
    const slow = await waitForState(
      page,
      (state) =>
        state.runId != null &&
        beforeSlow?.runId != null &&
        state.runId > beforeSlow.runId &&
        state.timings.some(
          (timing) => timing.name === 'run-start' && timing.detail?.runId === state.runId,
        ),
      30_000,
    );
    const slowRunId = slow.runId!;
    // The slow evaluation is synchronous inside the worker; give it a moment
    // to enter the call before issuing edits.
    await page.waitForTimeout(200);

    // Trigger three edits while the slow run is still active. Only the newest
    // pending run should execute after it.
    const rapidStart = Date.now();
    await page.evaluate(async () => {
      const api = (window as any).livecodesApi;
      for (const content of [
        'IO.puts("one")\n:one',
        'IO.puts("two")\n:two',
        'IO.puts("three")\n:three',
      ]) {
        await api.setConfig({ script: { content } });
        await api.run();
      }
    });
    const rapid = await waitForState(
      page,
      (state) =>
        state.output === 'three' &&
        state.runId != null &&
        state.runId > slowRunId &&
        latestRunEnd(state, state.runId)?.latest === true,
      30_000,
    );
    expect(rapid.value).toBe(':three');
    expect(rapid.error).toBeNull();
    expect(Date.now() - rapidStart).toBeLessThan(30_000);
    expect(rapid.timings.filter((timing) => timing.name === 'worker-create-start').length).toBe(
      workerCreates,
    );
    expect(rapid.timings.some((timing) => timing.name === 'run-superseded')).toBe(true);

    const crash = await runDirect(page, 'System.halt(1)');
    expect(crash.failed).toBe(true);
    expect(crash.error).toBeTruthy();

    const recovered = await runDirect(page, 'IO.puts("recovered")\n:recovered');
    expect(recovered.output).toBe('recovered');
    expect(recovered.value).toBe(':recovered');
    expect(recovered.error).toBeNull();
    expect(recovered.failed).toBe(false);
    expect(
      recovered.timings.filter((timing) => timing.name === 'worker-create-start').length,
    ).toBeGreaterThan(workerCreates);
  });

  test('supersedes a hung evaluation after the timeout', async ({ page }) => {
    await boot(page);
    const beforeHung = await setConfigAndTrigger(page, 'receive do :never -> :ok end');
    const hung = await waitForState(
      page,
      (state) =>
        state.runId != null &&
        beforeHung?.runId != null &&
        state.runId > beforeHung.runId &&
        state.timings.some(
          (timing) => timing.name === 'eval-start' && timing.detail?.runId === state.runId,
        ),
      30_000,
    );
    // The evaluation is synchronous inside the worker; let it enter the call.
    await page.waitForTimeout(250);

    const start = Date.now();
    await setConfigAndTrigger(page, 'IO.puts("newer")\n:newer');
    const newer = await waitForState(
      page,
      (state) =>
        state.output === 'newer' &&
        state.runId != null &&
        state.runId > hung.runId! &&
        latestRunEnd(state, state.runId)?.latest === true,
      30_000,
    );
    expect(newer.value).toBe(':newer');
    expect(newer.error).toBeNull();
    expect(newer.timings.some((timing) => timing.name === 'run-supersede-timeout')).toBe(true);
    expect(Date.now() - start).toBeGreaterThanOrEqual(9_500);
  });

  test('reports a failed boot and retries without reloading the page', async ({ page }) => {
    await page.context().route('**/AtomVM.mjs', (route) => route.abort());
    await installApiHook(page);
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });

    const failed = await waitForState(page, (state) => state.failed === true, 30_000);
    expect(failed.error).toContain('Failed to fetch');

    await page.context().unroute('**/AtomVM.mjs');
    await requireResultFrame(page).evaluate(async () => {
      await (window as any).livecodes.elixir.retry();
    });
    const retried = await waitForState(
      page,
      (state) => state.failed === false && state.popcornReady === true,
      120_000,
    );
    expect(retried.popcornReady).toBe(true);

    const rerun = await runDirect(page, 'IO.puts("after retry")\n:ok');
    expect(rerun.output).toBe('after retry');
    expect(rerun.error).toBeNull();
  });

  test('runs the result frame in the dev sandbox without cross-origin isolation', async ({
    page,
  }) => {
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    const frame = await (async () => {
      const start = Date.now();
      while (Date.now() - start < 30_000) {
        const result = getResultFrame(page);
        if (result != null && result.url().startsWith('http')) return result;
        await page.waitForTimeout(100);
      }
      throw new Error('Result frame did not load');
    })();

    const response = await page.request.get(frame.url());
    const headers = response.headers();
    expect(headers['cross-origin-opener-policy']).toBeUndefined();
    expect(headers['cross-origin-embedder-policy']).toBeUndefined();

    const isolated = await frame.evaluate(() => window.crossOriginIsolated);
    expect(isolated).toBe(false);
  });

  test('does not declare isolation headers in the static deploy configs', async () => {
    const { readFileSync } = await import('fs');
    const productionHeaders = readFileSync('src/_headers', 'utf8');
    expect(productionHeaders).not.toContain('Cross-Origin-Opener-Policy');
    expect(productionHeaders).not.toContain('Cross-Origin-Embedder-Policy');
    expect(productionHeaders).not.toContain('Cross-Origin-Resource-Policy');

    const netlifyConfig = readFileSync('src/netlify.toml', 'utf8');
    expect(netlifyConfig).not.toContain('cross-origin-opener-policy');
    expect(netlifyConfig).not.toContain('cross-origin-embedder-policy');
    expect(netlifyConfig).not.toContain('cross-origin-resource-policy');
  });
});
