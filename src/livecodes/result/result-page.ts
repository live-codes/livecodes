import { createImportMap, hasImports } from '../compiler';
import { cssPresets, getLanguageCompiler } from '../languages';
import { Cache, EditorId, Config } from '../models';
import { getAbsoluteUrl, isRelativeUrl, objectMap } from '../utils';

export const createResultPage = (
  code: Cache,
  config: Config,
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
    cssPreset.id = '__livecodes__css-preset';
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
    const style = code.style.compiled;
    const styleElement = dom.createElement('style');
    styleElement.id = '__livecodes_styles__';
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

  // editor markup (MDX is added to the script not page markup)
  const markup = code.markup.language !== 'mdx' ? code.markup.compiled : '';
  const mdx = code.markup.language === 'mdx' ? code.markup.compiled : '';
  dom.body.innerHTML += markup;

  // runtime styles & scripts
  const runtimeDependencies = (['markup', 'style', 'script'] as EditorId[]).map(
    (editorId: EditorId) => ({
      language: code[editorId].language,
      compiled: code[editorId].compiled,
    }),
  );
  let compilerImports = {};
  runtimeDependencies.forEach(({ language, compiled }) => {
    const compiler = getLanguageCompiler(language);
    if (!compiler) return;

    const compilerStyles =
      typeof compiler.styles === 'function'
        ? compiler.styles({ compiled, baseUrl: absoluteBaseUrl, config })
        : compiler.styles || [];
    compilerStyles.forEach((depStyleUrl) => {
      const stylesheet = dom.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = isRelativeUrl(depStyleUrl) ? absoluteBaseUrl + depStyleUrl : depStyleUrl;
      dom.head.appendChild(stylesheet);
    });
    const compilerScripts =
      typeof compiler.scripts === 'function'
        ? compiler.scripts({ compiled, baseUrl: absoluteBaseUrl, config })
        : compiler.scripts || [];
    compilerScripts.forEach((depScriptUrl) => {
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
    if (compiler.imports) {
      compilerImports = {
        ...compilerImports,
        ...objectMap(compiler.imports, (url) => getAbsoluteUrl(url, baseUrl)),
      };
    }
  });

  // import maps
  const importMaps = {
    ...(hasImports(code.script.compiled) ? createImportMap(code.script.compiled, config) : {}),
    ...(code.markup.language === 'mdx' ? createImportMap(code.markup.compiled, config) : {}),
    ...compilerImports,
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

  // external scripts
  config.scripts.forEach((url) => {
    const externalScript = dom.createElement('script');
    externalScript.src = url;
    dom.head.appendChild(externalScript);
  });

  // editor script
  const script = code.script.compiled;
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

  return '<!DOCTYPE html>\n' + dom.documentElement.outerHTML;
};
