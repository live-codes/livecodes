/* eslint-disable no-underscore-dangle */
import { fontAwesomeUrl, pyodideBaseUrl } from '../../vendors';

declare const loadPyodide: any;

if (livecodes.pyodideLoading === undefined) {
  livecodes.pyodideLoading = new Promise((resolve) => {
    livecodes.resolveLoading = resolve;
  });
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
    if (livecodes.pyodide && livecodes.pyodideLoading) {
      await livecodes.pyodideLoading;
      return;
    }
    // start loading
    livecodes.pyodide = await loadPyodide({ indexURL: pyodideBaseUrl });
    await livecodes.pyodide.loadPackage('micropip');
    livecodes.micropip = livecodes.pyodide.pyimport('micropip');
    livecodes.pyodideLoading = false;
    livecodes.excludedPackages = [];
    livecodes.resolveLoading?.();
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
    // needed for matplotlib icons
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = fontAwesomeUrl;
    document.head.append(stylesheet);

    await pyodideReady;
    const patchInput = `
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`.trim();
    // in Pyodide v0.26.x runPythonAsync does not resolve in the following times
    // use runPython instead
    await livecodes.pyodide.runPythonAsync(patchInput);
  }

  async function loadPackagesInCode(code: string) {
    const pkgMap = {
      sklearn: 'scikit-learn',
    };
    const packages = [...livecodes.pyodide.pyodide_py.code.find_imports(code)];
    const newPackages = packages.filter(
      (p) => !(p in livecodes.pyodide.loadedPackages) && !livecodes.excludedPackages.includes(p),
    );
    for (const p of newPackages) {
      const pkg = (pkgMap as any)[p] ?? p;
      try {
        await livecodes.micropip.install(pkg);
      } catch (err) {
        // in Pyodide v0.26.x this needs to be done,
        // otherwise the following micropip installs do not resolve
        // livecodes.excludedPackages.push(pkg);
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
      // in Pyodide v0.26.x runPythonAsync does not resolve in the following times
      // use runPython instead
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
