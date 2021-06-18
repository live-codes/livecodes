import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector } from '../helpers';

test.describe('App Defaults', () => {
  test('Title', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());
    const name = await page.title();
    expect(name).toBe('LocalPen');
  });

  test('empty result page', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { getResult } = await getLoadedApp(page);
    const resultText = await getResult().innerText('body');

    expect(resultText.trim()).toBe('');
  });

  test('autofocus active editor', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await page.keyboard.type('hello, world!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
  });
});
