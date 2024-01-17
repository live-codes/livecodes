/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */

// '@vue/runtime-core' is used for generating type definitions,
// and is replaced by external dependency 'vue' during build
import type {
  DefineComponent,
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  ExtractPropTypes,
  RendererElement,
  RendererNode,
  VNode,
  VNodeProps,
} from '@vue/runtime-core';
import { h, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';

import type { Playground, EmbedOptions } from './models';
import { createPlayground } from './index';

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

// remove functions added to objects by vue ref
const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

// @ts-ignore
const LiveCodes: LiveCodesComponent = {
  props,
  emits: ['sdkReady'],
  setup(props, ctx) {
    const { height: _height, ...options } = props;
    const containerRef = ref<HTMLElement>();
    const height = ref(_height || '');
    const playground = ref<Playground | undefined>();
    const { config, ...otherOptions } = options;
    let configCache = JSON.stringify(config);
    let otherOptionsCache = JSON.stringify(otherOptions);

    onMounted(() => {
      if (!containerRef.value) return;
      createPlayground(containerRef.value, clone(options)).then((sdk) => {
        playground.value = sdk;
        ctx.emit('sdkReady', sdk);
      });
    });

    watch(props, async (newProps) => {
      if (!containerRef.value || !playground.value) return;
      const { height: _height, ...options } = newProps;

      height.value = _height || '';

      // eslint-disable-next-line prefer-const
      let { config, ...otherOptions } = options;
      if (typeof config === 'string') {
        config = await fetch(config).then((res) => res.json());
      }

      if (JSON.stringify(otherOptions) !== otherOptionsCache) {
        await playground.value?.destroy();
        createPlayground(containerRef.value, clone(options)).then((sdk) => {
          playground.value = sdk;
          ctx.emit('sdkReady', sdk);
        });
      } else if (JSON.stringify(config) !== configCache) {
        playground.value.setConfig((clone(config) as any) || {});
      }

      configCache = JSON.stringify(config);
      otherOptionsCache = JSON.stringify(otherOptions);
    });

    onUnmounted(() => {
      playground.value?.destroy();
    });

    return () =>
      h(
        'div',
        {
          ref: containerRef,
          'data-height': height,
        },
        ctx.slots.default?.() || '',
      );
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
