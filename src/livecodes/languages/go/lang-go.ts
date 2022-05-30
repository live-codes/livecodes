import type { LanguageSpecs } from '../../models';
import { go2jsBaseUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const go: LanguageSpecs = {
  name: 'go',
  title: 'Go',
  formatter: {
    factory: () => {
      const url = go2jsBaseUrl + '/index.js';
      importScripts(url);
      return async (value: string) => ({
        formatted: await (window as any).go2js.format(value, go2jsBaseUrl),
        cursorOffset: 0,
      });
    },
  },
  compiler: {
    url: go2jsBaseUrl + '/index.js',
    factory: () => async (code) => {
      if (!code) return '';
      try {
        const jsCode = await (window as any).go2js.compile(code, go2jsBaseUrl);
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
