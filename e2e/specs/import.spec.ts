import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp, waitForEditorFocus } from '../helpers';

const sources = {
  'GitHub gist': 'https://gist.github.com/hatemhosny/406b6775436e136cb913ad3376f411b2',
  'GitHub gist - no username': 'https://gist.github.com/406b6775436e136cb913ad3376f411b2',
  'GitHub dir':
    'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/gh-pages/src',
  'GitHub dir - permalink':
    'https://github.com/hatemhosny/typescript-demo-for-testing-import-/tree/29b328154267b36d77bfac284bc285784757c473/src',
  'GitLab snippet': 'https://gitlab.com/-/snippets/2199319',
  'GitLab dir':
    'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/tree/gh-pages/src',
  JsBin: 'https://jsbin.com/jikojak/edit?html,css,js,output',
};

const githubRepo = 'https://github.com/hatemhosny/typescript-demo-for-testing-import-';
const githubFile =
  'https://github.com/hatemhosny/typescript-demo-for-testing-import-/blob/gh-pages/index.html';

const gitlabRepo = 'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-';
const gitlabFile =
  'https://gitlab.com/hatemhosny/typescript-demo-for-testing-import-/-/blob/gh-pages/index.html';

const rawCode = 'https://hatemhosny.github.io/typescript-demo-for-testing-import-/';
const jsonURL =
  'https://raw.githubusercontent.com/hatemhosny/typescript-demo-for-testing-import-/gh-pages/src/livecodes.json';

