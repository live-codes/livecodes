/**
 * LiveCodes SolidJS Component
 *
 * This module provides a SolidJS component wrapper for embedding LiveCodes playgrounds.
 *
 * @module
 */

import { createComponent } from '@live-codes/solid-sdk';
import type { Component, JSX } from 'solid-js';
import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions, Playground } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';

/**
 * Props for the LiveCodes SolidJS component.
 */
export interface Props extends EmbedOptions {
  /** CSS class name for the container element. */
  class?: string;
  /** CSS styles for the container element. */
  style?: JSX.CSSProperties;
  /** Height of the playground container. */
  height?: string;
  /** Callback function that receives the SDK instance when ready. */
  sdkReady?: (sdk: Playground) => void;
}

/**
 * A SolidJS component that renders a LiveCodes playground.
 *
 * Acts as a wrapper for the [LiveCodes JS SDK](https://livecodes.io/docs/sdk/js-ts).
 * @see {@link https://livecodes.io/docs/sdk/solid}
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
 * @prop {string} [class] - Sets the class name of playground container element.
 * @prop {object} [style] - Sets the style of playground container element.
 * @prop {function} [sdkReady] - A callback function that will be called when the SDK is ready.
 * @example
 * ```tsx
 * import LiveCodes from 'livecodes/solid';
 *
 * const config = {
 *   markup: {
 *     language: 'markdown',
 *     content: '# Hello World!',
 *   },
 * };
 * export default () => <LiveCodes config={config} />;
 * ```
 */

const LiveCodes: Component<Props> = createComponent(
  createPlayground as Parameters<typeof createComponent>[0],
) as Component<Props>;

export default LiveCodes;
