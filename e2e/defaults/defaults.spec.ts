import { test, expect } from '@playwright/test';
import { getLoadedApp, getTestUrl, runButtonSelector, waitForEditorFocus } from '../helpers';

test.describe('App Defaults', () => {
  test('Title', async ({ page }) => {
    await page.goto(getTestUrl());
    const name = await page.title();
    expect(name).toBe('LocalPen');
  });

  test('autofocus active editor', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await page.keyboard.type('hello, world!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
  });
});
