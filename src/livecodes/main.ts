// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import appHTML from './html/app.html?raw';
import { customEvents } from './custom-events';
import type { API, Config } from './models';

export type { API, Config };

export const livecodes = async (container: string, config: Partial<Config> = {}): Promise<API> =>
  new Promise(async (resolve) => {
    const containerElement = document.querySelector(container);
    if (!containerElement) {
      throw new Error(`Cannot find element with the selector: "${container}"`);
    }
    const baseUrl =
      (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/livecodes/';
    const isLite = location.search.includes('lite') && !location.search.includes('lite=false');
    const isEmbed =
      isLite || (location.search.includes('embed') && !location.search.includes('embed=false'));
    const clickToLoad = isEmbed && !location.search.includes('loading=eager');
    const scriptFile = isLite
      ? '{{hash:lite.js}}'
      : isEmbed
      ? '{{hash:embed.js}}'
      : '{{hash:app.js}}';
    const anyOrigin = '*';

    const style = document.createElement('style');
    style.innerHTML = `
        ${container} {
            min-width: 300px;
            min-height: 200px;
            padding: 0;
            overflow: hidden;
        }
        ${container} > iframe {
            border: 0;
            width: 100%;
            height: 100%;
        }
        ${container}.embed iframe {
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            border: 1px solid #001b25;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    const loadApp = () => {
      const iframe = document.createElement('iframe');
      iframe.name = 'app';
      iframe.style.display = 'none';
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );

      containerElement.appendChild(iframe);
      iframe.contentWindow?.document.open();
      iframe.contentWindow?.document.write(
        appHTML.replace(/{{baseUrl}}/g, baseUrl).replace(/{{script}}/g, scriptFile),
      );
      iframe.contentWindow?.document.close();

      if (isEmbed) {
        window.addEventListener(customEvents.appLoaded, () => {
          parent.postMessage({ type: customEvents.appLoaded }, anyOrigin);
        });

        window.addEventListener(customEvents.ready, () => {
          parent.postMessage({ type: customEvents.ready }, anyOrigin);
        });

        window.addEventListener(customEvents.change, () => {
          parent.postMessage({ type: customEvents.change }, anyOrigin);
        });
      }

      iframe.addEventListener('load', async () => {
        const app = (iframe.contentWindow as any)?.app;
        if (typeof app === 'function') {
          const api: API = await app(config, baseUrl);
          iframe.style.display = 'block';
          window.dispatchEvent(
            new CustomEvent(customEvents.appLoaded, {
              detail: api,
            }),
          );

          addEventListener(
            'message',
            async (e: MessageEventInit<{ method: keyof API; args: any }>) => {
              if (isEmbed) {
                if (e.source !== parent) return;
                const { method, args } = e.data || {};
                if (!method) return;
                const methodArguments = Array.isArray(args) ? args : [args];

                let payload;
                try {
                  payload = await (api[method] as any)(...methodArguments);
                } catch (error: any) {
                  payload = { error: error.message || error };
                }
                parent.postMessage(
                  {
                    type: 'api-response',
                    method,
                    payload,
                  },
                  anyOrigin,
                );
              } else {
                if (e.source !== iframe.contentWindow) return;
                if (e.data?.args === 'home') {
                  location.href = '/';
                }
              }
            },
          );

          resolve(api);
        }
      });
    };

    if (clickToLoad) {
      window.addEventListener(customEvents.load, loadApp, { once: true });

      const preloadLink = document.createElement('link');
      preloadLink.href = baseUrl + scriptFile;
      preloadLink.rel = 'preload';
      preloadLink.as = 'script';
      document.head.appendChild(preloadLink);
    } else {
      loadApp();
    }
  });
