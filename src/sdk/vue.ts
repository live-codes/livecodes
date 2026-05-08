/**
 * LiveCodes Vue Component
 *
 * This module provides a Vue component wrapper for embedding LiveCodes playgrounds.
 *
 * @module
 */

/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-extraneous-dependencies */

// '@vue/runtime-core' is used for generating type definitions,
// and is replaced by external dependency 'vue' during build
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  ExtractPropTypes,
  RendererElement,
  RendererNode,
  VNode,
  VNodeProps,
} from '@vue/runtime-core';
import { h, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';

import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions, Playground } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';

/**
 * Props for the LiveCodes Vue component.
 */
export interface Props extends EmbedOptions {
  /** Height of the playground container. */
  height?: string;
}

type VuePropConstructor =
  | StringConstructor
  | BooleanConstructor
  | ObjectConstructor
  | Array<StringConstructor | ObjectConstructor>;

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
} satisfies Record<keyof Required<Props>, VuePropConstructor>;

// Strips reactive wrappers (functions, symbols) added by Vue's ref(),
// preserving only the plain serializable data needed by createPlayground.
const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * A Vue component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/vue}
 *
 * @prop {string} [appUrl] - The URL of the LiveCodes app. Defaults to `https://livecodes.io/`.
 * @prop {object | string} [config] - The [config object](https://livecodes.io/docs/configuration/configuration-object) for the playground or the URL of the config file.
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

const LiveCodes: LiveCodesComponent = {
  props,
  emits: ['sdkReady'],
  setup(
    props: Props,
    ctx: {
      emit: (ev: string, data: Playground) => void;
      slots: { default: () => string | number | boolean | undefined };
    },
  ) {
    const { height: _height, ...options } = props;
    const containerRef = ref<HTMLElement>();
    const height = ref(_height || '');
    const playground = ref<Playground | undefined>();
    const { config, ...otherOptions } = options;
    let configCache = JSON.stringify(config);
    let otherOptionsCache = JSON.stringify(otherOptions);
    let generation = 0;

    // avoid race conditions if props change while doing async operation (creating playground)
    const isStale = (gen: number) => gen !== generation;

    onMounted(() => {
      if (!containerRef.value) return;
      const currentGeneration = ++generation;
      createPlayground(containerRef.value, clone(options)).then((sdk) => {
        if (isStale(currentGeneration)) {
          sdk.destroy();
          return;
        }
        playground.value = sdk;
        ctx.emit('sdkReady', sdk);
      });
    });

    watch(props, async (newProps) => {
      if (!containerRef.value) return;
      const { height: _height, ...options } = newProps;
      const currentGeneration = ++generation;
      if (_height) height.value = _height;

      // eslint-disable-next-line prefer-const
      let { config, ...otherOptions } = options;

      if (!playground.value || JSON.stringify(otherOptions) !== otherOptionsCache) {
        otherOptionsCache = JSON.stringify(otherOptions);
        configCache = JSON.stringify(config);
        playground.value?.destroy();
        playground.value = undefined;

        createPlayground(containerRef.value, clone(options)).then((sdk) => {
          if (isStale(currentGeneration)) {
            sdk.destroy();
            return;
          }
          playground.value = sdk;
          ctx.emit('sdkReady', sdk);
        });
      } else if (JSON.stringify(config) !== configCache) {
        configCache = JSON.stringify(config);
        if (config) {
          playground.value.setConfig((clone(config) as any) || {});
        }
      }
    });

    onUnmounted(() => {
      ++generation; // invalidate any pending async callbacks
      playground.value?.destroy();
    });

    return () =>
      h(
        'div',
        {
          ref: containerRef,
          style: height.value
            ? { height: Number(height.value) ? `${height.value}px` : height.value }
            : undefined,
        },
        ctx.slots.default?.() || '',
      );
  },
} as unknown as LiveCodesComponent;

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
