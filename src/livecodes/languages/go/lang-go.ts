import type { LanguageSpecs } from '../../models';
import { codeMirrorBaseUrl, go2jsBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

export const go: LanguageSpecs = {
  name: 'go',
  title: 'Go',
  formatter: {
    factory: () => {
      importScripts(go2jsBaseUrl + 'go2js-format.js');
      return async (code: string) => {
        if (!code) return { formatted: '', cursorOffset: 0 };

        const [formatted, err] = (globalThis as any).go2jsFormat(code);

        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return { formatted: code, cursorOffset: 0 };
        }

        return { formatted, cursorOffset: 0 };
      };
    },
  },
  compiler: {
    url: go2jsBaseUrl + 'go2js-compile.js',
    factory: () => (code) =>
      new Promise((resolve) => {
        if (!code) {
          resolve('');
          return;
        }
        const url = go2jsBaseUrl.endsWith('/') ? go2jsBaseUrl.slice(0, -1) : go2jsBaseUrl;
        (globalThis as any).go2jsCompile(code, url, (err: string, jsCode: string) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            resolve('');
          } else {
            resolve(jsCode);
          }
        });
      }),
  },
  extensions: ['go', 'golang'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'go.js' },
    codemirror: {
      languageSupport: async () => (await import(codeMirrorBaseUrl + 'codemirror-lang-go.js')).go(),
    },
  },
};
