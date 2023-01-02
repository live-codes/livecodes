// '@vue/runtime-core' is used for type definitions,
// and is replaced by external dependency 'vue' during build
// eslint-disable-next-line import/no-extraneous-dependencies
import { h, onMounted, onUnmounted, ref, defineComponent, type PropType } from '@vue/runtime-core';

import type { Playground, EmbedOptions } from './models';
import { createPlayground } from '.';

export type Props = {
  [key in keyof EmbedOptions | 'class' | 'style']: PropType<
    EmbedOptions[keyof EmbedOptions] | string | Record<string, string>
  >;
};

const props = {
  appUrl: String as PropType<EmbedOptions['appUrl']>,
  config: [Object, String] as PropType<EmbedOptions['config']>,
  import: String as PropType<EmbedOptions['import']>,
  lite: Boolean as PropType<EmbedOptions['lite']>,
  loading: String as PropType<EmbedOptions['loading']>,
  template: String as PropType<EmbedOptions['template']>,
  view: String as PropType<EmbedOptions['view']>,
  class: String as PropType<string>,
  style: Object as PropType<Record<string, string>>,
} satisfies Props;

const LiveCodes = defineComponent({
  props,
  setup(props, context) {
    const { class: className, style, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      if (!containerRef.value) return;
      createPlayground(containerRef.value, options).then((sdk) => {
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
      });
  },
});

export default LiveCodes;
