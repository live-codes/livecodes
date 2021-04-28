function init(baseUrl) {
  self.localpenBaseUrl = baseUrl;
  self.XHR_PREFIX = baseUrl + 'vendor/pascal.js/llvm.js/';

  const path = baseUrl + 'vendor/pascal.js/';
  importScripts(
    path + 'parse.js',
    path + 'ieee754.js',
    path + 'ir.js',
    path + 'fixes.js',
    path + 'llvm.js/compiler.js',
  );
  XHR_PREFIX = '';
}

function compileToJs(source) {
  function doParse(source) {
    var parser = new parse.Parser();
    var ast = null;
    try {
      ast = parser.parse(source);
      return ast;
    } catch (e) {
      throw e;
    }
  }

  function doIR(ast) {
    var IR_API = new IR();
    var ir = null;
    XHR_PREFIX = localpenBaseUrl + 'vendor/pascal.js/';
    try {
      ir = IR_API.normalizeIR(IR_API.toIR(ast));
      XHR_PREFIX = '';
      return ir;
    } catch (e) {
      XHR_PREFIX = '';
      throw e;
    }
  }

  function doCompile(ir) {
    XHR_PREFIX = localpenBaseUrl + 'vendor/pascal.js/llvm.js/';
    var js = '';

    print = function (x) {
      js += x;
    };
    try {
      compile(ir);
      //    if (js && js[0] === 'E') {
      //        throw new Error(js);
      //    }
      XHR_PREFIX = '';
      return js;
    } catch (e) {
      XHR_PREFIX = '';
      throw e;
    }
  }

  function doExecute(js) {
    XHR_PREFIX = '';
    Module.print = print = console.log;
    try {
      eval(js);
    } catch (e) {
      throw e;
    }
  }

  const ast = doParse(source);
  const ir = doIR(ast);
  const js = doCompile(ir);
  return js;
}

self.Pascal = { init, compile: compileToJs };
