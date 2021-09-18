import { LanguageSpecs } from '../models';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/pyodide/v0.17.0/full/';

export const pyodide: LanguageSpecs = {
  name: 'pyodide',
  title: 'Pyodide',
  longTitle: 'Python (Pyodide)',
  info: `
  <h3>Python</h3>
  <div>Python with the scientific stack, compiled to WebAssembly using Pyodide.</div>
  <div class="description">
    Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy, scikit-learn and many more.
    In addition it’s possible to install pure Python wheels from PyPi.
  </div>
  <ul>
    <li><a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a></li>
    <li><a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a></li>
    <li><a href="https://pyodide.org/" target="_blank" rel="noopener">Pyodide documentation</a></li>
    <li><a href="?template=pyodide" target="_parent" data-template="pyodide">Load starter template</a></li>
  </ul>
  `,
  compiler: {
    factory: () => async (code) => code,
    scripts: [],
    liveReload: true,
    inlineScript: `
if (globalThis.__pyodideLoading === undefined) {
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
    if (globalThis.__pyodideLoading === false) return;
    await loadPyodide({
      indexURL: "${cdnBaselUrl}",
    });
    globalThis.__pyodideLoading = false;
  }
  let pyodideReady = main();
  async function evaluatePython(code) {
    await pyodideReady;
    try {
      await pyodide.runPythonAsync(code);
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
