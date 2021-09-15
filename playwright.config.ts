// eslint-disable-next-line import/no-extraneous-dependencies
import { PlaywrightTestConfig } from '@playwright/test';
// eslint-disable-next-line import/no-internal-modules
import { Pen } from './src/localpen/models';

const config: PlaywrightTestConfig<{ editor: Pen['editor'] }> = {
  globalSetup: require.resolve('./e2e/global-setup'),
  testDir: 'e2e',
  retries: process.env.CI ? 10 : 2,
  timeout: 60000,
  globalTimeout: 45 * 60 * 1000,
  projects: [
    {
      name: 'monaco',
      use: {
        editor: 'monaco',
        headless: true,
      },
    },
    {
      name: 'codemirror',
      use: {
        editor: 'codemirror',
        headless: true,
      },
    },
  ],
};
export default config;
