import { proxyConsole } from '../result';
import { InitMessage } from './models';

proxyConsole();

(window as any).initCompiler = async (message: InitMessage) => {
  const baseUrl = message.baseUrl;
  const workerUrl = baseUrl + 'compile.worker.js';
  const origin = new URL(baseUrl).origin;
  const blob = new Blob(["importScripts('" + workerUrl + "');"]);
  const worker = new Worker(URL.createObjectURL(blob));

  await new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = baseUrl + 'compile.page.js';
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
        { language: ev.data.payload.language, baseUrl },
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
