import { importsPattern } from '../compiler';
import { CompilerFunction, LanguageFormatter, LanguageSpecs } from '../models';
import { getAbsoluteUrl, loadScript } from '../utils';
import { requireUrl } from './lang-assemblyscript';

declare const importScripts: (...args: string[]) => void;

const compilerUrl = 'https://cdn.rescript-lang.org/v9.1.2/compiler.js';
const rescriptReactUrl = 'https://cdn.rescript-lang.org/v9.1.2/%40rescript/react/cmij.js';
const stdLibBaseUrl = 'https://cdn.jsdelivr.net/npm/@rescript/std@9.1.3/lib/es6/';

const replaceImports = (code: string, stdLibUrl: string) =>
  code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');
    if (libName.startsWith('./stdlib/')) {
      return statement.replace('./stdlib/', stdLibUrl);
    }
    return statement;
  });

export const runOutsideWorker: CompilerFunction = async (code: string, { language, baseUrl }) =>
  new Promise(async (resolve, reject) => {
    if (!code) return resolve('');

    if (!(window as any).require) {
      await loadScript(requireUrl, 'require');
    }

    (window as any).require([compilerUrl, rescriptReactUrl], () => {
      const compiler = (window as any).rescript_compiler.make();
      compiler.setModuleSystem('es6');
      compiler.setFilename('index.bs.js');

      const output = compiler[language].compile(code);
      try {
        if (output.type === 'success' && output.js_code) {
          return resolve(replaceImports(output.js_code, getAbsoluteUrl(stdLibBaseUrl, baseUrl)));
        }
        if (output.errors) {
          output.errors.forEach((err: any) => {
            // eslint-disable-next-line no-console
            console.error(err.fullMsg);
          });
        } else if (output.msg) {
          // eslint-disable-next-line no-console
          console.warn(output.msg, output.type);
        }
        return reject('');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return reject('');
      }
    });
  });

export const formatterFactory: LanguageFormatter['factory'] = (baseUrl, language) => {
  if (!(self as any).rescript_compiler) {
    importScripts(getAbsoluteUrl(compilerUrl, baseUrl));
  }
  const compiler = (self as any).rescript_compiler.make();
  compiler.setModuleSystem('es6');
  compiler.setFilename('index.bs.js');
  return async (value: string) => {
    let formatted = value;
    try {
      const output = compiler[language].format(value);
      if (output.type === 'success') {
        formatted = output.code;
      }
    } catch {
      //
    }
    return {
      formatted,
      cursorOffset: 0,
    };
  };
};

export const rescript: LanguageSpecs = {
  name: 'rescript',
  title: 'ReScript',
  info: `
  <h3>ReScript</h3>
  <div>ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.</div>
  <ul>
    <li><a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a></li>
    <li><a href="https://rescript-lang.org/docs/react/latest/introduction" target="_blank" rel="noopener">ReScript / React</a></li>
    <li><a href="?template=rescript" target="_parent" data-template="rescript">Load starter template</a></li>
    <!-- <li><a href="#">ReScript usage in LocalPen</a></li> -->
  </ul>
  `,
  formatter: {
    factory: formatterFactory,
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    scriptType: 'module',
  },
  extensions: ['res', 'resi'],
  editor: 'script',
  editorLanguage: 'javascript',
};
