declare const wasmoon: any;

addEventListener('load', async () => {
  let code = '';
  const scripts = document.querySelectorAll('script[type="application/lua"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));
  if (!code.trim()) return;
  const factory = new wasmoon.LuaFactory();
  const lua = await factory.createEngine();
  try {
    lua.global.set('window', window);
    await lua.doString(code);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
});
