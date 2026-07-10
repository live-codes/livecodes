import { expect, type Frame, type Page } from '@playwright/test';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';
import type { UrlQueryParams } from '../../src/livecodes/models';

interface ConsoleEntry {
  text: string;
  sourceLine: string | null;
}

const getConsoleEntries = async (app: Frame): Promise<ConsoleEntry[]> =>
  app.evaluate(() =>
    [...document.querySelectorAll('#console-container .luna-console-log-item')]
      .map((item) => ({
        text: item.querySelector('.luna-console-log-content')?.textContent?.trim() ?? '',
        sourceLine: item.querySelector('.console-line-number')?.textContent?.trim() ?? null,
      }))
      .filter((entry) => entry.text !== 'Console was cleared'),
  );

const waitForConsoleEntries = async (app: Frame, expectedCount: number) => {
  await app.waitForFunction(
    (count) =>
      [...document.querySelectorAll('#console-container .luna-console-log-item')]
        .map((item) => item.querySelector('.luna-console-log-content')?.textContent?.trim() ?? '')
        .filter((text) => text !== '' && text !== 'Console was cleared').length >= count,
    expectedCount,
  );
};

const openWithCode = async (
  page: Page,
  getTestUrl: (config?: UrlQueryParams) => string,
  { markup, script }: { markup: string; script: string },
) => {
  await page.goto(
    getTestUrl({ tools: 'console|open', active: 'script', html: encodeURIComponent(markup), js: encodeURIComponent(script) }),
  );
  const { app, waitForResultUpdate } = await getLoadedApp(page);
  await waitForResultUpdate();
  await app.click('#tools-pane-titles > .console');
  return { app };
};

test.describe('Console line logs', () => {
  test('shows script line for JavaScript template log', async ({ page, getTestUrl }) => {
    // Arrange
    const markup = [
      '<div class="container">',
      '  <h1>Hello, <span id="title">World</span>!</h1>',
      '  <img class="logo" alt="logo" src="http://127.0.0.1:8080/livecodes/assets/templates/javascript.svg" />',
      '  <p>You clicked <span id="counter">0</span> times.</p>',
      '  <button id="counter-button">Click me</button>',
      '</div>',
    ].join('\n');
    const script = [
      'const title = document.querySelector("#title");',
      'const counter = document.querySelector("#counter");',
      'const button = document.querySelector("#counter-button");',
      '',
      'title.innerText = "JavaScript";',
      'let count = 0;',
      'console.log("line 7 in js template")',
      'button.addEventListener("click", () => {',
      '  count++;',
      '  counter.innerText = count;',
      '});',
    ].join('\n');
    const { app } = await openWithCode(page, getTestUrl, { markup, script });
    await waitForConsoleEntries(app, 1);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'line 7 in js template')?.sourceLine).toBe('script:7');
  });

  test('groups repeated script logs with same text into one entry with line range', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>console test</div>',
      script: Array(5).fill('console.log("zew")').join('\n'),
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const zewEntries = (await getConsoleEntries(app)).filter((e) => e.text === 'zew');

    // Assert
    expect(zewEntries).toHaveLength(1);
    expect(zewEntries[0].sourceLine).toBe('script:1:5');
  });

  test('shows markup line for inline script logs', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>inline</div>\n<script>\n  console.log("inline markup log")\n</script>',
      script: 'document.body.dataset.ready = "1";',
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'inline markup log')?.sourceLine).toBe('markup:3');
  });

  test('regroups same text after an interrupting log', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>test</div>',
      script: [
        'console.log("this line")',
        'console.log("this line")',
        'console.log("this line")',
        '',
        'console.log("break")',
        'console.log("this line")',
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries).toHaveLength(3);
    expect(entries[0]).toEqual({ text: 'this line', sourceLine: 'script:1:3' });
    expect(entries[1]).toEqual({ text: 'break', sourceLine: 'script:5' });
    expect(entries[2]).toEqual({ text: 'this line', sourceLine: 'script:6' });
  });

  test('does not merge same text from markup and script', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>mixed</div>\n<script>\n  console.log("same text")\n</script>',
      script: 'console.log("same text")',
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    const sameTextEntries = entries.filter((e) => e.text === 'same text');
    expect(sameTextEntries).toHaveLength(2);
    expect(sameTextEntries.map((e) => e.sourceLine).sort()).toEqual(['markup:3', 'script:1']);
  });
});