test.describe('Import from UI', () => {
  Object.entries(sources).forEach(([source, url]) => {
    test(source, async ({ page, getTestUrl, editor }) => {
      test.skip(editor === 'codejar', 'FIXME: fails on CI');
      test.skip(source.startsWith('GitHub'), 'FIXME: fails on CI');
      test.skip(source.startsWith('JsBin'), 'FIXME: fails on CI');

      await page.goto(getTestUrl());

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await app.click('[aria-label="Menu"]');
      await app.click('text="Import …"');
      await app.fill('#code-url', url);
      await app.click('button:has-text("Import from URL"):visible');

      await waitForResultUpdate();
      const titleText = await getResult().innerText('h1');
      expect(titleText).toBe('Hello, TypeScript!');
    });
  });

  test('GitHub repo', async ({ page, getTestUrl, editor }) => {
    test.skip(true, 'FIXME: fails on CI');
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill('#code-url', githubRepo);
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('TypeScript Demo (for testing import)');
  });

  test('GitHub file', async ({ page, getTestUrl, editor }) => {
    test.skip(true, 'FIXME: fails on CI');
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill('#code-url', githubFile);
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('GitLab repo', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill('#code-url', gitlabRepo);
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('TypeScript Demo (for testing import)');
  });

  test('GitLab file', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill('#code-url', gitlabFile);
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('Raw code', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill('#code-url', rawCode);
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('Project JSON from URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.click('text=Import Project JSON');
    await app.fill('#json-url', jsonURL);
    await app.click('button:has-text("Import project from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, TypeScript!');
  });

  test('Data URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl());

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await app.click('[aria-label="Menu"]');
    await app.click('text="Import …"');
    await app.fill(
      '#code-url',
      'data:text/javascript;charset=UTF-8;base64,ZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gJzxoMT5kYXRhIHVybDwvaDE+Jzs=',
    );
    await app.click('button:has-text("Import from URL"):visible');

    await waitForResultUpdate();
    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('data url');
  });
});

test.describe('Import from URL', () => {
  test('shared code', async ({ page, getTestUrl }) => {
    const codeHash =
      '#code/N4IgLglmA2CmIC4QFUB2kawCYAIAKATgPYBWsAxmCADQhawDO5BEADpEaoiDeAIYBzBogDaAXVp9KEAG6wAolihEC3Ji3a8AtnwIBrAK6tEoaH1QCDg+EgAWYLdF7lOYWOm4AeJTJzkzDAwAvAA6IC7ofBCosARhAHwhqDg4nrYAjPEAErDQ0ETUqQys5jgQWKHgUHAJAOoq0FieAPTF5vEAhC0ZicmpEFoCfgHBYfkCRGE4DATklfZgrAjNzekATADsAHQADLtb6QgAHDsnzdCyFET0DM18gbBgt25arGZuzwCerIzMbGBbBgyARTZq9FKeVjxACaRAMwwg5D02CKJWS5UqLgM6FiCR2LTaqHiOEgWkYWxaUKSEIARgYwGBOGUKmEsTiCABaOkMzgJADCFyRODJLW5jKJSRaPl6IAAvrQGGBPnATCAzBYrAIbOFAs5XO4qEgthEwFEYgRqElja4zbEcGKmcBqSTYAAPMAcvgXASoBB+A2xADczoAZq4-elYFppuYGByGLEICHg6hZVbxkQcE6+gB3cpgWwRgCsO1YrpTaa48pA6n+qvVlms3CVP1rmloJoN3H89wYOD5cPZWedrBYMj4bj8g7AftQBi0NKDzoiioIBkoKgAFABKYd9FIFiAMa3YsA4II4HYplKVlLRZhRg07vcpA+2I8n9A4ADUF-S15wW8cC1MAADUvQMWBn2zV8cAIR4DAIZJD2PNkwAAytKySFczwwOBzxwLAiHIecDS2ABHSCCE+ABlXIKEZAhNzCABiPDYDCbcUxwqdTwIoiSLJdAKKo2j6I3JjWLQ3EQC47DOEVe16XFfjiNI4TKNiMS4Ak5iQBY6TOQdVBOJTJJ2K2Nx3QHHEvwvMIABVvlgGi-nYMJuIUs9DIImIc37adYh3FNjK2PgsCweQ5HQAAZI83HNZi+lZQU9DCS0+mfIJiRg19DK2e94KEsBgudFI0Mst0wBshKzwvGiwBYCxN3ykDwOgSCdzkvp5VDL0EySbq5QVJU4AYWxYEeYQEHEBU3KeUQJB1BhCEYR5uF4UdiMYBgVGm0BWCIRVyF1BBQD4ekiFHWAQwgV1YkQEN+tgWhDuOwJVoTMB5FQGRHue2hTQgaA81QLATump7oATWVqxIxUiC0OiGWiIRVReN4JxsUAsAnPgTGra74LBh6EEayDYdoAZDoIBazurFtGAJ2g5AIBgIE4bg9gAFl2OUgA';
    await page.goto(getTestUrl() + codeHash);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, TypeScript!');
  });

  Object.entries(sources).forEach(([source, url]) => {
    test(source, async ({ page, getTestUrl }) => {
      test.skip(source.startsWith('GitHub'), 'FIXME: fails on CI');
      test.skip(source.startsWith('JsBin'), 'FIXME: fails on CI');

      await page.goto(getTestUrl() + '#' + url);

      const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

      await waitForEditorFocus(app);
      await waitForResultUpdate();

      const titleText = await getResult().innerText('h1');
      expect(titleText).toBe('Hello, TypeScript!');
    });
  });

  test('GitLab repo URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl() + '#' + gitlabRepo);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('TypeScript Demo (for testing import)');
  });

  test('GitLab file URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl() + '#' + gitlabFile);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('GitHub repo URL', async ({ page, getTestUrl, editor }) => {
    test.skip(true, 'FIXME: fails on CI');
    await page.goto(getTestUrl() + '#' + githubRepo);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('TypeScript Demo (for testing import)');
  });

  test('GitHub file URL', async ({ page, getTestUrl, editor }) => {
    test.skip(true, 'FIXME: fails on CI');
    await page.goto(getTestUrl() + '#' + githubFile);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('Raw code URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl() + '#' + rawCode);

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, World!');
  });

  test('code in URL DOM', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ 'html-selector': 'h1', css: 'span{color:blue}', x: rawCode }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('body');
    expect(titleText).toBe('Hello, World!');
    expect(await getResult().$eval('span', (e) => getComputedStyle(e).color)).toBe(
      'rgb(0, 0, 255)',
    );
  });

  test('Config JSON from URL', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ config: jsonURL }));

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('Hello, TypeScript!');
  });

  test('Data URL', async ({ page, getTestUrl }) => {
    await page.goto(
      getTestUrl({
        x: 'data%3Atext%2Fjavascript%3Bcharset%3DUTF-8%3Bbase64%2CZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gJzxoMT5kYXRhIHVybDwvaDE%2BJzs%3D',
      }),
    );

    const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

    await waitForEditorFocus(app);
    await waitForResultUpdate();

    const titleText = await getResult().innerText('h1');
    expect(titleText).toBe('data url');
  });
});
