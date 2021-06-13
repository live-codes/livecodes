import { test, expect } from '@playwright/test';
import { getLoadedApp, runButtonSelector, getTestUrl } from '../helpers';

test.describe('Compiler Results', () => {
  test('HTML/CSS/JS', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await page.keyboard.type('hello, ');

    await app.click('text=CSS');
    await page.keyboard.type('body {color: blue;}');

    await app.click('text=JS');
    await page.keyboard.type('document.body.innerHTML += "world!"');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
    expect(await getResult().$eval('body', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 255)',
    );
  });

  test('Markdown', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Markdown');
    await app.click('text=Markdown');
    await page.keyboard.type('# Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('Pug', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Pug');
    await app.click('text=Pug');
    await page.keyboard.type('h1 Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });
});
