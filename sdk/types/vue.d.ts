/**
 * LiveCodes Vue Component
 *
 * This module provides a Vue component wrapper for embedding LiveCodes playgrounds.
 *
 * @module
 */
import type { AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, DefineComponent, ExtractPropTypes, RendererElement, RendererNode, VNode, VNodeProps } from '@vue/runtime-core';
import type { EmbedOptions, Playground } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';
/**
 * Props for the LiveCodes Vue component.
 */
export interface Props extends EmbedOptions {
    /** Height of the playground container. */
    height?: string;
}
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
declare const LiveCodes: LiveCodesComponent;
export default LiveCodes;
type LiveCodesComponent = DefineComponent<Props, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    sdkReady: (sdk: Playground) => true;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<Props>> & {
    onSdkReady?: (sdk: Playground) => void;
}, {}>;
