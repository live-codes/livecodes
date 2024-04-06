import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

test.describe('Compiler Results', () => {
  test('HTML/CSS/JS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('hello, ');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('body {color: blue;}');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('document.body.innerHTML += "world!"');

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

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Markdown');
    await waitForEditorFocus(app);
    await app.page().keyboard.type('# Hi There');

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('MDX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=MDX');
    await waitForEditorFocus(app);
    await app.page().keyboard.type(`
import {Hello} from './script';

<Hello title="World" />
`);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JSX');
    await waitForEditorFocus(app);
    await app.page().keyboard.type(`
import React from 'react';
export const Hello = (props) => <h1>Hello, {props.title}!</h1>;
`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hello, World!');
  });

  test('Astro', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Astro');
    await waitForEditorFocus(app);
    await app.page().keyboard.type(`---
const title = "World";
---

<h1>Hello, {title}!</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hello, World!');
  });

  test('Pug', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Pug');
    await waitForEditorFocus(app);
    await page.keyboard.type('h1 Hi There');

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toBe('Hi There');
  });

  test('Haml', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Haml"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Haml');
    await waitForEditorFocus(app);
    await page.keyboard.type('.content Hello, #{name}!');

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('.content');

    expect(resultText).toContain('Hello, Haml!');
  });

  test('AsciiDoc', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type('== Hello, World!');

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h2');

    expect(resultText).toContain('Hello, World!');
  });

  test('Mustache', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Mustache"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Mustache');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Mustache');
  });

  test('Mustache dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'Mustache' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Mustache');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Mustache');
  });

  test('Handlebars', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Handlebars"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Handlebars');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Handlebars');
  });

  test('Handlebars dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'Handlebars' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Handlebars');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Handlebars');
  });

  test('Nunjucks', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Nunjucks"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Nunjucks');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Nunjucks');
  });

  test('Nunjucks dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'Nunjucks' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Nunjucks');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{name}}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Nunjucks');
  });

  test('EJS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "EJS"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=EJS');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to <%= name %></h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to EJS');
  });

  test('EJS dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'EJS' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=EJS');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to <%= name %></h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to EJS');
  });

  test('Eta', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Eta"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Eta');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to <%= it.name %></h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Eta');
  });

  test('Eta dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'Eta' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Eta');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to <%= it.name %></h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Eta');
  });

  test('Liquid', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name":"liquid"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Liquid');
    await waitForEditorFocus(app);
    await page.keyboard.type(`{{ name | capitalize | prepend: "Welcome to "}}`);

    await waitForResultUpdate();
    const body = await getResult().$('body');

    expect(await body?.innerHTML()).toContain('Welcome to Liquid');
  });

  test('Liquid dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'liquid' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Liquid');
    await waitForEditorFocus(app);
    await page.keyboard.type(`{{ name | capitalize | prepend: "Welcome to "}}`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const body = await getResult().$('body');

    expect(await body?.innerHTML()).toContain('Welcome to Liquid');
  });

  test('doT', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name":"doT"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=doT');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{=it.name}}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to doT');
  });

  test('doT dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'doT' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=doT');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{=it.name}}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to doT');
  });

  test('Twig', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "Twig"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Twig');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{ name }}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Twig');
  });

  test('Twig dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'Twig' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=Twig');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{ name }}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to Twig');
  });

  test('art-template', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"data":{"name": "art-template"}}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=art-template');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{ name }}</h1>`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to art-template');
  });

  test('art-template dynamic', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"template":{"prerender": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JavaScript');
    await waitForEditorFocus(app);
    await page.keyboard.type(`window.livecodes.templateData = { name: 'art-template' };`);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=art-template');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<h1>Welcome to {{ name }}</h1>`);

    await waitForResultUpdate();
    await app.waitForTimeout(3000);
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain('Welcome to art-template');
  });

  test('BBCode', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=BBCode');
    await waitForEditorFocus(app);
    await app.page().keyboard.type('[quote]quoted text[/quote]');

    await waitForResultUpdate();
    const resultText = await getResult().innerText('blockquote');

    expect(resultText).toBe('quoted text');
  });

  test('MJML', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=MJML');
    await waitForEditorFocus(app);
    await page.keyboard.type(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text color="blue">
          Hello MJML!
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('table');

    expect(resultText).toContain('Hello MJML!');
  });

  test('SCSS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=SCSS');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `$font-stack: Helvetica, sans-serif; body { font: 100% $font-stack; }`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 100% Helvetica, sans-serif;');
  });

  test('Sass', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Sass');
    await waitForEditorFocus(app);
    await page.keyboard.type(`$font-stack: Helvetica, sans-serif\nbody\n  font: 100% $font-stack`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 100% Helvetica, sans-serif;');
  });

  test('Less', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Less');
    await waitForEditorFocus(app);
    await page.keyboard.type(`@width: 10px; #header { width: @width; }`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('width: 10px;');
  });

  test('Stylus', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Stylus');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`font-size = 14px\nbody\n  font font-size Arial, sans-serif`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('font: 14px Arial, sans-serif;');
  });

  test('Stylis', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Stylis');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      '[namespace] {\n  div {\n    display: flex;\n\n    @media screen {\n      color: blue;\n    }\n  }\n\n  div {\n    transform: translateZ(0);\n\n    h1, h2 {\n      color: red;\n    }\n  }\n}',
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain(
      '[namespace] div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}@media screen{[namespace] div{color:blue;}}[namespace] div{-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);}[namespace] div h1,[namespace] div h2{color:red;}',
    );
  });

  test('PostCSS/postcssImportUrl', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Import Url');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`@import "github-markdown-css";`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('.markdown-body');
  });

  test('PostCSS/Autoprefixer', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`.example { user-select: none; }`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('-webkit-user-select: none;');
  });

  test('PostCSS/Preset Env', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Preset Env');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `:root { --mainColor: #12345678; --secondaryColor: lab(32.5 38.5 -47.6 / 90%); }`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).toContain('--mainColor: rgba(18,52,86,0.47059);');
  });

  test('Babel', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Babel');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`[1, 2, 3].map(n => n + 1);`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      `[1, 2, 3].map(function (n) {
  return n + 1;
});`,
    );
  });

  test('Sucrase', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Sucrase');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`const Greet = (name: string) => <>Hello {name}!</>;`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      `const Greet = (name) => React.createElement(React.Fragment, null, "Hello " , name, "!");`,
    );
  });

  test('TypeScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      `// ---cut---
