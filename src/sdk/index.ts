/* eslint-disable no-redeclare */
import { compressToEncodedURIComponent } from 'lz-string';
import type {
  API,
  Code,
  SDKConfig as Config,
  CustomEvents,
  EmbedOptions,
  Language,
  Playground,
  SDKEvent,
  SDKEventHandler,
  UrlQueryParams,
} from './models';

export type { Code, Config, EmbedOptions, Language, Playground };

/**
 * Creates a LiveCodes playground.
 *
 * @param {string | HTMLElement} container - `HTMLElement` or a string representing a CSS selector. This is the container where the playground is rendered.
  If not found, an error is thrown (except in [headless mode](https://livecodes.io/docs/sdk/headless), in which this parameter is optional and can be omitted).
 * @param {EmbedOptions} options - The [embed options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground (optional).
 * @return {Promise<Playground>} - A promise that resolves to a [`Playground`](https://livecodes.io/docs/api/interfaces/Playground/) object which exposes many [SDK methods](https://livecodes.io/docs/sdk/js-ts/#sdk-methods) that can be used to interact with the playground.
 */
export async function createPlayground(
  container: string | HTMLElement,
  options?: EmbedOptions,
): Promise<Playground>;
export async function createPlayground(
  options: EmbedOptions & { view: 'headless' },
): Promise<Playground>;
export async function createPlayground(
  container: string | HTMLElement | (EmbedOptions & { view: 'headless' }),
  options: EmbedOptions = {},
): Promise<Playground> {
  // allow headless to skip providing container
  if (
    typeof container === 'object' &&
    !(container instanceof HTMLElement) &&
    ((container as any).headless || (container as any).view === 'headless')
  ) {
    options = container;
    container = null as any;
  }

  const { config = {}, headless, loading = 'lazy', view } = options;
  const isHeadless = headless || view === 'headless'; // for backwards compatibility;

  let containerElement: HTMLElement | null = null;
  let appVersion: number | null = null;

  if (typeof container === 'string') {
    containerElement = document.querySelector(container);
  } else if (container instanceof HTMLElement) {
    containerElement = container;
  } else if (!(isHeadless && typeof container === 'object')) {
    throw new Error('A valid container element is required.');
  }
  if (!containerElement) {
    if (isHeadless) {
      containerElement = document.createElement('div');
      hideElement(containerElement);
      document.body.appendChild(containerElement);
    } else {
      throw new Error(`Cannot find element: "${container}"`);
    }
  }

  const playgroundUrl = new URL(getPlaygroundUrl(options));
  const origin = playgroundUrl.origin;
  playgroundUrl.searchParams.set('embed', 'true');
  playgroundUrl.searchParams.set('loading', isHeadless ? 'eager' : loading);
  playgroundUrl.searchParams.set('sdkVersion', process.env.SDK_VERSION || 'latest');

  // for backward-compatibility
  if (typeof config === 'object' && Object.keys(config).length > 0) {
    playgroundUrl.searchParams.set('config', 'sdk');
  }
  // for backward-compatibility
  const params = options.params;
  if (
    typeof params === 'object' &&
    Object.keys(params).length > 0 &&
    JSON.stringify(params).length < 1800
  ) {
    (Object.keys(params) as Array<keyof UrlQueryParams>).forEach((param) => {
      playgroundUrl.searchParams.set(param, encodeURIComponent(String(params[param])));
    });
  }

  let destroyed = false;
  const alreadyDestroyedMessage = 'Cannot call API methods after calling `destroy()`.';
  type EventHandler = (event: MessageEventInit<any>) => void | Promise<void>;
  const eventHandlers: EventHandler[] = [];
  const registerEventHandler = (handler: EventHandler, eventType = 'message') => {
    addEventListener(eventType, handler);
    eventHandlers.push(handler);
  };

  const createIframe = () =>
    new Promise<HTMLIFrameElement>((resolve) => {
      if (!containerElement) return;

      const height = containerElement.dataset.height || containerElement.style.height;
      if (height && !isHeadless) {
        const cssHeight = isNaN(Number(height)) ? height : height + 'px';
        containerElement.style.height = cssHeight;
      }
      if (containerElement.dataset.defaultStyles !== 'false' && !isHeadless) {
        containerElement.style.backgroundColor ||= '#fff';
        containerElement.style.border ||= '1px solid black';
        containerElement.style.borderRadius ||= '8px';
        containerElement.style.boxSizing ||= 'border-box';
        containerElement.style.padding ||= '0';
        containerElement.style.width ||= '100%';
        containerElement.style.height ||= containerElement.style.height || '300px';
        containerElement.style.minHeight = '200px';
        containerElement.style.flexGrow = '1';
        containerElement.style.overflow ||= 'hidden';
        containerElement.style.resize ||= 'vertical';
      }

      const className = 'livecodes';
      const preExistingIframe = containerElement.querySelector<HTMLIFrameElement>(
        `iframe.${className}`,
      );
      const frame = preExistingIframe || document.createElement('iframe');
      frame.classList.add(className);
      frame.setAttribute(
        'allow',
        'accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share',
      );
      frame.setAttribute('allowtransparency', 'true');
      frame.setAttribute('allowpaymentrequest', 'true');
      frame.setAttribute('allowfullscreen', 'true');
      frame.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      const iframeLoading = loading === 'eager' ? 'eager' : 'lazy';
      frame.setAttribute('loading', iframeLoading);
      if (isHeadless) {
        hideElement(frame);
      } else {
        frame.style.height = '100%';
        frame.style.minHeight = '200px';
        frame.style.width = '100%';
        frame.style.margin = '0';
        frame.style.border = '0';
        frame.style.borderRadius = containerElement.style.borderRadius;
      }
      registerEventHandler(function initHandler(
        e: MessageEventInit<{ type: CustomEvents['init']; payload: { appVersion: string } }>,
      ) {
        if (
          e.source !== frame.contentWindow ||
          e.origin !== origin ||
          e.data?.type !== 'livecodes-init'
        ) {
          return;
        }
        removeEventListener('message', initHandler);
        appVersion = Number(e.data.payload.appVersion.replace(/^v/, ''));
      });

      // for backward-compatibility
      if (!appVersion || appVersion < 46) {
        registerEventHandler(function configHandler(
          e: MessageEventInit<{ type: CustomEvents['getConfig'] }>,
        ) {
          if (
            e.source !== frame.contentWindow ||
            e.origin !== origin ||
            e.data?.type !== 'livecodes-get-config'
          ) {
            return;
          }
          removeEventListener('message', configHandler);
          frame.contentWindow?.postMessage({ type: 'livecodes-config', payload: config }, origin);
        });
      }
      frame.onload = () => {
        resolve(frame);
      };
      frame.src = playgroundUrl.href;
      if (!preExistingIframe) {
        containerElement.appendChild(frame);
      }
    });

  const iframe = await createIframe();

  const livecodesReady: Promise<void> & { settled?: boolean } = new Promise((resolve) => {
    registerEventHandler(function readyHandler(
      e: MessageEventInit<{ type: CustomEvents['ready'] }>,
    ) {
      if (
        e.source !== iframe.contentWindow ||
        e.origin !== origin ||
        e.data?.type !== 'livecodes-ready'
      ) {
        return;
      }
      removeEventListener('message', readyHandler);
      resolve();
      livecodesReady.settled = true;
    });
  });

  const loadLivecodes = () =>
    destroyed
      ? Promise.reject(alreadyDestroyedMessage)
      : new Promise<void>(async (resolve) => {
          if (livecodesReady.settled) resolve();
          const message: { type: CustomEvents['load'] } = { type: 'livecodes-load' };
          iframe.contentWindow?.postMessage(message, origin);
          await livecodesReady;
          resolve();
        });

  const callAPI = <T>(method: keyof API, args?: any[]) =>
    new Promise<T>(async (resolve, reject) => {
      if (destroyed) {
        return reject(alreadyDestroyedMessage);
      }
      await loadLivecodes();
      const id = getRandomString();

      registerEventHandler(function handler(
        e: MessageEventInit<{
          type: CustomEvents['apiResponse'];
          method: keyof API;
          id: string;
          payload?: any;
        }>,
      ) {
        if (
          e.source !== iframe.contentWindow ||
          e.origin !== origin ||
          e.data?.type !== 'livecodes-api-response' ||
          e.data?.id !== id
        ) {
          return;
        }

        if (e.data.method === method) {
          removeEventListener('message', handler);
          const payload = e.data.payload;
          if (payload?.error) {
            reject(payload.error);
          } else {
            resolve(payload);
          }
        }
      });
      iframe.contentWindow?.postMessage({ method, id, args }, origin);
    });

  const watchers: Partial<Record<SDKEvent, SDKEventHandler[]>> = {};
  const sdkEvents: SDKEvent[] = ['load', 'ready', 'code', 'console', 'tests', 'destroy'];
  const watch = (event: SDKEvent, fn: SDKEventHandler) => {
    if (destroyed) {
      throw new Error(alreadyDestroyedMessage);
    }
    if (!sdkEvents.includes(event)) return { remove: () => undefined };

    // notify the app that there is a watcher to send data
    callAPI('watch', [event]);

    if (!watchers[event]) {
      watchers[event] = [];
    }
    watchers[event]?.push(fn);
    return {
      remove: () => {
        watchers[event] = watchers[event]?.filter((w) => w !== fn);
        if (watchers[event]?.length === 0) {
          callAPI('watch', [event, 'unsubscribe']);
        }
      },
    };
  };

  const mapEvent = (event: string): SDKEvent | undefined =>
    ({
      'livecodes-app-loaded': 'load',
      'livecodes-ready': 'ready',
      'livecodes-change': 'code',
      'livecodes-console': 'console',
      'livecodes-test-results': 'tests',
      'livecodes-destroy': 'destroy',
    })[event] as SDKEvent | undefined;

  registerEventHandler(async function watchHandler(
    e: MessageEventInit<{
      type: CustomEvents[keyof CustomEvents];
      payload?: any;
    }>,
  ) {
    const sdkEvent = mapEvent(e.data?.type ?? '');
    if (
      e.source !== iframe.contentWindow ||
      e.origin !== origin ||
      !sdkEvent ||
      !watchers[sdkEvent]
    ) {
      return;
    }
    const data = e.data?.payload;
    watchers[sdkEvent]?.forEach((fn) => {
      fn(data);
    });
  });

  const destroy = () => {
    iframe?.remove?.();
    Object.values(watchers).forEach((watcher) => {
      watcher.length = 0;
    });
    eventHandlers.forEach((handler) => removeEventListener('message', handler));
    eventHandlers.length = 0;
    if (observer && containerElement) {
      observer.unobserve(containerElement);
    }
    destroyed = true;
  };

  let observer: IntersectionObserver | undefined;
  if (loading === 'lazy' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadLivecodes();
            observer.unobserve(containerElement);
          }
        });
      },
      { rootMargin: '150px' },
    );
    observer.observe(containerElement);
  }

  function hideElement(el: HTMLElement) {
    el.style.position = 'absolute';
    el.style.top = '0';
    el.style.visibility = 'hidden';
    el.style.opacity = '0';
  }

  const getRandomString = () => (String(Math.random()) + Date.now().toFixed()).replace('0.', '');

  return {
    load: () => loadLivecodes(),
    run: () => callAPI('run'),
    format: (allEditors) => callAPI('format', [allEditors]),
    getShareUrl: (shortUrl) => callAPI('getShareUrl', [shortUrl]),
    getConfig: (contentOnly) => callAPI('getConfig', [contentOnly]),
    setConfig: (config) => callAPI('setConfig', [config]),
    getCode: () => callAPI('getCode'),
    show: (pane, options) => callAPI('show', [pane, options]),
    runTests: () => callAPI('runTests'),
    onChange: (fn) => watch('code', fn),
    watch,
    exec: (command, ...args) => callAPI('exec', [command, ...args]),
    destroy: () => {
      if (destroyed) {
        return Promise.reject(alreadyDestroyedMessage);
      }
      destroy();
      return Promise.resolve();
    },
  };
}

