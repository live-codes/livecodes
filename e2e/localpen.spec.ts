import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const name = await page.title();
  expect(name).toBe('LocalPen');
});
