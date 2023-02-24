import { expect } from '@playwright/test';
import { test } from '../test-fixtures';

test.describe('Screens', () => {
  test('screen: login', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ screen: 'login' }));
    await page.waitForSelector('iframe[name="app"]');
    const app = page.frame('app');
    await app?.waitForLoadState();
    await app?.waitForSelector('#modal >> text=Login with GitHub');
    expect(true).toBe(true);
  });

  test('screen: new', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ screen: 'new' }));
    await page.waitForSelector('iframe[name="app"]');
    const app = page.frame('app');
    await app?.waitForLoadState();
    await app?.waitForSelector('#modal >> text=New Project');
    expect(true).toBe(true);
  });

  test('screen: open', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ screen: 'open' }));
    await page.waitForSelector('iframe[name="app"]');
    const app = page.frame('app');
    await app?.waitForLoadState();
    await app?.waitForSelector('#modal >> text=Saved Projects');
    expect(true).toBe(true);
  });

  test('screen: import', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ screen: 'import' }));
    await page.waitForSelector('iframe[name="app"]');
    const app = page.frame('app');
    await app?.waitForLoadState();
    await app?.waitForSelector('#modal >> text=Import');
    expect(true).toBe(true);
  });

  test('screen: deploy', async ({ page, getTestUrl }) => {
    await page.goto(getTestUrl({ screen: 'deploy' }));
    await page.waitForSelector('iframe[name="app"]');
    const app = page.frame('app');
    await app?.waitForLoadState();
    await app?.waitForSelector('#modal >> text=Login with GitHub');
    expect(true).toBe(true);
  });
});
