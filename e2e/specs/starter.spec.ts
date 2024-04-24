import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

const templates = [
  'JavaScript',
  'TypeScript',
  'React',
  'Angular',
  'Preact',
  'Svelte',
  'Lit',
  'Stencil',
  'MDX',
  'Astro',
  'jQuery',
  'Backbone',
  'Knockout',
  'CoffeeScript',
  'LiveScript',
  'Civet',
  'Clio',
  'Python',
  'Ruby',
  'PHP',
  'Perl',
  'Lua',
  'Fennel',
  'Scheme',
  'ClojureScript',
  'Gleam',
  'Tcl',
];

test.describe('Starter Templates from UI', () => {
  test('Blank Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Blank');
    await waitForEditorFocus(app);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('');
  });

  templates.forEach((template) => {
    test(template + ' Starter', async ({ page, getTestUrl, editor }) => {
      await page.goto(getTestUrl());

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await app.click('[aria-label="Menu"]');
      await app.click('text=New');
      await app.click(`text=${template} Starter`);
      await waitForEditorFocus(app);

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

  test('React Native Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=React Native Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('text=React Native');
    expect(titleText).toBe('React Native for Web');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Vue 2 Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Vue 2 Starter');
    await waitForEditorFocus(app);

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

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Vue 3 SFC Starter');
    await waitForEditorFocus(app);

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

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Riot.js Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Riot.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Malina.js Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Malina.js Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Malina.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Imba Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Imba Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await app.waitForTimeout(500);
    await getResult().click('text=Click me');
    await app.waitForTimeout(500);
    await getResult().click('text=Click me');
    await app.waitForTimeout(500);
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Imba!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('ruby-wasm Starter', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Ruby (Wasm) Starter');

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(20_000);

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Ruby!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('lua-wasm Starter', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Lua (Wasm) Starter');

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(3_000);

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Lua!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('php-wasm Starter', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=PHP (Wasm) Starter');

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(6_000);

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, PHP!');
  });

  test('Go Starter', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Go Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate({ delay: 4000, timeout: 60_000 });

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Golang!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('C++ Starter', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=C++ Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, C++!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('ReScript Starter', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=ReScript Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, ReScript React!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('Reason Starter', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Reason Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, ReasonReact!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('OCaml Starter', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=OCaml Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, OCaml!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('Common Lisp Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Common Lisp Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Common Lisp!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('AssemblyScript Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=AssemblyScript Starter');
    await waitForEditorFocus(app);

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

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=WebAssembly Text Starter');
    await waitForEditorFocus(app);

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

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Bootstrap Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Bootstrap starter template');
  });

  test('Tailwind CSS Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Tailwind CSS Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('p');
    expect(titleText).toContain('A template based on Tailwind CSS playground');
  });

  test('Markdown Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Markdown Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Project Title');
  });

  test('SQL Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=SQL Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const resultText = await getResult().innerText('table');
    expect(resultText).toContain('Whatever you do, do it well. – Walt Disney');
  });

  test('PostgreSQL Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=PostgreSQL Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const resultText = await getResult().innerText('table');
    expect(resultText).toContain('Whatever you do, do it well. – Walt Disney');
  });

  test('Prolog Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click('text=Prolog Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Prolog!');

    const resultText = await getResult().innerText('#result');
    expect(resultText).toBe('X = ali\n');
  });

  test('Blockly Starter', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=New');
    await app.click(`text=Blockly Starter`);
    await waitForEditorFocus(app);

    await app.waitForTimeout(2000);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe(`Hello, Blockly!`);

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });
});

test.describe('Starter Templates from URL', () => {
  test('Blank Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'blank' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);
    await waitForEditorFocus(app);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toBe('');
  });

  templates.forEach((template) => {
    test(template + ' Starter (in URL)', async ({ page, getTestUrl }) => {
      await page.goto(getTestUrl({ template }));

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await waitForEditorFocus(app);
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

  test('React Native Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'react-native' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('text=React Native');
    expect(titleText).toBe('React Native for Web');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Vue 2 Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'vue' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
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
    await page.goto(getTestUrl({ template: 'vue' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
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
    await page.goto(getTestUrl({ template: 'riot' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Riot.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Malina.js Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'malina' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Malina.js!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Imba Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'imba' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Imba!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).not.toBe('You clicked 0 times.');
  });

  test('ruby-wasm Starter (in URL)', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'ruby-wasm' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(20_000);

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Ruby!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('lua-wasm Starter (in URL)', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'lua-wasm' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(3_000);

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Lua!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('php-wasm Starter (in URL)', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'php-wasm' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();
    await app.waitForTimeout(6_000);

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, PHP!');
  });

  test('Go Starter (in URL)', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'go' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate({ delay: 4000, timeout: 60_000 });

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Golang!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('C++ Starter (in URL)', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl({ template: 'cpp' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, C++!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Common Lisp Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'commonlisp' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Common Lisp!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('AssemblyScript Starter (in URL)', async ({ page, getTestUrl }) => {
    test.slow();

    await page.goto(getTestUrl({ template: 'assemblyscript' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
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
    await page.goto(getTestUrl({ template: 'wat' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
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

    await page.goto(getTestUrl({ template: 'rescript' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Rescript React!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('Reason Starter (in URL)', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl({ template: 'rescript' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, ReasonReact!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('OCaml Starter (in URL)', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl({ template: 'rescript' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, OCaml!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times');
  });

  test('Bootstrap Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'bootstrap' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Bootstrap starter template');
  });

  test('Tailwind CSS Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'tailwindcss' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('p');
    expect(titleText).toContain('A template based on Tailwind CSS playground');
  });

  test('Markdown Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'markdown' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Project Title');
  });

  test('SQL Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'sql' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const resultText = await getResult().innerText('table');
    expect(resultText).toContain('Whatever you do, do it well. – Walt Disney');
  });

  test('PostgreSQL Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'postgresql' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const resultText = await getResult().innerText('table');
    expect(resultText).toContain('Whatever you do, do it well. – Walt Disney');
  });

  test('Prolog Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'prolog' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Prolog!');

    const resultText = await getResult().innerText('#result');
    expect(resultText).toBe('X = ali\n');
  });

  test('Blockly Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'blockly' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.waitForTimeout(2000);
    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Blockly!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });
});
