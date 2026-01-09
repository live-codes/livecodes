import {
  createImportMap,
  getImports,
  getStyleImports,
  hasImports,
  inlineStyleImports,
  replaceImports,
  resolvePath,
} from '../compiler/import-map';
import { getMainFile } from '../config/utils';
import { getLanguageByAlias, getLanguageCompiler, getLanguageEditorId } from '../languages/utils';
import type { CompileInfo, Config, SourceFile } from '../models';
import { getAppCDN, modulesService } from '../services/modules';
import { testImports } from '../toolspane/test-imports';
import {
  cloneObject,
  escapeScript,
  getAbsoluteUrl,
  isRelativeUrl,
  objectMap,
  toDataUrl,
} from '../utils/utils';
import { browserJestUrl, esModuleShimsPath, spacingJsUrl } from '../vendors';

export const createMultiFileResultPage = async ({
  compiledFiles,
  compiledTests,
  config,
  forExport,
  template,
  baseUrl,
  // singleFileResult,
  runTests,
  compileInfo,
}: {
  compiledFiles: Array<SourceFile & { compiled: string }>;
  compiledTests: string;
  config: Config;
  forExport: boolean;
  template: string;
  baseUrl: string;
  singleFileResult: boolean;
  runTests: boolean;
  compileInfo: CompileInfo;
}): Promise<string> => {
  const absoluteBaseUrl = getAbsoluteUrl(baseUrl);
  compiledFiles = cloneObject(compiledFiles); // avoid mutation
  const mainFile = getMainFile(config);
  const mainFileHTML = compiledFiles.find((f) => f.filename === mainFile)?.compiled || '';

  const domParser = new DOMParser();
  const dom = domParser.parseFromString(mainFileHTML, 'text/html');

  // if export => clean, else => add utils
  if (forExport) {
    const utilsScript = dom.createElement('script');
    utilsScript.innerHTML = 'window.livecodes = window.livecodes || {};';
    dom.head.appendChild(utilsScript);
  } else {
    const templateDomParser = new DOMParser();
    const templateDom = templateDomParser.parseFromString(template, 'text/html');
    const script = templateDom.querySelector('script')!;
    dom.head.appendChild(script.cloneNode(true));

    const utilsScript = dom.createElement('script');
    utilsScript.src = absoluteBaseUrl + '{{hash:result-utils.js}}';
    utilsScript.dataset.env = 'development';
    dom.head.appendChild(utilsScript);
  }

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

  const isCss = (mod: string, compiledLanguage?: string) =>
    mod.startsWith('data:text/css') || /\.css(\?|#|$)/i.test(mod) || compiledLanguage === 'css';

  const fileUrls: Record<string, string> = {};
  const stylesheetImports: Record<string, string> = {};
  let codeImports: Record<string, string> = {};
  const relativeImports: Record<string, string> = {};

  // generate data urls for files
  const getDataUrl = (file: SourceFile & { compiled: string }) => {
    if (file.filename === mainFile) return;
    const content = file.compiled;
    const mimeType = file.filename.endsWith('.json')
      ? 'application/json'
      : file.filename.endsWith('.svg')
        ? 'image/svg+xml'
        : getLanguageEditorId(file.language) === 'markup'
          ? 'text/html'
          : getLanguageEditorId(file.language) === 'style'
            ? 'text/css'
            : getLanguageEditorId(file.language) === 'script'
              ? 'text/javascript'
              : 'text/plain';
    const dataUrl = toDataUrl(content, mimeType);
    fileUrls[file.filename] = dataUrl;
    return dataUrl;
  };

  const externalModules = 'react,react-dom,preact,vue';

  // handle imports
  const stylesImportMap: Record<string, string> = {};
  const getStylesheetWithImports = (file: SourceFile & { compiled: string }): string => {
    // TODO handle directory imports
    // (e.g. import "./styles/a.css"; import "./b.css"; import "../c.css";)
    if (stylesImportMap[file.filename]) return file.compiled;
    const styleImports = getStyleImports(file.compiled).filter((mod) => {
      const resolvedImport = resolvePath(mod, './' + file.filename)?.replace('./', '');
      if (!resolvedImport) return false;
      return !(resolvedImport in stylesImportMap);
    });
    if (styleImports.length > 0) {
      const nextImport = compiledFiles.find(
        (f) => f.filename === styleImports[0].replace('./', ''),
      );
      if (!nextImport) return file.compiled;
      file.compiled = inlineStyleImports(file.compiled, {
        contentMap: { ['./' + nextImport.filename]: getStylesheetWithImports(nextImport) },
      });
      return getStylesheetWithImports(file);
    }
    const dataUrl = fileUrls[file.filename] || getDataUrl(file);
    if (!dataUrl) return 'data:text/css;base64,';
    stylesImportMap[file.filename] = dataUrl;
    return file.compiled;
  };

  compiledFiles.forEach((file) => {
    if (getLanguageEditorId(file.language) === 'style') {
      file.compiled = getStylesheetWithImports(file);
      return;
    }

    codeImports = {
      ...codeImports,
      ...createImportMap(file.compiled, config, { external: externalModules }),
    };

    getImports(file.compiled).forEach((mod) => {
      const resolvedImport = resolvePath(mod, './' + file.filename);
      if (
        !resolvedImport ||
        resolvedImport.replace('./', '~/') in codeImports ||
        resolvedImport in stylesheetImports
      ) {
        return;
      }
      const importedFile = compiledFiles.find(
        (f) =>
          './' + f.filename === resolvedImport ||
          './' + f.filename === resolvedImport + '.js' ||
          './' + f.filename === resolvedImport + '.ts' ||
          './' + f.filename === resolvedImport + '.jsx' ||
          './' + f.filename === resolvedImport + '.tsx',
      );
      if (!importedFile) {
        if (isCss(resolvedImport)) {
          stylesheetImports[resolvedImport] = resolvedImport;
        }
        return;
      }
      const compiledLanguage =
        getLanguageEditorId(importedFile.language) === 'style' ? 'css' : 'javascript';
      if (isCss(resolvedImport, compiledLanguage)) {
        const dataUrl = fileUrls[importedFile.filename] || getDataUrl(importedFile);
        if (!dataUrl) return;
        stylesheetImports[resolvedImport] = dataUrl;
      } else {
        // importmaps cannot override relative imports in data URLs
        relativeImports[resolvedImport] = resolvedImport.replace('./', '~/');
        // mark it with null till all relative imports are collected
        codeImports[resolvedImport.replace('./', '~/')] = null as any;
      }
    });
  });

  if (Object.keys(relativeImports).length > 0) {
    compiledFiles.forEach((file) => {
      file.compiled = replaceImports(file.compiled, config, {
        importMap: relativeImports,
      });
      if (codeImports['~/' + file.filename] === null) {
        const dataUrl = getDataUrl(file);
        if (!dataUrl) return;
        codeImports['~/' + file.filename] = dataUrl;
        fileUrls[file.filename] = dataUrl;
      }
    });
  }

  // imported stylesheets
  Object.keys(stylesheetImports).forEach((mod) => {
    const url = configImports[mod] || modulesService.getUrl(stylesheetImports[mod]);
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);

    if (Object.keys(configImports).includes(mod)) {
      // map stylesheets in import map to empty script to avoid loading css as js
      configImports[mod] = 'data:text/javascript;charset=UTF-8;base64,';
    }
  });

  const getRelativePath = (url: string) => url.replace(location.origin + location.pathname, './');

  // stylesheet files added in markup
  dom.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
    const styleFile = compiledFiles.find(
      (f) => resolvePath(getRelativePath(link.href)) === './' + f.filename,
    );
    if (!styleFile) return;
    const dataUrl = fileUrls[styleFile.filename] || getDataUrl(styleFile);
    if (!dataUrl) return;
    link.href = dataUrl;
  });

  // script added in markup
  dom.querySelectorAll<HTMLScriptElement>('script').forEach((script) => {
    if (script.src) {
      const scriptFile = compiledFiles.find(
        (f) => resolvePath(getRelativePath(script.src), './' + mainFile) === './' + f.filename,
      );
      if (!scriptFile) return;
      const dataUrl = toDataUrl(
        replaceImports(scriptFile.compiled, config, {
          importMap: relativeImports,
        }),
      );
      if (!dataUrl) return;
      script.src = dataUrl;
    } else {
      if (hasImports(script.innerHTML)) {
        script.innerHTML = replaceImports(script.innerHTML, config, {
          importMap: relativeImports,
        });
      }
    }
  });

  // cleanup extra scripts added to detect classes for CSS processors
  const extra = dom.querySelectorAll('script[type="script-for-styles"]');
  extra.forEach((el) => el.remove());

  compiledTests = runTests ? compiledTests || '' : '';

  let compilerImports = {};
  const handledLanguages = new Set<string>();

  for (const { language, compiled } of compiledFiles) {
    const lang = getLanguageByAlias(language);
    const compiler = getLanguageCompiler(lang);
    if (!lang || !compiler || handledLanguages.has(lang)) continue;

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

    if (compiler.inlineModule) {
      if (typeof compiler.inlineModule === 'function') {
        compiler.inlineModule = await compiler.inlineModule({
          baseUrl,
        });
      }
      const inlineModule = dom.createElement('script');
      inlineModule.innerHTML = compiler.inlineModule;
      inlineModule.type = 'module';
      dom.head.appendChild(inlineModule);
    }

    if (compiler.imports) {
      compilerImports = {
        ...compilerImports,
        ...objectMap(compiler.imports, (url) => getAbsoluteUrl(url, baseUrl)),
      };
    }

    handledLanguages.add(lang);
  }

  // import maps
  const userImports =
    config.customSettings.mapImports === false
      ? {}
      : {
          ...codeImports,
          ...(runTests && !forExport && hasImports(compiledTests)
            ? createImportMap(compiledTests, config, { external: externalModules })
            : {}),
          ...Object.keys(stylesheetImports).reduce(
            (acc, url) => ({
              ...acc,
              [url]: toDataUrl(''),
            }),
            {},
          ),
          // ...createCSSModulesImportMap(
          //   code.script.compiled,
          //   code.style.compiled,
          //   compileInfo.cssModules,
          //   styleExtension,
          // ),
          // ...createCSSModulesImportMap(
          //   code.markup.compiled,
          //   code.style.compiled,
          //   compileInfo.cssModules,
          //   styleExtension,
          // ),
          ...compileInfo.imports,
        };

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
    const reactUrl = modulesService.getModuleUrl('react');
    const reactDomUrl = modulesService.getModuleUrl('react-dom');
    const preactUrl = modulesService.getModuleUrl('preact');
    return {
      react: reactUrl,
      'react/': reactUrl + '/',
      'react-dom': reactDomUrl,
      'react-dom/': reactDomUrl + '/',
      preact: preactUrl,
      'preact/': preactUrl + '/',
    };
  })();

  const importMaps = {
    ...userDefinedImportmap, // for "scopes"
    imports: {
      ...userImports,
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
