import { expect } from '@playwright/test';
import type { AppLanguage, UrlQueryParams } from '../../src/livecodes/models';
import { getLoadedApp } from '../helpers';
import { test } from '../test-fixtures';

type TestParams = Parameters<Parameters<typeof test>[1]>[0];

test.describe('I18n', () => {
  type I18nTestOptions = Omit<UrlQueryParams, 'appLanguage'>;

  const checkText =
    (
      selector: string,
      text: string,
      prop: string,
      appLanguage: AppLanguage | undefined,
      options?: I18nTestOptions,
    ) =>
    async ({ page, getTestUrl }: TestParams) => {
      await page.goto(
        getTestUrl({
          'no-defaults': false,
          ...(appLanguage !== undefined && { appLanguage }),
          ...options,
        }),
      );

      const { app } = await getLoadedApp(page);
      const textElem = await app.$(selector);
      if (!textElem) {
        throw new Error(`Element not found: ${selector}`);
      }

      const textToCheck =
        (await textElem.getAttribute(prop)) ??
        (typeof textElem[prop] === 'function' && (await textElem[prop]()));

      expect(textToCheck).toBe(text);
    };

  test.describe('Check HTML Text (Welcome)', () => {
    const checkWelcomeHTMLString = (text: string, appLanguage?: AppLanguage) =>
      checkText('#welcome-container > .modal-title', text, 'textContent', appLanguage);

    test('Check default fallback (en)', checkWelcomeHTMLString('Welcome'));
    test(
      'Check supported language with query param (zh-CN)',
      checkWelcomeHTMLString('欢迎', 'zh-CN'),
    );

    // @ts-expect-error
    test('Check not-supported language', checkWelcomeHTMLString('Welcome', 'un-supported'));

    test.describe('Check with locale (zh-CN)', () => {
      test.use({ locale: 'zh-CN' });
      test('Check supported language with auto check', checkWelcomeHTMLString('欢迎', 'auto'));
      test('Check supported language with no query param given', checkWelcomeHTMLString('欢迎'));
    });
  });

  test.describe('Check TS Text (Blank Project)', () => {
    const checkWelcomeTSString = (text: string, appLanguage?: AppLanguage) =>
      checkText('#welcome-template-list > li:nth-child(1)', text, 'textContent', appLanguage);

    test('Check default fallback (en)', checkWelcomeTSString('Blank Project'));
    test(
      'Check supported language with query param (zh-CN)',
      checkWelcomeTSString('空白项目', 'zh-CN'),
    );

    // @ts-expect-error
    test('Check not-supported language', checkWelcomeTSString('Blank Project', 'un-supported'));

    test.describe('Check with locale (zh-CN)', () => {
      test.use({ locale: 'zh-CN' });
      test('Check supported language with auto check', checkWelcomeTSString('空白项目', 'auto'));
      test('Check supported language with no query param given', checkWelcomeTSString('空白项目'));
    });
  });

  test.describe('Check Embed (Run Button)', () => {
    const checkRunButtonEmbed = (text: string, appLanguage?: AppLanguage) =>
      checkText('#run-button', text, 'title', appLanguage, { embed: true });

    test('Check default fallback (en)', checkRunButtonEmbed('Run (Shift + Enter)'));
    test(
      'Check supported language with query param (zh-CN)',
      checkRunButtonEmbed('运行（Shift + Enter）', 'zh-CN'),
    );

    test(
      'Check not-supported language',
      // @ts-expect-error
      checkRunButtonEmbed('Run (Shift + Enter)', 'un-supported'),
    );

    test.describe('Check with locale (zh-CN)', () => {
      test.use({ locale: 'zh-CN' });
      test(
        'Check supported language with auto check',
        checkRunButtonEmbed('运行（Shift + Enter）', 'auto'),
      );

      test(
        'Check supported language with no query param given',
        checkRunButtonEmbed('Run (Shift + Enter)'),
      );
    });
  });
});
