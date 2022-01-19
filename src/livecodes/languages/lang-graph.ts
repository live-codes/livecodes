import { LanguageSpecs } from '../models';
import { blobToBase64, getWorkerDataURL, loadScript, stringToValidJson } from '../utils';
import { vendorsBaseUrl } from '../vendors';
import { parserPlugins } from './prettier';

const cdnBaseUrl = vendorsBaseUrl + 'gnuplot';
const mermaidCdnUrl = 'https://cdn.jsdelivr.net/npm/mermaid@8.13.8/dist/mermaid.min.js';
const hpccJsCdnUrl = 'https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/index.min.js';
const vegaCdnUrl = 'https://cdn.jsdelivr.net/npm/vega@5.21.0/build/vega.min.js';
const vegaLiteCdnUrl = 'https://cdn.jsdelivr.net/npm/vega-lite@5.2.0/build/vega-lite.min.js';
const plotlyCdnUrl = 'https://cdn.jsdelivr.net/npm/plotly.js@2.8.3/dist/plotly.min.js';
const waveskinCdnUrl = 'https://cdn.jsdelivr.net/npm/wavedrom@2.9.0/skins/default.js';
const wavedromCdnUrl = 'https://cdn.jsdelivr.net/npm/wavedrom@2.9.0/wavedrom.min.js';

const displaySVG = (el: any, svg: string) => {
  if (el.tagName.toLowerCase() === 'img') {
    el.src = 'data:image/svg+xml;base64,' + btoa(svg);
  } else {
    el.innerHTML = svg;
  }
};

export const compileGnuplot = async (code: string) => {
  const scriptPattern = /<script\s+type="application\/graph-gnuplot"[^>]*>([\s\S]*?)<\/script>/g;
  const inputFilePattern = /<script\s+type="application\/graph-gnuplot-file"[^>]*>([\s\S]*?)<\/script>/g;
  const inputFileNamePattern = /<script[^>]+data-file="([\s\S]*?)"/g;
  const srcPattern = /<script[^>]+src="([\s\S]*?)"/g;
  const imgPattern = /<[^>]+data-src="([\s\S]*?)"/g;

  const scriptPromises: Array<Promise<string>> = [];
  const result = code.replace(new RegExp(scriptPattern), (match, content) => {
    const fileUrl = [...match.matchAll(new RegExp(srcPattern))]?.[0]?.[1];
    if (fileUrl) {
      scriptPromises.push(fetch(fileUrl).then((res) => res.text()));
    } else {
      scriptPromises.push(Promise.resolve(content));
    }
    return '';
  });
  const scripts = await Promise.all(scriptPromises);

  if (scripts.length === 0) return code;

  if (!(self as any).Gnuplot) {
    (self as any).importScripts(cdnBaseUrl + '/gnuplot_api.js');
  }
  const workerUrl = getWorkerDataURL(cdnBaseUrl + '/gnuplot.js');
  (self as any).gnuplot = (self as any).gnuplot || new (self as any).Gnuplot(workerUrl);

  await new Promise((resolveDel) => (self as any).gnuplot.removeFiles(null, resolveDel));
  const runCode = (code: string, files: Array<{ fileName: string; content: string }>) =>
    new Promise(async (resolve) => {
      await Promise.all(
        files.map(
          (file) =>
            new Promise((resolvePut) => {
              (self as any).gnuplot.putFile(file.fileName, file.content, resolvePut);
            }),
        ),
      );
      (self as any).gnuplot.run(code, resolve);
    });

  const getImgUrl = (fileName: string) =>
    new Promise<string>((resolve) => {
      (self as any).gnuplot.getFile(fileName, function (e: { content?: ArrayBuffer }) {
        if (!e?.content) {
          // (self as any).gnuplot.onError(`Output file "${fileName}" is not found!`);
          resolve('');
          return;
        }
        const ab = new Uint8Array(e.content);
        const blob = new Blob([ab], { type: 'image/svg+xml' });
        blobToBase64(blob).then(resolve);
      });
    });

  const inputFiles = await Promise.all(
    [...result.matchAll(new RegExp(inputFilePattern))].map(async (arr) => {
      const fileUrl = [...arr[0].matchAll(new RegExp(srcPattern))]?.[0]?.[1];
      const fileName =
        [...arr[0].matchAll(new RegExp(inputFileNamePattern))]?.[0]?.[1] ||
        fileUrl?.split('/')[fileUrl?.split('/').length - 1] ||
        'data.txt';
      const content = fileUrl ? await fetch(fileUrl).then((res) => res.text()) : arr[1] ?? '';
      return { fileName, content };
    }),
  );

  for (const script of scripts) {
    await runCode(script, inputFiles);
  }

  const imgFileNames = [...result.matchAll(new RegExp(imgPattern))].map((arr) => arr[1]);
  const dataUrls = (await Promise.all(imgFileNames.map(getImgUrl))).reduce(
    (acc, url, index) => ({ ...acc, [imgFileNames[index]]: url }),
    {},
  );

  return `${result}

<script type="data-urls">
${JSON.stringify(dataUrls)}
</script>
`;
};

export const PostprocessGnuplot = async (code: string) => {
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(code, 'text/html');

  const dataUrlsScript = dom.querySelector('script[type="data-urls"]');
  let dataUrls: Record<string, string> = {};
  try {
    dataUrls = JSON.parse(dataUrlsScript?.innerHTML || '{}');

    dom.querySelectorAll('[data-src]').forEach((el: any) => {
      const url = dataUrls[el.dataset.src];
      if (!url) return;
      if (el.tagName.toLowerCase() === 'img') {
        el.src = url;
      } else {
        el.innerHTML = atob(url.replace('data:image/svg+xml;base64,', ''));
      }
    });
  } finally {
    dataUrlsScript?.remove();
    dom
      .querySelectorAll('script[type="application/graph-gnuplot-file"]')
      .forEach((inputFile) => inputFile.remove());
  }
  return dom.documentElement.innerHTML;
};

const compileMermaid = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

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
      // console.log(svg);
    }
    placeholder.remove();
    script.remove();
    i += 1;
  }
  const result = temp.innerHTML;
  // temp.remove();
  return result;
};

export const compileGraphviz = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

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

export const compileVega = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

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

export const compilePlotly = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  // document.body.appendChild(temp);

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

export const compileWaveDrom = async (code: string) => {
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
  const result = await PostprocessGnuplot(code)
    .then(compileMermaid)
    .then(compileGraphviz)
    .then(compileVega)
    .then(compilePlotly)
    .then(compileWaveDrom);
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
    factory: () => async (code) => {
      if (!code) return '';
      const output = await compileGnuplot(code);
      return output;
    },
    runOutsideWorker,
  },
  extensions: ['graph', 'plt'],
  editor: 'markup',
  editorLanguage: 'html',
};