function isFish(pet) {
    return pet.swim !== undefined;
}`,
    );
  });

  test('Flow', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Flow');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      'function foo(x: ?number): string {if (x) { return x; } return "default string"; }',
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(
      'function foo(x         )         {if (x) { return x; } return "default string"; }',
    );
  });

  test('JSX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`<div id="app">Loading...</div>`);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=JSX');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `import React from "react";
import ReactDOM from "react-dom";
const Hello = (props) => <h1>Hello, {props.name}</h1>
ReactDOM.render(<Hello name="React" />, document.body);
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, React`);
  });

  test('TSX', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, React`);
  });

  test('Vue 3', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Vue 3 SFC');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Vue 3`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Vue 3 JSX', async ({ page, getTestUrl }) => {
    const sfc = `<script>
  export default {
    data() {
      return {
        counter: 0,
        align: "center",
      };
    },
    methods: {
      increment() {
        this.counter += 1;
      },
    },
    render() {
      return (
        <div class="container">
          <h1>Hello, Vue!</h1>
          <img
            class="logo"
            src="${getTestUrl({})}/livecodes/assets/templates/vue.svg"
          />
          <p>You clicked {this.counter} times.</p>
          <button onClick={this.increment}>Click me</button>
        </div>
      );
    },
  };
</script>

<style scoped>
  .container,
  .container button {
    text-align: v-bind("align");
    font: 1em sans-serif;
  }
  .logo {
    width: 150px;
  }
</style>
`;

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);
    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Vue 3 SFC');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(sfc);

    await waitForResultUpdate();

    await getResult().click('text=Click me');
    await getResult().click('text=Click me');
    await getResult().click('text=Click me');

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, Vue!');

    const counterText = await getResult().innerText('text=You clicked');
    expect(counterText).toBe('You clicked 3 times.');
  });

  test('Vue 3 import', async ({ page, getTestUrl }) => {
    const sfc = `<template>
  <div class="container">
    <p id="uuid">{{ uuid }}</p>
    <Counter />
  </div>
</template>

<script>
  import 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/style.css';
  import {v4} from 'uuid';
  import Counter from 'https://hatemhosny.github.io/vue3-samples/src/components/Counter.vue';
  export default {
    components: {
      Counter,
    },
    data() {
      return {
        uuid: v4(),
      };
    },
  };
</script>
`;

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Vue 3 SFC');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(sfc);

    await waitForResultUpdate();

    // css import
    const headHTML = await getResult().innerHTML('head');
    expect(headHTML).toContain(
      '<link rel="stylesheet" href="https://hatemhosny.github.io/typescript-demo-for-testing-import-/style.css">',
    );

    // bare module import
    const uuidText = await getResult().innerText('#uuid');
    expect(uuidText.length).toBeGreaterThan(10);

    // import vue component
    await getResult().click(':nth-match(button, 1)');
    await getResult().click(':nth-match(button, 1)');
    await getResult().click(':nth-match(button, 1)');

    // import vue component that has relative imports and fetches absolute url
    const buttonText = await getResult().innerText(':nth-match(button, 1)');
    expect(buttonText).toBe('Count is: 3, double is: 6');
  });

  test('Vue 3 langs', async ({ page, getTestUrl }) => {
    const sfc = `<template lang="md">
  # Hello, {{ name }}!
  <p :class="$style.text">some text</p>
</template>

<script lang="ts" setup>
  const name: string = 'Vue 3';
</script>

<style lang="scss" module>
  $font-stack: Helvetica, sans-serif;
  $primary-color: #555;
  $secondary-color: green;

  h1 {
    font: 200% $font-stack;
    color: $primary-color;
  }

  .text {
    font: 100% $font-stack;
    color: $secondary-color;
  }
</style>
`;

    await page.goto(
      getTestUrl({
        x: 'code/N4IgLglmA2CmIC4QFUB2kawCYAIAKATgPYBWsAxmCADQhawDO5BEADpEaoiDeAIYBzBogDaAXVp9KEAG6wAolihEC3Ji3a8AtnwIBrAK6tEoaH1QCDg+EgAWYLdF7lOYWOm4gAvrQZgAnnAmIGYWVgI2IOQMwrQu6O5USN6+zGxJpuaW1twyBvBxroncADxuWqxmbjihAgC8ADogWlhNAHwNBA2oODgAxDgAErDQ0ETUOMDAOKh8WrA4Xl4AhJ3dvSWsOAjkZjGNIAAkfoGwAHRuAB5g7QxE8zhXYCUA9KwdXaiv5ZV8bh-dNZfdTpGpZA5gBhNHAMWBgIwAno4eJ+GZzWAIGFgFgWHB1HAAcgAavkcABmAkAbiBrxB7ERNJOcDBFgOTBi0K0RCwBjgiN6hwAZq4ALR+KR6THDaBySDkPgTBjmBhi2AsQXUz4C1gsHQEfwilxjAiYvoAVgtmvWOGOFE4WF0BqNKkxAgIsHcVtQQN6tgAjJMfb0cML0JiAEwABkjAFIbaGwGKwBKvcHkURjZjDjqIHqnRmVKnFkCgxdYNdA1rgwnMX7o3GhaLxeQ9EXes6TTbYfEHfrDQWCEWvDSXkzYG0UiAxwxbB7IaIJFO0uxhAhxHEYoRGHDPLQdURyIw7gRV+uogY-PcAMpwyAWVfAHwgXOsFTzhCP2gBViMExPtx+A+IRZOEkTfowy5UIUCQeMkT5yCeECcNwAAs3hAA',
      }),
    );

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Vue 3 SFC');
    await waitForEditorFocus(app);
    // await page.keyboard.insertText(sfc);

    await waitForResultUpdate();

    const headerText = await getResult().innerText('h1');

    // markdown, scss, typescript
    expect(headerText).toContain(`Hello, Vue 3!`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(85, 85, 85)');

    // css modules
    expect(await getResult().$eval('p', (e) => getComputedStyle(e).color)).toBe('rgb(0, 128, 0)');
  });

  test('Vue 3 + Tailwind CSS', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Vue 3 SFC');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<template>
  <div class="flex items-center justify-center h-40">
    <h1 class="text-red-600">Tailwind in Vue SFC</h1>
  </div>
</template>
`,
    );

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Tailwind CSS');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Tailwind in Vue SFC`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe(
      'rgb(220, 38, 38)',
    );
  });

  test('Vue 2', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Vue 2`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Svelte', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Svelte`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Malina.js', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Malina.js');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<script>
  let title = "Malina.js";
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Malina.js`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('Stencil', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<my-app title="Stencil"></my-app>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
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

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('h1');

    expect(resultText).toContain(`Hello, Stencil`);
    expect(await getResult().$eval('h1', (e) => getComputedStyle(e).color)).toBe('rgb(0, 0, 255)');
  });

  test('CoffeeScript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=CoffeeScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`square = (x) -> x * x`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('body > script');

    expect(resultText).toContain(`var square;`);
    expect(resultText).toContain(`square = function(x) {
  return x * x;
};`);
  });

  test('LiveScript', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">World</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=LiveScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`{ capitalize, join, map, words } = require 'prelude-ls'
