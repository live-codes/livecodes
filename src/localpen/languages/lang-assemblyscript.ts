import { LanguageSpecs } from '../models';

export const assemblyscript: LanguageSpecs = {
  name: 'assemblyscript',
  title: 'AS',
  longTitle: 'AssemblyScript',
  compiler: {
    url: 'assets/noop.js',
    factory: () => (code: string) =>
      `/* ... compiling ... */

window.wasm = new Promise((resolve) => {
require(["https://cdn.jsdelivr.net/npm/assemblyscript@latest/dist/sdk.js"],
(sdk) => {
  const asc = sdk.asc;
  asc.ready.then(async () => {
    async function compile(code) {
      const { text, binary } = asc.compileString(code, {
        optimizeLevel: 3,
      });
      const wasmModule = await loader.instantiate(binary);
      return { wasmModule, text, binary };
    }

    const { wasmModule, text, binary } = await compile(
\`${code.replace(/\`/g, '\\`')}\`
    );
    resolve({ wasmModule, text, binary });
  });
});
})
`.trimStart(),
    inlineScript: `window.addEventListener("load", async() => {
      const { text } = await wasm;
      const content = '//\\n// WebAssembly Text Format (module.wat)\\n//\\n' + text;
      parent.postMessage({type: 'compiled', payload: {language: 'assemblyscript', content}}, '*');
    });`,
    scripts: [
      'https://cdn.jsdelivr.net/npm/@assemblyscript/loader/umd/index.js',
      'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js',
    ],
    umd: true,
  },
  extensions: ['as', 'ts'],
  editor: 'script',
};
