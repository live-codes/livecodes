import { type DefineComponent, type AllowedComponentProps, type ComponentCustomProps, type ComponentOptionsMixin, type ExtractPropTypes, type RendererElement, type RendererNode, type VNode, type VNodeProps } from '@vue/runtime-core';
import { type Playground, type EmbedOptions } from '.';
export interface Props extends EmbedOptions {
    height?: string;
}
declare const LiveCodes: LiveCodesComponent;
export default LiveCodes;
type LiveCodesComponent = DefineComponent<Props, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    sdkReady: (sdk: Playground) => true;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<Props>> & {
    onSdkReady?: (sdk: Playground) => void;
}, {}>;
