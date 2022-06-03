/* eslint-disable camelcase */
import type { LanguageSpecs } from '../../models';
import { vendorsBaseUrl, wabtjsUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

const formatterUrl = vendorsBaseUrl + 'wast-refmt/wast-refmt.js';
export const scriptType = 'application/wasm-uint8';

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
    factory: (_config, baseUrl) => {
      (self as any).importScripts(baseUrl + '{{hash:lang-wat-compiler.js}}');
      return (self as any).createWatCompiler();
    },
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-wat-script.js}}'],
    scriptType,
    compiledCodeLanguage: 'Binary',
  },
  extensions: ['wat', 'wast', 'webassembly', 'wasm'],
  editor: 'script',
};
