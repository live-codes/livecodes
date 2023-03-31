import { Frame, Page } from '@playwright/test';

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
