/* eslint-disable camelcase */
import { LanguageSpecs } from '../models';
import { getLanguageCustomSettings } from './utils';

const features = {
  exceptions: true,
  mutable_globals: true,
  sat_float_to_int: true,
  sign_extension: true,
  simd: true,
  threads: true,
  multi_value: true,
  tail_call: true,
  bulk_memory: true,
  reference_types: true,
};

const watToBase64 = async (code: string, options = features): Promise<string> => {
  if (!code) return '';

  const wabt = await (window as any).WabtModule();
  let base64 = null;
  let module: any;

  const toBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve((reader.result as string) || '');
      };
    });

  try {
    module = wabt.parseWat('module.wat', code, options);
    module.resolveNames();
    module.validate(options);
    const binaryOutput = module.toBinary({
      log: true,
      write_debug_names: true,
    });
    // console.log(binaryOutput.log);
    const blob = new Blob([binaryOutput.buffer]);
    base64 = await toBase64(blob);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e.toString());
  } finally {
    if (module) module.destroy();
  }

  return base64 || '';
};

export const wat: LanguageSpecs = {
  name: 'wat',
  title: 'WAT',
  longTitle: 'WebAssembly Text',
  info: `
  <h3>WebAssembly Text Format</h3>
  <div>Low-level textual representation of the WebAssembly (wasm) binary format.</div>
  <ul>
    <li><a href="https://webassembly.org/" target="_blank" rel="noopener">WebAssembly.org</a></li>
    <li><a href="https://webassembly.github.io/spec/core/text/index.html" target="_blank" rel="noopener">WebAssembly Text Specs</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format" target="_blank" rel="noopener">WebAssembly on MDN</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format" target="_blank" rel="noopener">Understanding WebAssembly text format</a></li>
    <li><a href="?template=wat" target="_parent" data-template="wat">Load starter template</a></li>
    <!-- <li><a href="#">WebAssembly Text usage in LocalPen</a></li> -->
  </ul>
  `,
  compiler: {
    url: 'vendor/wabt/libwabt.js',
    factory: () => async (code, { config }) =>
      watToBase64(code, {
        ...features,
        ...getLanguageCustomSettings('wat', config),
      }),
    inlineScript: `
(() => {
  globalThis.wasm = new Promise((resolve) => {
    window.addEventListener("load", async () => {
      parent.postMessage({ type: "loading", payload: true }, "*");

      const base64ToWasm = async (b64Data) => {
        const blob = await fetch(b64Data).then((res) => res.blob());
        const binaryBuffer = await blob.arrayBuffer();
        if (binaryBuffer === null) return;
        try {
          let wasm = new WebAssembly.Module(binaryBuffer);
          const wasmInstance = new WebAssembly.Instance(wasm, {});
          return wasmInstance;
        } catch (e) {
          console.error(String(e));
        }
      };

      const script = document.querySelector('script[type="text/webassembly-text"]');
      const base64 = script?.innerHTML;
      const instance = base64 ? await base64ToWasm(base64) : {exports:{}};
      resolve(instance);

      parent.postMessage({type: 'compiled', payload: {language: 'wat', base64}}, '*');
      parent.postMessage({ type: "loading", payload: false }, "*");
    });
  });
})();
    `,
    scriptType: 'text/webassembly-text',
  },
  extensions: ['wat', 'wast', 'webassembly', 'wasm'],
  editor: 'script',
  editorLanguage: 'javascript',
};
