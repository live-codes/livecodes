import { test, expect } from '@playwright/test';
import { getLoadedApp, runButtonSelector, getTestUrl, waitForEditorFocus } from '../helpers';

test.describe('Compiler Results', () => {
  test('HTML/CSS/JS', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('hello, ');

    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('body {color: blue;}');

    await app.click('text=JS');
    await waitForEditorFocus(app);
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
    await waitForEditorFocus(app);
    await app.page().keyboard.type('# Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('MDX', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=MDX');
    await waitForEditorFocus(app);
    await app.page().keyboard.type('<Hello title="World" />');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=JSX');
    await waitForEditorFocus(app);
    await app
      .page()
      .keyboard.type('export const Hello = (props) => <h1>Hello, {props.title}!</h1>;');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hello, World!');
  });

  test('Pug', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Pug');
    await waitForEditorFocus(app);
    await page.keyboard.type('h1 Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('Haml', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Haml');
    await waitForEditorFocus(app);
    await page.keyboard.type('.content Hello, World!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('.content');

    expect(resultText).toContain('Hello, World!');
  });

  test('AsciiDoc', async ({ page }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type('== Hello, World!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h2');

    expect(resultText).toContain('Hello, World!');
  });
});
