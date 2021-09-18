// my-test.ts
import { test as base } from '@playwright/test';
import { Pen } from '../src/livecodes/models';

export const test = base.extend<{
  editor: Pen['editor'];
  getTestUrl: (config?: Partial<Pen>) => string;
}>({
  editor: 'monaco',
  getTestUrl: async ({ editor }, use) => {
    await use((config: Partial<Pen> = { autoupdate: false }) => {
      const options = {
        editor,
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
