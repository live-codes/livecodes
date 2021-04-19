import { hasImports } from '../compiler';
import { cssPresets, getLanguageCompiler } from '../languages';
import { EditorId, Language, Pen } from '../models';
import { getAbsoluteUrl, isRelativeUrl } from '../utils';

type Code = {
  [key in EditorId]: { language: Language; content: string };
};

export const createResultPage = (code: Code, config: Pen, forExport: boolean, template: string) => {
  const absoluteBaseUrl = getAbsoluteUrl(config.baseUrl);

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
  const style = code.style.content;
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
  scriptElement.innerHTML = mdx ? script + '\n' + mdx : script;
  dom.body.appendChild(scriptElement);

  // script type
  const scriptType = getLanguageCompiler(code.script.language)?.scriptType;
  if (scriptType) {
    scriptElement.type = scriptType;
  } else if (hasImports(script) || mdx) {
    scriptElement.type = 'module';
  }

  return dom.documentElement.outerHTML;
};
