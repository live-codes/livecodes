/* eslint-disable camelcase */
import { LanguageSpecs } from '../models';
import { typedArrayToBuffer } from '../utils';
import { vendorsBaseUrl } from '../vendors';
import { getLanguageCustomSettings } from './utils';

declare const importScripts: (...args: string[]) => void;

const wabtjsUrl = 'https://cdn.jsdelivr.net/npm/wabt@1.0.24/index.js';
const formatterUrl = vendorsBaseUrl + 'wast-refmt/wast-refmt.js';
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
    console.warn((e as Error).toString());
  } finally {
    if (module) module.destroy();
  }
  return 'Uint8Array [' + arrayString + ']';
};

export const wat: LanguageSpecs = {
  name: 'wat',
  title: 'WAT',
  longTitle: 'WebAssembly Text',
  formatter: {
    factory: () => {
      importScripts(formatterUrl);
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
};
