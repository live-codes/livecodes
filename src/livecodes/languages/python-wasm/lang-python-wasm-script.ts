/* eslint-disable no-underscore-dangle */
import { pyodideBaseUrl } from '../../vendors';

declare const loadPyodide: any;

if (livecodes.pyodideLoading === undefined) {
  const script = document.createElement('script');
  script.src = `${pyodideBaseUrl}pyodide.js`;
  document.head.append(script);
}
window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/python"]');
  scripts.forEach((script) => (code += script.innerHTML + '\n'));

  async function main() {
    // already loaded
    if (livecodes.pyodideLoading === false) return;
    // still loading
    if (livecodes.pyodideLoading) {
      await livecodes.pyodideLoading;
      return;
    }
    // start loading
    livecodes.pyodideLoading = new Promise<void>(async (resolve) => {
      livecodes.pyodide = await loadPyodide({
        indexURL: pyodideBaseUrl,
      });
      await livecodes.pyodide.loadPackage('micropip');
      livecodes.micropip = livecodes.pyodide.pyimport('micropip');
      livecodes.pyodideLoading = false;
      resolve();
    });
    await livecodes.pyodideLoading;
  }

  async function cleanUp() {
    if (!livecodes.pyodideState) return;
    try {
      // https://pyodide-components.readthedocs.io/en/latest/faster_pyodide_testing.html#clean-up-worker-tests
      // https://github.com/pyodide/pyodide/blob/main/src/py/pyodide/_state.py
      // https://github.com/pyodide/pyodide/pull/1349
      // https://github.com/pyodide/pyodide/issues/703
      livecodes.pyodide.pyodide_py._state.restore_state(livecodes.pyodideState);
    } catch (err) {
      // if restoring state fails, reload pyodide
      livecodes.pyodideLoading = undefined;
      await main();
    }
  }

  async function prepareEnv() {
    await pyodideReady;
    const patchInput = `
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`.trim();
    await livecodes.pyodide.runPythonAsync(patchInput);
  }

  async function loadPackagesInCode(code: string) {
    const packages = [...livecodes.pyodide.pyodide_py.code.find_imports(code)];
    const newPackages = packages.filter((p) => !(p in livecodes.pyodide.loadedPackages));
    for (const p of newPackages) {
      try {
        await livecodes.micropip.install(p);
      } catch (err) {
        //
      }
    }
  }

  async function evaluatePython(code: string) {
    await pyodideReady;
    await cleanUp();
    await prepareEnv();
    await loadPackagesInCode(code);
    try {
      livecodes.pyodideState = livecodes.pyodide.pyodide_py._state.save_state();
      await livecodes.pyodide.runPythonAsync(code);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  const pyodideReady = main();
  await evaluatePython(code);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
