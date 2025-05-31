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
