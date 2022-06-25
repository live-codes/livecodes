import { Frame, Page } from '@playwright/test';
import { Config, Language, Screen } from '../src/livecodes/models';

export type UrlQueryOptions = Partial<
  Config & { [key in Language]: string } & Screen & {
      template: string;
      config: string;
      embed: string;
      lite: string;
      x: string;
      raw: string;
    }
>;

export const getTestUrl = (config: UrlQueryOptions = { autoupdate: false }) => {
  const query = Object.keys(config).reduce(
    (q, key, index) => q + (index > 0 ? '&' : '') + key + '=' + config[key],
    '',
  );
  const url = process.env.TEST_URL || 'http://localhost:8080';
  return url + (query ? '?' + query : '');
};

export const getLoadedApp = async (page: Page) => {
  await page.waitForSelector('iframe[name="app"]');
  const app = page.frame('app')!;
  await app.waitForLoadState();
  let result = getResultFrame(app);
  return {
    app,
    getResult: () => {
      result = getResultFrame(app);
      return result;
    },
    waitForResultUpdate: async () => {
      result = await getUpdatedResultFrame(app);
    },
  };
};

const getResultFrame = (app: Frame) => app.page().frame('result')!;

const getUpdatedResultFrame = async (app: Frame) => {
  const loaded = new Promise<void>(async (resolve) => {
    await app.waitForFunction(
      `document.querySelector('#tools-pane-loading').style.display !== 'none'`,
    );
    await app.waitForFunction(
      `document.querySelector('#tools-pane-loading').style.display === 'none'`,
    );
    await app.waitForTimeout(1000);
    resolve();
  });
  await Promise.race([
    Promise.all([loaded, app.click(runButtonSelector)]),
    app.waitForTimeout(20000),
  ]);
  return getResultFrame(app);
};

export const waitForEditorFocus = async (app: Frame, selector = '#editors') => {
  await app.waitForFunction(`document.activeElement.closest("${selector}") != null`);
};

export const runButtonSelector = '[alt="Run"]';
