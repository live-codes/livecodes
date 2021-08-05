import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector, waitForEditorFocus } from '../helpers';

test.describe.only('Custom Settings', () => {
  test('markdown', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"markdown":{headerPrefix: 'pre-'}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Markdown');
    await waitForEditorFocus(app);
    await page.keyboard.type('# hello');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1#pre-hello')).toContain('hello');
  });

  test('asciidoctor', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"asciidoc": { standalone: true }}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type('hello');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('#footer-text')).toContain('Last updated');
  });

  test('scss', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"scss": {"indent": "--"}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=SCSS');
    await waitForEditorFocus(app);
    await page.keyboard.type(`h1 {color: blue}`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('--color');
  });

  test('sass', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"sass": {"indent": "--"}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Sass');
    await waitForEditorFocus(app);
    await page.keyboard.type(`h1
    color: blue`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('--color');
  });

  test('less', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"less": {"math": "always"}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Less');
    await waitForEditorFocus(app);
    await page.keyboard.type(`.math { a: 1 + 1; b: 2px / 2; c: 2px ./ 2; d: (2px / 2); }`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('b: 1px;');
  });

  test('autoprefixer', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"autoprefixer": {"add": false}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}\n');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('preset-env', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"postcssPresetEnv": {"stage": 3}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Preset Env');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('html { overflow: hidden auto; }');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('html { overflow: hidden auto; }');
  });

  test('tailwindcss', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(
      `{"tailwindcss": {"theme": {"extend": {"colors": {"dark-blue-800": "#0A214C"}}}}}`,
    );
    await app.click('text=Load');

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type('\n<span class="text-dark-blue-800">Hello</span>');

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Tailwind CSS');
    await app.click('text=CSS');
    await waitForEditorFocus(app);

    await app.click(runButtonSelector);
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

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"babel": {"sourceMaps": "inline"}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=Babel');
    await waitForEditorFocus(app);
    await page.keyboard.type('const x = () => "hi";\n');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('//# sourceMappingURL=data:');
  });

  test('typescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"typescript": {"target": "es5"}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=TypeScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('const x = () => "hi";\n');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('var x = function () {');
  });

  test('svelte', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'svelte' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"svelte": {"css": false}}`);
    await app.click('text=Load');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).not.toContain('function add_css()');
  });

  test('stencil', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'stencil' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"stencil": {"sourceMap": true}}`);
    await app.click('text=Load');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('//# sourceMappingURL=');
  });

  test('coffeescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"coffeescript": {"bare": false}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=CoffeeScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('x = 10');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('(function()');
  });

  test('livescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[title=Settings]');
    await app.click('text=Custom Settings');
    await waitForEditorFocus(app, '#custom-settings-editor');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.type(`{"livescript": {"bare": false}}`);
    await app.click('text=Load');

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=LiveScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('x = 10');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('(function()');
  });
});
