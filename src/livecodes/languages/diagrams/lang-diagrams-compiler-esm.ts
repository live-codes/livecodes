/* eslint-disable import/no-internal-modules */
/* eslint-disable no-console */
import { decode } from 'js-base64';
import type { Config, CompilerFunction } from '../../models';
import {
  blobToBase64,
  getWorkerDataURL,
  loadScript,
  stringToValidJson,
  getLanguageCustomSettings,
  removeComments,
  runOrContinue,
  toDataUrl,
} from '../../utils/utils';
import {
  cytoscapeSvgUrl,
  cytoscapeUrl,
  elkjsBaseUrl,
  graphreCdnUrl,
  hpccJsCdnUrl,
  mermaidCdnUrl,
  nomnomlCdnUrl,
  pintoraUrl,
  plotlyCdnUrl,
  svgbobWasmCdnUrl,
  vegaCdnUrl,
  vegaLiteCdnUrl,
  vendorsBaseUrl,
  waveDromBaseUrl,
} from '../../vendors';

let useShadowDom = false;

const displaySVG = (el: any, svg: string) => {
  if (el.tagName.toLowerCase() === 'img') {
    el.src = toDataUrl(svg, 'image/svg+xml');
  } else {
    el.innerHTML = svg;
  }
};

const toValidJson = (str: string) => stringToValidJson(removeComments(str));

const compile = async (
  code: string,
  type: string,
  loadFn: () => Promise<void>,
  renderFn: (src: string, script: HTMLScriptElement) => string | Promise<string>,
  shadowDom = false,
): Promise<string> => {
  if (!code) return '';

  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    `script[type="application/diagram-${type}"]`,
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }
  await loadFn();
  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;
    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    let svg = await renderFn(content, script);
    const elements = temp.querySelectorAll(`[data-src="${output}"]`);
    for (const el of elements) {
      if (el.tagName.toLowerCase() !== 'img' && shadowDom) {
        // scope global styles added in SVG
        useShadowDom = true;
        svg = `<svg-container> ${svg} </svg-container>`;
      }
      displaySVG(el, svg);
    }
    script.remove();
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileGnuplot = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-gnuplot"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  type InputFiles = Array<{ fileName: string; content: string }>;

  const gnuplotCdnBaseUrl = vendorsBaseUrl + 'gnuplot';
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
    'script[type="application/diagram-gnuplot-file"]',
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
      el.innerHTML = decode(imgUrl.split(',')[1]);
    }
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileMermaid = async (code: string) => {
  let mermaid: any;
  const load = async () => {
    mermaid = (await import(mermaidCdnUrl)).default;
    mermaid.initialize({
      startOnLoad: false,
    });
  };
  let count = 0;
  const counter = () => count++;
  const render = async (src: string) => {
    const placeholder = document.createElement('div');
    placeholder.id = 'livecodes-mermaid-chart-' + counter();
    document.body.appendChild(placeholder);
    const { svg } = await mermaid.render(placeholder.id, src.trim());
    placeholder.remove();
    return svg;
  };
  return compile(code, 'mermaid', load, render);
};

const compileGraphviz = async (code: string) => {
  let graphviz: any;
  const load = async () => {
    const hpccWasm = await import(hpccJsCdnUrl);
    graphviz = await hpccWasm.Graphviz.load();
  };
  const render = (src: string, script: HTMLScriptElement) => {
    const layout = script.dataset.layout || 'dot';
    return graphviz.layout(src, 'svg', layout);
  };
  return compile(code, 'graphviz', load, render);
};

const compileVega = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const vegaLiteScripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-vega-lite"]',
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
          : JSON.parse(toValidJson(vegaLiteScript.innerHTML));
        vegaLiteScript.innerHTML = JSON.stringify(vegaLite.compile(content, vegaLiteOptions).spec);
        vegaLiteScript.type = 'application/diagram-vega';
        vegaLiteScript.removeAttribute('src');
      } catch {
        vegaLiteScript.remove();
        throw new Error('failed to parse vegaLite specs.');
      }
    }
  }

  const load = async () => {
    vega = vega || (await loadScript(vegaCdnUrl, 'vega'));
  };
  const render = async (src: any, options: Record<string, any> = {}) => {
    const diagramContainer = document.createElement('div');
    try {
      const specs = JSON.parse(toValidJson(src));
      const view = new vega.View(vega.parse(specs), {
        ...options,
        renderer: 'svg',
        container: diagramContainer,
      });
      await view.runAsync();
      return diagramContainer.querySelector('svg')?.outerHTML || '';
    } catch {
      throw new Error('failed to parse vega specs.');
    } finally {
      diagramContainer.remove();
    }
  };

  const result = await compile(temp.innerHTML, 'vega', load, render);
  temp.remove();
  return result;
};

const compilePlotly = async (code: string) => {
  let Plotly: any;
  const load = async () => {
    Plotly = await loadScript(plotlyCdnUrl, 'Plotly');
  };
  const render = (src: string) => {
    const diagramContainer = document.createElement('div');
    try {
      const specs = JSON.parse(toValidJson(src));
      Plotly.newPlot(diagramContainer, specs.data, specs.layout, { displayModeBar: false });
      return diagramContainer.querySelector('svg')?.outerHTML || '';
    } catch {
      throw new Error('failed to parse plotly specs.');
    } finally {
      diagramContainer.remove();
    }
  };
  return compile(code, 'plotly', load, render);
};

