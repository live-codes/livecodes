import { expect, type Frame, type Page } from '@playwright/test';
import { test } from '../test-fixtures';

const APP_URL = `${process.env.TEST_URL || 'http://localhost:8080'}?template=typst`;

const getResultFrame = (page: Page): Frame | null => page.frame('result');

const readTypstState = async (page: Page) => {
  const frame = getResultFrame(page);
  if (frame == null) return null;
  try {
    return await frame.evaluate(() => {
      const typst = (window as any).livecodes?.typst;
      if (typst == null) return null;
      return {
        ready: typst.ready as boolean,
        failed: typst.failed as boolean,
        error: typst.error as string | null,
        outputLength: (typst.output?.length ?? 0) as number,
        hasSvg: Boolean(document.querySelector('svg.typst-doc')),
        hasRunner: Boolean(typst.runner),
        bodyText: document.body.innerText.slice(0, 200),
      };
    });
  } catch {
    // The result document may be replaced by LiveReload; retry.
    return null;
  }
};

const waitForState = async (
  page: Page,
  predicate: (state: NonNullable<Awaited<ReturnType<typeof readTypstState>>>) => boolean,
  timeout = 180_000,
) => {
  const start = Date.now();
  let last: Awaited<ReturnType<typeof readTypstState>> = null;
  while (Date.now() - start < timeout) {
    last = await readTypstState(page);
    if (last != null && predicate(last)) return last;
    await page.waitForTimeout(100);
  }
  throw new Error(`Timed out waiting for Typst state: ${JSON.stringify(last)}`);
};

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

test.describe('Typst', () => {
  test.describe.configure({ timeout: 240_000 });

  test('renders the starter document and recovers from compile errors', async ({ page }) => {
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    const initial = await waitForState(page, (state) => state.ready || state.error != null);

    expect(initial.failed).toBe(false);
    expect(initial.error).toBeNull();
    expect(initial.outputLength).toBeGreaterThan(0);
    expect(initial.hasSvg).toBe(true);

    const updated = await getResultFrame(page)!.evaluate(async () => {
      const result = await (window as any).livecodes.typst.run('= Updated\n\nSecond *document*.');
      return {
        error: result.error as string | null,
        outputLength: (result.output?.length ?? 0) as number,
        hasSvg: Boolean(document.querySelector('svg.typst-doc')),
      };
    });
    expect(updated.error).toBeNull();
    expect(updated.outputLength).toBeGreaterThan(0);
    expect(updated.hasSvg).toBe(true);

    const broken = await getResultFrame(page)!.evaluate(async () => {
      const result = await (window as any).livecodes.typst.run('= Broken\n\n#let x = ');
      return {
        error: result.error as string | null,
        output: result.output as string | null,
        bodyText: document.body.innerText,
      };
    });
    expect(broken.error).toContain('expected expression');
    expect(broken.output).toBeNull();
    expect(broken.bodyText).toContain('expected expression');

    const recovered = await getResultFrame(page)!.evaluate(async () => {
      const result = await (window as any).livecodes.typst.run('= Recovered');
      return {
        error: result.error as string | null,
        outputLength: (result.output?.length ?? 0) as number,
      };
    });
    expect(recovered.error).toBeNull();
    expect(recovered.outputLength).toBeGreaterThan(0);
  });

  test('re-renders on LiveReload and reuses the worker', async ({ page }) => {
    await installApiHook(page);
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await waitForApi(page);
    const initial = await waitForState(page, (state) => state.ready || state.error != null);
    expect(initial.hasRunner).toBe(true);

    await getResultFrame(page)!.evaluate(() => {
      (window as any).typstRunnerRef = (window as any).livecodes.typst.runner;
    });

    await page.evaluate(async () => {
      const api = (window as any).livecodesApi;
      await api.setConfig({ script: { content: '= LiveReload\n\nUpdated by the app.' } });
      await api.run();
    });

    const updated = await waitForState(
      page,
      (state) => state.ready && state.error == null && state.bodyText.includes('LiveReload'),
    );
    expect(updated.hasSvg).toBe(true);
    expect(updated.outputLength).toBeGreaterThan(0);

    const sameRunner = await getResultFrame(page)!.evaluate(
      () => (window as any).livecodes.typst.runner === (window as any).typstRunnerRef,
    );
    expect(sameRunner).toBe(true);
  });
});
