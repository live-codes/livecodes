import { test, expect } from '@playwright/test';
import { getTestUrl } from '../helpers';

test.describe('App Defaults', () => {
  test('Title', async ({ page }) => {
    await page.goto(getTestUrl());
    const name = await page.title();
    expect(name).toBe('LocalPen');
  });
});
