// '@vue/runtime-core' is used for type definitions,
// and is replaced by external dependency 'vue' during build
// eslint-disable-next-line import/no-extraneous-dependencies
import { h, onMounted, onUnmounted, ref, defineComponent, type PropType } from '@vue/runtime-core';

import type { Playground, EmbedOptions } from './models';
import { defaultStyles } from './shared';
import { createPlayground } from '.';

const props = {
  appUrl: String as PropType<EmbedOptions['appUrl']>,
  config: [Object, String] as PropType<EmbedOptions['config']>,
  import: String as PropType<EmbedOptions['import']>,
  lite: Boolean as PropType<EmbedOptions['lite']>,
  loading: String as PropType<EmbedOptions['loading']>,
  template: String as PropType<EmbedOptions['template']>,
  view: String as PropType<EmbedOptions['view']>,
  style: Object,
  class: String,
};

const LiveCodes = defineComponent({
  props,
  setup(props) {
    const { style, class: className, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      createPlayground(containerRef.value!, options).then((p) => {
        playground = p;
        // eslint-disable-next-line no-console
        console.log(playground);
      });
    });

    onUnmounted(() => {
      playground?.destroy();
    });

    // ctx.expose({
    //   increment,
    // });

    return () =>
      h('div', {
        ref: containerRef,
        style: {
          ...defaultStyles,
          ...style,
        },
        class: className,
      });
  },
});

export default LiveCodes;
