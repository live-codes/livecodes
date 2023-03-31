import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'LiveCodes storybook',
  brandImage: './livecodes-text-logo.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
