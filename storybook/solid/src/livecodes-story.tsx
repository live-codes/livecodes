import { flatten, unflatten } from 'flat';
import { appUrl, argTypes, delimiter } from '../../common';
import { LiveCodes, type Props } from './livecodes';
import type { Meta, StoryObj } from './storybook';

export const defaultMeta = {
  component: LiveCodes,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
} satisfies Meta<typeof LiveCodes>;

export type Story = StoryObj<Meta<Props & { props: Props }>>;

export const livecodesStory = (props: Props): Story => {
  const { params, height, class: className, style, ...options } = props;
  return {
    args: {
      appUrl,
      ...(flatten(options, { delimiter }) as Record<string, unknown>),
      ...(params ? { params } : {}),
      height,
      class: className,
      style,
      props,
    },
    render: (args: Props) => <LiveCodes {...unflatten(args, { delimiter })} />,
    parameters: {
      docs: {
        source: {
          code: getCode(props),
          language: 'jsx',
          type: 'auto',
          format: true,
        },
      },
    },
  };
};

const getCode = (props: Props) =>
  `
import LiveCodes from "livecodes/solid";

export default function App() {
  const options = ${JSON.stringify(props, null, 2).split('\n').join('\n  ')};
  return <LiveCodes {...options} />;
}

`.trimStart();
