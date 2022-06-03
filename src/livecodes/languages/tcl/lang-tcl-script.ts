/* eslint-disable no-console */
import { vendorsBaseUrl } from '../../vendors';

declare const requirejs: any;
declare const require: any;

interface Interpreter {
  stdout: (val: string) => void;
  stderr: (val: string) => void;
  Eval: (code: string) => string;
}

const cdnBaselUrl = vendorsBaseUrl + 'wacl/';

livecodes.tcl = livecodes.tcl || {};
livecodes.tcl.run =
  livecodes.tcl.run ||
  ((input: string) =>
    new Promise(async (resolve) => {
      livecodes.tcl.input = input;
      livecodes.tcl.output = null;

      const runCode = async (code: string, input: string, interp: Interpreter) => {
        const originalPrompt = window.prompt;
        window.prompt = () => input;
        let output: string | null = null;
        let error: string | null = null;
        interp.stdout = (val: string) => {
          output = (output ?? '') + val + '\n';
        };
        interp.stderr = (val: string) => {
          error = (error ?? '') + val + '\n';
        };
        const value = interp.Eval(code);
        output = (output ?? '') + value;
        window.prompt = originalPrompt;
        return { output, error };
      };

      let code = '';
      const scripts = document.querySelectorAll('script[type="text/tcl"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));

      const interpreter = await livecodes.tcl.loaded;
      const result = await runCode(code, input, interpreter);

      if (result.error != null) {
        console.error(result.error);
      } else if (result.output != null) {
        console.log(result.output);
      }
      livecodes.tcl.input = input;
      livecodes.tcl.output = result.output;
      livecodes.tcl.error = result.error;
      livecodes.tcl.ready = true;
      resolve(result);
    }));
livecodes.tcl.loaded = new Promise<Interpreter>((resolve) => {
  requirejs.config({ baseUrl: cdnBaselUrl });
  require(['tcl/wacl'], (wacl: any) => {
    wacl.onReady((interp: Interpreter) => {
      resolve(interp);
    });
  });
});
window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  livecodes.tcl.ready = false;
  await livecodes.tcl.run(livecodes.tcl.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
