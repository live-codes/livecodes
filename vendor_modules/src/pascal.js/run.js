(function () {
  function run(source) {
    function doParse(source) {
      var parser = new parse.Parser(),
        ast = null;
      try {
        ast = parser.parse(source);
        return ast;
      } catch (e) {
        throw e;
      }
    }

    function doIR(ast) {
      var IR_API = new IR(),
        ir = null;
      XHR_PREFIX = 'https://kanaka.github.io/pascal.js/';
      try {
        ir = IR_API.normalizeIR(IR_API.toIR(ast));
        return ir;
      } catch (e) {
        throw e;
      }
    }

    function doCompile(ir) {
      XHR_PREFIX = 'https://kanaka.github.io/pascal.js/llvm.js/';
      var js = '';

      print = function (x) {
        js += x;
      };
      try {
        compile(ir);
        //    if (js && js[0] === 'E') {
        //        throw new Error(js);
        //    }
        return js;
      } catch (e) {
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
    doExecute(js);
  }

  window.addEventListener('load', function () {
    document.querySelectorAll('script[type="text/pascal"]').forEach(function (script) {
      run(script.innerHTML);
    });
  });
})();
