import { expect } from '@playwright/test';
import { getLoadedApp, runButtonSelector } from '../helpers';
import { test } from '../test-fixtures';

// The compiler is about 19 MB compressed and is downloaded on the first run.
const compilerTimeout = 150_000;

test('Fortran', async ({ page, getTestUrl }) => {
  test.slow();

  await page.goto(
    getTestUrl({ language: 'fortran', script: 'print *, 6*7', tools: 'console|open' }),
  );
  const { app } = await getLoadedApp(page);

  await app.click(runButtonSelector);

  // LFortran writes the program's stdout to the console pane.
  await expect(app.locator('#console-container')).toContainText('42', { timeout: compilerTimeout });
});

test('Fortran reports a compile error', async ({ page, getTestUrl }) => {
  test.slow();

  await page.goto(
    getTestUrl({ language: 'fortran', script: 'this is not fortran', tools: 'console|open' }),
  );
  const { app } = await getLoadedApp(page);

  await app.click(runButtonSelector);

  // Diagnostics are rendered by LFortran and shown in the console pane.
  await expect(app.locator('#console-container')).toContainText(/error/i, {
    timeout: compilerTimeout,
  });
});
