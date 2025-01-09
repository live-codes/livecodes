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
const isHeadless =
  (params.get('headless') != null && params.get('headless') !== 'false') ||
  params.get('view') === 'headless'; // for backwards compatibility
const isLite =
  params.get('mode') === 'lite' || (params.get('lite') != null && params.get('lite') !== 'false'); // for backwards compatibility
export let isEmbed =
  isHeadless ||
  isLite ||
  (params.get('embed') != null && params.get('embed') !== 'false') ||
  isInIframe();
const loadingParam = params.get('loading');
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

    if (config.mode === 'lite') {
      isEmbed = true;
    }
    const scriptFile = isHeadless
      ? '{{hash:headless.js}}'
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
            border-radius: 8px;
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

      let api: API | null = null;

      addEventListener(
        'message',
        async (
          e: MessageEventInit<{ method: keyof API; id: string; args: any; payload?: any }>,
        ) => {
          if (e.data?.args === 'i18n') {
            if (e.source !== iframe.contentWindow) return;

            if (!isEmbed) {
              // flatten i18n object `splash` and save to localStorage
              const i18nSplashData = e.data.payload.data as { [k: string]: string };
              for (const [key, value] of Object.entries(i18nSplashData)) {
                localStorage.setItem(`i18n_splash.${key}`, value);
              }
            }

            // Set document language
            const lang = e.data.payload.lang as string;
            document.documentElement.lang = lang;

            // Reload the page to apply the new language
            const reload = e.data.payload.reload as boolean;
            const appUrl = e.data.payload.url as string | undefined;
            if (reload) {
              const url = new URL(appUrl || location.href);
              if (appUrl && lang) {
                url.searchParams.set('appLanguage', lang);
              } else {
                url.searchParams.delete('appLanguage');
              }
              if (isEmbed) {
                url.searchParams.set('embed', '');
              }
              location.href = url.href;
            }
            return;
          }

          if (isEmbed) {
            if (e.source !== parent || api == null) return;
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
            } else if (e.data?.args === 'console-message') {
              // eslint-disable-next-line no-console
              console.info(...(e.data.payload ?? []));
            }
          }
        },
      );

      iframe.addEventListener('load', async () => {
        const app = (iframe.contentWindow as any)?.app;
        if (typeof app === 'function') {
          api = (await app(config, baseUrl)) as API;
          if (!isHeadless) {
            iframe.style.display = 'block';
          }
          window.dispatchEvent(
            new CustomEvent(customEvents.appLoaded, {
              detail: api,
            }),
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
