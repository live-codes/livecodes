import { LanguageSpecs } from '../models';

declare const importScripts: (...args: string[]) => void;
const cdnBaseUrl = 'https://cdn.jsdelivr.net/npm/@live-codes/go2js@0.3.0/build';

export const go: LanguageSpecs = {
  name: 'go',
  title: 'Go',
  formatter: {
    factory: () => {
      const url = cdnBaseUrl + '/index.js';
      importScripts(url);
      return async (value: string) => ({
        formatted: await (window as any).go2js.format(value, cdnBaseUrl),
        cursorOffset: 0,
      });
    },
  },
  compiler: {
    url: cdnBaseUrl + '/index.js',
    factory: () => async (code) => {
      if (!code) return '';
      try {
        const jsCode = await (window as any).go2js.compile(code, cdnBaseUrl);
        return jsCode;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return '';
      }
    },
  },
  extensions: ['go', 'golang'],
  editor: 'script',
};
