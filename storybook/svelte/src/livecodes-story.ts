import { flatten, unflatten } from 'flat';
import type { ComponentAnnotations } from 'storybook/internal/types';
import type { Component } from 'svelte';
import { appUrl, argTypes, delimiter } from '../../common';
import { LiveCodes, type Props } from './livecodes';
import type { Meta, StoryObj, SvelteRenderer } from './storybook';

export const defaultMeta = {
  component: LiveCodes,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
} satisfies Meta<typeof LiveCodes>;

type StoryProps = Props & { props: Props };
type SvelteStoryArgs = Partial<
  ComponentAnnotations<SvelteRenderer<Component<any, any, any>>, StoryProps>
>;
type SvelteComponent = Component<
  ComponentAnnotations<SvelteRenderer<Component<any, any, any>>, StoryProps>,
  any,
  ''
>;

export type Story = StoryObj<Meta<StoryProps>>;

export const livecodesStory = (props: Props): Story => {
  const { params, height, class: className, style, ...options } = props;
  return {
    args: {
      appUrl,
      ...flatten(options, { delimiter }),
      ...(params ? { params } : {}),
      height,
      class: className,
      style,
      props,
    } as SvelteStoryArgs,
    render: (args) => ({
      Component: LiveCodes as SvelteComponent,
      props: unflatten(args, { delimiter }),
    }),
    parameters: {
      docs: {
        source: {
          code: getCode(props),
          language: 'html',
          type: 'auto',
          format: true,
        },
      },
    },
  };
};

const getCode = (props: Props) =>
  `
<script>
import LiveCodes from 'livecodes/svelte';

let options = $state(${JSON.stringify(props, null, 2)});
</script>

<LiveCodes {...options} />

`.trimStart();
