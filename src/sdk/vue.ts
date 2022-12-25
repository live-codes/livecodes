// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { h, onMounted, onUnmounted, ref, defineComponent } from 'vue';
import type { Playground, EmbedOptions } from './models';
import { defaultStyles } from './shared';
import { createPlayground } from '.';

interface Props extends EmbedOptions {
  class?: string;
  style?: Record<string, string>;
}

const props: Record<keyof Props, any> = {
  appUrl: String,
  config: [Object, String],
  import: String,
  lite: Boolean,
  loading: String,
  template: String,
  view: String,
  style: Object,
  class: String,
};

const LiveCodes = defineComponent<Props>({
  props,
  setup(props: Props) {
    const { style, class: className, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      createPlayground(containerRef.value, options).then((p) => {
        playground = p;
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
