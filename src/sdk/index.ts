/* eslint-disable no-redeclare */
import { compressToEncodedURIComponent } from 'lz-string';
import type {
  API,
  Code,
  Config,
  EmbedOptions,
  Language,
  Playground,
  UrlQueryParams,
  CustomEvents,
  SDKEvent,
  SDKEventHandler,
} from './models';

export type { Code, Config, EmbedOptions, Language, Playground };

/**
 * Creates a LiveCodes playground.
 *
 * @param {string | HTMLElement} container - The container where the playground will be rendered.
 * @param {EmbedOptions} options - The embed options for the playground (optional).
 * @return {Promise<Playground>} - A promise that resolves to the created playground.
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
    (container as any).view === 'headless'
  ) {
    options = container;
    container = null as any;
  }

  const {
    appUrl = 'https://livecodes.io/',
    params = {},
    config = {},
    import: importFrom,
    lite,
    loading = 'lazy',
    template,
    view = 'split',
  } = options;

  const headless = view === 'headless';
  let containerElement: HTMLElement | null = null;

  if (typeof container === 'string') {
    containerElement = document.querySelector(container);
  } else if (container instanceof HTMLElement) {
    containerElement = container;
  } else if (!(headless && typeof container === 'object')) {
    throw new Error('A valid container element is required.');
  }
  if (!containerElement) {
    if (headless) {
      containerElement = document.createElement('div');
      hideElement(containerElement);
      document.body.appendChild(containerElement);
    } else {
      throw new Error(`Cannot find element: "${container}"`);
    }
  }

  let url: URL;
  try {
    url = new URL(appUrl);
  } catch {
    throw new Error(`"${appUrl}" is not a valid URL.`);
  }

  const origin = url.origin;

  if (typeof params === 'object') {
    (Object.keys(params) as Array<keyof UrlQueryParams>).forEach((param) => {
      url.searchParams.set(param, String(params[param]));
    });
  }

  if (typeof config === 'string') {
    try {
      new URL(config);
      url.searchParams.set('config', config);
    } catch {
      throw new Error(`"config" is not a valid URL or configuration object.`);
    }
  } else if (typeof config === 'object') {
    if (Object.keys(config).length > 0) {
      url.searchParams.set('config', 'sdk');
    }
  } else {
    throw new Error(`"config" is not a valid URL or configuration object.`);
  }

  if (template) {
    url.searchParams.set('template', template);
  }
  if (importFrom) {
    url.searchParams.set('x', importFrom);
  }
  if (lite) {
    url.searchParams.set('lite', 'true');
  }
  url.searchParams.set('embed', 'true');
  url.searchParams.set('loading', headless ? 'eager' : loading);
  url.searchParams.set('view', view);

  let destroyed = false;
  const alreadyDestroyedMessage = 'Cannot call API methods after calling `destroy()`.';

  const createIframe = () =>
    new Promise<HTMLIFrameElement>((resolve) => {
      if (!containerElement) return;

      const height = containerElement.dataset.height || containerElement.style.height;
      if (height && !headless) {
        const cssHeight = isNaN(Number(height)) ? height : height + 'px';
        containerElement.style.height = cssHeight;
      }
      if (containerElement.dataset.defaultStyles !== 'false' && !headless) {
        containerElement.style.backgroundColor ||= '#fff';
        containerElement.style.border ||= '1px solid black';
        containerElement.style.borderRadius ||= '5px';
        containerElement.style.boxSizing ||= 'border-box';
        containerElement.style.padding ||= '0';
        containerElement.style.width ||= '100%';
        containerElement.style.height ||= containerElement.style.height || '300px';
        containerElement.style.minHeight = '200px';
        containerElement.style.flexGrow = '1';
        containerElement.style.overflow ||= 'hidden';
        containerElement.style.resize ||= 'vertical';
      }

      const frame = document.createElement('iframe');
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
      frame.classList.add('livecodes');
      if (headless) {
        hideElement(frame);
      } else {
        frame.style.height = '100%';
        frame.style.minHeight = '200px';
        frame.style.width = '100%';
        frame.style.margin = '0';
        frame.style.border = '0';
        frame.style.borderRadius = containerElement.style.borderRadius;
      }
      addEventListener(
        'message',
        function configHandler(e: MessageEventInit<{ type: CustomEvents['getConfig'] }>) {
          if (
            e.source !== frame.contentWindow ||
            e.origin !== origin ||
            e.data?.type !== 'livecodes-get-config'
          ) {
            return;
          }
          removeEventListener('message', configHandler);
          frame.contentWindow?.postMessage({ type: 'livecodes-config', payload: config }, origin);
        },
      );
      frame.onload = () => {
        resolve(frame);
      };
      frame.src = url.href;
      containerElement.appendChild(frame);
    });

  const iframe = await createIframe();

  const livecodesReady: Promise<void> & { settled?: boolean } = new Promise((resolve) => {
    addEventListener(
      'message',
      function readyHandler(e: MessageEventInit<{ type: CustomEvents['ready'] }>) {
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
      },
    );
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

      addEventListener(
        'message',
        function handler(
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
        },
      );
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

  addEventListener(
    'message',
    async (
      e: MessageEventInit<{
        type: CustomEvents[keyof CustomEvents];
        payload?: any;
      }>,
    ) => {
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
    },
  );

  const destroy = () => {
    Object.values(watchers).forEach((watcher) => {
      watcher.length = 0;
    });
    iframe?.remove?.();
    destroyed = true;
  };

  if (loading === 'lazy' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            await loadLivecodes();
            observer.unobserve(containerElement!);
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
      if (!livecodesReady.settled) {
        if (destroyed) {
          return Promise.reject(alreadyDestroyedMessage);
        }
        destroy();
        return Promise.resolve();
      }
      return callAPI('destroy').then(destroy);
    },
  };
}

export function getPlaygroundUrl(options: EmbedOptions = {}): string {
  const { appUrl, params, config, import: x, ...otherOptions } = options;
  const configParam =
    typeof config === 'string'
      ? { config }
      : typeof config === 'object'
        ? { x: 'code/' + compressToEncodedURIComponent(JSON.stringify(config)) }
        : {};
  const allParams = new URLSearchParams(
    JSON.parse(
      JSON.stringify({
        ...otherOptions,
        ...params,
        ...{ x },
        ...configParam,
      }),
    ),
  ).toString();
  return (appUrl || 'https://livecodes.io') + (allParams ? '?' + allParams : '');
}

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
