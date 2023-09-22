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
      livecodes.pyodideLoading = true;
      await main();
    }
  }
  async function main() {
    if (livecodes.pyodideLoading === false) return;
    livecodes.pyodide = await loadPyodide({
      indexURL: pyodideBaseUrl,
    });
    livecodes.pyodideLoading = false;
  }
  const pyodideReady = main();
  async function evaluatePython(code: string) {
    await pyodideReady;
    await cleanUp();
    try {
      livecodes.pyodideState = livecodes.pyodide.pyodide_py._state.save_state();
      await livecodes.pyodide.loadPackagesFromImports(code);
      await livecodes.pyodide.runPythonAsync(code);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  await evaluatePython(code);
  parent.postMessage({ type: 'loading', payload: false }, '*');

  // clean up
});
