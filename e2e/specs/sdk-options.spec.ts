import { expect } from '@playwright/test';
import { compressToEncodedURIComponent } from 'lz-string';
import { getPlaygroundUrl, type Config, type EmbedOptions } from '../../src/sdk/index';
import { getLoadedApp, waitForEditorFocus } from '../helpers';
import { test } from '../test-fixtures';

test.describe('SDK options', () => {
  test('params', async ({ page, getTestUrl }) => {
    const params: EmbedOptions['params'] = {
      md: `# Hello, World!`,
      css: `h1 { color: red; }`,
    };

    const url = getPlaygroundUrl({ appUrl: getTestUrl(), params });
    await page.goto(url);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(255, 0, 0)');
  });

  test('config', async ({ page, getTestUrl }) => {
    const config: Partial<Config> = {
      markup: {
        language: 'markdown',
        content: `# Hello, World!`,
      },
      style: {
        language: 'css',
        content: `h1 { color: red; }`,
      },
    };

    const url = getPlaygroundUrl({ appUrl: getTestUrl(), config });
    await page.goto(url);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(255, 0, 0)');
  });

  test('template', async ({ page, getTestUrl }) => {
    const url = getPlaygroundUrl({ appUrl: getTestUrl(), template: 'typescript' });
    await page.goto(url);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, TypeScript!');
  });

  test('import', async ({ page, getTestUrl }) => {
    const url = getPlaygroundUrl({
      appUrl: getTestUrl(),
      import: 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/',
    });
    await page.goto(url);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('activityId', async ({ page, getTestUrl }) => {
    const activityId = 'test-activity-' + Date.now(); 

    const starterConfig: Partial<Config> = {
      markup: {
        language: 'markdown',
        content: `# Starter Content`,
      },
    };

    // First visit: no saved project exists yet for this activityId
    const firstUrl = getPlaygroundUrl({
      appUrl: getTestUrl(),
      activityId,
      config: starterConfig,
    });
    await page.goto(firstUrl);

    const first = await getLoadedApp(page);
    await waitForEditorFocus(first.app);
    await first.waitForResultUpdate();

    let titleText = await first.getResult().innerText('h1');
    expect(titleText).toBe('Starter Content');

    // Save the project under this activityId.
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(500); // give the async IndexedDB write time to complete

    // Second visit: same activityId, but a DIFFERENT starter config.
    const secondUrl = getPlaygroundUrl({
      appUrl: getTestUrl(),
      activityId,
      config: {
        markup: {
          language: 'markdown',
          content: `# Different Starter`,
        },
      },
    });
    await page.goto(secondUrl);

    const second = await getLoadedApp(page);
    await waitForEditorFocus(second.app);
    await second.waitForResultUpdate();

    titleText = await second.getResult().innerText('h1');
    expect(titleText).toBe('Starter Content'); // saved project wins, not "Different Starter"
  });

  test('options override: template -> import -> config -> params', async ({ page, getTestUrl }) => {
    const url = getPlaygroundUrl({
      appUrl: getTestUrl(),
      template: 'react',
      import:
        'code/' +
        compressToEncodedURIComponent(
          JSON.stringify({
            style: {
              language: 'css',
              content: `h1 { color: green; }`,
            },
            stylesheets: ['data:text/css,h2 { color: blue; }'],
          }),
        ),
      config: {
        markup: {
          language: 'markdown',
          content: `## Hello, from config!`,
        },
      },
      params: {
        css: `h1 { color: red; }`,
      },
    });
    await page.goto(url);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const h1 = await getResult().innerText('h1');
    expect(h1).toBe('Hello, React!');
    const h2 = await getResult().innerText('h2');
    expect(h2).toBe('Hello, from config!');
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(255, 0, 0)');
    expect(await getResult().$eval('h2', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });
});
