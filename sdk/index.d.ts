import type { Code, Config, EmbedOptions, Playground } from './models';
export type { Code, Config, EmbedOptions, Playground };
export declare const createPlayground: (container: string | HTMLElement, options?: EmbedOptions) => Promise<Playground>;
