import type { CompilerFunction } from '../../models';
import { elmWasmBaseUrl } from '../../vendors';

interface ElmCompiler {
  compile: (source: string) => Promise<{ js: string; name: string }>;
}

declare const self: {
  importScripts: (...args: string[]) => void;
  ElmWasm: {
    createCompiler: (options: { baseUrl: string }) => Promise<ElmCompiler>;
    /** renders the structured Elm problems as readable text */
    formatError: (error: unknown) => string;
  };
  createElmCompiler: () => CompilerFunction;
};

/**
 * Runs the compiled Elm program in the result page.
 * Elm's output is a classic script that defines the global `Elm`, so the program is
 * initialized here (instead of by the user's code) into a node appended to the page.
 */
const getMountCode = (name: string) => `
;(function () {
  const node =
    document.querySelector('#livecodes-app') ||
    document.body.appendChild(document.createElement('div'));
  try {
    Elm[${JSON.stringify(name)}].init({ node });
  } catch (err) {
    console.error('Failed to initialize Elm:', err);
  }
})();
`;

self.createElmCompiler = (): CompilerFunction => {
  let compiler: Promise<ElmCompiler> | undefined;

  const getCompiler = () => {
    if (!compiler) {
      compiler = (async () => {
        self.importScripts(elmWasmBaseUrl + 'index.umd.js');
        return self.ElmWasm.createCompiler({ baseUrl: elmWasmBaseUrl });
      })();
      // do not keep a failed boot (e.g. a transient network error)
      compiler.catch(() => {
        compiler = undefined;
      });
    }
    return compiler;
  };

  // the compiler (a ~10 MB WASM module plus the Elm package data) is loaded once and kept warm
  getCompiler().catch(() => undefined);

  return async (code) => {
    if (!code.trim()) return '';
    try {
      const { js, name } = await (await getCompiler()).compile(code);
      return `${js.trimEnd()}\n${getMountCode(name)}`;
    } catch (err) {
      throw new Error(self.ElmWasm.formatError(err));
    }
  };
};
