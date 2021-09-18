import { LanguageSpecs } from '../models';

declare const importScripts: (...args: string[]) => void;
const cdnBaseUrl = 'https://cdn.jsdelivr.net/npm/go2js@0.2.0/build';

export const go: LanguageSpecs = {
  name: 'go',
  title: 'Go',
  info: `
  <h3>Go</h3>
  <div>Go (Golang) is an open source programming language that makes it easy to build simple, reliable, and efficient software.</div>
  <div>Here, it is compiled to JavaScript using GopherJS.</div>
  <ul>
    <li><a href="https://golang.org/" target="_blank" rel="noopener">Go website</a></li>
    <li><a href="https://golang.org/doc/" target="_blank" rel="noopener">Go documentation</a></li>
    <li><a href="https://github.com/gopherjs/gopherjs" target="_blank" rel="noopener">GopherJS repo</a></li>
    <li><a href="?template=go" target="_parent" data-template="go">Load starter template</a></li>
  </ul>
  `,
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
