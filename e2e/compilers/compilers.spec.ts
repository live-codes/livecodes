import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector, waitForEditorFocus } from '../helpers';

test.describe('Compiler Results', () => {
  test('HTML/CSS/JS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('hello, ');

    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('body {color: blue;}');

    await app.click('text=JS');
    await waitForEditorFocus(app);
    await page.keyboard.type('document.body.innerHTML += "world!"');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('body');

    expect(resultText).toContain('hello, world!');
    expect(await getResult().$eval('body', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 255)',
    );
  });

  test('Markdown', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Markdown');
    await waitForEditorFocus(app);
    await app.page().keyboard.type('# Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('MDX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=MDX');
    await waitForEditorFocus(app);
    await app.page().keyboard.type('<Hello title="World" />');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=JSX');
    await waitForEditorFocus(app);
    await app
      .page()
      .keyboard.type('export const Hello = (props) => <h1>Hello, {props.title}!</h1>;');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hello, World!');
  });

  test('Pug', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Pug');
    await waitForEditorFocus(app);
    await page.keyboard.type('h1 Hi There');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('Haml', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Haml');
    await waitForEditorFocus(app);
    await page.keyboard.type('.content Hello, World!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('.content');

    expect(resultText).toContain('Hello, World!');
  });

  test('AsciiDoc', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type('== Hello, World!');

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h2');

    expect(resultText).toContain('Hello, World!');
  });

  test('SCSS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=SCSS');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `$font-stack: Helvetica, sans-serif; body { font: 100% $font-stack; }`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 100% Helvetica, sans-serif;');
  });

  test('Sass', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Sass');
    await waitForEditorFocus(app);
    await page.keyboard.type(`$font-stack: Helvetica, sans-serif\nbody\n  font: 100% $font-stack`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 100% Helvetica, sans-serif;');
  });

  test('Less', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Less');
    await waitForEditorFocus(app);
    await page.keyboard.type(`@width: 10px; #header { width: @width; }`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('width: 10px;');
  });

  test('Stylus', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Stylus');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`font-size = 14px\nbody\n  font font-size Arial, sans-serif`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 14px Arial, sans-serif;');
  });

  test('PostCSS/Autoprefixer', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`.example { user-select: none; }`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain(
      '.example { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }',
    );
  });

  test('PostCSS/Preset Env', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Preset Env');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `:root { --mainColor: #12345678; --secondaryColor: lab(32.5 38.5 -47.6 / 90%); }`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain(
      ':root { --mainColor: rgba(18,52,86,0.47059); --secondaryColor: rgba(102, 51, 153, 0.9); }',
    );
  });

  test('Babel', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Babel');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`[1, 2, 3].map(n => n + 1);`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      `[1, 2, 3].map(function (n) {
  return n + 1;
});`,
    );
  });

  test('TypeScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=TypeScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
// ---cut---
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      `// ---cut---
function isFish(pet) {
    return pet.swim !== undefined;
}`,
    );
  });

  test('JSX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`<div id="app">Loading...</div>`);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=JSX');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `import React from "react";
import ReactDOM from "react-dom";
const Hello = (props) => <h1>Hello, {props.name}</h1>
ReactDOM.render(<Hello name="React" />, document.body);
`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, React`);
  });

  test('TSX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=TSX');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `import React from "react";
import ReactDOM from "react-dom";
interface Props { name: string }
const Hello = (props: Props) => <h1>Hello, {props.name}</h1>
ReactDOM.render(<Hello name="React" />, document.body);
`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, React`);
  });

  test('Vue 3', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Vue 3');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<template>
<h1>Hello, {{ title }}</h1>
</template>
<script>
export default {
  data: () =>({ title: 'Vue 3' })
};
</script>
<style scoped>
h1 {
  color: blue;
}
</style>`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Vue 3`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Vue 2', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Vue 2');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<template>
<h1>Hello, {{ title }}</h1>
</template>
<script>
export default {
  data: { title: 'Vue 2' }
};
</script>
<style scoped>
h1 { color: blue; }
</style>`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Vue 2`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Svelte', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Svelte');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<script>
  let title = "Svelte";
</script>
<style>
  h1 {
    color: blue;
  }
</style>
<div class="container">
  <h1>Hello, {title}</h1>
</div>
`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Svelte`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Stencil', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<my-app title="Stencil"></my-app>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Stencil');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "my-app",
  styles: "h1 { color: blue; }",
})
export class App {
  @Prop() title: string;
  render() {
    return (
        <h1>Hello, {this.title}</h1>
    );
  }
}`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Stencil`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('CoffeeScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=CoffeeScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`square = (x) -> x * x`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(`var square;`);
    expect(resultText).toContain(`square = function(x) {
  return x * x;
};`);
  });

  test('LiveScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">World</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=LiveScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`{ capitalize, join, map, words } = require 'prelude-ls'
title = 'live script'
|> words
|> map capitalize
|> join ''
(document.getElementById \\title).textContent = title`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, LiveScript`);
  });

  test('AssemblyScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<h1>Hello, <span id="title">World</span></h1>
<script>
  const title = document.querySelector('#title');
  window.addEventListener('load', async() => {
    const { wasmModule } = await wasm;
    const { __getString, getTitle, increment } = wasmModule.exports;
    title.innerHTML = __getString(getTitle());
  }, false);
</script>`,
    );

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=AssemblyScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`export function getTitle(): string {return "AssemblyScript";`);
    // workaround for monaco auto-complete
    await page.keyboard.press('Delete');
    await page.keyboard.insertText(`}`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('text=Hello, AssemblyScript');

    expect(resultText).toContain(`Hello, AssemblyScript`);
  });

  test('Python', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1 id="header">Hello, World</h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Python');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`from browser import document
title = 'Python'
document['header'].html = f"Hello, {title}"`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Python`);
  });

  test('Pyodide', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1 id="header">Hello, World</h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Pyodide');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`from js import document
title = 'Python'
document.getElementById('header').innerHTML = f"Hello, {title}"`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    await getResult().waitForSelector('text=Hello, Python');
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Python`);
  });

  test('Ruby', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Ruby');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`title = 'Ruby'
$$.document.querySelector('#title').innerHTML = title`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Ruby`);
  });

  test('PHP', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=PHP');
    await waitForEditorFocus(app);

    // go below pre-inserted '<?php'
    await page.keyboard.press('ArrowDown');
    await page.keyboard.insertText(
      `$title = 'PHP';
$document->getElementById('title')->textContent = $title;`,
    );

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, PHP`);
  });

  test('Perl', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Perl');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`use strict;
my $title = 'Perl';
JS::inline('document.getElementById("title").innerHTML') = $title;`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Perl`);
  });

  test('Lua', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Lua');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`js = require "js"
window = js.global
document = window.document
document:getElementById("title").innerHTML = "Lua"`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Lua`);
  });

  test('Scheme', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Scheme');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`(let ((title "Scheme"))
  (set-content! "#title" title))`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Scheme`);
  });
});
