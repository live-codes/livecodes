import type Reveal from 'reveal.js';
import type { EmbedOptions, Playground } from './models';
import { createPlayground } from './index';

export interface LiveOptions extends EmbedOptions {
    sdkReady?: (sdk: Playground) => void;
}

export interface GlobalLiveCodesOptions extends Reveal.Options {
    livecodes?: LiveOptions;
    customStyle?: Partial<CSSStyleDeclaration>;
}

export interface LiveCodesInstance {
    id: string;
    init(deck: InstanceType<typeof Reveal>): void;
}

const initIframeStyle = (iframe: HTMLIFrameElement, styles: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(styles)) {
        // @ts-ignore
        iframe.style[key as any] = value;
    }
};

export const LiveCodes = {
    id: "LiveCodes",
    init(deck: InstanceType<typeof Reveal>) {
        const ContainerList = document.querySelectorAll<HTMLElement>("[data-livecodes]");
        if (ContainerList.length < 1) {
            return;
        }
        const containers = Array.from(ContainerList);
        const config = deck.getConfig() as GlobalLiveCodesOptions;
        const globalOptions = config.livecodes || {};
        const sdkReadyfn = config.livecodes?.sdkReady;
        const customStyle = config.customStyle || {};
        const promises = containers.map((container) => {
            const localOptions = container.dataset.config || "{}";
            const finalOptions = { config: { ...globalOptions, ...JSON.parse(localOptions) } }
            return createPlayground(container, finalOptions);
        });
        Promise.all(promises).then((sdk) => {
            const iframes = document.querySelectorAll<HTMLIFrameElement>('.livecodes');
            iframes.forEach(iframe => initIframeStyle(iframe, { maxWidth: "100%", maxHeight: "100%", ...customStyle }));
            if (typeof sdkReadyfn === 'function') {
                sdk.forEach((itemSdk) => sdkReadyfn(itemSdk));
            }
        });
    },
};

if (typeof window !== 'undefined') {
    (window as any).LiveCodes = LiveCodes;
}