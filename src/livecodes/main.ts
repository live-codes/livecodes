// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import appHTML from './html/app.html?raw';
import type { API, Config, ContentConfig } from './models';

export { API, Config };
export const livecodes = async (
  container: string,
  baseUrl: string,
  config: Partial<Config> = {},
): Promise<API> =>
  new Promise(async (resolve) => {
    const containerElement = document.querySelector(container);
    if (!containerElement) {
      throw new Error(`Cannot find element with the selector: "${container}"`);
    }
    const isEmbed = location.search.includes('embed') && !location.search.includes('embed=false');
    const clickToLoad = isEmbed && !location.search.includes('click-to-load=false');
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

    const run = () => {
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
        appHTML
          .replace(/{{baseUrl}}/g, baseUrl)
          .replace(/{{script}}/g, isEmbed ? 'embed.js' : 'app.js'),
      );
      iframe.contentWindow?.document.close();

      if (isEmbed) {
        window.addEventListener('livecodes-ready', () => {
          parent.postMessage({ type: 'livecodes-ready' }, anyOrigin);
        });

        window.addEventListener('livecodes-app-loaded', () => {
          parent.postMessage({ type: 'livecodes-app-loaded' }, anyOrigin);
        });

        window.addEventListener('livecodes-change', (e: CustomEventInit<ContentConfig>) => {
          parent.postMessage(
            {
              type: 'livecodes-change',
              detail: e.detail,
            },
            anyOrigin,
          );
        });
      }

      iframe.addEventListener('load', async () => {
        const app = (iframe.contentWindow as any)?.app;
        if (typeof app === 'function') {
          const api: API = await app(config, baseUrl);
          iframe.style.display = 'block';
          window.dispatchEvent(
            new CustomEvent('livecodes-app-loaded', {
              detail: api,
            }),
          );

          if (isEmbed) {
            addEventListener(
              'message',
              async (e: MessageEventInit<{ method: keyof API; args: any }>) => {
                if (e.source !== parent) return;

                const { method, args } = e.data || {};
                if (!method) return;
                const methodArguments = Array.isArray(args) ? args : [args];

                parent.postMessage(
                  {
                    type: 'api-response',
                    method,
                    payload: await (api[method] as any)(...methodArguments),
                  },
                  anyOrigin,
                );
              },
            );
          }

          resolve(api);
        }
      });
    };
    if (clickToLoad) {
      window.addEventListener('run', run, false);

      const preloadLink = document.createElement('link');
      preloadLink.href = baseUrl + 'embed.js';
      preloadLink.rel = 'preload';
      preloadLink.as = 'script';
      document.head.appendChild(preloadLink);
    } else {
      run();
    }
  });
