import { Frame, Page } from '@playwright/test';
import { Pen } from '../src/localpen/models';

export const getTestUrl = (config: Partial<Pen> = { autoupdate: false }) => {
  const query = Object.keys(config).reduce(
    (q, key, index) => q + (index > 0 ? '&' : '') + key + '=' + config[key],
    '',
  );
  const url = process.env.TEST_URL || 'http://localhost:8080';
  return url + (query ? '?' + query : '');
};

export const getLoadedApp = async (page: Page) => {
  await page.waitForSelector('iframe[name="app"]');
  const app = page.frame('app');
  await app.waitForLoadState();
  let result = getResultFrame(app);
  return {
    app,
    getResult: () => result,
    waitForResultUpdate: async () => {
      result = await getUpdatedResultFrame(app, result);
    },
  };
};

const getResultFrame = (app: Frame) => app.page().frame('result');

const getUpdatedResultFrame = async (app: Frame, resultFrame: Frame) => {
  let newFrame: Frame;
  await (() =>
    new Promise<void>((done) => {
      const check = () => {
        setTimeout(() => {
          if (resultFrame === getResultFrame(app) || getResultFrame(app) == null) {
            check();
          } else {
            newFrame = getResultFrame(app);
            done();
          }
        }, 50);
      };
      check();
    }))();

  await app.waitForFunction(
    `document.querySelector('#tools-pane-loading').style.display === 'none'`,
  );
  await newFrame.waitForLoadState();
  return newFrame;
};

export const waitForEditorFocus = async (app: Frame) => {
  await app.waitForFunction('document.activeElement.closest("#editors") != null');
};

export const runButtonSelector = '[alt="Run"]';
