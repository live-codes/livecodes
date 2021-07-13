import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, runButtonSelector, waitForEditorFocus } from '../helpers';

test.describe('Custom Configs', () => {
  const customConfigs = `
<script type="marked-config">
  {
    headerPrefix: 'pre-',
  }
</script>
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
  `;
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
});
