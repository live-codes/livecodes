import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

test.describe('CSS Modules', () => {
  test('Default import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `import classes from './style.module.css';
document.querySelector('h1').innerHTML = classes.myTitle;
document.querySelector('h1').className = classes['my-title'];
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText.length).toBeGreaterThan(0);
    expect(resultText).not.toBe('my-title');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Named import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `import { myTitle } from './styles.module.css';
document.querySelector('h1').innerHTML = myTitle;
document.querySelector('h1').className = myTitle;
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText.length).toBeGreaterThan(0);
    expect(resultText).not.toBe('my-title');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Namespace import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `import * as classes from './style.module.css';
document.querySelector('h1').innerHTML = classes.myTitle;
document.querySelector('h1').className = classes.myTitle;
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText.length).toBeGreaterThan(0);
    expect(resultText).not.toBe('my-title');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Import CSS as text', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `import classes from './style.css'; document.querySelector('h1').innerHTML = classes;`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toBe('.my-title {color: blue;}');
  });

  test('CSS Modules "style(s).module.css"', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `
import classes from './style.module.css';
import classes2 from './styles.module.css';
document.querySelector('h1').innerHTML = classes.myTitle;
document.querySelector('h1').className = classes2['my-title'];
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText.length).toBeGreaterThan(0);
    expect(resultText).not.toBe('my-title');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('CSS Modules - empty', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `
import classes from './style.module.css';
document.querySelector('h1').innerHTML = Object.keys(classes).length;
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toBe('0');
  });

  test('CSS Modules - disabled', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('.my-title {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `
import classes from './style.module.css';
document.querySelector('h1').innerHTML = Object.keys(classes).length;
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toBe('0');
  });

  test('CSS Modules - with other processors', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<h1></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS Modules');
    await app.click('text=cssnano');
    await app.click('text=SCSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('h1 { &.my-title {color: blue;} }');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `import classes from './style.module.scss';
document.querySelector('h1').innerHTML = classes.myTitle;
document.querySelector('h1').className = classes['my-title'];
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText.length).toBeGreaterThan(0);
    expect(resultText).not.toBe('my-title');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });
});
