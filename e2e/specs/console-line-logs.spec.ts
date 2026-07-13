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
  {
    markup,
    script,
    language = 'js',
    filename,
  }: { markup: string; script: string; language?: string; filename?: string },
) => {
  const scriptParam = language === 'ts' ? 'ts' : 'js';
  await page.goto(
    getTestUrl({
      tools: 'console|open',
      active: 'script',
      html: encodeURIComponent(markup),
      [scriptParam]: encodeURIComponent(script),
      ...(filename ? { scriptFilename: filename } : {}),
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
    const { app } = await openWithCode(page, getTestUrl, { markup, script });
    await waitForConsoleEntries(app, 1);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'line 7 in js template')?.sourceLine).toBe('script:7');
  });

  test('groups repeated logs from same line into one entry', async ({ page, getTestUrl }) => {
    // Arrange — all 5 logs come from line 1 (inside a loop), so dedup applies
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>console test</div>',
      script: 'for (let i = 0; i < 5; i++) console.log("zew");',
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
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
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'inline markup log')?.sourceLine).toBe('markup:3');
  });

  test('groups same-line loop logs and regroups after interruption', async ({ page, getTestUrl }) => {
    // Arrange — loops produce same-line logs; different lines break grouping
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '<div>test</div>',
      script: [
        'for (let i = 0; i < 3; i++) console.log("looping");',
        'console.log("break");',
        'for (let i = 0; i < 2; i++) console.log("looping");',
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);

    // Act
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
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    const sameTextEntries = entries.filter((e) => e.text === 'same text');
    expect(sameTextEntries).toHaveLength(2);
    expect(sameTextEntries.map((e) => e.sourceLine).sort()).toEqual(['markup:3', 'script:1']);
  });

  test('console.time does not shift badge queue', async ({ page, getTestUrl }) => {
    // Arrange — console.time produces no DOM entry in Luna, so it must not consume a queue slot
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        "console.log('before');",
        "console.time('t');",
        "console.log('after');",
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert — both logs must have correct badges (bug: 'after' got null)
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:3');
  });

  test('console.assert(true) does not shift badge queue', async ({ page, getTestUrl }) => {
    // Arrange — a passing assertion produces no DOM entry; must not consume a queue slot
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        "console.log('before');",
        'console.assert(1 === 1, "should not appear");',
        "console.log('after');",
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:3');
  });

  test('console.countReset does not shift badge queue', async ({ page, getTestUrl }) => {
    // countReset resets an internal counter with no DOM output — must not consume a queue slot
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        "console.log('before');",
        "console.count('x');",
        "console.countReset('x');",
        "console.log('after');",
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert — countReset is silent (no DOM entry) and must not consume a queue slot.
    // If it did, 'after' would get the slot meant for 'before' and show 'script:1' instead of 'script:4'.
    expect(entries.find((e) => e.text === 'before')?.sourceLine).toBe('script:1');
    expect(entries.find((e) => e.text === 'after')?.sourceLine).toBe('script:4');
  });

  test('does not group identical logs from different lines (same source)', async ({
    page,
    getTestUrl,
  }) => {
    // Same text on different lines must NOT be grouped — each gets its own entry + badge
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ['console.log("same");', 'console.log("same");'].join('\n'),
    });
    await waitForConsoleEntries(app, 2);
    await app.waitForTimeout(300);

    // Act
    const entries = (await getConsoleEntries(app)).filter((e) => e.text === 'same');

    // Assert — 2 separate entries, one per line
    expect(entries).toHaveLength(2);
    expect(entries[0].sourceLine).toBe('script:1');
    expect(entries[1].sourceLine).toBe('script:2');
  });

  test('groups logs from the same source line called from multiple call sites', async ({
    page,
    getTestUrl,
  }) => {
    // A helper whose log lives on line 1 — each invocation still comes from script:1, so they group
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        'const greet = () => console.log("hi");',
        'greet();',
        'greet();',
        'greet();',
      ].join('\n'),
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = (await getConsoleEntries(app)).filter((e) => e.text === 'hi');

    // Assert — all 3 invocations grouped into a single entry (same source+line)
    expect(entries).toHaveLength(1);
    expect(entries[0].sourceLine).toBe('script:1');
  });

  test('markup inline script: different lines do not group, loop lines do', async ({
    page,
    getTestUrl,
  }) => {
    // Mirrors the user example: two separate logs on different lines stay separate,
    // console.time is silent (no badge confusion), loop logs all share line 8 and group
    const markup = [
      '<script>',
      'console.log("bye")',       // markup line 2
      'console.log("bye")',       // markup line 3 — different line → separate entry
      'console.time("bye")',      // markup line 4 — silent, must not shift queue
      '',                         // markup line 5
      '',                         // markup line 6
      'for(let i=0;i<5;i++){',   // markup line 7
      'console.log("bye")',       // markup line 8 — all 5 iterations → grouped
      '}',                        // markup line 9
      '</script>',
    ].join('\n');
    const { app } = await openWithCode(page, getTestUrl, {
      markup,
      script: '',
    });
    await waitForConsoleEntries(app, 3);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);
    const byeEntries = entries.filter((e) => e.text === 'bye');

    // Assert — exactly 3 "bye" entries: lines 2, 3, and the loop on line 8 (grouped)
    expect(byeEntries).toHaveLength(3);
    expect(byeEntries[0].sourceLine).toBe('markup:2');
    expect(byeEntries[1].sourceLine).toBe('markup:3');
    expect(byeEntries[2].sourceLine).toBe('markup:8');
  });

  test('TypeScript source map maps compiled lines to original TS lines', async ({
    page,
    getTestUrl,
  }) => {
    // TS interfaces are stripped by the compiler → compiled JS has fewer lines.
    // console.log on TS line 6 compiles to ~line 2 in JS without the source map.
    // The badge must show the ORIGINAL TypeScript line, not the compiled JS line.
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        'interface Greeter { name: string; }',   // line 1 — stripped by TS compiler
        'interface Config { debug: boolean; }',   // line 2 — stripped
        'interface Options { timeout: number; }', // line 3 — stripped
        '',
        'const msg = "ts source map works";',     // line 5
        'console.log(msg);',                      // line 6 in TS, line ~2 in compiled JS
      ].join('\n'),
      language: 'ts',
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert — must be 'script:6' (original TS line), NOT 'script:2' (compiled JS line)
    expect(entries.find((e) => e.text === 'ts source map works')?.sourceLine).toBe('script:6');
  });

  test('named file badge shows filename instead of generic "script"', async ({
    page,
    getTestUrl,
  }) => {
    // When scriptFilename is set, the compiler keys the source map by filename.
    // console.ts reads that key and uses it as the badge label.
    // Multi-file (PR #934): each file will supply its own key; this proves the mechanism works.
    const { app } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: [
        'interface Price { amount: number; }',           // line 1 — stripped by TS compiler
        'interface Rate { pct: number; }',               // line 2 — stripped
        '',
        'const tax = (p: Price, r: Rate) => p.amount * r.pct;', // line 4
        'console.log(tax({ amount: 100 }, { pct: 0.2 }));',     // line 5 in TS, line ~2 in compiled JS
      ].join('\n'),
      language: 'ts',
      filename: 'tax-calculator.ts',
    });
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // Act
    const entries = await getConsoleEntries(app);

    // Assert — badge shows real filename + original TS line, not 'script:2' (compiled JS)
    expect(entries[0].sourceLine).toBe('tax-calculator.ts:5');
  });

  test('badge queue resets correctly after page re-run', async ({ page, getTestUrl }) => {
    // Arrange — console.time is silent; after re-run the queue must start fresh.
    // Scenario: run with time between two logs → 'hello' gets script:2.
    // Then re-run (same code) → queue resets, 'hello' still gets script:2, not null.
    const { app, waitForResultUpdate } = await openWithCode(page, getTestUrl, {
      markup: '',
      script: ["console.time('t');", "console.log('hello');"].join('\n'),
    });
    await waitForConsoleEntries(app, 1);

    // First run: 'hello' should get badge script:2
    let entries = await getConsoleEntries(app);
    expect(entries.find((e) => e.text === 'hello')?.sourceLine).toBe('script:2');

    // Re-run the result page (triggers setSourceMap which now resets the queue)
    await waitForResultUpdate();
    await waitForConsoleEntries(app, 1);
    await app.waitForTimeout(300);

    // After reload: queue should be reset, 'hello' still gets script:2 (not null)
    entries = await getConsoleEntries(app);
    expect(entries.find((e) => e.text === 'hello')?.sourceLine).toBe('script:2');
  });
});
