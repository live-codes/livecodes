import { LanguageSpecs } from '../models';
import { blobToBase64, getWorkerDataURL, loadScript, stringToValidJson } from '../utils';
import {
  gnuplotCdnBaseUrl,
  graphreCdnUrl,
  hpccJsCdnUrl,
  mermaidCdnUrl,
  nomnomlCdnUrl,
  plotlyCdnUrl,
  svgbobWasmCdnUrl,
  vegaCdnUrl,
  vegaLiteCdnUrl,
  vendorsBaseUrl,
  wavedromCdnUrl,
  waveskinCdnUrl,
} from '../vendors';
import { parserPlugins } from './prettier';

const displaySVG = (el: any, svg: string) => {
  if (el.tagName.toLowerCase() === 'img') {
    el.src = 'data:image/svg+xml;base64,' + btoa(svg);
  } else {
    el.innerHTML = svg;
  }
};

const compileGnuplot = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-gnuplot"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  type InputFiles = Array<{ fileName: string; content: string }>;

  const Gnuplot: any = await loadScript(gnuplotCdnBaseUrl + '/gnuplot_api.js', 'Gnuplot');
  const workerUrl = getWorkerDataURL(gnuplotCdnBaseUrl + '/gnuplot.js');
  const gnuplot = ((window as any).gnuplot = (window as any).gnuplot || new Gnuplot(workerUrl));
  const runCode = (code: string, files: InputFiles) =>
    new Promise(async (resolve) => {
      await Promise.all(
        files.map(
          (file) =>
            new Promise((resolvePut) => {
              gnuplot.putFile(file.fileName, file.content, resolvePut);
            }),
        ),
      );
      gnuplot.run(code, resolve);
    });

  const getImgUrl = (fileName: string) =>
    new Promise<string>((resolve) => {
      gnuplot.getFile(fileName, function (e: { content?: ArrayBuffer }) {
        if (!e?.content) {
          // gnuplot.onError(`Output file "${fileName}" is not found!`);
          resolve('');
          return;
        }
        const ab = new Uint8Array(e.content);
        const blob = new Blob([ab], { type: 'image/svg+xml' });
        blobToBase64(blob).then(resolve);
      });
    });

  await new Promise((resolveDel) => gnuplot.removeFiles(null, resolveDel));

  const inputFiles: InputFiles = [];
  const fileScripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-gnuplot-file"]',
  );
  for (const fileScript of fileScripts) {
    if (!fileScript.dataset.file && !fileScript.src) continue;
    const content = fileScript.src
      ? await fetch(fileScript.src).then((res) => res.text())
      : fileScript.innerHTML;
    const fileName =
      fileScript.dataset.file ||
      fileScript.src?.split('/')[fileScript.src?.split('/').length - 1] ||
      'data.txt';
    inputFiles.push({ fileName, content });
    fileScript.remove();
  }

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    await runCode(content, inputFiles);
    script.remove();
  }

  const elements = temp.querySelectorAll<HTMLImageElement>(`[data-src]`);
  for (const el of elements) {
    const imgUrl = await getImgUrl(el.dataset.src || '');
    if (!imgUrl) continue;
    if (el.tagName.toLowerCase() === 'img') {
      el.src = imgUrl;
    } else {
      el.innerHTML = atob(imgUrl.replace('data:image/svg+xml;base64,', ''));
    }
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileMermaid = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-mermaid"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const mermaid: any = await loadScript(mermaidCdnUrl, 'mermaid');
  mermaid.mermaidAPI.initialize({
    startOnLoad: false,
  });
  let i = 1;
  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;
    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const placeholder = document.createElement('div');
    placeholder.id = 'livecodes-mermaid-chart-' + i;
    temp.appendChild(placeholder);
    const svg = mermaid.mermaidAPI.render(placeholder.id, content.trim());

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      displaySVG(el, svg);
    }
    placeholder.remove();
    script.remove();
    i += 1;
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileGraphviz = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-graphviz"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const hpccWasm: any = await loadScript(hpccJsCdnUrl, '@hpcc-js/wasm');
  const render = (src: string, layout: string) => hpccWasm.graphviz.layout(src, 'svg', layout);

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const layout = script.dataset.layout || 'dot';
    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      const svg = await render(content, layout);
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileVega = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const vegaLiteScripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-vega-lite"]',
  );

  let vega: any;
  if (vegaLiteScripts.length > 0) {
    vega = await loadScript(vegaCdnUrl, 'vega');
    const vegaLite: any = await loadScript(vegaLiteCdnUrl, 'vegaLite');

    for (const vegaLiteScript of vegaLiteScripts) {
      if (!vegaLiteScript.src && !vegaLiteScript.innerHTML.trim()) continue;

      const output = vegaLiteScript.dataset.output;
      if (!output) continue;

      const vegaLiteOptions = {};
      try {
        const content = vegaLiteScript.src
          ? await fetch(vegaLiteScript.src).then((res) => res.json())
          : JSON.parse(stringToValidJson(vegaLiteScript.innerHTML));
        vegaLiteScript.innerHTML = JSON.stringify(vegaLite.compile(content, vegaLiteOptions).spec);
        vegaLiteScript.type = 'application/graph-vega';
        vegaLiteScript.removeAttribute('src');
      } catch {
        vegaLiteScript.remove();
      }
    }
  }

  const scripts = temp.querySelectorAll<HTMLScriptElement>('script[type="application/graph-vega"]');
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  vega = vega || (await loadScript(vegaCdnUrl, 'vega'));
  const render = async (src: any, options: Record<string, any> = {}) => {
    const graphContainer = document.createElement('div');
    const view = new vega.View(vega.parse(src), {
      ...options,
      renderer: 'svg',
      container: graphContainer,
    });
    await view.runAsync();
    const svg = graphContainer.querySelector('svg')?.outerHTML || '';
    graphContainer.remove();
    return svg;
  };

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const options = {};
    try {
      const content = script.src
        ? await fetch(script.src).then((res) => res.json())
        : JSON.parse(stringToValidJson(script.innerHTML));

      const elements = temp.querySelectorAll(`[data-src="${output}"]`);
      for (const el of elements) {
        const svg = await render(content, options);
        displaySVG(el, svg);
      }
    } finally {
      script.remove();
    }
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compilePlotly = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-plotly"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const Plotly: any = await loadScript(plotlyCdnUrl, 'Plotly');
  const render = (src: string) => {
    try {
      const specs = JSON.parse(stringToValidJson(src));
      const graphContainer = document.createElement('div');
      Plotly.newPlot(graphContainer, specs.data, specs.layout, { displayModeBar: false });
      const svg = graphContainer.querySelector('svg')?.outerHTML || '';
      graphContainer.remove();
      return svg;
    } catch {
      // eslint-disable-next-line no-console
      console.error('failed to parse plotly specs.');
      return '';
    }
  };

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      const svg = render(content);
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileSvgBob = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-svgbob"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const { svgbobWasm } = await import(vendorsBaseUrl + 'svgbob-wasm/svgbob-wasm.js');
  const svgbob = await svgbobWasm(svgbobWasmCdnUrl);

  const render = (src: string) => svgbob.convert_string(src);

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      const svg = await render(content);
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileWaveDrom = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-wavedrom"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  await loadScript(waveskinCdnUrl, 'WaveSkin');
  const WaveDrom: any = await loadScript(wavedromCdnUrl, 'WaveDrom');
  const render = (src: string) => {
    try {
      const obj = JSON.parse(stringToValidJson(src));
      const graphContainer = document.createElement('div');
      graphContainer.id = 'graph-id';
      temp.appendChild(graphContainer);
      WaveDrom.RenderWaveForm(graphContainer.id, obj, '');
      const svg = graphContainer.innerHTML || '';
      graphContainer.remove();
      return svg;
    } catch {
      // eslint-disable-next-line no-console
      console.error('failed to parse WaveDrom specs.');
      return '';
    }
  };

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      const svg = render(content);
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileNomnoml = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/graph-nomnoml"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  await loadScript(graphreCdnUrl, 'graphre');
  const nomnoml: any = await loadScript(nomnomlCdnUrl, 'nomnoml');
  const render = (src: string) => nomnoml.renderSvg(src);

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      const svg = await render(content);
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

export const runOutsideWorker = async (code: string) => {
  const result = await compileGnuplot(code)
    .then(compileMermaid)
    .then(compileGraphviz)
    .then(compileVega)
    .then(compilePlotly)
    .then(compileSvgBob)
    .then(compileWaveDrom)
    .then(compileNomnoml);
  return result;
};

export const graph: LanguageSpecs = {
  name: 'graph',
  title: 'Graph',
  parser: {
    name: 'html',
    pluginUrls: [parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code || '',
    runOutsideWorker,
  },
  extensions: ['graph', 'plt'],
  editor: 'markup',
  editorLanguage: 'html',
};
