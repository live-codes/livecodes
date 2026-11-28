import { expect } from '@playwright/test';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';

test.describe('Typst', () => {
  test.describe.configure({ timeout: 240_000 });

  test('compiles markup to SVG in the result page', async ({ page, getTestUrl }) => {
    const url = getTestUrl({
      typst: `= Hello, Typst!\n\nThis is *Typst* running in LiveCodes.`,
    });
    await page.goto(url);

    const { getResult } = await getLoadedApp(page);

    // The first compile downloads the typst.ts compiler, renderer and fonts.
    await expect
      .poll(() => getResult().locator('svg').count(), { timeout: 180_000 })
      .toBeGreaterThan(0);

    const svg = getResult().locator('svg').first();
    expect(await svg.evaluate((element) => element.childElementCount)).toBeGreaterThan(0);
  });
});
