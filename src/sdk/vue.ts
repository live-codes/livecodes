/* eslint-disable no-duplicate-imports */
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
  headless: Boolean,
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

/**
 * A Vue component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/vue}
 *
 * @prop {string} [appUrl] - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
 * @prop {object | string} [config] - The [config object](https://livecodes.io/docs/api/interfaces/Config) for the playground or the URL of the config file.
 * @prop {string} [import] - A resource to [import](https://livecodes.io/docs/features/import) (from any of the supported [sources](https://livecodes.io/docs/features/import#sources)).
 * @prop {boolean} [headless=false] - Whether to use the headless mode of LiveCodes.
 * @prop {boolean} [lite=false] - Deprecated! Use `config={{ mode: "lite" }}` instead - Whether to use the lite mode of LiveCodes.
 * @prop {string} [loading='lazy'] - When to load the playground.
 * @prop {object} [params] - An object that represents [URL Query parameters](https://livecodes.io/docs/configuration/query-params).
 * @prop {string} [template] - A [starter template](https://livecodes.io/docs/features/templates) to load.
 * @prop {string} [view='split'] - Deprecated! The `view` option has been moved to `config.view`. For headless mode use `headless="true"` - The [default view](https://livecodes.io/docs/features/default-view) for the playground.
 * @prop {string} [height] - Sets the [height of playground container](https://livecodes.io/docs/sdk/js-ts#height) element.
 * @prop {object} [style] - Sets the style of playground container element.
 * @emits {event} [sdkReady] - When the playground initializes, the event `"sdkReady"` is emitted.
 * @example
 * ```html
 * <script setup>
 *   import LiveCodes from 'livecodes/vue';
 * </script>
 *
 * <template>
 *   <LiveCodes />
 * </template>
 * ```
 */
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
