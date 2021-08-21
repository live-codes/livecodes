import { importsPattern } from '../compiler';
import { CompilerFunction, LanguageFormatter, LanguageSpecs } from '../models';

declare const importScripts: (...args: string[]) => void;

const compilerUrl = 'vendor/rescript/v9.1.2/compiler.js';
const rescriptReactUrl = 'vendor/rescript/v9.1.2/cmij.js';
const stdLibBaseUrl = 'https://cdn.jsdelivr.net/npm/@rescript/std@9.1.3/lib/es6/';

const loadScript = (url: string) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve('loaded');
    document.body.appendChild(script);
  });

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

export const runOutsideWorker: CompilerFunction = async (code: string, { language, baseUrl }) => {
  if (!code) return '';

  if (!(window as any).rescript_compiler) {
    await Promise.all([loadScript(baseUrl + compilerUrl), loadScript(baseUrl + rescriptReactUrl)]);
  }
  const compiler = (window as any).rescript_compiler.make();
  compiler.setModuleSystem('es6');
  compiler.setFilename('index.bs.js');

  // eslint-disable-next-line no-console
  const log = (...msg: string[]) => console.warn(...msg);

  const output = compiler[language].compile(code);
  try {
    if (output.type === 'success' && output.js_code) {
      return replaceImports(output.js_code, stdLibBaseUrl);
    }
    if (output.errors) {
      output.errors.forEach((err: any) => {
        log(err.fullMsg);
      });
    } else if (output.msg) {
      log(output.msg, output.type);
    }
    return '';
  } catch (err) {
    // eslint-disable-next-line no-console
    log(err);
    return '';
  }
};

export const formatterFactory: LanguageFormatter['factory'] = (baseUrl, language) => {
  if (!(self as any).rescript_compiler) {
    importScripts(baseUrl + compilerUrl);
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
    url: 'assets/noop.js',
    factory: () => async (code) => code,
    runOutsideWorker,
    umd: true,
    scriptType: 'module',
  },
  extensions: ['res', 'resi'],
  editor: 'script',
  editorLanguage: 'javascript',
};
