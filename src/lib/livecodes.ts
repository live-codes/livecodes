// eslint-disable-next-line import/no-internal-modules
import { API, Code, Config } from '../livecodes/models';

export { API, Code, Config };
export interface EmbedOptions {
  config?: Partial<Config> | string;
  template?: string;
  importUrl?: string;
  appUrl?: string;
}

export const playground = async (
  container: string | HTMLElement,
  options: EmbedOptions = {},
): Promise<API> => {
  const { config = {}, template, importUrl, appUrl = 'https://livecodes.io/' } = options;

  let containerElement: HTMLElement | null;
  if (typeof container === 'string') {
    containerElement = document.querySelector(container);
  } else {
    containerElement = container;
  }
  if (!container) {
    throw new Error('Container element is required.');
  }
  if (!containerElement) {
    throw new Error(`Cannot find element: "${container}"`);
  }

  let url: URL;
  try {
    url = new URL(appUrl);
  } catch {
    throw new Error(`"${appUrl}" is not a valid URL.`);
  }

  const origin = url.origin;

  if (typeof config === 'string') {
    url.searchParams.set('config', config);
  } else if (typeof config === 'object' && Object.keys(config).length > 0) {
    try {
      const encoded = btoa(JSON.stringify(config));
      for (const [key, value] of Object.entries(config)) {
        if (['string', 'boolean', 'number', 'undefined'].includes(typeof value)) {
          url.searchParams.set(key, String(value));
        }
      }
      url.searchParams.set('config', 'data:application/json;base64,' + encoded);
    } catch {
      throw new Error('Invalid configuration object.');
    }
  }

  if (template) {
    url.searchParams.set('template', template);
  }

  if (importUrl) {
    url.hash = '#' + importUrl;
  }

  url.searchParams.set('embed', 'true');

  const createIframe = () =>
    new Promise<HTMLIFrameElement>((resolve) => {
      if (!containerElement) return;

      const frame = document.createElement('iframe');
      frame.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      frame.classList.add('livecodes');
      frame.src = url.href;
      frame.onload = () => {
        addEventListener('message', function readyHandler(e) {
          if (e.source !== frame.contentWindow || e.origin !== origin) return;
          if (e.data.type === 'livecodes-ready') {
            removeEventListener('message', readyHandler);
            resolve(frame);
          }
        });
      };
      containerElement.appendChild(frame);
    });

  const iframe = await createIframe();

  const callAPI = (method: string, args?: any[]) =>
    new Promise((resolve) => {
      addEventListener('message', function handler(e) {
        if (
          e.source !== iframe.contentWindow ||
          e.origin !== origin ||
          e.data?.type !== 'api-response'
        ) {
          return;
        }

        if (e.data.method === method) {
          removeEventListener('message', handler);
          resolve(e.data.payload);
        }
      });
      iframe.contentWindow?.postMessage({ method, args }, origin);
    });

  return {
    run: () => callAPI('run') as Promise<void>,
    format: () => callAPI('format') as Promise<void>,
    getShareUrl: (shortUrl = false) => callAPI('getShareUrl', [shortUrl]) as Promise<string>,
    getConfig: () => callAPI('getConfig') as Promise<Config>,
    setConfig: (config: Config) => callAPI('setConfig', [config]) as Promise<Config>,
    getCode: () => callAPI('getCode') as Promise<Code>,
    // onChange: () => {},
  };
};
