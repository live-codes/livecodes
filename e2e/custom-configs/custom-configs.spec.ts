import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector, waitForEditorFocus } from '../helpers';

test.describe.only('Custom Configs', () => {
  const customConfigs = `
<script type="sass-config">
  {
    indent: '    ',
  }
</script>
<script type="less-config">
  {
    math: 'always',
  }
</script>
<script type="autoprefixer-config">
  {
    add: false,
  }
</script>
<script type="tailwind-config">
  {
    theme: {
      extend: {
        colors: {
          'dark-blue-800': '#0A214C',
        }
      }
    }
  }
</script>
<script type="preset-env-config">
  {
    stage: 3,
  }
</script>
<script type="babel-config">
  {
    sourceMaps: 'inline',
  }
</script>
<script type="typescript-config">
  {
    target: 'es5',
  }
</script>
<script type="svelte-config">
  {
    css: false,
  }
</script>
<script type="stencil-config">
  {
    sourceMap: true,
  }
</script>
<script type="coffeescript-config">
  {
    bare: false,
  }
</script>
<script type="livescript-config">
  {
    bare: false,
  }
</script>
  `;

  test('markdown', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Markdown');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<script type="marked-config">{headerPrefix: 'pre-'}</script>\n\n`);
    await page.keyboard.type('# hello');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('h1#pre-hello')).toContain('hello');
  });

  test('mdx', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('::-moz-placeholder');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=MDX');
    await waitForEditorFocus(app);
    await page.keyboard.type(`<script type="autoprefixer-config">
  &#x7B;
    add: false
  &#x7D;
</script>
`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('pug', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('::-moz-placeholder');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Pug');
    await waitForEditorFocus(app);
    await page.keyboard.type(`
script(type="autoprefixer-config").
  { add: false }
`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('haml', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('::-moz-placeholder');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=Haml');
    await waitForEditorFocus(app);
    await page.keyboard.type(`
:plain
  <script type="autoprefixer-config">
    { add: false }
`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('asciidoc', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('::-moz-placeholder');

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type(`
+++
<script type="autoprefixer-config">
  { add: false }
</script>
+++
`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('asciidoc self-config', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click(':nth-match([title="change language"], 1)');
    await app.click('text=AsciiDoc');
    await waitForEditorFocus(app);
    await page.keyboard.type(`
+++
<script type="asciidoctor-config">
  { standalone: true }
</script>
+++
`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('#footer-text')).toContain('Last updated');
  });

  test('autoprefixer', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=autoprefixer');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('::placeholder {color: gray;}\n');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).not.toContain('::-moz-placeholder');
  });

  test('less', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Less');
    await waitForEditorFocus(app);
    await page.keyboard.type(`.math { a: 1 + 1; b: 2px / 2; c: 2px ./ 2; d: (2px / 2); }`);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('b: 1px;');
  });

  test('tailwind', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);
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

  test('preset-env', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(':nth-match([title="change language"], 2)');
    await app.click('text=Preset Env');
    await app.click('text=CSS');
    await waitForEditorFocus(app);
    await page.keyboard.type('html { overflow: hidden auto; }');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('head style')).toContain('html { overflow: hidden auto; }');
  });

  test('babel', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

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

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

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

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).not.toContain('function add_css()');
  });

  test('stencil', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ template: 'stencil' } as any));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('//# sourceMappingURL=');
  });

  test('coffeescript', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

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

    await app.click('text=HTML');
    await waitForEditorFocus(app);
    await page.keyboard.type(customConfigs);

    await app.click(':nth-match([title="change language"], 3)');
    await app.click('text=LiveScript');
    await waitForEditorFocus(app);
    await page.keyboard.type('x = 10');

    await app.click(runButtonSelector);
    await waitForResultUpdate();

    expect(await getResult().innerText('body script')).toContain('(function()');
  });
});
