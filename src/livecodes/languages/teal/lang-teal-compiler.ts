import type { CompilerFunction } from '../../models';

const commit = 'e907fbe56a70d44b65095e16ae2d1eae61c12066';
const VUE_APP_TL_PACKAGE_PATH_URL = `https://cdn.jsdelivr.net/gh/teal-language/tl@${commit}/tl.lua`;

interface LuaTableJs {
  get: (index: number) => any;
  has: (index: number) => boolean;
}

(self as any).createTealCompiler = (): CompilerFunction => {
  // based on https://github.com/teal-language/teal-playground/blob/master/src/components/Playground.vue
  const tl = `
package.path = "${VUE_APP_TL_PACKAGE_PATH_URL}"
os = {
  getenv = function (var)
    if var == 'TL_PATH' then
      return ''
    end
  end
}
local tl = require('tl')
local env = tl.init_env(false, false, true)
local output, result = tl.gen(%input%, env)
return { output, result.syntax_errors, result.type_errors }
`;

  return async (code) => {
    try {
      const out: LuaTableJs = (self as any).fengari.load(
        tl.replace('%input%', JSON.stringify(code)),
      )();
      const content = out.get(1) || '';
      const syntaxErrors = out.get(2) || null;
      const typeErrors = out.get(3) || null;

      logErrors(syntaxErrors, 'Syntax Error');
      logErrors(typeErrors, 'Type Error');
      return content;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return '';
    }
  };
};

const logErrors = (errors: LuaTableJs, errorType: 'Syntax Error' | 'Type Error') => {
  let i = 1;
  while (errors.has(i)) {
    const err = errors.get(i);
    const y = err.get('y');
    const x = err.get('x');
    const message = err.get('msg');
    const logType = errorType === 'Syntax Error' ? 'error' : 'warn';
    // eslint-disable-next-line no-console
    console[logType](`${errorType} at line ${y}, column: ${x}:`, message);
    i++;
  }
};
