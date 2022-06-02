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
    if (livecodes.pyodideLoading === false) return;
    livecodes.pyodide = await loadPyodide({
      indexURL: pyodideBaseUrl,
    });
    livecodes.pyodideLoading = false;
  }
  const pyodideReady = main();
  async function evaluatePython(code: string) {
    await pyodideReady;
    try {
      await livecodes.pyodide.loadPackagesFromImports(code);
      await livecodes.pyodide.runPythonAsync(code);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
  await evaluatePython(code);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
