import { importsPattern } from '../compiler';
import { CompilerFunction, LanguageSpecs } from '../models';

const compilerUrl = 'https://cdn.rescript-lang.org/v9.1.2/compiler.js';
const rescriptReactUrl = 'https://cdn.rescript-lang.org/v9.1.2/%40rescript/react/cmij.js';
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

export const runOutsideWorker: CompilerFunction = async (code: string, { language }) => {
  if (!(window as any).rescript_compiler) {
    await Promise.all([loadScript(compilerUrl), loadScript(rescriptReactUrl)]);
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
    if (output.type === 'error' && output.errors) {
      output.errors.forEach((err: any) => {
        log(err.fullMsg);
      });
    } else if (output.type === 'msg' && output.msg) {
      log(output.msg, output.type);
    }
    return '';
  } catch (err) {
    // eslint-disable-next-line no-console
    log(err);
    return '';
  }
};

export const rescript: LanguageSpecs = {
  name: 'rescript',
  title: 'ReScript',
  info: `
  <h3>ReScript</h3>
  <div>Go (Golang) is an open source programming language that makes it easy to build simple, reliable, and efficient software.</div>
  <div>Here, it is compiled to JavaScript using GopherJS.</div>
  <ul>
    <li><a href="https://golang.org/" target="_blank" rel="noopener">Go website</a></li>
    <li><a href="https://golang.org/doc/" target="_blank" rel="noopener">Go documentation</a></li>
    <li><a href="https://github.com/gopherjs/gopherjs" target="_blank" rel="noopener">GopherJS repo</a></li>
    <li><a href="?template=go" target="_parent" data-template="go">Load starter template</a></li>
    <!-- <li><a href="#">Go usage in LocalPen</a></li> -->
  </ul>
  `,
  // formatter: {
  //   factory: () => async (value: string) => {
  //     const url = cdnBaseUrl + '/index.js';
  //     importScripts(url);
  //     return {
  //       formatted: await (window as any).go2js.format(value, cdnBaseUrl),
  //       cursorOffset: 0,
  //     };
  //   },
  // },
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
