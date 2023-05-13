import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

test.describe('Import maps', () => {
  test('ESM named import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "import {v4} from 'https://jspm.dev/uuid';\ndocument.body.innerText = v4()",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.length).toBe(36);
  });

  test('bare module named import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type("import {v4} from 'uuid';\ndocument.body.innerText = v4()");

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.length).toBe(36);
  });

  test('prefixed bare module named import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type("import {v4} from 'skypack:uuid';\ndocument.body.innerText = v4()");

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.length).toBe(36);
  });

  test('bare module named require', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type("const {v4} = require('uuid');\ndocument.body.innerText = v4()");

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.length).toBe(36);
  });

  test('prefixed bare module named require', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "const {v4} = require('skypack:uuid');\ndocument.body.innerText = v4()",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText.length).toBe(36);
  });

  test('ESM default import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "import _ from 'https://jspm.dev/lodash';\ndocument.body.innerText = _.map([1, 2, 3], x => x + 1).join(',')",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('2,3,4');
  });

  test('bare module default import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "import _ from 'lodash';\ndocument.body.innerText = _.map([1, 2, 3], x => x + 1).join(',')",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('2,3,4');
  });

  test('prefixed bare module default import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "import _ from 'skypack:lodash';\ndocument.body.innerText = _.map([1, 2, 3], x => x + 1).join(',')",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('2,3,4');
  });

  test('bare module default require', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "const _ = require('lodash');\ndocument.body.innerText = _.map([1, 2, 3], x => x + 1).join(',')",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('2,3,4');
  });

  test('prefixed bare module default require', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      "const _ = require('skypack:lodash');\ndocument.body.innerText = _.map([1, 2, 3], x => x + 1).join(',')",
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('2,3,4');
  });
});
