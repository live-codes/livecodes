import { flatten, unflatten } from 'flat';
import { html, nothing } from 'lit';
import 'livecodes/web-components';
import { appUrl, argTypes, delimiter } from '../../common';
import type { Props } from './livecodes';
import type { Meta, StoryObj } from './storybook';

delete argTypes.class;
delete argTypes.style;

export const defaultMeta = {
  component: 'live-codes',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
} satisfies Meta<StoryProps>;

export type StoryProps = Props & { class?: string; style?: Record<string, string>; props?: Props };
export type Story = StoryObj<Meta<StoryProps>>;

export const livecodesStory = (props: StoryProps): Story => {
  const { params, height, class: className, style, ...options } = props;
  return {
    args: {
      appUrl,
      ...flatten(options, { delimiter }),
      ...(params ? { params } : {}),
      height,
      props,
    } as Partial<Meta<StoryProps>>,
    render: (args) => {
      const resolved = unflatten(args, { delimiter }) as Props;
      return html`
        <live-codes
          app-url=${resolved.appUrl || appUrl}
          loading=${resolved.loading || nothing}
          template=${resolved.template || nothing}
          height=${resolved.height || nothing}
          ?headless=${resolved.headless}
          .config=${resolved.config || nothing}
          .params=${resolved.params || nothing}
        ></live-codes>
      `;
    },
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

const getCode = (props: Props) => {
  const { config, params, ...attrs } = props;

  // Build HTML attributes from simple props
  const attrEntries = Object.entries(attrs)
    .filter(([, v]) => v != null)
    .map(([key, value]) => {
      const attr = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
      if (typeof value === 'boolean') return value ? attr : null;
      return `${attr}="${value}"`;
    })
    .filter(Boolean);

  const attrString = attrEntries.length > 0 ? '\n  ' + attrEntries.join('\n  ') : '';

  // Build property assignments for complex values
  const assignments: string[] = [];
  if (config) {
    assignments.push(
      `playground.config = ${JSON.stringify(config, null, 2).split('\n').join('\n  ')};`,
    );
  }
  if (params) {
    assignments.push(
      `playground.params = ${JSON.stringify(params, null, 2).split('\n').join('\n  ')};`,
    );
  }

  const scriptBody =
    assignments.length > 0
      ? `\n\n  const playground = document.querySelector("live-codes");\n  ${assignments.join('\n  ')}`
      : '';

  return `
<live-codes${attrString}></live-codes>

<script type="module">
  import "livecodes/web-components";${scriptBody}
</script>
`.trimStart();
};
