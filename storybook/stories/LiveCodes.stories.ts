// eslint-disable-next-line import/no-extraneous-dependencies
import { Story } from '@storybook/html';

import { createLiveCodes, LiveCodesStory } from './LiveCodes';

export default {
  title: 'Example/LiveCodes',
  argTypes: {
    appUrl: {
      control: 'text',
      defaultValue: 'http://127.0.0.1:8080/',
      required: false,
    },
    config: { type: 'object', required: false },
    import: { control: 'text', required: false },
    lite: { control: 'boolean', defaultValue: false, required: false },
    loading: {
      control: 'inline-radio',
      options: ['lazy', 'click', 'eager'],
      defaultValue: 'lazy',
      required: false,
    },
    template: { control: 'text', required: false },
    view: {
      control: 'inline-radio',
      options: ['split', 'editor', 'result'],
      defaultValue: 'split',
      required: false,
    },
    attrs: {
      description: 'Attributes to add to container element',
      type: 'object',
      required: false,
    },
  },
}; // as Meta<LiveCodesStory>;

const Template: Story<LiveCodesStory> = (args) => createLiveCodes(args);

export const Default: Story<LiveCodesStory> = Template.bind({});

export const ReactTemplate: Story<LiveCodesStory> = Template.bind({});
ReactTemplate.args = {
  template: 'react',
};

export const NoStyles: Story<LiveCodesStory> = Template.bind({});
NoStyles.args = {
  template: 'react',
  attrs: {
    'data-default-styles': 'false',
  },
};