title = 'live script'
|> words
|> map capitalize
|> join ''
(document.getElementById \\title).textContent = title`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, LiveScript`);
  });

  test('Riot.js', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<hello title="Riot.js"></hello>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Riot.js');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<hello><h1>Hello, {props.title}</h1></hello>');

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Riot.js`);
  });

  test('AssemblyScript', async ({ page, getTestUrl }) => {
    test.fixme();

    await page.goto(getTestUrl());

    const { app, getResult } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      `<h1>Hello, <span id="title">World</span></h1>
  <script>
  (async() => {
    const { wasmModule } = await livecodes.wasm;
    const { __getString, getTitle, increment } = wasmModule.exports;
    const title = document.querySelector('#title');
    title.innerHTML = __getString(getTitle());
    })();
  </script>`,
    );

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=AssemblyScript');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`export function getTitle(): string {return "AssemblyScript";`);
    // workaround for monaco auto-complete
    await page.keyboard.press('Delete');
    await page.keyboard.insertText(`}`);

    await app.waitForTimeout(15000);
    const resultText = await getResult().innerText('text=Hello, AssemblyScript');

    expect(resultText).toContain(`Hello, AssemblyScript`);
  });

  test('Python', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1 id="header">Hello, World</h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Python');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`from browser import document
title = 'Python'
document['header'].html = f"Hello, {title}"`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Python`);
  });

  test('Pyodide', async ({ page, getTestUrl }) => {
    test.skip();
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1 id="header">Hello, World</h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Pyodide');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`from js import document
title = 'Python'
document.getElementById('header').innerHTML = f"Hello, {title}"`);

    await waitForResultUpdate();
    await getResult().waitForSelector('text=Hello, Python');
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Python`);
  });

  test('Ruby', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Ruby');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`require "native"
title = 'Ruby'
$$.document.querySelector('#title').innerHTML = title`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('text=Hello, Ruby');

    expect(resultText).toContain(`Hello, Ruby`);
  });

  test('Go', async ({ page, getTestUrl, editor }) => {
    test.slow();

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Go');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`package main
import "syscall/js"
func main() {
	js.Global().Get("document").Call("querySelector", "#title").Set("innerHTML", "Golang")
}`);

    await waitForResultUpdate({ delay: 4000, timeout: 60_000 });
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Golang`);
  });

  test('PHP', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=PHP');
    await waitForEditorFocus(app);

    // go below pre-inserted '<?php'
    await page.keyboard.press('ArrowDown');
    await page.keyboard.insertText(
      `$title = 'PHP';
$document->getElementById('title')->textContent = $title;`,
    );

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, PHP`);
  });

  test('Perl', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Perl');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`use strict;
my $title = 'Perl';
JS::inline('document.getElementById("title").innerHTML') = $title;`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Perl`);
  });

  test('Lua', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Lua');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`js = require "js"
window = js.global
document = window.document
document:getElementById("title").innerHTML = "Lua"`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Lua`);
  });

  test('Scheme', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codejar', 'please fix');

    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.insertText('<h1>Hello, <span id="title">world</span></h1>');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Scheme');
    await waitForEditorFocus(app);

    await page.keyboard.insertText(`(let ((title "Scheme"))
  (set-content! "#title" title))`);

    await waitForResultUpdate();
    const resultText = await getResult().innerText('h1');

    expect(resultText).toContain(`Hello, Scheme`);
  });
});