/**
 * Gets the URL to a LiveCodes playground (as a string) from the provided [options](https://livecodes.io/docs/sdk/js-ts#embed-options).
 * This can be useful for providing links to run code in playgrounds.
 *
 * @param {EmbedOptions} options - The [options](https://livecodes.io/docs/sdk/js-ts#embed-options) for the playground.
 * @return {string} - The URL of the playground (as a string).
 *
 * large objects like config and params are store in the url hash params while the rest are in the search params
 * unless config is a string in which case it is stored in searchParams
 */
export function getPlaygroundUrl(options: EmbedOptions = {}): string {
  const {
    appUrl = 'https://livecodes.io',
    params = {},
    config = {},
    headless,
    import: importId,
    lite,
    view,
    ...otherOptions
  } = options;

  let playgroundUrl: URL;
  try {
    playgroundUrl = new URL(appUrl);
  } catch {
    throw new Error(`${appUrl} is not a valid URL.`);
  }

  const hashParams = new URLSearchParams();

  // Add other options to search params
  Object.entries(otherOptions).forEach(([key, value]) => {
    if (value !== undefined) {
      playgroundUrl.searchParams.set(key, String(value));
    }
  });

  const isHeadless = options.view === 'headless' || headless; // for backwards compatibility;

  if (lite) {
    // eslint-disable-next-line no-console
    console.warn(
      `Deprecation notice: "lite" option is deprecated. Use "config: { mode: 'lite' }" instead.`,
    );
    if (typeof config === 'object' && config.mode == null) {
      config.mode = 'lite';
    } else {
      playgroundUrl.searchParams.set('lite', 'true');
    }
  }

  if (view) {
    // eslint-disable-next-line no-console
    console.warn(
      `Deprecation notice: The "view" option has been moved to "config.view". For headless mode use "headless: true".`,
    );
    if (typeof config === 'object' && config.view == null && view !== 'headless') {
      config.view = view;
    } else {
      playgroundUrl.searchParams.set('view', view);
    }
  }

  if (typeof config === 'string') {
    try {
      new URL(config);
      playgroundUrl.searchParams.set('config', encodeURIComponent(config));
    } catch {
      throw new Error(`"config" is not a valid URL or configuration object.`);
    }
  } else if (config && typeof config === 'object' && Object.keys(config).length > 0) {
    if (config.title && config.title !== 'Untitled Project') {
      playgroundUrl.searchParams.set('title', config.title);
    }
    if (config.description && config.description.length > 0) {
      playgroundUrl.searchParams.set('description', config.description);
    }
    hashParams.set('config', 'code/' + compressToEncodedURIComponent(JSON.stringify(config)));
  }

  // handle params
  if (params && typeof params === 'object' && Object.keys(params).length > 0) {
    try {
      hashParams.set('params', compressToEncodedURIComponent(JSON.stringify(params)));
    } catch {
      (Object.keys(params) as Array<keyof UrlQueryParams>).forEach((param) => {
        playgroundUrl.searchParams.set(param, encodeURIComponent(String(params[param])));
      });
    }
  }

  if (importId) {
    playgroundUrl.searchParams.set('x', encodeURIComponent(importId));
  }
  if (isHeadless) {
    playgroundUrl.searchParams.set('headless', 'true');
  }

  // only override appUrl hash if hashParams is not empty
  if (hashParams.toString().length > 0) {
    playgroundUrl.hash = hashParams.toString();
  }

  return playgroundUrl.href;
}

/* @__PURE__ */ (() => {
  if (
    globalThis.document && // to escape SSG in docusaurus
    document.currentScript &&
    'prefill' in document.currentScript?.dataset
  ) {
    window.addEventListener('load', () => {
      document.querySelectorAll<HTMLElement>('.livecodes').forEach((codeblock) => {
        let options: EmbedOptions | undefined;
        const optionsStr = codeblock.dataset.options;
        if (optionsStr) {
          try {
            options = JSON.parse(optionsStr);
          } catch {
            //
          }
        }
        let config: Config | undefined;
        const configStr = codeblock.dataset.config || codeblock.dataset.prefill;
        if (configStr) {
          try {
            config = JSON.parse(configStr);
          } catch {
            //
          }
        }
        const dom = encodeURIComponent(codeblock.outerHTML);
        codeblock.innerHTML = '';
        createPlayground(codeblock, {
          import: 'dom/' + dom,
          ...options,
          ...(config ? { config } : {}),
        });
      });
    });
  }
})();
