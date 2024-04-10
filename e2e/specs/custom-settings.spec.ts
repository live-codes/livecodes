import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

test.describe('Custom Settings', () => {
  test('asciidoctor', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"asciidoc": { standalone: true }}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type('hello');

    await waitForResultUpdate();

    expect(await getResult().innerText('#footer-text')).toContain('Last updated');
  });

  test('scss', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"scss": {"style": "compressed"}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=SCSS');
    await waitForEditorFocus(app);
    await page.keyboard.type(
      `$font-stack: Helvetica, sans-serif; $primary-color: #333; body {font: 100% $font-stack; color: $primary-color;}`,
    );

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain(
      'body{font:100% Helvetica,sans-serif;color:#333}',
    );
  });

  test('sass', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.insertText(`{"sass": {"style": "compressed"}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Sass');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`
$font-stack: Helvetica, sans-serif

body
  font: 100% $font-stack
`);

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain(
      'body{font:100% Helvetica,sans-serif}',
    );
  });

  test('less', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"less": {"math": "always"}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Less');
    await waitForEditorFocus(app);
    await page.keyboard.type(`.math { a: 1 + 1; b: 2px / 2; c: 2px ./ 2; d: (2px / 2); }`);

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('b: 1px;');
  });

  test('postcssImportUrl', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"postcssImportUrl": false}`);
    await app.click('button:has-text("Load"):visible');

    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(`@import "github-markdown-css";`);

    await waitForResultUpdate();
    const resultText = await getResult().innerHTML('style');

    expect(resultText).not.toContain('.markdown-body');
  });

  test('autoprefixer', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"autoprefixer": {"add": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}\n');

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('preset-env', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"postcssPresetEnv": {"stage": 3}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Preset Env');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('html { overflow: hidden auto; }');

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('html { overflow: hidden auto; }');
  });

  test('tailwindcss', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(
      `{"tailwindcss": {"theme": {"extend": {"colors": {"dark-blue-800": "#0A214C"}}}}}`,
    );
    await app.click('button:has-text("Load"):visible');

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<span class="text-dark-blue-800">Hello</span>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Tailwind CSS');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('@tailwind utilities;');

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain(
      `.text-dark-blue-800 {
    --tw-text-opacity: 1;
    color: rgb(10 33 76 / var(--tw-text-opacity))
}`,
    );
  });

  test('windicss', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(
      `{"windicss": {"theme": {"extend": {"colors": {"dark-blue-800": "#0A214C"}}}}}`,
    );
    await app.click('button:has-text("Load"):visible');

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('<span class="text-dark-blue-800">Hello</span>');

    await app.click(':nth-match([data-hint="Change Language"], 2)');
    await app.click('text=Windi CSS');
    await app.click('text=CSS');
    await waitForEditorFocus(app);

    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain(
      `.text-dark-blue-800 {
  --tw-text-opacity: 1;
  color: rgba(10, 33, 76, var(--tw-text-opacity));
}`,
    );
  });

  test('babel', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"babel": {"sourceMaps": "inline"}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Babel');
    await waitForEditorFocus(app);
    await page.keyboard.type('const x = () => "hi";\n');

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('//# sourceMappingURL=data:');
  });

  test('typescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"typescript": {"target": "es5"}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=TypeScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('const x = () => "hi";\n');

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('var x = function () {');
  });

  test('flow', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"flow": {"pretty": true}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=Flow');
    await waitForEditorFocus(app);
    await page.keyboard.insertText(
      'function foo(x: ?number): string {if (x) { return x; } return "default string"; }',
    );

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain(
      'function foo(x) {if (x) { return x; } return "default string"; }',
    );
  });

  test('svelte', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'svelte' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"svelte": {"css": false}}`);
    await app.click('button:has-text("Load"):visible');

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).not.toContain('function add_css()');
  });

  test('stencil', async ({ page, getTestUrl, editor }) => {
    test.skip(editor === 'codemirror');

    await page.goto(getTestUrl({ template: 'stencil' }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"stencil": {"sourceMap": true}}`);
    await app.click('button:has-text("Load"):visible');

    await waitForResultUpdate();

    expect(await getResult().innerHTML('body script')).toContain('//# sourceMappingURL=');
  });

  test('coffeescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"coffeescript": {"bare": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=CoffeeScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('x = 10');

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('(function()');
  });

  test('livescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"livescript": {"bare": false}}`);
    await app.click('button:has-text("Load"):visible');

    await app.click(':nth-match([data-hint="Change Language"], 3)');
    await app.click('text=LiveScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('x = 10');

    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('(function()');
  });
});
