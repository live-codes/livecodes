import { flatten, unflatten } from 'flat';
import { computed } from 'vue';
import { appUrl, argTypes, delimiter } from '../../common';
import { LiveCodes, type Props } from './livecodes';
import type { Meta, StoryObj } from './storybook';

export const defaultMeta = {
  component: LiveCodes as any,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
} satisfies Meta<typeof LiveCodes>;

type StoryProps = Props & { class?: string; style?: Record<string, string>; props: Props };
export type Story = StoryObj<Meta<StoryProps>>;

export const livecodesStory = (props: StoryProps): Story => {
  const template = (args: Props) => ({
    components: { LiveCodes },
    setup() {
      const props = computed(() => unflatten(args, { delimiter }));
      return { props };
    },
    template: '<LiveCodes v-bind="props" />',
  });
  const story = template.bind({}) as Story;
  story.argTypes = argTypes;
  const { params, height, class: className, style, ...options } = props;
  story.args = {
    appUrl,
    ...flatten(options, { delimiter }),
    ...(params ? { params } : {}),
    height,
    class: className,
    style,
    props,
  };
  story.parameters = {
    docs: {
      source: {
        code: getCode(props),
        language: 'html',
        type: 'auto',
        format: true,
      },
    },
  };
  return story;
};

const getCode = (props: Props) =>
  `
<script setup>
  import LiveCodes from "livecodes/vue";

  const options = ${JSON.stringify(props, null, 2).split('\n').join('\n  ')};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`.trimStart();
