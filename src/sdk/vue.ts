// '@vue/runtime-core' is used for type definitions,
// and is replaced by external dependency 'vue' during build
// eslint-disable-next-line import/no-extraneous-dependencies
import { h, onMounted, onUnmounted, ref, DefineComponent } from '@vue/runtime-core';

import type { Playground, EmbedOptions } from './models';
import { createPlayground } from '.';

export interface Props extends EmbedOptions {
  class?: string;
  style?: Record<string, string>;
  height?: string;
}

const props = {
  appUrl: String,
  config: [Object, String],
  import: String,
  lite: Boolean,
  loading: String,
  template: String,
  view: String,
  class: String,
  style: Object,
  height: String,
} satisfies { [key in keyof Required<Props>]: any };

// @ts-ignore
const LiveCodes: DefineComponent<Props> = {
  props,
  setup(props, context) {
    const { class: className, style, height, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      if (!containerRef.value) return;
      createPlayground(containerRef.value, options as EmbedOptions).then((sdk) => {
        playground = sdk;
        context.emit('sdk', sdk);
      });
    });

    onUnmounted(() => {
      playground?.destroy();
    });
    return () =>
      h('div', {
        ref: containerRef,
        class: className,
        style,
        'data-height': height,
      });
  },
};

export default LiveCodes;
