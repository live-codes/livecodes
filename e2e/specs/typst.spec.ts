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

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate({ timeout: 180_000 });

    const result = getResult();
    const svg = result.locator('svg');
    await expect(svg).toHaveCount(1, { timeout: 180_000 });
    expect(await svg.evaluate((element) => element.childElementCount)).toBeGreaterThan(0);
  });
});
