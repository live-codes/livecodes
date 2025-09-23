import {
  createCSSModulesImportMap,
  createImportMap,
  getImports,
  hasDefaultExport,
  hasImports,
  isModuleScript,
  isScriptImport,
  replaceImports,
} from '../compiler';
import { cssPresets, getLanguageCompiler, getLanguageExtension } from '../languages';
import { reactRuntime } from '../languages/jsx/react-runtime';
import { reactNativeRuntime } from '../languages/react-native/react-native-runtime';
import { rippleRuntime } from '../languages/ripple/ripple-runtime';
import { solidRuntime } from '../languages/solid/solid-runtime';
import { hasCustomJsxRuntime } from '../languages/typescript';
import type { Cache, CompileInfo, Config, EditorId, Language } from '../models';
import { getAppCDN, modulesService } from '../services';
import { testImports } from '../toolspane/test-imports';
import {
  addAttrs,
  escapeScript,
  getAbsoluteUrl,
  isRelativeUrl,
  objectFilter,
  objectMap,
  toDataUrl,
} from '../utils';
import { browserJestUrl, esModuleShimsPath, spacingJsUrl } from '../vendors';

export const createResultPage = async ({
  code,
  config,
  forExport,
  template,
  baseUrl,
  singleFile,
  runTests,
  compileInfo,
}: {
  code: Cache;
  config: Config;
  forExport: boolean;
  template: string;
  baseUrl: string;
  singleFile: boolean;
  runTests: boolean;
  compileInfo: CompileInfo;
}): Promise<string> => {
  const absoluteBaseUrl = getAbsoluteUrl(baseUrl);

  const domParser = new DOMParser();
  const dom = domParser.parseFromString(template, 'text/html');

  // if export => clean, else => add utils
  if (forExport) {
    dom.querySelector('script')?.remove();
    const utilsScript = dom.createElement('script');
    utilsScript.innerHTML = 'window.livecodes = window.livecodes || {};';
    dom.head.appendChild(utilsScript);
  } else {
    const utilsScript = dom.createElement('script');
    utilsScript.src = absoluteBaseUrl + '{{hash:result-utils.js}}';
    utilsScript.dataset.env = 'development';
    dom.head.appendChild(utilsScript);
  }

  const addMetaTag = (name: string, content: string) => {
    const meta = dom.createElement('meta');
    meta.name = name;
    meta.content = content;
    dom.head.appendChild(meta);
  };

  // title
  if (config.title) {
    dom.title = config.title;
    addMetaTag('title', config.title);
  }

  // description
  if (config.description) {
    addMetaTag('description', config.description);
  }

  // html element attributes
  if (config.htmlAttrs) {
    addAttrs(dom.documentElement, config.htmlAttrs);
  }

  // head content
  if (config.head) {
    dom.head.innerHTML += config.head;
  }

  // CSS Preset
  if (config.cssPreset) {
    const presetUrl = cssPresets.find((preset) => preset.id === config.cssPreset)?.url;
    if (presetUrl) {
      const cssPreset = dom.createElement('link');
      cssPreset.rel = 'stylesheet';
      cssPreset.id = '__livecodes__css-preset';
      cssPreset.href = getAbsoluteUrl(presetUrl, absoluteBaseUrl);
      dom.head.appendChild(cssPreset);
    }
  }

  // external stylesheets
  config.stylesheets.forEach((url) => {
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);
  });

  // editor markup
  const markup = code.markup.compiled;
  dom.body.innerHTML += markup;

  // user-defined import map in <script type="importmap">
  type ImportMap = Partial<{ [key in 'imports' | 'scopes']: Record<string, string> }>;
  let userDefinedImportmap: ImportMap = {};
  const importmapScript = dom.querySelector('script[type="importmap"]');
  if (importmapScript) {
    try {
      userDefinedImportmap = JSON.parse(importmapScript.innerHTML.trim());
    } catch {
      // ignore
    }
    importmapScript.remove();
  }

  const configImports = {
    ...config.imports,
    ...config.customSettings.imports,
    ...userDefinedImportmap.imports,
  };

  const markupImports = getImports(code.markup.compiled);
  const scriptImports = getImports(code.script.compiled);

  // imported stylesheets
  const stylesheetImports = [
    ...new Set(
      [...markupImports, ...scriptImports].filter((mod) => {
        const isCss = mod.startsWith('data:text/css') || /\.css(\?|#|$)/i.test(mod);
        const isRelative = mod.startsWith('.');
        return isCss && (Object.keys(configImports).includes(mod) || !isRelative);
      }),
    ),
  ];
  stylesheetImports.forEach((mod) => {
    const url = configImports[mod] || modulesService.getUrl(mod);
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);

    if (Object.keys(configImports).includes(mod)) {
      // map stylesheets in import map to empty script to avoid loading css as js
      configImports[mod] = 'data:text/javascript;charset=UTF-8;base64,';
    }
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

  // cleanup extra scripts added to detect classes for CSS processors
  const extra = dom.querySelectorAll('script[type="script-for-styles"]');
  extra.forEach((el) => el.remove());

  // cleanup custom configurations and scripts
  if (code.script.language === 'blockly') {
    const extra = dom.querySelectorAll(
      'script[type="blockly/script"], script[data-type="blockly/script"], xml[type="blockly/xml"], xml[data-type="blockly/xml"]',
    );
    extra.forEach((el) => el.remove());
  }

  // runtime styles & scripts
  const runtimeDependencies = (['markup', 'style', 'script'] as EditorId[]).map(
    (editorId: EditorId) => ({
      language: code[editorId].language,
      compiled: code[editorId].compiled,
    }),
  );

  const compiledTests = runTests ? code.tests?.compiled || '' : '';

  const scriptCompiler = getLanguageCompiler(code.script.language);

  const scriptImportsInMarkup = markupImports.filter(isScriptImport);
  const scriptImportsInTests =
    runTests && !forExport ? getImports(compiledTests).filter(isScriptImport) : [];
  const importFromScript = Boolean(
    scriptImportsInMarkup.length > 0 ||
      scriptCompiler?.loadAsExternalModule ||
      scriptImportsInTests.length > 0,
  );

  const jsxRuntimes: Partial<Record<Language, string>> = {
    jsx: reactRuntime,
    tsx: reactRuntime,
    react: reactRuntime,
    'react-tsx': reactRuntime,
    'react-native': reactNativeRuntime,
    'react-native-tsx': reactNativeRuntime,
    solid: solidRuntime,
    'solid.tsx': solidRuntime,
    ripple: rippleRuntime,
  };
  const jsxRuntime = jsxRuntimes[code.script.language] || '';
  const reactImport =
    jsxRuntime === reactRuntime || jsxRuntime === reactNativeRuntime
      ? 'import React from "react";\n'
      : '';
  const shouldInsertJsxRuntime =
    Object.keys(jsxRuntimes).includes(code.script.language) &&
    !config.customSettings[code.script.language]?.disableAutoRender &&
    hasDefaultExport(code.script.compiled) &&
    !hasCustomJsxRuntime(code.script.content || '', config) &&
    !importFromScript;
  const hasPreact = scriptImports.find((mod) => mod === 'preact');

  let compilerImports = {};

  for (const { language, compiled } of runtimeDependencies) {
    const compiler = getLanguageCompiler(language);
    if (!compiler) continue;

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
      if (depScriptUrl.includes('-script-esm.')) {
        depScript.type = 'module';
      }
      dom.head.appendChild(depScript);
    });
    if (compiler.inlineScript) {
      if (typeof compiler.inlineScript === 'function') {
        compiler.inlineScript = await compiler.inlineScript({
          baseUrl,
        });
      }
      const inlineScript = dom.createElement('script');
      inlineScript.innerHTML = compiler.inlineScript;
      dom.head.appendChild(inlineScript);
    }
    if (compiler.imports) {
      compilerImports = {
        ...compilerImports,
        ...objectMap(compiler.imports, (url) => getAbsoluteUrl(url, baseUrl)),
      };
    }
  }

  const styleExtension = getLanguageExtension(code.style.language);

  const externalModules = hasPreact
    ? 'preact'
    : jsxRuntime === reactRuntime
      ? 'react,react-dom'
      : [config.markup.language, config.script.language].find((lang) => lang.startsWith('vue'))
        ? 'vue'
        : undefined;

  // import maps
  const userImports =
    config.customSettings.mapImports === false
      ? {}
      : {
          ...(hasImports(code.script.compiled)
            ? createImportMap(code.script.compiled, config, { external: externalModules })
            : {}),
          ...(hasImports(code.markup.compiled)
            ? createImportMap(code.markup.compiled, config, { external: externalModules })
            : {}),
          ...(shouldInsertJsxRuntime ? createImportMap(reactImport + jsxRuntime, config) : {}),
          ...(runTests && !forExport && hasImports(compiledTests)
            ? createImportMap(compiledTests, config, { external: externalModules })
            : {}),
          ...stylesheetImports.reduce(
            (acc, url) => ({
              ...acc,
              [url]: toDataUrl(''),
            }),
            {},
          ),
          ...createCSSModulesImportMap(
            code.script.compiled,
            code.style.compiled,
            compileInfo.cssModules,
            styleExtension,
          ),
          ...createCSSModulesImportMap(
            code.markup.compiled,
            code.style.compiled,
            compileInfo.cssModules,
            styleExtension,
          ),
          ...compileInfo.imports,
        };

  const scriptImportKeys = Array.from(
    new Set(['./script', ...scriptImportsInMarkup, ...scriptImportsInTests]),
  );
  const scriptImport =
    importFromScript || shouldInsertJsxRuntime
      ? scriptImportKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: toDataUrl(
              replaceImports(code.script.compiled, config, {
                importMap: objectFilter(userImports, (_value, key) => key.startsWith('./')),
                external: externalModules,
              }),
            ),
          }),
          {},
        )
      : {};

  // allow config imports to override auto-generated user imports
  // e.g. 'pkg/path/' should override 'pkg/path/mod.mjs'
  Object.keys(userImports)
    .filter((userKey) =>
      Object.keys(configImports).find(
        (configKey) => configKey.endsWith('/') && userKey.startsWith(configKey),
      ),
    )
    .forEach((userKey) => {
      delete userImports[userKey as keyof typeof userImports];
    });

  // avoid duplicate (p)react instances
  const reactImports = (() => {
    if (!externalModules) return {};
    if (hasPreact) {
      const preactUrl = modulesService.getModuleUrl('preact');
      return {
        preact: preactUrl,
        'preact/': preactUrl + '/',
      };
    }
    const reactUrl = modulesService.getModuleUrl('react');
    const reactDomUrl = modulesService.getModuleUrl('react-dom');
    return {
      react: reactUrl,
      'react/': reactUrl + '/',
      'react-dom': reactDomUrl,
      'react-dom/': reactDomUrl + '/',
    };
  })();

  const importMaps = {
    ...userDefinedImportmap, // for "scopes"
    imports: {
      ...userImports,
      ...scriptImport,
      ...reactImports,
      ...compilerImports,
      ...(runTests ? testImports : {}),
      ...configImports,
    },
  };

  if (Object.keys(importMaps).length > 0) {
    const esModuleShims = dom.createElement('script');
    esModuleShims.src = modulesService.getUrl(esModuleShimsPath, getAppCDN());
    esModuleShims.async = true;
    dom.head.appendChild(esModuleShims);

    const importMapsScript = dom.createElement('script');
    importMapsScript.type = 'importmap';
    importMapsScript.innerHTML = JSON.stringify(importMaps, null, 2);
    dom.head.appendChild(importMapsScript);
  }

  // external scripts
  config.scripts.forEach((url) => {
    const externalScript = dom.createElement('script');
    externalScript.src = url;
    dom.head.appendChild(externalScript);
  });

  if (scriptCompiler?.inlineModule) {
    if (typeof scriptCompiler.inlineModule === 'function') {
      scriptCompiler.inlineModule = await scriptCompiler.inlineModule({
        baseUrl,
      });
    }
    const inlineModule = dom.createElement('script');
    inlineModule.innerHTML = scriptCompiler.inlineModule;
    inlineModule.type = 'module';
    dom.head.appendChild(inlineModule);
  }

  if (!importFromScript && !shouldInsertJsxRuntime) {
    // editor script
    const script = code.script.compiled;
    const scriptElement = dom.createElement('script');
    if (singleFile) {
      scriptElement.innerHTML = escapeScript(script);
    } else {
      scriptElement.src = './script.js';
    }
    dom.body.appendChild(scriptElement);

    // script type
    const scriptType = getLanguageCompiler(code.script.language)?.scriptType;
    if (scriptType) {
      scriptElement.type = scriptType;
    } else if (config.customSettings.scriptType != null) {
      // do not add type if scriptType === ''
      if (config.customSettings.scriptType) {
        scriptElement.type = config.customSettings.scriptType;
      }
    } else if (isModuleScript(script)) {
      scriptElement.type = 'module';
    }
  }

  // JSX runtime
  if (shouldInsertJsxRuntime) {
    const jsxRuntimeScript = dom.createElement('script');
    jsxRuntimeScript.type = 'module';
    jsxRuntimeScript.innerHTML = jsxRuntime;
    dom.body.appendChild(jsxRuntimeScript);
  }

  // spacing
  if (config.showSpacing && !forExport) {
    const spacingScript = dom.createElement('script');
    spacingScript.src = spacingJsUrl;
    spacingScript.dataset.env = 'development';
    dom.body.appendChild(spacingScript);
  }

  // tests
  if (runTests && !forExport) {
    const jestScript = dom.createElement('script');
    jestScript.src = browserJestUrl;
    jestScript.dataset.env = 'development';
    dom.body.appendChild(jestScript);

    const testScript = dom.createElement('script');
    testScript.type = 'module';
    testScript.dataset.env = 'development';
    testScript.innerHTML = `
const {afterAll, afterEach, beforeAll, beforeEach, describe, fdescribe, xdescribe, it, test, fit, xtest, xit, expect, jest} = window.browserJest;
${escapeScript(compiledTests)}

window.browserJest.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results: results.testResults }}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `;
    dom.body.appendChild(testScript);
  }

  return '<!DOCTYPE html>\n' + dom.documentElement.outerHTML;
};

export const cleanResultFromDev = (result: string) => {
  const resultDOM = new DOMParser().parseFromString(result, 'text/html');
  const elements = resultDOM.querySelectorAll('[data-env="development"]');
  elements.forEach((el) => {
    el.remove();
  });
  return resultDOM.documentElement.outerHTML;
};
