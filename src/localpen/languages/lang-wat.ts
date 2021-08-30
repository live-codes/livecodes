/* eslint-disable camelcase */
import { LanguageSpecs } from '../models';
import { typedArrayToBuffer } from '../utils';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;

const wabtjsUrl = 'https://cdn.jsdelivr.net/npm/wabt@1.0.24/index.js';
const scriptType = 'application/wasm-uint8';

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

  const wabt = await (self as any).WabtModule();
  let arrayString = '';
  let module: any;

  try {
    module = wabt.parseWat('module.wat', code, options);
    module.resolveNames();
    module.validate(options);
    const binaryOutput: { log: string; buffer: Uint8Array } = module.toBinary({
      log: true,
      write_debug_names: true,
    });
    arrayString = binaryOutput.buffer?.toString() || '';
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e.toString());
  } finally {
    if (module) module.destroy();
  }
  return 'Uint8Array [' + arrayString + ']';
};

export const wat: LanguageSpecs = {
  name: 'wat',
  title: 'WAT',
  longTitle: 'WebAssembly Text',
  info: `
  <h3>WebAssembly Text Format</h3>
  <div>Low-level textual representation of the WebAssembly (wasm) binary format.</div>
  <div>It is converted to wasm using wabt.js.</div>
  <ul>
    <li><a href="https://webassembly.org/" target="_blank" rel="noopener">WebAssembly.org</a></li>
    <li><a href="https://webassembly.github.io/spec/core/text/index.html" target="_blank" rel="noopener">WebAssembly Text Specs</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/WebAssembly" target="_blank" rel="noopener">WebAssembly on MDN</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format" target="_blank" rel="noopener">Understanding WebAssembly text format</a></li>
    <li><a href="https://github.com/AssemblyScript/wabt.js" target="_blank" rel="noopener">wabt.js documentation</a></li>
    <li><a href="?template=wat" target="_parent" data-template="wat">Load starter template</a></li>
    <!-- <li><a href="#">WebAssembly Text usage in LocalPen</a></li> -->
  </ul>
  `,
  formatter: {
    factory: (baseUrl) => {
      const url = baseUrl + 'vendor/wast-refmt/wast-refmt.js';
      importScripts(url);
      return async (value: string) => {
        let formatted = value;
        try {
          formatted = (self as any).wastRefmt.format(value);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('failed parsing WAT', error);
        }
        return {
          formatted,
          cursorOffset: 0,
        };
      };
    },
  },
  compiler: {
    url: wabtjsUrl,
    factory: () => async (code, { config }) =>
      watToArrayString(code, {
        ...features,
        ...getLanguageCustomSettings('wat', config),
      }),
    inlineScript: `
(() => {
  globalThis.loadWasm = () => new Promise((resolve) => {
    const arrayStringToWasm = async (arrayString) => {
      const typedArrayToBuffer = ${typedArrayToBuffer};
      const binary = new Uint8Array(arrayString.split('[')[1].slice(0,-1).split(',').map(Number));
      const binaryBuffer = typedArrayToBuffer(binary);
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
    };
    window.addEventListener("load", async () => {
      const script = document.querySelector('script[type="${scriptType}"]');
      const arrayString = script?.innerHTML;
      const wasm = arrayString ? await arrayStringToWasm(arrayString) : {};
      resolve(wasm);
    });
  });
})();
    `,
    scriptType,
    compiledCodeLanguage: 'Binary',
  },
  extensions: ['wat', 'wast', 'webassembly', 'wasm'],
  editor: 'script',
  editorLanguage: 'javascript',
};
