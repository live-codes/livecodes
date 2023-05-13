import type { LanguageFormatter } from '../../models';
import { getAbsoluteUrl } from '../../utils';
import { rescriptCompilerUrl } from '../../vendors';

declare const importScripts: any;

const createRescriptFormatter: LanguageFormatter['factory'] = (baseUrl, language) => {
  if (!(self as any).rescript_compiler) {
    importScripts(getAbsoluteUrl(rescriptCompilerUrl, baseUrl));
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
