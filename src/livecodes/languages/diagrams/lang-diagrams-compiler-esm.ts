import type { Config, CompilerFunction } from '../../models';
import {
  blobToBase64,
  getWorkerDataURL,
  loadScript,
  stringToValidJson,
  getLanguageCustomSettings,
  removeComments,
} from '../../utils';
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
    el.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  } else {
    el.innerHTML = svg;
  }
};

const toValidJson = (str: string) => stringToValidJson(removeComments(str));

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
    'script[type="application/diagram-mermaid"]',
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
    'script[type="application/diagram-graphviz"]',
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
      }
    }
  }

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-vega"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  vega = vega || (await loadScript(vegaCdnUrl, 'vega'));
  const render = async (src: any, options: Record<string, any> = {}) => {
    const diagramContainer = document.createElement('div');
    const view = new vega.View(vega.parse(src), {
      ...options,
      renderer: 'svg',
      container: diagramContainer,
    });
    await view.runAsync();
    const svg = diagramContainer.querySelector('svg')?.outerHTML || '';
    diagramContainer.remove();
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
        : JSON.parse(toValidJson(script.innerHTML));

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
    'script[type="application/diagram-plotly"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const Plotly: any = await loadScript(plotlyCdnUrl, 'Plotly');
  const render = (src: string) => {
    try {
      const specs = JSON.parse(toValidJson(src));
      const diagramContainer = document.createElement('div');
      Plotly.newPlot(diagramContainer, specs.data, specs.layout, { displayModeBar: false });
      const svg = diagramContainer.querySelector('svg')?.outerHTML || '';
      diagramContainer.remove();
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
    'script[type="application/diagram-svgbob"]',
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
      let svg = await render(content);
      if (el.tagName.toLowerCase() !== 'img') {
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

const compileWaveDrom = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;
  document.body.appendChild(temp);

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-wavedrom"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }
  await loadScript(waveDromBaseUrl + 'skins/default.js', 'WaveSkin');
  const WaveDrom: any = await loadScript(waveDromBaseUrl + 'wavedrom.min.js', 'WaveDrom');
  const render = (src: string) => {
    try {
      const obj = JSON.parse(toValidJson(src));
      const diagramContainer = document.createElement('div');
      diagramContainer.id = 'diagram-id';
      temp.appendChild(diagramContainer);
      WaveDrom.RenderWaveForm(diagramContainer.id, obj, '');
      const svg = diagramContainer.innerHTML || '';
      diagramContainer.remove();
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
    'script[type="application/diagram-nomnoml"]',
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

const compileElk = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-elk"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }
  const elkjsUrl = elkjsBaseUrl + 'elk-api.js';
  const elkjsWorkerUrl = elkjsBaseUrl + 'elk-worker.min.js';
  const elksvgUrl = vendorsBaseUrl + 'elkjs-svg/elkjs-svg.js';
  const ELK: any = await loadScript(elkjsUrl, 'ELK');
  const elksvg: any = await loadScript(elksvgUrl, 'elksvg');
  const elk = new ELK({ workerUrl: getWorkerDataURL(elkjsWorkerUrl) });
  const renderer = new elksvg.Renderer();
  const render = (src: string) =>
    elk.layout(JSON.parse(toValidJson(src))).then((data: string) => renderer.toSvg(data));

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    try {
      const elements = temp.querySelectorAll(`[data-src="${output}"]`);
      for (const el of elements) {
        let svg = await render(content);
        if (el.tagName.toLowerCase() !== 'img') {
          // scope global styles added in SVG
          useShadowDom = true;
          svg = `<svg-container> ${svg} </svg-container>`;
        }
        displaySVG(el, svg);
      }
      script.remove();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Invalid ELK JSON:', content);
      continue;
    }
  }

  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compileCytoscape = async (code: string) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-cytoscape"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const [cytoscape, cytoscapeSvg]: any[] = await Promise.all([
    loadScript(cytoscapeUrl, 'cytoscape'),
    loadScript(cytoscapeSvgUrl, 'cytoscapeSvg'),
  ]);
  cytoscape.use(cytoscapeSvg);

  const render = (src: string) => {
    const cyEl = document.createElement('div');
    cyEl.style.display = 'block';
    cyEl.style.visibility = 'none';
    cyEl.style.height = '300px';
    cyEl.style.width = '300px';
    document.body.appendChild(cyEl);
    const options = {
      ...JSON.parse(toValidJson(removeComments(src))),
      container: cyEl,
    };
    const svg = cytoscape(options).svg({ scale: 1, full: true });
    cyEl.remove();
    return svg;
  };

  for (const script of scripts) {
    if (!script.src && !script.innerHTML.trim()) continue;

    const output = script.dataset.output;
    if (!output) continue;

    const content = script.src
      ? await fetch(script.src).then((res) => res.text())
      : script.innerHTML;

    try {
      const elements = temp.querySelectorAll(`[data-src="${output}"]`);
      for (const el of elements) {
        const svg = render(content);
        displaySVG(el, svg);
      }
      script.remove();
    } catch {
      // eslint-disable-next-line no-console
      console.error('Invalid Cytoscape options:', content);
      continue;
    }
  }
  const result = temp.innerHTML;
  temp.remove();
  return result;
};

const compilePintora = async (code: string, config: Config) => {
  const temp = document.createElement('div');
  temp.innerHTML = code;

  const scripts = temp.querySelectorAll<HTMLScriptElement>(
    'script[type="application/diagram-pintora"]',
  );
  if (scripts.length === 0) {
    temp.remove();
    return code;
  }

  const pintora: any = await loadScript(pintoraUrl, 'pintora');
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

export const diagramsCompiler: CompilerFunction = async (code: string, { config }) => {
  const result = await compileGnuplot(code)
    .then(compileMermaid)
    .then(compileGraphviz)
    .then(compileVega)
    .then(compilePlotly)
    .then(compileSvgBob)
    .then(compileWaveDrom)
    .then(compileNomnoml)
    .then(compileElk)
    .then(compileCytoscape)
    .then((src) => compilePintora(src, config))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      return code;
    });
  return result + getShadowDomScript();
};
