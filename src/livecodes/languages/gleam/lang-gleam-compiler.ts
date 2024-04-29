/* eslint-disable import/no-internal-modules */
// based on https://github.com/gleam-lang/language-tour/blob/main/static/compiler.js

/* eslint-disable max-classes-per-file */
import type { CompilerFunction } from '../../models';
import { gleamBaseUrl } from '../../vendors';
import { getLanguageCustomSettings } from '../utils';
import { type Modules, modules } from './gleam-modules';

(self as any).createGleamCompiler = (): CompilerFunction => {
  const compilerUrl = gleamBaseUrl + 'compiler/v1.1.0/gleam_wasm.js';
  const compiledBaseUrl = gleamBaseUrl + 'build/dev/javascript/';

  let compiler: any;

  async function initGleamCompiler() {
    const wasm = await import(compilerUrl);
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

  const updateModules = async (newModules: Modules) => {
    for (const mod of Object.keys(newModules)) {
      const newModule = newModules[mod];
      const oldModule = { ...modules[mod] };
      modules[mod] = modules[mod] || {};
      if (newModule.src) {
        modules[mod].src = newModule.src;
      }
      if (newModule.srcUrl && newModule.srcUrl !== oldModule?.srcUrl) {
        modules[mod].srcUrl = newModule.srcUrl;
        modules[mod].src = undefined;
      }
      if (newModule.compiledUrl) {
        modules[mod].compiledUrl = newModule.compiledUrl;
      }
    }
    await loadModules(modules);
  };

  const compilerLoaded = Promise.all([initGleamCompiler(), loadModules(modules)]);

  // workaround for the compiler not allowing `@` in external URLs
  // e.g.: @external(javascript, "npm:uuid@9.0.1", "v4")
  const externalPattern =
    /(@external\s{0,20}\(\s{0,20}javascript\s{0,20},\s{0,20}".{0,200}?)(@)(.{0,200}?"\s{0,20},\s{0,20}".{0,200}?"\))/g;
  const placeholder = '______at______';
  const removeAt = (str: string) => {
    if (!str.includes('@')) return str;
    const pattern = new RegExp(externalPattern);
    return str.replace(pattern, `$1${placeholder}$3`);
  };
  const restoreAt = (str: string) => {
    if (!str.includes(placeholder)) return str;
    return str.split(placeholder).join('@');
  };

  const compile: CompilerFunction = async (code, { config }) => {
    if (!code) return '';

    await compilerLoaded;
    const configModules: Modules = getLanguageCustomSettings('gleam', config)?.modules || {};
    await updateModules(configModules);

    const project = compiler.newProject();

    for (const mod of Object.keys(modules)) {
      if (modules[mod].src) {
        project.writeModule(mod, modules[mod].src);
      }
    }
    try {
      project.writeModule('main', removeAt(code));
      project.compilePackage('javascript');
      const js = project.readCompiledJavaScript('main');
      return restoreAt(js).replace(/from\s+"\.\/(.+)"/g, (_: string, mod: string) => {
        if (mod === 'gleam.mjs' || mod === 'prelude.mjs') {
          return `from "${compiledBaseUrl}prelude.mjs"`;
        }
        const modName = mod.replace('.mjs', '');
        if (mod.startsWith('gleam/')) {
          const [_root, path] = modName.split('/');
          const extras = ['javascript', 'json', 'crypto', 'fetch', 'http'];
          const dir = extras.includes(path) ? `gleam_${path}/` : 'gleam_stdlib/';
          return `from "${compiledBaseUrl + dir + mod}"`;
        }
        if (modules[modName]?.compiledUrl) {
          return `from "${modules[modName].compiledUrl}"`;
        }
        return `from "${mod}"`;
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
