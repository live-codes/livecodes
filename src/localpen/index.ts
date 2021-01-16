import { loadConfig } from './config';
import { appHTML } from './html';
import { Pen } from './models';

export const localpen = async (container: string, config: Partial<Pen> = {}) =>
  new Promise(async (resolve) => {
    const mergedConfig = await loadConfig(config);
    const { baseUrl } = mergedConfig;

    window.addEventListener('hashchange', () => {
      try {
        // on hash change, if it is a url, reload to import code from it
        new URL(location.hash.substr(1));
        window.location.reload();
      } catch (_err) {
        // hash is not URL => do nothing
      }
    });

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
    document.body.appendChild(style);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    const containerElement = document.querySelector(container);

    containerElement?.appendChild(iframe);
    iframe.contentWindow?.document.open();
    iframe.contentWindow?.document.write(appHTML.replace(/{{baseUrl}}/g, baseUrl));
    iframe.contentWindow?.document.close();

    iframe.addEventListener('load', async () => {
      const app = (iframe.contentWindow as any)?.app;
      if (typeof app === 'function') {
        const pen = await app(mergedConfig);
        iframe.style.display = 'block';

        // eslint-disable-next-line no-underscore-dangle
        const callback = (window as any).__localpenEmbed;
        if (typeof callback === 'function') {
          callback();
        }

        resolve(pen);
      }
    });
  });
