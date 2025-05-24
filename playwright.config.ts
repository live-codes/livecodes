import type { PlaywrightTestConfig } from '@playwright/test';
import type { Config } from './src/livecodes/models';

const config: PlaywrightTestConfig<{ editor: Config['editor'] }> = {
  globalSetup: require.resolve('./e2e/global-setup'),
  testDir: 'e2e',
  retries: process.env.CI ? 10 : 0,
  timeout: 60000,
  globalTimeout: 45 * 60 * 1000,
  webServer: {
    command: 'npm run serve',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'monaco',
      use: {
        editor: 'monaco',
        headless: Boolean(process.env.CI),
      },
    },
    // {
    //   name: 'codemirror',
    //   use: {
    //     editor: 'codemirror',
    //     headless: true,
    //   },
    // },
    // {
    //   name: 'codejar',
    //   use: {
    //     editor: 'codejar',
    //     headless: true,
    //   },
    // },
  ],
};
export default config;
