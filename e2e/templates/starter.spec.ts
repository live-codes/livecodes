import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector, waitForEditorFocus } from '../helpers';

const templates = [
  'TypeScript',
  'React',
  'Angular',
  'Preact',
  'Svelte',
  'Stencil',
  'Polymer',
  'MDX',
  'jQuery',
  'Backbone',
  'Knockout',
  'CoffeeScript',
  'LiveScript',
  'Python',
  'Ruby',
  'PHP',
  'Perl',
  'Lua',
  'Scheme',
];

test.describe('Starter Templates from UI', () => {
  test('Blank Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Blank');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('');
  });

  templates.forEach((template) => {
    test(template + ' Starter', async ({ page, getTestUrl }) => {
      test.skip(template === 'MDX', 'fails on CI');

      await page.goto(getTestUrl());

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await app.click('[title=Settings]');
      await app.click('text=New');
      await app.click(`text=${template} Starter`);
      await waitForEditorFocus(app);

      await app.click(runButtonSelector);
      await waitForResultUpdate();

      await getResult().click('text=Click me');
      await getResult().click('text=Click me');
      await getResult().click('text=Click me');

      const titleText = await getResult().innerText('h1');
      expect(titleText).toBe(`Hello, ${template}!`);

      const counterText = await getResult().innerText('text=You clicked');
      expect(counterText).toBe('You clicked 3 times.');
    });
  });

  test('Vue 2 Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Vue 2 Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Vue!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Vue 3 Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Vue 3 SFC Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Vue!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Riot.js Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Riot.js Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Riot.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Go Starter', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Go Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Golang!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('ReScript Starter', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=ReScript Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, ReScript React!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('AssemblyScript Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=AssemblyScript Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, AssemblyScript!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('WebAssembly Text Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=WebAssembly Text Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, WebAssembly Text!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Bootstrap Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Bootstrap Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Bootstrap starter template');
  });

  test('Tailwind CSS Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Tailwind CSS Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Welcome to Minimal Blog');
  });

  test('D3 Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=D3 Starter');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const bars = await getResult().$$('svg rect');
    expect(bars.length).toBe(4);
  });

  test('README Template', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=README Template');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Project Title');
  });
});

test.describe('Starter Templates from URL', () => {
  test('Blank Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'blank' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('');
  });

  templates.forEach((template) => {
    test(template + ' Starter (in URL)', async ({ page, getTestUrl }) => {
      await page.goto(getTestUrl({ template } as any));

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await waitForEditorFocus(app);
      await app.click(runButtonSelector);
      await waitForResultUpdate();

      await getResult().click('text=Click me');
      await getResult().click('text=Click me');
      await getResult().click('text=Click me');

      const titleText = await getResult().innerText('h1');
      expect(titleText).toBe(`Hello, ${template}!`);

      const counterText = await getResult().innerText('text=You clicked');
      expect(counterText).toBe('You clicked 3 times.');
    });
  });

  test('Vue 2 Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'vue' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Vue!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Vue 3 Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'vue' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Vue!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Riot.js Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'riot' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Riot.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Go Starter (in URL)', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl({ template: 'go' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Golang!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('AssemblyScript Starter (in URL)', async ({ page, getTestUrl }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'assemblyscript' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, AssemblyScript!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('WebAssembly Text Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'wat' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, WebAssembly Text!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('ReScript Starter (in URL)', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl({ template: 'rescript' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Rescript React!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('Bootstrap Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'bootstrap' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Bootstrap starter template');
  });

  test('Tailwind CSS Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'tailwindcss' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Welcome to Minimal Blog');
  });

  test('D3 Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'd3' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const bars = await getResult().$$('svg rect');
    expect(bars.length).toBe(4);
  });

  test('README Template (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'readme' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await app.click(runButtonSelector);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Project Title');
  });
});
