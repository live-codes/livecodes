import { encode } from 'js-base64';
import * as livecodes from './index';
// eslint-disable-next-line import/order
import type { EmbedOptions } from './models';

declare const globalThis: typeof window & {
  livecodes?: typeof livecodes;
};

globalThis.livecodes = Object.assign(globalThis.livecodes || {}, livecodes);

if (globalThis.document?.currentScript && 'prefill' in globalThis.document.currentScript.dataset) {
  window.addEventListener('load', () => {
    document.querySelectorAll<HTMLElement>('.livecodes').forEach((codeblock) => {
      let options: EmbedOptions | undefined;
      const optionsStr = codeblock.dataset.options;
      if (optionsStr) {
        try {
          options = JSON.parse(optionsStr);
        } catch {
          // eslint-disable-next-line no-console
          console.warn('Failed to parse options:', optionsStr);
        }
      }
      const dataUrl = encodeURIComponent(
        `data:text/html;charset=UTF-8;base64,${encode(codeblock.outerHTML)}`,
      );
      codeblock.innerHTML = '';
      livecodes.createPlayground(codeblock, {
        import: dataUrl,
        ...options,
      });
    });
  });
}
