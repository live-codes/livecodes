import { expect } from '@playwright/test';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';

test.describe('Config', () => {
  test('autoupdate', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ autoupdate: true }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await page.keyboard.type('hello, world!');

    await app.waitForTimeout(600);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
  });
});
