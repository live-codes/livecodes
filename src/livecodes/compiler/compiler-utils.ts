/* eslint-disable import/no-internal-modules */
import { proxyConsole } from '../result/utils';
import { getAppCDN } from '../services/modules';
import { createWorkerFromContent } from '../utils/utils';
import type { InitMessage } from './models';

proxyConsole();

(window as any).initCompiler = async (message: InitMessage) => {
  const baseUrl = message.baseUrl;
  const workerUrl = baseUrl + '{{hash:compile.worker.js}}';
  const origin = new URL(baseUrl).origin;
  const content = `self.appCDN='${getAppCDN()}';importScripts('${workerUrl}');`;
  const worker = createWorkerFromContent(content);

  await new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = baseUrl + '{{hash:compile.page.js}}';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

  worker.addEventListener('message', async function (ev) {
    if (ev.data.type === 'compileInCompiler') {
      // compile message sent from compiler (e.g ts in vue)
      worker.postMessage(ev.data);
      return;
    }
    if (
      ev.data.payload &&
      (window as any).compilers &&
      (window as any).compilers[ev.data.payload.language]
    ) {
      ev.data.payload.compiled = await (window as any).compilers[ev.data.payload.language](
        ev.data.payload.compiled,
        {
          config: ev.data.payload.config,
          language: ev.data.payload.language,
          baseUrl,
          options: ev.data.payload.options,
          worker,
        },
      );
    }
    if (ev.data.trigger === 'compileInCompiler') {
      worker.postMessage({ ...ev.data, from: 'compiler' });
    } else {
      parent.postMessage({ ...ev.data, from: 'compiler' }, origin);
    }
  });

  window.addEventListener('message', async function (event) {
    worker.postMessage(event.data);
  });

  worker.postMessage(message);
};
