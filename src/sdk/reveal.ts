import type Reveal from 'reveal.js';
import { createPlayground } from './index';
// eslint-disable-next-line import/order
import type { Config, EmbedOptions, Playground } from './models';

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

const applyConfigAndSdkFn = async function (
  sdkItem: Playground,
  sdkReadyfn?: (sdk: Playground) => void,
  config?: string | Partial<Config>,
) {
  if (typeof config === 'string') {
    await fetch(config)
      .then((res) => res.json())
      .then((json) => sdkItem.setConfig(json));
  }
  if (typeof sdkReadyfn === 'function') {
    sdkReadyfn(sdkItem);
  }
};

export const LiveCodes = {
  id: 'LiveCodes',
  init(deck: InstanceType<typeof Reveal>) {
    const ContainerList = document.querySelectorAll<HTMLElement>('[data-livecodes]');
    if (ContainerList.length < 1) {
      return;
    }
    const containers = Array.from(ContainerList);
    const config = deck.getConfig() as GlobalLiveCodesOptions;
    const globalOptions = config.livecodes || {};
    const sdkReadyfn = config.livecodes?.sdkReady;
    const customStyle = config.customStyle || {};
    const promises = containers.map((container) => {
      const localOptions = container.dataset.config || '{}';
      const parsedLocalOptions = JSON.parse(localOptions);
      let finalOptions: EmbedOptions;
      if (typeof globalOptions.config === 'string') {
        finalOptions = {
          ...globalOptions,
          ...parsedLocalOptions,
          config: {
            ...parsedLocalOptions.config,
          },
        };
      } else {
        finalOptions = {
          ...globalOptions,
          ...parsedLocalOptions,
          config: {
            ...globalOptions.config,
            ...parsedLocalOptions.config,
          },
        };
      }
      if (
        typeof finalOptions.config === 'object' &&
        Object.keys(finalOptions.config).length === 0
      ) {
        delete finalOptions.config;
      }
      return createPlayground(container, finalOptions);
    });
    Promise.all(promises).then((sdk) => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>('.livecodes');
      iframes.forEach((iframe) =>
        initIframeStyle(iframe, { maxWidth: '100%', maxHeight: '100%', ...customStyle }),
      );
      for (const sdkItem of sdk) {
        applyConfigAndSdkFn(sdkItem, sdkReadyfn, globalOptions.config);
      }
    });
  },
};

if (typeof window !== 'undefined') {
  (window as any).LiveCodes = LiveCodes;
}
