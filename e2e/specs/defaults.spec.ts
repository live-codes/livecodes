import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp } from '../helpers';

test.describe('App Defaults', () => {
  test('Title', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());
    const name = await page.title();
    expect(name).toBe('LiveCodes');
  });

  test('empty result page', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.trim()).toBe('');
  });

  test('autofocus active editor', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);

    await page.keyboard.type('hello, world!');

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
  });
});
