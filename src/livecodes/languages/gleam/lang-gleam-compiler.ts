/* eslint-disable max-classes-per-file */
import type { CompilerFunction } from '../../models';
// eslint-disable-next-line import/no-internal-modules
import { toDataUrl } from '../../utils/utils';

const gleamBaseUrl = 'http://127.0.0.1:8081/public2/';

declare const importScripts: (url: string) => void;
declare const gleamStdLib: Record<string, string>;

(self as any).createGleamCompiler = (): CompilerFunction => {
  let compiler: any;

  async function initGleamCompiler() {
    const wasm = await import(gleamBaseUrl + 'compiler/gleam_wasm.js');
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

  const loadStdLib = async () => {
    const stdlibUrl = gleamBaseUrl + 'stdlib.js';
    const res = await fetch(stdlibUrl);
    if (!res.ok) throw new Error('Failed fetching: ' + stdlibUrl);
    const src = await res.text();
    const modifiedSrc = src.replace('export default', 'self.gleamStdLib =');
    importScripts(toDataUrl(modifiedSrc));
  };
  const compilerLoaded = Promise.all([initGleamCompiler(), loadStdLib()]);

  const compile = async (code: string) => {
    if (!code) return '';
    await compilerLoaded;
    const project = compiler.newProject();

    for (const [name, code] of Object.entries(gleamStdLib)) {
      project.writeModule(name, code);
    }
    try {
      project.writeModule('main', code);
      project.compilePackage('javascript');
      const js = project.readCompiledJavaScript('main');
      return js.replace(/from\s+"\.\/(.+)"/g, `from "${gleamBaseUrl}precompiled/$1"`);
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
