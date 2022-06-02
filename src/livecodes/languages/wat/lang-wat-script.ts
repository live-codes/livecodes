import { typedArrayToBuffer } from '../../utils';
import { scriptType } from './lang-wat';

(window as any).livecodes.loadWasm = (importObject = {}) =>
  new Promise((resolve) => {
    const arrayStringToWasm = async (arrayString: string) => {
      const binary = new Uint8Array(arrayString.split('[')[1].slice(0, -1).split(',').map(Number));
      const binaryBuffer = typedArrayToBuffer(binary);
      try {
        const wasm = new WebAssembly.Module(binaryBuffer);
        const wasmModule = new WebAssembly.Instance(wasm, importObject);
        return {
          wasmModule,
          binary,
        };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(String(e));
        return {};
      }
    };
    window.addEventListener('load', async () => {
      const script = document.querySelector(`script[type="${scriptType}"]`);
      const arrayString = script?.innerHTML;
      const wasm = arrayString ? await arrayStringToWasm(arrayString) : {};
      resolve(wasm);
    });
  });
