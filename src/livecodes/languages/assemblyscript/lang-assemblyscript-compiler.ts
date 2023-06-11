import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

declare const self: Worker & {
  assemblyscript: { asc: any };
  assemblyscriptLoaded: Promise<void>;
};

const watHeader = `;; WebAssembly Text Format (module.wat)\n\n`;
const wasmHeader = `\n\n;; WebAssembly Binary (module.wasm)\n;; `;

const compile = async (code: string, options: any) => {
  await self.assemblyscriptLoaded;
  try {
    const { text, binary } = await self.assemblyscript.asc.compileString(code, options);
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
