/**
 * LiveCodes SDK - A Code Playground That Just Works!
 *
 * This module is the main entry point for the LiveCodes SDK.
 * It provides the core `createPlayground` and `getPlaygroundUrl` functions.
 *
 * @module livecodes
 */
import type { Code, Config, EmbedOptions, Language, Playground } from './models';
export type { Code, Config, EmbedOptions, Language, Playground };
/**
 * Creates a LiveCodes playground.
 *
 * @param {string | HTMLElement} container - `HTMLElement` or a string representing a CSS selector. This is the container where the playground is rendered.
  If not found, an error is thrown (except in [headless mode](https://livecodes.io/docs/sdk/headless), in which this parameter is optional and can be omitted).
 * @param {EmbedOptions} options - The [embed options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground (optional).
 * @return {Promise<Playground>} A promise that resolves to a [`Playground`](https://livecodes.io/docs/api/interfaces/Playground/) object which exposes many [SDK methods](https://livecodes.io/docs/sdk/js-ts/#sdk-methods) that can be used to interact with the playground.
 */
export declare function createPlayground(container: string | HTMLElement, options?: EmbedOptions): Promise<Playground>;
export declare function createPlayground(options: EmbedOptions & {
    view: 'headless';
}): Promise<Playground>;
/**
 * Gets the URL to a LiveCodes playground (as a string) from the provided [options](https://livecodes.io/docs/sdk/js-ts#embed-options).
 * This can be useful for providing links to run code in playgrounds.
 *
 * @param {EmbedOptions} options - The [options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground.
 * @return {string} The URL of the playground (as a string).
 *
 * large objects like config and params are store in the url hash params while the rest are in the search params
 * unless config is a string in which case it is stored in searchParams
 */
export declare function getPlaygroundUrl(options?: EmbedOptions): string;
/**
 * A utility function that allows compressing the stringified config object (e.g. for sharing in URL hash)
 * It encodes it in base64 with a few tweaks to make it URI safe.
 *
 * This is the `compressToEncodedURIComponent` function re-exported from `lz-string` for convenience.
 *
 * @param {string} uncompressed - The string to be compressed (e.g. stringified config object)
 * @return {string} The compressed string
 *
 * @example
 * ```ts
 * const compressed = compress(JSON.stringify(config));
 * ```
 */
export declare const compress: (uncompressed: string) => string;
/**
 * A utility function that allows decompressing the config object (compressed by {@link compress}).
 * It decodes it to a string that should be JSON.parsed.
 *
 * This is the `decompressFromEncodedURIComponent` function re-exported from `lz-string` for convenience.
 *
 * @param {string} compressed - The string to be decompressed
 * @return {string | null} The decompressed string or `null` if it fails
 *
 * @example
 * ```ts
 * const decompressed = decompress(str);
 * if (decompressed) {
 *   try {
 *     const config = JSON.parse(decompressed);
 *   } catch {
 *     // invalid JSON
 *   }
 * }
 * ```
 */
export declare const decompress: (compressed: string) => string | null;
