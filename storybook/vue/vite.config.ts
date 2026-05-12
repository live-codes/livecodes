/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest/config" />
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import ignoreDynamicImports from 'vite-plugin-ignore-dynamic-imports';

// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@vue/runtime-core': path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-browser.prod.js'),
  //   },
  // },
  define: {
    process: '{ env: {} }',
  },
  plugins: [
    vue(),
    ignoreDynamicImports({
      include: ['**/**/*.@(js|jsx|mjs|ts|tsx)'],
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
