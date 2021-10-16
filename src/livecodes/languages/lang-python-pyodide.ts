import { LanguageSpecs } from '../models';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/';

export const pyodide: LanguageSpecs = {
  name: 'pyodide',
  title: 'Pyodide',
  longTitle: 'Python (Pyodide)',
  compiler: {
    factory: () => async (code) => code,
    scripts: [],
    liveReload: true,
    inlineScript: `
window.livecodes = window.livecodes || {};
if (window.livecodes.pyodideLoading === undefined) {
  const script = document.createElement('script');
  script.src = '${cdnBaselUrl}pyodide.js';
  document.head.append(script);
};
window.addEventListener("load", async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  let code = '';
  const scripts = document.querySelectorAll('script[type="text/python"]');
  scripts.forEach(script => code += script.innerHTML + '\\n');
  async function main() {
    if (window.livecodes.pyodideLoading === false) return;
    window.livecodes.pyodide = await loadPyodide({
      indexURL: "${cdnBaselUrl}",
    });
    window.livecodes.pyodideLoading = false;
  }
  const pyodideReady = main();
  async function evaluatePython(code) {
    await pyodideReady;
    try {
      await window.livecodes.pyodide.loadPackagesFromImports(code);
      await window.livecodes.pyodide.runPythonAsync(code);
    } catch (err) {
      console.log(err);
    }
  }
  await evaluatePython(code);
  parent.postMessage({ type: 'loading', payload: false }, '*');
})
`,
    scriptType: 'text/python',
    compiledCodeLanguage: 'python',
  },
  extensions: ['py3'],
  editor: 'script',
  editorLanguage: 'python',
};
