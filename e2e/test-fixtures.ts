// my-test.ts
import { test as base } from '@playwright/test';
import type { Config, UrlQueryParams } from '../src/livecodes/models';

export const test = base.extend<{
  editor: Config['editor'];
  getTestUrl: (config?: UrlQueryParams) => string;
}>({
  editor: ['monaco', { option: true }],
  getTestUrl: async ({ editor }, use) => {
    await use((config?: UrlQueryParams) => {
      const options = {
        editor,
        autoupdate: false,
        enableRestore: false,
        'no-defaults': true,
        closeBrackets: false,
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
