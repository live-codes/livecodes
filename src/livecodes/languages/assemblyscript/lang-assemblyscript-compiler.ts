import type { CompilerFunction } from '../../models';
import { assemblyscriptSdkUrl, requireUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../../utils';

declare const importScripts: (...args: string[]) => void;
declare const requirejs: any;
declare const require: any;

const watHeader = `;; WebAssembly Text Format (module.wat)\n\n`;
const wasmHeader = `\n\n;; WebAssembly Binary (module.wasm)\n;; `;

importScripts(requireUrl);
if ((self as any).assemblyscriptSDK === undefined) {
  (self as any).assemblyscriptSDK = new Promise<void>(async (resolve) => {
    requirejs.config({ waitSeconds: 0 });
    require([assemblyscriptSdkUrl], (sdk: any) => {
      resolve(sdk);
    });
  });
}

const compile = async (code: string, options: any) => {
  const asc = (await (self as any).assemblyscriptSDK).asc;
  await asc.ready;
  try {
    const { text, binary } = await asc.compileString(code, options);
    if (!binary) return '';
    const arrayString = binary.toString();
    return watHeader + text + wasmHeader + 'Uint8Array [' + arrayString + ']';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return '';
  }
};

(self as any).createAssemblyscriptCompiler =
  (): CompilerFunction =>
  (code, { config }) =>
    compile(code, {
      optimizeLevel: 3,
      ...getLanguageCustomSettings('assemblyscript', config),
    });
