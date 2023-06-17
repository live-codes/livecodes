/// <reference types="react" />
import type { EmbedOptions, Playground } from './models';
export interface Props extends EmbedOptions {
    className?: string;
    style?: Record<string, string>;
    height?: string;
    sdkReady?: (sdk: Playground) => void;
}
export default function LiveCodes(props: Props): JSX.Element;
