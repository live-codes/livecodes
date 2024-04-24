/* eslint-disable import/no-internal-modules */
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import appHTML from './html/app.html?raw';
import { customEvents } from './events/custom-events';
import type { API, CDN, Config, CustomEvents, EmbedOptions } from './models';
import { isInIframe } from './utils/utils';
import { esModuleShimsPath } from './vendors';
import { modulesService } from './services/modules';

export type { API, Config };

export const params = new URLSearchParams(location.search);
export const isHeadless = params.get('view') === 'headless';
export const isLite = params.get('lite') != null && params.get('lite') !== 'false';
export const isEmbed =
  isHeadless ||
  isLite ||
  (params.get('embed') != null && params.get('embed') !== 'false') ||
  isInIframe();
export const loadingParam = params.get('loading');
export const clickToLoad = isEmbed && loadingParam !== 'eager';
export const loading: EmbedOptions['loading'] = !isEmbed
  ? 'eager'
  : loadingParam === 'lazy' || loadingParam === 'click' || loadingParam === 'eager'
    ? loadingParam
    : 'lazy';

// for backwards compatibility with using extension
export const disableAI =
  (params.get('disableAI') != null && params.get('disableAI') !== 'false') ||
  params.get('enableAI') === 'false';

export const livecodes = (container: string, config: Partial<Config> = {}): Promise<API> =>
  new Promise(async (resolve) => {
    const containerElement = document.querySelector(container);
    if (!containerElement) {
      throw new Error(`Cannot find element with the selector: "${container}"`);
    }
    const baseUrl =
      (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/livecodes/';
    const scriptFile = isHeadless
      ? '{{hash:headless.js}}'
      : isLite
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

    const loadApp = async () => {
      const appCDN = await modulesService.checkCDNs(esModuleShimsPath, params.get('appCDN') as CDN);

      const supportsImportMaps = HTMLScriptElement.supports
        ? HTMLScriptElement.supports('importmap')
        : false;

      const iframe = document.createElement('iframe');
      iframe.name = 'app';
      iframe.style.display = 'none';
      const disableAIQuery = disableAI ? `?disableAI` : '';
      iframe.src = './app.html' + disableAIQuery;
      let contentLoaded = false;
      iframe.onload = () => {
        if (contentLoaded) return;
        const appContent = appHTML
          .replace(/{{baseUrl}}/g, baseUrl)
          .replace(/{{script}}/g, scriptFile)
          .replace(/{{appCDN}}/g, appCDN)
          .replace(/{{esModuleShimsUrl}}/g, modulesService.getUrl(esModuleShimsPath, appCDN as CDN))
          .replace(
            /{{codemirrorModule}}/g,
            supportsImportMaps
              ? ''
              : `
    <script type="module">
      import * as mod from '${baseUrl}{{hash:codemirror.js}}';
      window['${baseUrl}{{hash:codemirror.js}}'] = mod;
    </script>
    `,
          )
          .replace(
            /{{codemirrorCoreUrl}}/g,
            `${baseUrl}vendor/codemirror/${process.env.codemirrorVersion}/codemirror-core.js`,
          )
          .replace(/src="[^"]*?\.svg"/g, (str: string) => (isHeadless ? 'src=""' : str))
          .replace(
            /{{codeiumMeta}}/g,
            `<meta name="codeium:type" content="${disableAI ? 'none' : 'monaco'}" />`,
          );

        iframe.contentWindow?.postMessage({ content: appContent }, location.origin);
        contentLoaded = true;
      };
      containerElement.appendChild(iframe);

      if (isEmbed) {
        const registerSDKEvent = (sdkEvent: CustomEvents[keyof CustomEvents], hasData = false) => {
          window.addEventListener(sdkEvent, (e: CustomEventInit) => {
            if (hasData && e.detail == null) return;
            parent.postMessage(
              { type: sdkEvent, ...(hasData ? { payload: e.detail } : {}) },
              anyOrigin,
            );
          });
        };
        registerSDKEvent(customEvents.appLoaded);
        registerSDKEvent(customEvents.ready);
        registerSDKEvent(customEvents.change, true);
        registerSDKEvent(customEvents.testResults, true);
        registerSDKEvent(customEvents.console, true);
        registerSDKEvent(customEvents.destroy);
      }

      iframe.addEventListener('load', async () => {
        const app = (iframe.contentWindow as any)?.app;
        if (typeof app === 'function') {
          const api: API = await app(config, baseUrl);
          if (!isHeadless) {
            iframe.style.display = 'block';
          }
          window.dispatchEvent(
            new CustomEvent(customEvents.appLoaded, {
              detail: api,
            }),
          );

          addEventListener(
            'message',
            async (e: MessageEventInit<{ method: keyof API; id: string; args: any }>) => {
              if (isEmbed) {
                if (e.source !== parent) return;
                const { method, id, args } = e.data ?? {};
                if (!method || !id) return;
                const methodArguments = Array.isArray(args) ? args : [args];
                let payload: any;
                try {
                  payload = await (api[method] as any)(...methodArguments);
                } catch (error: any) {
                  payload = { error: error.message || error };
                }
                if (typeof payload === 'object') {
                  Object.keys(payload).forEach((key) => {
                    if (typeof payload[key] === 'function') {
                      delete payload[key];
                    }
                  });
                }
                parent.postMessage(
                  {
                    type: customEvents.apiResponse,
                    method,
                    id,
                    payload,
                  },
                  anyOrigin,
                );
              } else {
                if (e.source !== iframe.contentWindow) return;
                if (e.data?.args === 'home') {
                  location.href = location.origin + location.pathname;
                }
              }
            },
          );

          resolve(api);
        }
      });
    };

    if (clickToLoad) {
      window.addEventListener(
        customEvents.load,
        () => {
          loadApp();
        },
        { once: true },
      );

      const preloadLink = document.createElement('link');
      preloadLink.href = baseUrl + scriptFile;
      preloadLink.rel = 'preload';
      preloadLink.as = 'script';
      document.head.appendChild(preloadLink);
    } else {
      loadApp();
    }
  });
