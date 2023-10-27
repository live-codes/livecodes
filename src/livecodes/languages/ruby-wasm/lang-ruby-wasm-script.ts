/* eslint-disable import/no-internal-modules */
import { rubyWasmBaseUrl } from '../../vendors';

parent.postMessage({ type: 'loading', payload: true }, '*');

livecodes.rubyWasm = livecodes.rubyWasm || { stdlibLoaded: false };

livecodes.rubyWasm.run =
  livecodes.rubyWasm.run ||
  (async () => {
    parent.postMessage({ type: 'loading', payload: true }, '*');
    const init = async (stdlib = false) => {
      if (livecodes.rubyWasm.module && (livecodes.rubyWasm.stdlibLoaded || stdlib === false)) {
        return;
      }
      // eslint-disable-next-line no-console
      console.log('Loading ruby.wasm ...');
      const file = stdlib ? 'ruby+stdlib.wasm' : 'ruby.wasm';
      const response = await fetch(rubyWasmBaseUrl + file);
      const buffer = await response.arrayBuffer();
      livecodes.rubyWasm.module = await WebAssembly.compile(buffer);
      if (stdlib) {
        livecodes.rubyWasm.stdlibLoaded = true;
      }
      // eslint-disable-next-line no-console
      console.log('ruby.wasm loaded.');
    };

    const hasImports = (str: string) => new RegExp(/require\s+(?:"|')(\S+)(?:"|')/gm).test(str);

    let code = '';
    const scripts = document.querySelectorAll('script[type="text/ruby-wasm"]');
    scripts.forEach((script) => (code += script.innerHTML + '\n'));
    await init(hasImports(code));
    const { DefaultRubyVM } = (window as any)['ruby-wasm-wasi'];
    const { vm } = await DefaultRubyVM(livecodes.rubyWasm.module);
    const patch = code.includes('$0') ? '$0 = __FILE__\n' : '';
    vm.eval(patch + code);
    parent.postMessage({ type: 'loading', payload: false }, '*');
  });

addEventListener('load', () => livecodes.rubyWasm.run?.());

parent.postMessage({ type: 'loading', payload: false }, '*');
