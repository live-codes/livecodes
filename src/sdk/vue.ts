/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */

// '@vue/runtime-core' is used for generating type definitions,
// and is replaced by external dependency 'vue' during build
import {
  h,
  onMounted,
  onUnmounted,
  ref,
  type DefineComponent,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type ComponentOptionsMixin,
  type ExtractPropTypes,
  type RendererElement,
  type RendererNode,
  type VNode,
  type VNodeProps,
} from '@vue/runtime-core';

import { createPlayground, type Playground, type EmbedOptions } from '.';

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
const LiveCodes: LiveCodesComponent = {
  props,
  emits: ['sdk'],
  setup(props, ctx) {
    const { class: className, style, height, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      if (!containerRef.value) return;
      createPlayground(containerRef.value, options as EmbedOptions).then((sdk) => {
        playground = sdk;
        ctx.emit('sdk', sdk);
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

// this avoids having to run the vue compiler (thus adding vue as dependency)
// to generate type definitions
type LiveCodesComponent = DefineComponent<
  Props,
  () => VNode<RendererNode, RendererElement, { [key: string]: any }>,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  { sdk: (sdk: Playground) => true },
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<ExtractPropTypes<Props>> & { onSdk?: (sdk: Playground) => void },
  {}
>;
