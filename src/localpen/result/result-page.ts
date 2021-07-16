import { createImportMap, hasImports } from '../compiler';
import { cssPresets, getLanguageCompiler } from '../languages';
import { EditorId, Language, Pen } from '../models';
import { getAbsoluteUrl, isRelativeUrl } from '../utils';

type Code = {
  [key in EditorId]: { language: Language; content: string };
};

export const createResultPage = (
  code: Code,
  config: Pen,
  forExport: boolean,
  template: string,
  baseUrl: string,
  singleFile: boolean,
) => {
  const absoluteBaseUrl = getAbsoluteUrl(baseUrl);

  const domParser = new DOMParser();
  const dom = domParser.parseFromString(template, 'text/html');

  // title
  dom.title = config.title;

  // CSS Preset
  if (config.cssPreset) {
    const presetUrl = cssPresets.find((preset) => preset.id === config.cssPreset)?.url;
    const cssPreset = dom.createElement('link');
    cssPreset.rel = 'stylesheet';
    cssPreset.id = '__localpen__css-preset';
    cssPreset.href = absoluteBaseUrl + presetUrl;
    dom.head.appendChild(cssPreset);
  }

  // external stylesheets
  config.stylesheets.forEach((url) => {
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);
  });

  // editor styles
  if (singleFile) {
    const style = code.style.content;
    const styleElement = dom.createElement('style');
    styleElement.innerHTML = style;
    dom.head.appendChild(styleElement);
  } else {
    const EditorStylesheet = dom.createElement('link');
    EditorStylesheet.rel = 'stylesheet';
    EditorStylesheet.href = './style.css';
    dom.head.appendChild(EditorStylesheet);
  }

  if (config.cssPreset === 'github-markdown-css') {
    dom.body.classList.add('markdown-body');
  }

  // if export => clean, else => add utils
  if (forExport) {
    dom.body.innerHTML = '';
  } else {
    const utilsScript = dom.createElement('script');
    utilsScript.src = absoluteBaseUrl + 'result-utils.js';
    dom.head.appendChild(utilsScript);
  }

  // import maps
  const importMaps = {
    ...(hasImports(code.script.content) ? createImportMap(code.script.content, config) : {}),
    ...(code.markup.language === 'mdx' ? createImportMap(code.markup.content, config) : {}),
  };
  if (Object.keys(importMaps).length > 0) {
    const esModuleShims = dom.createElement('script');
    esModuleShims.src = absoluteBaseUrl + 'vendor/es-module-shims/es-module-shims.min.js';
    esModuleShims.async = true;
    dom.head.appendChild(esModuleShims);

    const importMapsScript = dom.createElement('script');
    importMapsScript.type = 'importmap';
    importMapsScript.innerHTML = `{"imports": ${JSON.stringify(importMaps, null, 2)}}`;
    dom.head.appendChild(importMapsScript);
  }

  // editor markup (MDX is added to the script not page markup)
  const markup = code.markup.language !== 'mdx' ? code.markup.content : '';
  const mdx = code.markup.language === 'mdx' ? code.markup.content : '';
  dom.body.innerHTML += markup;

  // dependencies (styles & scripts)
  [code.markup.language, code.style.language, code.script.language].forEach((language) => {
    const compiler = getLanguageCompiler(language);
    if (!compiler) return;

    compiler.styles?.forEach((depStyleUrl) => {
      const stylesheet = dom.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = isRelativeUrl(depStyleUrl) ? absoluteBaseUrl + depStyleUrl : depStyleUrl;
      dom.head.appendChild(stylesheet);
    });
    compiler.scripts?.forEach((depScriptUrl) => {
      const depScript = dom.createElement('script');
      depScript.src = isRelativeUrl(depScriptUrl) ? absoluteBaseUrl + depScriptUrl : depScriptUrl;
      if (compiler.deferScripts) {
        depScript.defer = true;
      }
      dom.head.appendChild(depScript);
    });
    if (compiler.inlineScript) {
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = compiler.inlineScript;
      dom.head.appendChild(inlineScript);
    }
  });

  // external scripts
  config.scripts.forEach((url) => {
    const externalScript = dom.createElement('script');
    externalScript.src = url;
    dom.head.appendChild(externalScript);
  });

  // editor script
  const script = code.script.content;
  const scriptElement = dom.createElement('script');
  if (singleFile) {
    scriptElement.innerHTML = mdx ? script + '\n' + mdx : script;
  } else {
    scriptElement.src = './script.js';
  }
  dom.body.appendChild(scriptElement);

  // script type
  const scriptType = getLanguageCompiler(code.script.language)?.scriptType;
  if (scriptType) {
    scriptElement.type = scriptType;
  } else if (hasImports(script) || mdx) {
    scriptElement.type = 'module';
  }

  console.log(dom.documentElement.outerHTML);
  return dom.documentElement.outerHTML;
};
