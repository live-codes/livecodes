// based on https://github.com/zamfofex/v-wasm (license — zero‐clause BSD (0BSD))

/* eslint-disable no-console */
import { CompilerFunction } from '../../models';
import { tarjsUrl, vwasmBaseUrl } from '../../vendors';

declare const importScripts: (...args: string[]) => void;

importScripts(vwasmBaseUrl + 'v-wasm.js', tarjsUrl);

const VCompiler = new Promise<(code: string) => Promise<string>>(async (resolve) => {
  const { WASI, bindings, WasmFs, path, fsn, lowerI64Imports, wasmTransformerInit } = (self as any)
    .vwasm;
  const { TarReader } = (self as any).tarball;

  const createProxy = () =>
    new Proxy(
      {},
      {
        get: (object: any, key) => {
          if (typeof key === 'symbol' || key in object) return object[key];
          return (...args: any[]) => {
            throw new Error(`${key} was called as a (${args.join(', ')})`);
          };
        },
      },
    );

  (self as any).process = {
    ...(self as any).vwasm.process,
    stdout: {
      write: console.log,
    },
    stderr: {
      write: console.error,
    },
  };

  fsn.constants = {};

  await wasmTransformerInit(
    'https://unpkg.com/@wasmer/wasm-transformer@0.11.2/lib/wasm-pack/web/wasm_transformer_bg.wasm',
  );

  const module = await WebAssembly.compile(
    await lowerI64Imports(
      new Uint8Array(await (await fetch(vwasmBaseUrl + 'v.wasm')).arrayBuffer()),
    ),
  );

  const { fs } = new WasmFs();
  fs.writeFileSync('/v', 'v');
  fs.mkdirSync('/proc/self', { recursive: true });
  fs.symlinkSync('/v', '/proc/self/exe');

  path.win32 = path;
  Object.assign(fsn, fs);

  const vlib = await (await fetch(vwasmBaseUrl + 'vlib.tar')).blob();
  const tar = new TarReader();
  const files = await tar.readFile(vlib);
  for (const file of files) {
    try {
      if (file.name.endsWith('/')) {
        fs.mkdirSync('/' + file.name, { recursive: true });
      } else {
        fs.writeFileSync(
          '/' + file.name,
          new Uint8Array(await tar.getFileBlob(file.name, 'text/plain').arrayBuffer()),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const compile = async (code: string): Promise<string> => {
    let success = true;

    const wasi = new WASI({
      args: ['v', '-b', 'js', '-nocolor', 'main.v'],
      bindings: {
        ...bindings,
        fs,
        path,
        hrtime: () => 0,
        exit: (status: number) => status && (success = false),
      },
      preopens: { '/': '/', '.': '/' },
    });

    fs.writeFileSync('/main.js', '');
    fs.writeFileSync('/main.v', code);

    const instance = await WebAssembly.instantiate(module, {
      ...wasi.getImports(module),
      env: createProxy(),
    });
    // const {
    //   exports: { memory },
    // } = instance;

    try {
      wasi.start(instance);
    } catch (error) {
      success = false;
    }

    if (success) {
      try {
        const js = fs.readFileSync('main.js', 'utf-8');
        return js;
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(fs.readFileSync(2, 'utf-8'));
    }
    return '';
  };
  resolve(compile);
});

(self as any).createVCompiler = (): CompilerFunction => async (code, _options) => {
  const compile = await VCompiler;
  return compile(code);
};
