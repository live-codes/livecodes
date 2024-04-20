/* eslint-disable max-classes-per-file */
import type { CompilerFunction } from '../../models';

(self as any).createGleamCompiler = (): CompilerFunction => {
  const gleamBaseUrl = 'http://127.0.0.1:8081/';
  const srcBaseUrl = gleamBaseUrl + 'build/packages/';
  const compiledBaseUrl = gleamBaseUrl + 'build/dev/javascript/';

  let compiler: any;

  interface Modules {
    [key: string]: {
      srcUrl?: string;
      src?: string;
      compiledUrl?: string;
    };
  }

  const modules: Modules = {
    'gleam/bit_array': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bit_array.gleam' },
    'gleam/bool': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bool.gleam' },
    'gleam/bytes_builder': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bytes_builder.gleam' },
    'gleam/dict': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/dict.gleam' },
    'gleam/dynamic': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/dynamic.gleam' },
    'gleam/float': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/float.gleam' },
    'gleam/function': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/function.gleam' },
    'gleam/int': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/int.gleam' },
    'gleam/io': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/io.gleam' },
    'gleam/iterator': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/iterator.gleam' },
    'gleam/list': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/list.gleam' },
    'gleam/option': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/option.gleam' },
    'gleam/order': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/order.gleam' },
    'gleam/pair': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/pair.gleam' },
    'gleam/queue': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/queue.gleam' },
    'gleam/regex': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/regex.gleam' },
    'gleam/result': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/result.gleam' },
    'gleam/set': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/set.gleam' },
    'gleam/string': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/string.gleam' },
    'gleam/string_builder': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/string_builder.gleam' },
    'gleam/uri': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/uri.gleam' },
    'gleam/javascript': { srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript.gleam' },
    'gleam/javascript/array': {
      srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/array.gleam',
    },
    'gleam/javascript/map': {
      srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/map.gleam',
    },
    'gleam/javascript/promise': {
      srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/promise.gleam',
    },
    'hatem/mod/hello': {
      src: `
      @external(javascript, "./hatem/mod/hello.mjs", "hi")
      pub fn hi(str: String) -> String
      `,
      compiledUrl:
        'data:text/javascript;charset=UTF-8;base64,ZXhwb3J0IGNvbnN0IGhpID0gKHN0cikgPT4gJ2hpICcgKyBzdHI=',
    },
  };

  async function initGleamCompiler() {
    const wasm = await import(gleamBaseUrl + 'wasm-compiler/gleam_wasm.js');
    await wasm.default();
    wasm.initialise_panic_hook(false);
    if (!compiler) {
      compiler = new Compiler(wasm);
    }
    return compiler;
  }

  class Compiler {
    #wasm: any;
    #nextId = 0;
    #projects = new Map();

    public constructor(wasm: any) {
      this.#wasm = wasm;
    }

    public get wasm() {
      return this.#wasm;
    }

    public newProject() {
      const id = this.#nextId++;
      const project = new Project(id);
      this.#projects.set(id, new WeakRef(project));
      return project;
    }

    public garbageCollectProjects() {
      const gone = [];
      for (const [id, project] of this.#projects) {
        if (!project.deref()) gone.push(id);
      }
      for (const id of gone) {
        this.#projects.delete(id);
        this.#wasm.delete_project(id);
      }
    }
  }

  class Project {
    #id;

    public constructor(id: number) {
      this.#id = id;
    }

    public get projectId() {
      return this.#id;
    }

    public writeModule(moduleName: string, code: string) {
      compiler.wasm.write_module(this.#id, moduleName, code);
    }

    public compilePackage(target: string) {
      compiler.garbageCollectProjects();
      compiler.wasm.reset_warnings(this.#id);
      compiler.wasm.compile_package(this.#id, target);
    }

    public readCompiledJavaScript(moduleName: string) {
      return compiler.wasm.read_compiled_javascript(this.#id, moduleName);
    }

    public readCompiledErlang(moduleName: string) {
      return compiler.wasm.read_compiled_erlang(this.#id, moduleName);
    }

    public resetFilesystem() {
      compiler.wasm.reset_filesystem(this.#id);
    }

    public delete() {
      compiler.wasm.delete_project(this.#id);
    }

    public takeWarnings() {
      const warnings = [];
      while (true) {
        const warning = compiler.wasm.pop_warning(this.#id);
        if (!warning) return warnings;
        warnings.push(warning.trimStart());
      }
    }
  }

  const loadModules = async (mods: Modules) => {
    await Promise.all(
      Object.keys(mods)
        .filter((mod) => mods[mod].srcUrl && !mods[mod].src)
        .map(async (mod) => {
          const { srcUrl } = mods[mod];
          if (!srcUrl) return;
          const res = await fetch(srcUrl);
          if (!res.ok) {
            // eslint-disable-next-line no-console
            console.error('Failed fetching: ' + srcUrl);
            return;
          }
          const src = await res.text();
          mods[mod].src = src;
        }),
    );
  };
  const compilerLoaded = Promise.all([initGleamCompiler(), loadModules(modules)]);

  const compile = async (code: string) => {
    if (!code) return '';
    await compilerLoaded;
    const project = compiler.newProject();

    for (const mod of Object.keys(modules)) {
      if (modules[mod].src) {
        project.writeModule(mod, modules[mod].src);
      }
    }
    try {
      project.writeModule('main', code);
      project.compilePackage('javascript');
      const js = project.readCompiledJavaScript('main');
      return js.replace(/from\s+"\.\/(.+)"/g, (_: string, mod: string) => {
        if (mod.startsWith('gleam/')) {
          const dir = mod.startsWith('gleam/javascript') ? 'gleam_javascript/' : 'gleam_stdlib/';
          return `from "${compiledBaseUrl + dir + mod}"`;
        }
        const modName = mod.replace('.mjs', '');
        if (modules[modName]?.compiledUrl) {
          return `from "${modules[modName].compiledUrl}"`;
        }
        return `from "${modName}"`;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
      return '';
    } finally {
      project.delete();
    }
  };

  return compile;
};
