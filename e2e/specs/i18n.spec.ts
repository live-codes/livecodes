import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp } from '../helpers';
import type { AppLanguage } from '../../src/livecodes/models';

type TestParams = Parameters<Parameters<typeof test>[1]>[0];

test.describe('I18n', () => {
  test.describe('Check appLanguage with Welcome Text', () => {
    const checkWelcomeText =
      (text: string, appLanguage?: AppLanguage) =>
      async ({ page, getTestUrl }: TestParams) => {
        await page.goto(getTestUrl({ 'no-defaults': false, appLanguage }));

        const { app } = await getLoadedApp(page);
        await app.waitForSelector('#welcome-container');
        const welcomeTitle = await app.$('#welcome-container .modal-title');
        expect(await welcomeTitle?.innerText()).toBe(text);
      };

    test('Check default fallback (en)', checkWelcomeText('Welcome'));
    test('Check supported language with query param (zh-CN)', checkWelcomeText('欢迎', 'zh-CN'));

    // @ts-expect-error
    test('Check not-supported language', checkWelcomeText('Welcome', 'un-supported'));

    test.describe('Check with locale (zh-CN)', () => {
      test.use({ locale: 'zh-CN' });
      test('Check supported language with locale (zh-CN)', checkWelcomeText('欢迎', 'auto'));
    });
  });
});
