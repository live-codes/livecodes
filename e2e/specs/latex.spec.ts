import { expect } from '@playwright/test';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';

test.describe('LaTeX', () => {
  test.describe.configure({ timeout: 180_000 });

  test('compiles a LaTeX document to HTML in the result page', async ({ page, getTestUrl }) => {
    const url = getTestUrl({
      latex: String.raw`\documentclass{article}
\begin{document}
\section{Hello, LaTeX!}
This is \textbf{LaTeX} running in LiveCodes.

\[
  E = mc^2
\]
\end{document}`,
    });
    await page.goto(url);

    const { getResult, waitForResultUpdate } = await getLoadedApp(page);

    // Trigger the first compile, which downloads LaTeX.js and its stylesheets.
    await waitForResultUpdate({ delay: 2000 });

    const result = getResult();
    await expect.poll(() => result.locator('.body').count(), { timeout: 120_000 }).toBe(1);
    await expect(result.getByText('Hello, LaTeX!')).toBeVisible();
    await expect(result.locator('.katex').first()).toBeVisible();
    await expect
      .poll(() => result.evaluate(() => getComputedStyle(document.body).display))
      .toBe('grid');
  });
});
