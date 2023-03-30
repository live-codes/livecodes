/* eslint-disable no-console */
// import { juliaWasmBaseUrl } from '../../vendors';

const webRBaseUrl = 'http://127.0.0.1:3000/webr/';

const importPattern = /((?:(?:library)|(?:require))\s*?\(\s*?((?:".*?")|(?:'.*?')|(?:.*?))\s*?\))/g;
const removeComments = (src: string) => src.replace(/#.*$/gm, '');

const getImports = (code: string) =>
  [...[...removeComments(code).matchAll(new RegExp(importPattern))]].map((arr) =>
    arr[2].replace(/"/g, '').replace(/'/g, ''),
  );

interface RunOptions {
  code?: string;
  container?: Element | string | null;
  canvasHeight?: number;
  canvasWidth?: number;
  env?: any;
}

const defaultConfig = {
  canvasHeight: 311.472,
  canvasWidth: 504,
};

livecodes.r.packages = [];
livecodes.r.run =
  livecodes.r.run ||
  (async ({
    code,
    container,
    canvasHeight = defaultConfig.canvasHeight,
    canvasWidth = defaultConfig.canvasWidth,
    env,
  }: RunOptions = {}) => {
    livecodes.r.output = '';

    if (container !== null && livecodes.r.config?.container !== null) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      } else if (typeof livecodes.r.config?.container === 'string') {
        container = document.querySelector(livecodes.r.config.container);
      }
      container = container || livecodes.r.config?.container || document.body;
    }

    canvasHeight =
      Number(canvasHeight) ||
      Number(livecodes.r.config?.canvasHeight) ||
      defaultConfig.canvasHeight;
    canvasWidth =
      Number(canvasWidth) || Number(livecodes.r.config?.canvasWidth) || defaultConfig.canvasWidth;

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

    parent.postMessage({ type: 'loading', payload: true }, '*');

    let result: { output: Array<{ type: 'stdout' | 'stderr'; data: string[] }> } | undefined;
    if (code.trim()) {
      await initialization;

      // based on https://www.tidyverse.org/blog/2023/03/webr-0-1-0/
      const { webR, webRCodeShelter } = livecodes.r;

      let canvas: HTMLCanvasElement | null = null;
      const canvasList: HTMLCanvasElement[] = [];
      await webR.init();
      await webR.evalRVoid(`canvas(width=${canvasWidth}, height=${canvasHeight})`);
      result = await webRCodeShelter.captureR(code, {
        withAutoprint: true,
        captureStreams: true,
        captureConditions: false,
        env: env || webR.objs.emptyEnv,
      });

      try {
        await webR.evalRVoid('dev.off()');

        const getOutput = (type: 'stdout' | 'stderr') =>
          result?.output
            .filter((evt) => evt.type === type)
            .map((evt) => evt.data)
            .join('\n') || '';

        const stdout = getOutput('stdout');
        const stderr = getOutput('stderr');
        if (stderr.trim()) {
          console.log(stderr);
        }

        livecodes.r.output = stdout;

        const msgs = await webR.flush();

        if (container && typeof container !== 'string') {
          msgs.forEach((msg: { type: string; data: string }) => {
            if (msg.type === 'canvasExec') {
              if (!canvas || msg.data.startsWith('clearRect(0')) {
                canvas = document.createElement('canvas');
                canvas.setAttribute('width', String(2 * canvasWidth));
                canvas.setAttribute('height', String(2 * canvasHeight));
                canvas.style.width = `${canvasWidth}px`;
                canvas.style.display = 'block';
                canvas.style.margin = 'auto';
                canvasList.push(canvas);
              }
              // eslint-disable-next-line no-new-func
              Function(`this.getContext('2d').${msg.data}`).bind(canvas)();
            }
          });

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
      } finally {
        webRCodeShelter.purge();
      }
    }

    parent.postMessage({ type: 'loading', payload: false }, '*');
    return result;
  });

const initialization = (async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const init = async () => {
    if (livecodes.r.ready) {
      await livecodes.r.webR.init();
      return;
    }
    console.log('Loading WebR...');
    const { WebR } = await import(webRBaseUrl + 'webr.mjs');
    livecodes.r.webR = new WebR({
      WEBR_URL: webRBaseUrl,
      SW_URL: webRBaseUrl,
      channelType: 1,
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
