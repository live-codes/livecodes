import type { StorybookConfig } from 'storybook-solidjs-vite';

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: 'storybook-solidjs-vite',
  async viteFinal(config) {
    config.build ??= {};
    config.build.rolldownOptions ??= {};
    config.build.rolldownOptions.output ??= {
      strictExecutionOrder: true,
    };
    config.optimizeDeps ??= {};
    config.optimizeDeps.rolldownOptions ??= {};
    config.optimizeDeps.rolldownOptions.output ??= {
      strictExecutionOrder: true,
    };
    return config;
  },
};
export default config;
