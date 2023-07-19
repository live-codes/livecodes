import type { CompilerFunction } from '../../models';
import { tealUrl } from '../../vendors';

interface LuaTableJs {
  get: (index: number) => any;
  has: (index: number) => boolean;
}

(self as any).createTealCompiler = (): CompilerFunction => {
  // based on https://github.com/teal-language/teal-playground/blob/master/src/components/Playground.vue
  const tl = `
package.path = "${tealUrl}"
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
