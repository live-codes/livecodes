import type { FormatFn, Language } from '../../models';
import { getAbsoluteUrl } from '../../utils';
import { rescriptCdnBaseUrl } from '../../vendors';

declare const importScripts: any;

const createRescriptFormatter = (baseUrl: string, language: Language): FormatFn => {
  if (!(self as any).rescript_compiler) {
    importScripts(getAbsoluteUrl(rescriptCdnBaseUrl + 'compiler.js', baseUrl));
  }
  const compiler = (self as any).rescript_compiler.make();
  compiler.setModuleSystem('es6');
  compiler.setFilename('index.bs.js');
  return async (value: string) => {
    let formatted = value;
    try {
      const output = compiler[language].format(value);
      if (output.type === 'success') {
        formatted = output.code;
      }
    } catch {
      //
    }
    return {
      formatted,
      cursorOffset: 0,
    };
  };
};

(self as any).createRescriptFormatter = createRescriptFormatter;
