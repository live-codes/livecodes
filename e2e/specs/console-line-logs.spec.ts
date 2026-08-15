import { expect, type Frame, type Page } from '@playwright/test';
import type { UrlQueryParams } from '../../src/livecodes/models';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';

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
  {
    markup,
    script,
    language = 'js',
  }: { markup: string; script: string; language?: string; filename?: string },
) => {
  const scriptParam = language === 'ts' ? 'ts' : language === 'js' ? 'js' : language;
  await page.goto(
    getTestUrl({
      tools: 'console|open',
      active: 'script',
      html: encodeURIComponent(markup),
      [scriptParam]: encodeURIComponent(script),
    }),
  );
  const { app, waitForResultUpdate } = await getLoadedApp(page);
  await waitForResultUpdate();
  await app.click('#tools-pane-titles > .console');
  return { app, waitForResultUpdate };
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

    // Act
    const { app } = await openWithCode(page, getTestUrl, { markup, script });
    await waitForConsoleEntries(app, 1);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'line 7 in js template')?.sourceLine).toBe('script:7');
  });

  test('groups repeated logs from same line into one entry', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>console test</div>',
      script: 'for (let i = 0; i < 5; i++) console.log("zew");',
    });

    // Act
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    const zewEntries = (await getConsoleEntries(app)).filter((e) => e.text === 'zew');

    // Assert
    expect(zewEntries).toHaveLength(1);
    expect(zewEntries[0].sourceLine).toBe('script:1');
  });

  test('shows markup line for inline script logs', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>inline</div>\n<script>\n  console.log("inline markup log")\n</script>',
      script: 'document.body.dataset.ready = "1";',
    });

    // Act
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    const sourceLine = entries.find((e) => e.text === 'inline markup log')?.sourceLine;
    expect(sourceLine).toMatch(/^markup:\d+$/);
    const lineNum = Number(sourceLine!.split(':')[1]);
    expect(lineNum).toBeGreaterThanOrEqual(2);
    expect(lineNum).toBeLessThanOrEqual(4);
  });

  test('groups same-line loop logs and regroups after interruption', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>test</div>',
      script: [
        'for (let i = 0; i < 3; i++) console.log("looping");',
        'console.log("break");',
        'for (let i = 0; i < 2; i++) console.log("looping");',
      ].join('\n'),
    });

    // Act
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries).toHaveLength(3);
    expect(entries[0]).toEqual({ text: 'looping', sourceLine: 'script:1' });
    expect(entries[1]).toEqual({ text: 'break', sourceLine: 'script:2' });
    expect(entries[2]).toEqual({ text: 'looping', sourceLine: 'script:3' });
  });

  test('does not merge same text from markup and script', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>mixed</div>\n<script>\n  console.log("same text")\n</script>',
      script: 'console.log("same text")',
    });

    // Act
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    const sameTextEntries = entries.filter((e) => e.text === 'same text');
    expect(sameTextEntries).toHaveLength(2);
    const sourceLines = sameTextEntries.map((e) => e.sourceLine).sort();
    expect(sourceLines[0]).toMatch(/^markup:\d+$/);
    expect(sourceLines[1]).toMatch(/^script:\d+$/);
  });

  test('console.time does not shift badge queue', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ["console.log('before');", "console.time('t');", "console.log('after');"].join('\n'),
    });

    // Act
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:3');
  });

  test('console.assert(true) does not shift badge queue', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        "console.log('before');",
        'console.assert(1 === 1, "should not appear");',
        "console.log('after');",
      ].join('\n'),
    });

    // Act
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:3');
  });

  test('console.countReset does not shift badge queue', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        "console.log('before');",
        "console.count('x');",
        "console.countReset('x');",
        "console.log('after');",
      ].join('\n'),
    });

    // Act
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:4');
  });

  test('does not group identical logs from different lines (same source)', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ['console.log("same");', 'console.log("same");'].join('\n'),
    });

    // Act
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);
    const entries = (await getConsoleEntries(app)).filter((e) => e.text === 'same');

    // Assert
    expect(entries).toHaveLength(2);
    expect(entries[0].sourceLine).toBe('script:1');
    expect(entries[1].sourceLine).toBe('script:2');
  });

  test('groups logs from the same source line called from multiple call sites', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ['const greet = () => console.log("hi");', 'greet();', 'greet();', 'greet();'].join(
        '\n',
      ),
    });

    // Act
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    const entries = (await getConsoleEntries(app)).filter((e) => e.text === 'hi');

    // Assert
    expect(entries).toHaveLength(1);
    expect(entries[0].sourceLine).toBe('script:1');
  });

  test('markup inline script: different lines do not group, loop lines do', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const markup = [
      '<script>',
      'console.log("bye")',
      'console.log("bye")',
      'console.time("bye")',
      '',
      '',
      'for(let i=0;i<5;i++){',
      'console.log("bye")',
      '}',
      '</script>',
    ].join('\n');
    const { app } = await openWithCode(page, getTestUrl, {
      markup,
      script: '',
    });

    // Act
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);
    const byeEntries = entries.filter((e) => e.text === 'bye');

    // Assert
    expect(byeEntries).toHaveLength(3);
    for (const entry of byeEntries) {
      expect(entry.sourceLine).toMatch(/^markup:\d+$/);
    }
    const lines = byeEntries.map((e) => Number(e.sourceLine!.split(':')[1]));
    expect(lines[1]).toBe(lines[0] + 1);
    expect(lines[2]).toBeGreaterThan(lines[1]);
  });

  test('markup inline script: line numbers correct when TypeScript is active', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const markup = [
      '<div class="container">',
      '  <h1>Hello</h1>',
      '  <p>paragraph</p>',
      '  <button>click</button>',
      '</div>',
      '',
      '<script>',
      '  console.log("ts-markup-a")',
      '  console.log("ts-markup-b")',
      '</script>',
    ].join('\n');
    const { app } = await openWithCode(page, getTestUrl, {
      markup,
      script: 'const greeting: string = "hello";',
      language: 'ts',
    });

    // Act
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);
    const lineA = entries.find((e) => e.text === 'ts-markup-a')?.sourceLine;
    const lineB = entries.find((e) => e.text === 'ts-markup-b')?.sourceLine;

    // Assert
    expect(lineA).toMatch(/^markup:\d+$/);
    expect(lineB).toMatch(/^markup:\d+$/);
    const numA = Number(lineA!.split(':')[1]);
    const numB = Number(lineB!.split(':')[1]);
    expect(numA).toBeGreaterThanOrEqual(7);
    expect(numB).toBe(numA + 1);
  });

  test('markup runtime errors should map to markup line numbers', async ({ page, getTestUrl }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: [
        'some text',
        '',
        '<script>',
        '  console.log("line-number-bug-log")',
        '',
        '',
        '  throw new Error("line-number-bug-error")',
        '</script>',
      ].join('\n'),
      script: '',
    });

    // Act
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);
    const logLine = entries.find((e) => e.text.includes('line-number-bug-log'))?.sourceLine;
    const errLine = entries.find((e) => e.text.includes('line-number-bug-error'))?.sourceLine;

    // Assert
    expect(logLine).toMatch(/^markup:\d+$/);
    expect(errLine).toMatch(/^markup:\d+$/);
    const logNum = Number(logLine?.split(':')[1]);
    const errNum = Number(errLine?.split(':')[1]);
    expect(logNum).toBeGreaterThanOrEqual(3);
    expect(logNum).toBeLessThanOrEqual(5);
    expect(errNum).toBeGreaterThanOrEqual(6);
    expect(errNum).toBeLessThanOrEqual(8);
  });

  test('markup inline script: same-value logs keep exact lines in JS/TS/React', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const markup = [
      '<div class="container">',
      '  <h1>Hello, <span id="title">World</span>!</h1>',
      '  <img class="logo" alt="logo" src="http://127.0.0.1:8080/livecodes/assets/templates/javascript.svg" />',
      '  <p>You clicked <span id="counter">0</span> times.</p>',
      '  <button id="counter-button">Click me</button>',
      '</div>',
      '',
      '<script>',
      '  console.log("same value")',
      '  console.log("same value")',
      '  console.time("ignored")',
      '</script>',
    ].join('\n');

    const cases = [
      {
        label: 'JavaScript',
        language: 'js',
        script: 'document.body.dataset.ready = "js";',
      },
      {
        label: 'TypeScript',
        language: 'ts',
        script: 'const ready: string = "ts"; document.body.dataset.ready = ready;',
      },
      {
        label: 'React',
        language: 'react',
        script: 'export default function App() { return null; }',
      },
    ] as const;

    for (const testCase of cases) {
      // Arrange
      const { app } = await openWithCode(page, getTestUrl, {
        markup,
        script: testCase.script,
        language: testCase.language,
      });

      // Act
      await waitForConsoleEntries(app, 2);
      await app.waitForTimeout(300);
      const entries = await getConsoleEntries(app);
      const sameValueEntries = entries.filter((e) => e.text === 'same value');

      // Assert
      expect(sameValueEntries).toHaveLength(2);
      const firstLine = sameValueEntries[0].sourceLine;
      const secondLine = sameValueEntries[1].sourceLine;
      expect(firstLine).toMatch(/^markup:\d+$/);
      expect(secondLine).toMatch(/^markup:\d+$/);
      const firstNum = Number(firstLine?.split(':')[1]);
      const secondNum = Number(secondLine?.split(':')[1]);
      expect(firstNum).toBeGreaterThanOrEqual(8);
      expect(firstNum).toBeLessThanOrEqual(10);
      expect(secondNum).toBeGreaterThanOrEqual(9);
      expect(secondNum).toBeLessThanOrEqual(11);
      expect(secondNum).toBeGreaterThan(firstNum);
    }
  });

  test('TypeScript source map maps compiled lines to original TS lines', async ({
    page,
    getTestUrl,
  }) => {
    // Arrange
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        'interface Greeter { name: string; }',
        'interface Config { debug: boolean; }',
        'interface Options { timeout: number; }',
        '',
        'const msg = "ts source map works";',
        'console.log(msg);',
      ].join('\n'),
      language: 'ts',
    });

    // Act
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'ts source map works')?.sourceLine).toBe('script:6');
  });

  test('badge queue resets correctly after page re-run', async ({ page, getTestUrl }) => {
    // Arrange
    const { app, waitForResultUpdate } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ["console.time('t');", "console.log('hello');"].join('\n'),
    });
    await waitForConsoleEntries(app, 1);

    // Act & Assert — first run
    let entries = await getConsoleEntries(app);
    expect(entries.find((e) => e.text === 'hello')?.sourceLine).toBe('script:2');

    // Act & Assert — after re-run, queue should reset
    await waitForResultUpdate();
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);
    entries = await getConsoleEntries(app);
    expect(entries.find((e) => e.text === 'hello')?.sourceLine).toBe('script:2');
  });
});
