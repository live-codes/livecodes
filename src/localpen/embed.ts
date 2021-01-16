const container = '#pen';
// async function localpen(container: string, config: Partial<Pen> = {}) {
//   new Promise(async (resolve) => {
// const mergedConfig = await loadConfig(config);
// const { baseUrl } = mergedConfig;
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
iframe.src = 'http://localhost:8080';
containerElement?.appendChild(iframe);

// iframe.addEventListener('load', async () => {
//   const app = (iframe.contentWindow as any)?.app;
//   if (typeof app === 'function') {
//     const pen = await app(mergedConfig);
iframe.style.display = 'block';
//     resolve(pen);
//   }
// });
// }

iframe.addEventListener('load', async () => {
  const containerEl = document.querySelector('#pen') as HTMLElement;

  iframe.contentDocument?.body.appendChild(containerEl.cloneNode(true));
  iframe.style.display = 'block';
});
