import type { CompilerFunction } from '../../models';
import { vendorsBaseUrl } from '../../vendors';

const PACKAGE_PATH_URL = vendorsBaseUrl + 'fennel/?.lua';

(self as any).createFennelCompiler = (): CompilerFunction => {
  // based on https://fennel-lang.org/see-worker.lua
  const fnl = `
package.path = "${PACKAGE_PATH_URL}"
package.loaded.ffi = {typeof=function() end}
os = {getenv=function() end}
io = {open=function() end}
bit = {band = function(a,b) return a & b end,
       rshift=function(a,b) return a >> b end}
unpack = table.unpack

local fennel = require("fennel")
local compiler = fennel.compileString
local ok, result = pcall(compiler, %input%)
local error = not ok
return {result, error}
`;

  interface LuaTableJs {
    get: (index: number) => string;
    has: (index: number) => boolean;
  }

  return async (code) => {
    try {
      const out: LuaTableJs = (self as any).fengari.load(
        fnl.replace('%input%', JSON.stringify(code)),
      )();
      const content = out.get(1) || '';
      const isError = out.get(2) || null;

      if (isError) {
        // eslint-disable-next-line no-console
        console.error('Fennel compile error');
        return '';
      }
      return content;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return '';
    }
  };
};
