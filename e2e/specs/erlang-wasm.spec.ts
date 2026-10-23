import { expect, type Frame, type Page } from '@playwright/test';
import { test } from '../test-fixtures';

const APP_URL = `${process.env.TEST_URL || 'http://localhost:8080'}?template=erlang-wasm`;

interface RunEnd {
  runId?: number;
  exitCode?: number;
  latest?: boolean;
  hasError?: boolean;
  empty?: boolean;
}

interface ErlangState {
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

const readState = async (page: Page): Promise<ErlangState | null> => {
  const frame = getResultFrame(page);
  if (frame == null) return null;
  try {
    return await frame.evaluate(() => {
      const erlang = (window as any).livecodes?.erlang;
      if (erlang == null) return null;
      return {
        evals: erlang.evals,
        runId: erlang.runId,
        ready: erlang.ready,
        failed: erlang.failed,
        output: erlang.output,
        value: erlang.value,
        warnings: erlang.warnings,
        error: erlang.error,
        exitCode: erlang.exitCode,
        popcornReady: erlang.popcorn?.isReady,
        timings: erlang.timings ?? [],
      };
    });
  } catch {
    // LiveReload may be replacing the document; retry from the caller.
    return null;
  }
};

const latestRunEnd = (state: ErlangState, runId: number): RunEnd | undefined =>
  [...state.timings]
    .reverse()
    .find((timing) => timing.name === 'run-end' && timing.detail?.runId === runId)?.detail;

const waitForState = async (
  page: Page,
  predicate: (state: ErlangState) => boolean,
  timeout = 120_000,
): Promise<ErlangState> => {
  const start = Date.now();
  let last: ErlangState | null = null;
  while (Date.now() - start < timeout) {
    last = await readState(page);
    if (last != null && predicate(last)) return last;
    await page.waitForTimeout(25);
  }
  throw new Error(`Timed out waiting for Erlang state: ${JSON.stringify(last)}`);
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
    const scripts = document.querySelectorAll<HTMLScriptElement>('script[type="text/erlang-wasm"]');
    if (scripts.length === 0) throw new Error('No Erlang script tag found');
    scripts[scripts.length - 1].textContent = content;
  }, source);
};

const runDirect = async (page: Page, source: string, input?: string) => {
  const frame = requireResultFrame(page);
  await setSource(frame, source);
  const runId = await frame.evaluate((value) => {
    const erlang = (window as any).livecodes.erlang;
    if (value === undefined) {
      void erlang.run();
    } else {
      void erlang.run(value);
    }
    return erlang.runId;
  }, input);
  return waitForRun(page, runId);
};

test.describe('Erlang (Wasm)', () => {
  test.describe.configure({ timeout: 120_000 });

  test('runs expressions, modules, stdin, errors, and exits', async ({ page }) => {
    await installApiHook(page);
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await waitForApi(page);
    const initial = await waitForRun(page, 1, 180_000);

    expect(initial.ready).toBe(true);
    expect(initial.failed).toBe(false);
    expect(initial.output).toBe('Erlang\n0');
    expect(initial.error).toBeNull();

    const isolation = await requireResultFrame(page).evaluate(() => ({
      isolated: window.crossOriginIsolated,
      sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
    }));
    expect(isolation).toEqual({ isolated: false, sharedArrayBuffer: false });

    const warm = await requireResultFrame(page).evaluate(async () => {
      const erlang = (window as any).livecodes.erlang;
      const start = performance.now();
      const result = await erlang.run();
      return { ms: performance.now() - start, ...result };
    });
    expect(warm.output).toBe('Erlang\n0');
    expect(warm.ms).toBeLessThan(5_000);

    const exit = await runDirect(page, 'erlang:halt(3).');
    expect(exit.exitCode).toBe(3);
    expect(exit.error).toBeNull();
    expect(exit.failed).toBe(false);

    const hello = await runDirect(page, 'io:format("hello~n").');
    expect(hello.output).toBe('hello');
    expect(hello.error).toBeNull();

    const value = await runDirect(page, '1 + 1.');
    expect(value.output).toBeNull();
    expect(value.value).toBe('2');
    expect(value.exitCode).toBe(0);

    const stdin = await runDirect(page, 'io:format("~s", [io:get_line("")]).', 'hello');
    expect(stdin.output).toBe('hello');
    expect(stdin.error).toBeNull();

    const moduleRun = await runDirect(
      page,
      '-module(m).\n-export([double/1]).\n\ndouble(X) -> X * 2.\n',
    );
    expect(moduleRun.error).toBeNull();
    const moduleCall = await runDirect(page, 'm:double(21).');
    expect(moduleCall.value).toBe('42');
    expect(moduleCall.error).toBeNull();

    const runtime = await runDirect(page, '1/0.');
    expect(runtime.error).toContain('badarith');
    expect(runtime.exitCode).toBe(1);
    expect(runtime.failed).toBe(false);

    const empty = await runDirect(page, '');
    expect(empty.output).toBeNull();
    expect(empty.error).toBeNull();
    expect(empty.exitCode).toBe(0);
  });
});
