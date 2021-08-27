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

const watToArrayString = async (code: string, options = features): Promise<string> => {
  if (!code) return '';

  const wabt = await (window as any).WabtModule();
  let arrayString = null;
  let module: any;

  try {
    module = wabt.parseWat('module.wat', code, options);
    module.resolveNames();
    module.validate(options);
    const binaryOutput = module.toBinary({
      log: true,
      write_debug_names: true,
    });
    // console.log(binaryOutput.log);
    arrayString = binaryOutput.buffer.toString('utf-8');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e.toString());
  } finally {
    if (module) module.destroy();
  }
  return arrayString || '';
};

export const arrayStringToWasm = `
const arrayStringToWasm = async (arrayString) => {
  function arrayToBuffer(array) {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }
  const binary = new Uint8Array(arrayString.split(',').map(Number));
  const binaryBuffer = arrayToBuffer(binary);
  console.log(binary)
  try {
    let wasm = new WebAssembly.Module(binaryBuffer);
    const wasmModule = new WebAssembly.Instance(wasm, {});
    return {
      wasmModule,
      binary,
    };
  } catch (e) {
    console.error(String(e));
  }
};`;

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
      watToArrayString(code, {
        ...features,
        ...getLanguageCustomSettings('wat', config),
      }),
    inlineScript: `
(() => {
  globalThis.wasm = new Promise((resolve) => {
    window.addEventListener("load", async () => {
      ${arrayStringToWasm}
      const script = document.querySelector('script[type="application/wasm"]');
      const arrayString = script?.innerHTML;
      const wasm = arrayString ? await arrayStringToWasm(arrayString) : {};
      resolve(wasm);
    });
  });
})();
    `,
    scriptType: 'application/wasm',
  },
  extensions: ['wat', 'wast', 'webassembly', 'wasm'],
  editor: 'script',
  editorLanguage: 'javascript',
};
