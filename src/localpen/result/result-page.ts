import { hasImports, getCompiler } from '../compiler';
import { resultTemplate } from '../html';
import { cssPresets, getLanguageCompiler } from '../languages';
import { EditorLanguages, Editors, Language, Pen } from '../models';
import { getAbsoluteUrl, isRelativeUrl } from '../utils';

interface Result {
  html: string;
  markup: string;
  style: string;
  script: string;
}
export const createResultPage = async (
  editors: Editors,
  config: Pen,
  compiler: ReturnType<typeof getCompiler>,
  editorLanguages: EditorLanguages,
  forExport = false,
  template: string = resultTemplate,
): Promise<Result> => {
  const absoluteBaseUrl = getAbsoluteUrl(config.baseUrl);

  const getCompiled = (content: string, language: Language) =>
    compiler.compile(content, language, config);

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
  config.stylesheets.forEach((url, index) => {
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.id = '__localpen__external-stylesheet-' + index;
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);
  });
  const style = await getCompiled(editors.style?.getValue(), editorLanguages.style);
  const styleElement = dom.createElement('style');
  styleElement.innerHTML = style;
  dom.head.appendChild(styleElement);

  if (config.cssPreset === 'github-markdown-css') {
    dom.body.classList.add('markdown-body');
  }

  // if export => clean, else => add utils
  if (forExport) {
    dom.body.innerHTML = '';
  } else {
    const utilsScript = dom.createElement('script');
    utilsScript.src = absoluteBaseUrl + 'assets/scripts/utils.js';
    dom.head.appendChild(utilsScript);
  }

  // markup
  const markup = await getCompiled(editors.markup?.getValue(), editorLanguages.markup);
  dom.body.innerHTML += markup;

  // dependencies (styles & scripts)
  [editorLanguages.markup, editorLanguages.style, editorLanguages.script].forEach((language) => {
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

  // script
  const rawScript = editors.script?.getValue();
  const script = await getCompiled(rawScript, editorLanguages.script);
  const scriptElement = dom.createElement('script');
  scriptElement.innerHTML = script;
  dom.body.appendChild(scriptElement);

  // script type
  const scriptType = getLanguageCompiler(editors.script.getLanguage())?.scriptType;
  if (scriptType) {
    scriptElement.type = scriptType;
  } else if (hasImports(script)) {
    scriptElement.type = 'module';
  }

  return {
    html: dom.documentElement.outerHTML,
    markup,
    style,
    script,
  };
};
