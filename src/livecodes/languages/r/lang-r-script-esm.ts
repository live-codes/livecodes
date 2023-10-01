/* eslint-disable no-console */
import { webRBaseUrl } from '../../vendors';

const importPattern = /((?:(?:library)|(?:require))\s*?\(\s*?((?:".*?")|(?:'.*?')|(?:.*?))\s*?\))/g;
const removeComments = (src: string) => src.replace(/#.*$/gm, '');

const getImports = (code: string) =>
  [...[...removeComments(code).matchAll(new RegExp(importPattern))]]
    .map((arr) => arr[2].replace(/"/g, '').replace(/'/g, '').split(',')[0].trim())
    .filter(Boolean);

interface RunOptions {
  code?: string;
  container?: Element | string | null;
  canvasHeight?: number;
  canvasWidth?: number;
  canvasPointSize?: number;
  canvasBackground?: string;
  env?: any;
}

const defaultConfig = {
  canvasHeight: 309,
  canvasWidth: 500,
  canvasPointSize: 12,
  canvasBackground: 'transparent',
};

livecodes.r.packages = [];
livecodes.r.run =
  livecodes.r.run ||
  (async ({
    code,
    container,
    canvasHeight,
    canvasWidth,
    canvasPointSize,
    canvasBackground,
    env,
  }: RunOptions = {}) => {
    parent.postMessage({ type: 'loading', payload: true }, '*');

    livecodes.r.output = '';
    livecodes.r.plots = [];

    if (container !== null && livecodes.r.config?.container !== null) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      } else if (typeof livecodes.r.config?.container === 'string') {
        container = document.querySelector(livecodes.r.config.container);
      }
      container = container || livecodes.r.config?.container || document.body;
    }

    canvasHeight = Number(
      canvasHeight || livecodes.r.config?.canvasHeight || defaultConfig.canvasHeight,
    );
    canvasWidth = Number(
      canvasWidth || livecodes.r.config?.canvasWidth || defaultConfig.canvasWidth,
    );
    canvasPointSize = Number(
      canvasPointSize || livecodes.r.config?.canvasPointSize || defaultConfig.canvasPointSize,
    );
    canvasBackground = String(
      canvasBackground || livecodes.r.config?.canvasBackground || defaultConfig.canvasBackground,
    );

    if (code == null) {
      code = '';
      const scripts = document.querySelectorAll('script[type="text/r"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));
    }

    const imports = getImports(code).filter((pkg) => !livecodes.r.packages.includes(pkg));
    if (imports.length > 0) {
      await initialization;
      console.log('Installing packages: ' + imports.join(', '));
      const pkgCode = imports.map((pkg) => `webr::install("${pkg}")\n`).join('');
      await livecodes.r.run({ code: pkgCode, container: null });
      livecodes.r.packages = [...new Set([...livecodes.r.packages, ...imports])];
    }

    let result: { output: Array<{ type: 'stdout' | 'stderr'; data: string[] }> } | undefined;
    if (code.trim()) {
      await initialization;
      const { webR, webRCodeShelter } = livecodes.r;

      let canvas: HTMLCanvasElement | null = null;
      const canvasList: HTMLCanvasElement[] = [];
      await webR.init();
      await webR.evalRVoid('options(device=webr::canvas)');
      await webR.evalRVoid(
        `webr::canvas(width=${canvasWidth}, height=${canvasHeight}, pointsize=${canvasPointSize}, bg="${canvasBackground}")`,
      );
      result = await webRCodeShelter.captureR(code, {
        withAutoprint: true,
        captureStreams: true,
        captureConditions: false,
        env: env || livecodes.r.config?.env || {},
      });

      try {
        await webR.evalRVoid('dev.off()');

        const getOutput = (type: 'stdout' | 'stderr' | 'all') =>
          result?.output
            .filter((evt) => type === 'all' || evt.type === type)
            .map((evt) => evt.data)
            .join('\n') || '';

        const output = getOutput('all');
        const stdout = getOutput('stdout');
        const stderr = getOutput('stderr');
        if (stderr.trim()) {
          console.log(stderr);
        }

        const msgs = await webR.flush();

        msgs.forEach((msg: { type: 'canvas'; data: { event: string; image: ImageBitmap } }) => {
          if (msg.type === 'canvas' && msg.data.event === 'canvasNewPage') {
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', String(2 * canvasWidth!));
            canvas.setAttribute('height', String(2 * canvasHeight!));
            canvas.style.width = `${canvasWidth}px`;
            canvas.style.display = 'block';
            canvas.style.margin = 'auto';
            canvasList.push(canvas);
          }
          if (msg.type === 'canvas' && msg.data.event === 'canvasImage' && canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(msg.data.image, 0, 0);
          }
        });

        if (container && typeof container !== 'string') {
          container.innerHTML = '';
          const pre = document.createElement('pre');
          if (/\S/.test(stdout)) {
            const code = document.createElement('code');
            code.innerText = stdout;
            pre.appendChild(code);
          } else {
            pre.style.visibility = 'hidden';
          }
          container.appendChild(pre);

          for (const canvas of canvasList) {
            const div = document.createElement('div');
            div.appendChild(canvas);
            container.appendChild(div);
          }
        }

        livecodes.r.output = output;
        livecodes.r.plots = canvasList;
      } finally {
        webRCodeShelter.purge();
      }
    }

    parent.postMessage({ type: 'loading', payload: false }, '*');
    return result;
  });

const initialization = (async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');

  const getChannelType = (ChannelType: {
    Automatic: 0;
    SharedArrayBuffer: 1;
    ServiceWorker: 2;
    PostMessage: 3;
  }) => {
    if (typeof SharedArrayBuffer !== 'undefined') {
      return ChannelType.SharedArrayBuffer;
    } else {
      return ChannelType.PostMessage;
    }
  };

  const init = async () => {
    if (livecodes.r.ready) {
      await livecodes.r.webR.init();
      return;
    }
    console.log('Loading WebR...');
    const { WebR, ChannelType } = await import(webRBaseUrl + 'webr.mjs');
    livecodes.r.webR = new WebR({
      baseUrl: webRBaseUrl,
      channelType: getChannelType(ChannelType),
    });
    await livecodes.r.webR.init();
    livecodes.r.webRCodeShelter = await new livecodes.r.webR.Shelter();
    livecodes.r.ready = true;
    console.log('WebR loaded.');
  };

  await init();
  parent.postMessage({ type: 'loading', payload: false }, '*');
})();

livecodes.r.loaded = initialization;
