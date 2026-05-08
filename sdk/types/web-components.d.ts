/**
 * LiveCodes Web Components
 *
 * This module provides Web Components for embedding LiveCodes playgrounds.
 *
 * @module
 */
import type { EmbedOptions, Playground } from './models';
export type { Code, Config, EmbedOptions, Language, Playground } from './models';
/**
 * Props for the LiveCodes Web Component.
 */
export interface Props extends EmbedOptions {
    /** Height of the playground container. */
    height?: string;
    /** The SDK instance. */
    sdk?: Playground;
}
