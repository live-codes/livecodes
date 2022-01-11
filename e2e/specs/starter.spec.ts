import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

const templates = [
  'TypeScript',
  'React',
  'Angular',
  'Preact',
  'Svelte',
  'Stencil',
  'MDX',
  'Astro',
  'jQuery',
  'Backbone',
  'Knockout',
  'CoffeeScript',
  'LiveScript',
  'Clio',
  'Python',
  'Ruby',
  'PHP',
  'Perl',
  'Lua',
  'Scheme',
  'Tcl',
];

test.describe('Starter Templates from UI', () => {
  test('Blank Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
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

      await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

  test('Go Starter', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Go Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

  test('Common Lisp Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Tailwind CSS Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('p');
    expect(titleText).toContain('A template based on Tailwind CSS playground');
  });

  test('D3 Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=D3 Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const bars = await getResult().$$('svg rect');
    expect(bars.length).toBe(4);
  });

  test('Markdown Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
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

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=SQL Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const resultText = await getResult().innerText('table');
    expect(resultText).toContain('Whatever you do, do it well. – Walt Disney');
  });

  test('Prolog Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click('text=Prolog Starter');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Prolog!');

    const resultText = await getResult().innerText('#result');
    expect(resultText).toBe('X = ali ;\n');
  });

  test('Blockly Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
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

  test('Gnuplot Starter', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=New');
    await app.click(`text=Gnuplot Starter`);
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    const images = await getResult().$$('img');
    for (const img of images) {
      expect((await img.getAttribute('src')).startsWith('data:image')).toBe(true);
    }
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

  test('Go Starter (in URL)', async ({ page, getTestUrl }) => {
    test.slow();
    await page.goto(getTestUrl({ template: 'go' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

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

  test('D3 Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'd3' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const bars = await getResult().$$('svg rect');
    expect(bars.length).toBe(4);
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

  test('Prolog Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'prolog' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Prolog!');

    const resultText = await getResult().innerText('#result');
    expect(resultText).toBe('X = ali ;\n');
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

  test('Gnuplot Starter (in URL)', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'gnuplot' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const images = await getResult().$$('img');
    for (const img of images) {
      expect((await img.getAttribute('src')).startsWith('data:image')).toBe(true);
    }
  });
});
