/* eslint-disable no-console */
// import { juliaWasmBaseUrl } from '../../vendors';

livecodes.r = livecodes.r || {};
livecodes.r.run =
  livecodes.r.run ||
  (async (input: string) => {
    let code = '';
    livecodes.r.input = input;
    livecodes.r.output = '';
    const scripts = document.querySelectorAll('script[type="text/r"]');
    scripts.forEach((script) => (code += script.innerHTML + '\n'));
    console.log(code);

    const result = await livecodes.r.webR.evalR('rnorm(10,5,1)');
    console.log(result);
    const output = await result.toArray();
    console.log('Result of running `rnorm` from webR: ', output);
    return output;
  });

window.addEventListener('load', async () => {
  livecodes.r.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const init = async () => {
    if (livecodes.r.webR) return;
    console.log('Loading WebR...');
    const { WebR } = await import('https://expressjs-server.hatemhosny.repl.co/v5/webr.mjs');
    const webR = new WebR({
      SW_URL: 'https://expressjs-server.hatemhosny.repl.co/v5/',
    });
    console.log(WebR);
    await webR.init().catch(console.log);
    livecodes.r.webR = webR;
    console.log('WebR loaded.');
  };
  await init();
  await livecodes.r.run(livecodes.r.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
