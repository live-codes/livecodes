import { expect } from '@playwright/test';
import { getLoadedApp, runButtonSelector } from '../helpers';
import { test } from '../test-fixtures';

test('Fortran', async ({ page, getTestUrl }) => {
  // The compiler is about 19 MB compressed and is downloaded on the first run.
  test.slow();

  await page.goto(getTestUrl({ language: 'fortran', script: 'print *, 6*7' }));
  const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

  await app.click(runButtonSelector);
  await waitForResultUpdate();

  // The program's output is the only thing on the result page.
  await expect(getResult().locator('body')).toContainText('42');
});

test('Fortran reports a compile error', async ({ page, getTestUrl }) => {
  test.slow();

  await page.goto(getTestUrl({ language: 'fortran', script: 'this is not fortran' }));
  const { app, getResult, waitForResultUpdate } = await getLoadedApp(page);

  await app.click(runButtonSelector);
  await waitForResultUpdate();

  // Diagnostics are rendered by LFortran and shown in the console pane.
  await expect(getResult().locator('body')).toContainText(/error/i);
});
