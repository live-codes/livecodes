import { LanguageSpecs } from '../models';

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  info: `
  <h3>AssemblyScript</h3>
  <div>A language made for WebAssembly.</div>
  <ul>
    <li><a href="https://www.assemblyscript.org/" target="_blank" rel="noopener">AssemblyScript official website</a></li>
    <li><a href="https://www.assemblyscript.org/introduction.html" target="_blank" rel="noopener">AssemblyScript documentation</a></li>
    <!-- <li><a href="#">AssemblyScript usage in LocalPen</a></li> -->
    <li><a href="?template=assemblyscript" target="_parent" data-template="assemblyscript">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    url: 'assets/noop.js',
    factory: () => async (code) => '/* ... compiling ... */\n\n' + code,
    liveReload: true,
    scripts: ['https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js'],
    inlineScript: `
(() => {
  globalThis.wasm = new Promise((resolveWasm) => {
    window.addEventListener("load", async () => {
      parent.postMessage({ type: "loading", payload: true }, "*");
      requirejs?.config?.({ waitSeconds: 0 });
      if (globalThis.__assemblyscriptSDK === undefined) {
        await new Promise(async (resolve) => {
          require([
            "https://cdn.jsdelivr.net/npm/assemblyscript@0.19.7/dist/sdk.js",
            "https://cdn.jsdelivr.net/npm/@assemblyscript/loader@0.19.7/umd/index.js",
          ],
          (sdk, _) => {
            globalThis.__assemblyscriptSDK = sdk;
            resolve();
          });
        })
      }
      let code = "";
      const scripts = document.querySelectorAll('script[type="text/assemblyscript"]');
      scripts.forEach((script) => (code += script.innerHTML + "\\n"));

      async function evaluate(code) {
        const asc = globalThis.__assemblyscriptSDK.asc;
        await asc.ready;
        async function compile(code) {
          const { text, binary } = asc.compileString(code, {
            optimizeLevel: 3,
          });
          const wasmModule = await loader.instantiate(binary);
          return { wasmModule, text, binary };
        }
        try {
          const { wasmModule, text, binary } = await compile(code);
          const content = '//\\n// WebAssembly Text Format (module.wat)\\n//\\n' + text;
          parent.postMessage({type: 'compiled', payload: {language: 'assemblyscript', content}}, '*');
          resolveWasm({ wasmModule, text, binary });
        } catch (err) {
          console.log(err);
        }
      }
      await evaluate(code);
      parent.postMessage({ type: "loading", payload: false }, "*");
    });
  });
})();
`,
    scriptType: 'text/assemblyscript',
  },
  extensions: ['as', 'ts'],
  editor: 'script',
  editorLanguage: 'typescript',
};
