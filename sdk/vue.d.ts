import type { DefineComponent, AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, ExtractPropTypes, RendererElement, RendererNode, VNode, VNodeProps } from '@vue/runtime-core';
import type { Playground, EmbedOptions } from './models';
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
