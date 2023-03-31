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
  height?: string;
}

const props = {
  appUrl: String,
  config: [Object, String],
  import: String,
  lite: Boolean,
  loading: String,
  params: Object,
  template: String,
  view: String,
  height: String,
} satisfies { [key in keyof Required<Props>]: any };

// @ts-ignore
const LiveCodes: LiveCodesComponent = {
  props,
  emits: ['sdkReady'],
  setup(props, ctx) {
    const { height, ...options } = props;
    const containerRef = ref<HTMLElement>();
    let playground: Playground | undefined;

    onMounted(() => {
      if (!containerRef.value) return;
      createPlayground(containerRef.value, options as EmbedOptions).then((sdk) => {
        playground = sdk;
        ctx.emit('sdkReady', sdk);
      });
    });

    onUnmounted(() => {
      playground?.destroy();
    });
    return () =>
      h('div', {
        ref: containerRef,
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
  { sdkReady: (sdk: Playground) => true },
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<ExtractPropTypes<Props>> & { onSdkReady?: (sdk: Playground) => void },
  {}
>;
