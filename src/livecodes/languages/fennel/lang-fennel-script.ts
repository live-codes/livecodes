import { vendorsBaseUrl } from '../../vendors';

const PACKAGE_PATH_URL = vendorsBaseUrl + 'fennel/?.lua';
declare const fengari: any;

window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/fennel"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  // based on https://fennel-lang.org/see

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
    get: (index: number) => any;
    has: (index: number) => boolean;
  }

  try {
    const out = fengari.load(fnl.replace('%input%', JSON.stringify(code)))();
    const content: LuaTableJs = out.get(1) || '';
    // const isError: LuaTableJs = out.get(2) || null;

    parent.postMessage({ type: 'compiled', payload: { language: 'fennel', content } }, '*');
    if (content) {
      // run
      fengari.load(content)();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  parent.postMessage({ type: 'loading', payload: false }, '*');
});
