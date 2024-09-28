import { expect } from '@playwright/test';
import { test } from '../test-fixtures';
import { getLoadedApp } from '../helpers';
import type { AppLanguage, UrlQueryParams } from '../../src/livecodes/models';

type TestParams = Parameters<Parameters<typeof test>[1]>[0];

test.describe('I18n', () => {
  type I18nTestOptions = Omit<UrlQueryParams, 'appLanguage'>;
  interface Test {
    title: string;
    selector: string;
    text: {
      [K in AppLanguage]?: string;
    };
    prop: string;
    options?: I18nTestOptions;
  }

  const checkText =
    (
      selector: string,
      text: string,
      prop: string,
      appLanguage: AppLanguage | undefined,
      options: I18nTestOptions,
    ) =>
    async ({ page, getTestUrl }: TestParams) => {
      await page.goto(getTestUrl({ 'no-defaults': false, appLanguage, ...options }));

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

  const tests = [
    {
      title: 'Check HTML Text (Welcome)',
      selector: '#welcome-container > .modal-title',
      prop: 'textContent',
      text: {
        en: 'Welcome',
        'zh-CN': '欢迎',
      },
    },
    {
      title: 'Check TS Text (Blank Project)',
      selector: '#welcome-template-list > li:nth-child(1)',
      prop: 'textContent',
      text: {
        en: 'Blank Project',
        'zh-CN': '空白项目',
      },
    },
    {
      title: 'Check Embed (Run Button)',
      selector: '#run-button',
      prop: 'data-hint',
      text: {
        en: 'Run (Shift + Enter)',
        'zh-CN': '运行（Shift + Enter）',
      },
      options: {
        embed: true,
      },
    },
  ] as const satisfies Test[];

  // @ts-expect-error
  tests.forEach(({ title, selector, prop, text, options }) => {
    test.describe(title, () => {
      const subcheckText = (text: string, appLanguage?: AppLanguage) =>
        checkText(selector, text, prop, appLanguage, options);

      test('Check default fallback (en)', subcheckText(text.en));
      test(
        'Check supported language with query param (zh-CN)',
        subcheckText(text['zh-CN'], 'zh-CN'),
      );

      // @ts-expect-error
      test('Check not-supported language', subcheckText(text.en, 'un-supported'));

      test.describe('Check with locale (zh-CN)', () => {
        test.use({ locale: 'zh-CN' });
        test(
          'Check supported language with locale (zh-CN)',
          subcheckText(options?.embed ? text.en : text['zh-CN'], 'auto'),
        );
      });
    });
  });
});
