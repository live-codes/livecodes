// my-test.ts
import { test as base } from '@playwright/test';
import { Config } from '../src/livecodes/models';

export const test = base.extend<{
  editor: Config['editor'];
  getTestUrl: (config?: Partial<Config>) => string;
}>({
  editor: 'monaco',
  getTestUrl: async ({ editor }, use) => {
    await use((config: Partial<Config>) => {
      const options = {
        editor,
        autoupdate: false,
        enableRestore: false,
        ...config,
      };
      const query = Object.keys(options).reduce(
        (q, key, index) => q + (index > 0 ? '&' : '') + key + '=' + options[key],
        '',
      );
      const url = process.env.TEST_URL || 'http://localhost:8080';
      return url + '?' + query;
    });
  },
});