const compileSvgBob = async (code: string) => {
  let svgbob: any;
  const load = async () => {
    const { svgbobWasm } = await import(vendorsBaseUrl + 'svgbob-wasm/svgbob-wasm.js');
    svgbob = await svgbobWasm(svgbobWasmCdnUrl);
  };
  const render = (src: string) => svgbob.convert_string(src);
  return compile(code, 'svgbob', load, render, true);
};

const compileWaveDrom = async (code: string) => {
  let WaveDrom: any;
  const load = async () => {
    await loadScript(waveDromBaseUrl + 'skins/default.js', 'WaveSkin');
    WaveDrom = await loadScript(waveDromBaseUrl + 'wavedrom.min.js', 'WaveDrom');
  };
  const render = (src: string) => {
    const diagramContainer = document.createElement('div');
    try {
      const obj = JSON.parse(toValidJson(src));
      diagramContainer.id = 'diagram-id';
      document.body.appendChild(diagramContainer);
      WaveDrom.RenderWaveForm(diagramContainer.id, obj, '');
      const svg = diagramContainer.innerHTML || '';
      return svg;
    } catch {
      throw new Error('failed to parse WaveDrom specs.');
    } finally {
      diagramContainer.remove();
    }
  };
  return compile(code, 'wavedrom', load, render);
};

const compileNomnoml = async (code: string) => {
  let nomnoml: any;
  const load = async () => {
    await loadScript(graphreCdnUrl, 'graphre');
    nomnoml = await loadScript(nomnomlCdnUrl, 'nomnoml');
  };
  const render = (src: string) => nomnoml.renderSvg(src);
  return compile(code, 'nomnoml', load, render);
};

const compileElk = async (code: string) => {
  let elk: any;
  let renderer: any;
  const load = async () => {
    const elkjsUrl = elkjsBaseUrl + 'elk-api.js';
    const elkjsWorkerUrl = elkjsBaseUrl + 'elk-worker.min.js';
    const elksvgUrl = vendorsBaseUrl + 'elkjs-svg/elkjs-svg.js';
    const ELK: any = await loadScript(elkjsUrl, 'ELK');
    const elksvg: any = await loadScript(elksvgUrl, 'elksvg');
    elk = new ELK({ workerUrl: getWorkerDataURL(elkjsWorkerUrl) });
    renderer = new elksvg.Renderer();
  };
  const render = (src: string) => {
    try {
      const specs = JSON.parse(toValidJson(src));
      return elk.layout(specs).then((data: string) => renderer.toSvg(data));
    } catch {
      throw new Error('failed to parse ELK JSON.');
    }
  };
  return compile(code, 'elk', load, render, true);
};

const compileCytoscape = async (code: string) => {
  let cytoscape: any;
  let cytoscapeSvg: any;
  const load = async () => {
    [cytoscape, cytoscapeSvg] = await Promise.all([
      loadScript(cytoscapeUrl, 'cytoscape'),
      loadScript(cytoscapeSvgUrl, 'cytoscapeSvg'),
    ]);
    cytoscape.use(cytoscapeSvg);
  };
  const render = (src: string) => {
    const cyEl = document.createElement('div');
    cyEl.style.display = 'block';
    cyEl.style.visibility = 'none';
    cyEl.style.height = '300px';
    cyEl.style.width = '300px';
    document.body.appendChild(cyEl);
    try {
      const options = {
        ...JSON.parse(toValidJson(removeComments(src))),
        container: cyEl,
      };
      return cytoscape(options).svg({ scale: 1, full: true });
    } catch {
      throw new Error('failed to parse Cytoscape options.');
    } finally {
      cyEl.remove();
    }
  };
  return compile(code, 'cytoscape', load, render);
};

const compilePintora = async (code: string, config: Config) => {
  let pintora: any;
  const load = async () => {
    pintora = await loadScript(pintoraUrl, 'pintora');
  };
  const render = (src: string) => {
    const container = document.createElement('div');
    pintora.default.renderTo(src, {
      container,
      config: {
        ...getLanguageCustomSettings('pintora', config),
      },
    });
    // allow svg to be rendered as image
    const svg = container.firstElementChild;
    svg?.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg?.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    return container.innerHTML;
  };
  return compile(code, 'pintora', load, render);
};

const getShadowDomScript = () =>
  useShadowDom
    ? `
<script>
  class SVGContainer extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'closed'});
      shadowRoot.append(...this.childNodes);
    }
  }
  customElements.define('svg-container', SVGContainer);
</script>
`
    : '';

const run = (fn: (str: string) => Promise<string>) => runOrContinue(fn, console.error);

export const diagramsCompiler: CompilerFunction = async (code: string, { config }) => {
  const result = await Promise.resolve(code)
    .then(run(compileGnuplot))
    .then(run(compileMermaid))
    .then(run(compileGraphviz))
    .then(run(compileVega))
    .then(run(compilePlotly))
    .then(run(compileSvgBob))
    .then(run(compileWaveDrom))
    .then(run(compileNomnoml))
    .then(run(compileElk))
    .then(run(compileCytoscape))
    .then(run((src) => compilePintora(src, config)))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return code;
    });
  return result + getShadowDomScript();
};
