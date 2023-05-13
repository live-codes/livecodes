/* eslint-disable camelcase */
import type { CompilerFunction } from '../../models';
import { getLanguageCustomSettings } from '../../utils';

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

(self as any).createWatCompiler =
  (): CompilerFunction =>
  async (code, { config }) =>
    watToArrayString(code, {
      ...features,
      ...getLanguageCustomSettings('wat', config),
    });
