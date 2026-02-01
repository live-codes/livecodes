import {
  createImportMap,
  getImports,
  getStyleImports,
  hasImports,
  replaceImports,
  replaceStyleImports,
  resolvePath,
} from '../compiler/import-map';
import { getMainFile } from '../config/utils';
import {
  getFileLanguage,
  getLanguageByAlias,
  getLanguageCompiler,
  getLanguageEditorId,
  mapLanguage,
} from '../languages/utils';
import type { CompileInfo, Config, SourceFile } from '../models';
import { getAppCDN, modulesService } from '../services/modules';
import { testImports } from '../toolspane/test-imports';
import {
  cloneObject,
  escapeCode,
  escapeScript,
  getAbsoluteUrl,
  getRandomString,
  isRelativeUrl,
  objectMap,
  toCamelCase,
  toDataUrl,
} from '../utils/utils';
import { browserJestUrl, esModuleShimsPath, spacingJsUrl } from '../vendors';

let lastInput = '';
let lastOutput = '';

export const createMultiFileResultPage = async ({
  compiledFiles,
  compiledTests,
  config,
  forExport,
  template,
  baseUrl,
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
  const input = JSON.stringify({
    compiledFiles,
    compiledTests,
    config,
    forExport,
    template,
    baseUrl,
    runTests,
    compileInfo,
  });
  if (input === lastInput && lastOutput) return lastOutput;
  lastInput = input;

  const absoluteBaseUrl = getAbsoluteUrl(baseUrl);
  const testsFilename = `tests.${getRandomString()}.js`;
  // avoid mutation
  compiledFiles = cloneObject(
    [
      ...compiledFiles,
      runTests
        ? {
            filename: testsFilename,
            content: config.tests?.content || '',
            compiled: compiledTests,
            language: 'js',
          }
        : null,
    ].filter((x) => x != null),
  );

  const publicFiles = compiledFiles
    .filter(
      (f) =>
        f.filename.startsWith('public/') &&
        !compiledFiles.find((ff) => ff.filename === f.filename.replace('public/', '')),
    )
    .map((f) => ({ ...f, filename: f.filename.replace('public/', '') }));
  compiledFiles.push(...publicFiles);

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

  const isImage = (mod: string) =>
    mod.startsWith('data:image') ||
    /\.(svg|jpg|jpeg|png|gif|ico|webp|avif|apng|bmp|tiff)(\?|#|$)/i.test(mod);

  const fileUrls: Record<string, string> = {};
  const stylesheetImports: Record<string, string> = {};
  const imageImports: Record<string, string> = {};
  let codeImports: Record<string, string> = {};
  const relativeImports: Record<string, string> = {};

  // generate data urls for files
  const getDataUrl = (file: SourceFile & { compiled: string }, saveToFileUrls = true) => {
    if (file.filename === mainFile) return;
    const content = file.compiled;
    if (content.startsWith('data:')) return content;
    const mimeType =
      mapLanguage(file.language) === 'json'
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
    if (saveToFileUrls) {
      fileUrls[file.filename] = dataUrl;
    }
    return dataUrl;
  };

  const externalModules = 'react,react-dom,preact,vue,ripple';

  // handle imports

  // CSS imports are recursively inlined with data URLs
  // (e.g. @import "./css/styles.css"; => @import "data:text/css;base64,...")
  const stylesImportMap: Record<string, string | null> = {};
  const getStylesheetWithImports = (file: SourceFile & { compiled: string }): string => {
    if (stylesImportMap[file.filename]) return file.compiled;
    const styleImports = getStyleImports(file.compiled)
      .map((url) => ({ url, resolved: resolvePath(url, './' + file.filename)?.replace('./', '') }))
      .filter(
        (resolvedImport) =>
          resolvedImport.resolved != null &&
          !resolvedImport.url.startsWith('data:') &&
          !(resolvedImport.resolved! in stylesImportMap) &&
          compiledFiles.find((f) => f.filename === resolvedImport.resolved),
      );
    if (styleImports.length > 0) {
      const styleImport = styleImports[0];
      const nextImport = compiledFiles.find((f) => f.filename === styleImport.resolved);
      if (!nextImport) return file.compiled; // we should not get here
      getStylesheetWithImports(nextImport);
      // by then nextImport.filename should be in stylesImportMap
      const nextImportDataUrl = stylesImportMap[nextImport.filename];
      if (!nextImportDataUrl) return file.compiled;
      file.compiled = replaceStyleImports(file.compiled, {
        stylesImportMap: { [styleImport.url]: nextImportDataUrl },
      });
      return getStylesheetWithImports(file);
    }
    const dataUrl = fileUrls[file.filename] || getDataUrl(file);
    if (!dataUrl) return 'data:text/css;base64,';
    stylesImportMap[file.filename] = dataUrl;
    return file.compiled;
  };

  const findFile = (filename: string) =>
    compiledFiles.find(
      (f) =>
        './' + f.filename === filename ||
        './' + f.filename === filename + '.js' ||
        './' + f.filename === filename + '.ts' ||
        './' + f.filename === filename + '.mjs' ||
        './' + f.filename === filename + '.mts' ||
        './' + f.filename === filename + '.jsx' ||
        './' + f.filename === filename + '.tsx',
    );

  compiledFiles.forEach((file) => {
    if (getLanguageEditorId(file.language) === 'style') {
      file.compiled = getStylesheetWithImports(file);
      return;
    }

    // ESM imports are resolved using importmaps to data URLs
    codeImports = {
      ...codeImports,
      ...createImportMap(file.compiled, config, { external: externalModules }),
    };

    const fileImports: Record<string, string> = {};

    getImports(file.compiled).forEach((mod) => {
      const resolvedImport = resolvePath(mod, './' + file.filename);
      if (
        !resolvedImport ||
        resolvedImport in fileImports ||
        resolvedImport in stylesheetImports ||
        resolvedImport in imageImports
      ) {
        return;
      }

      // importmaps cannot override relative imports in data URLs
      const convertedImport = resolvedImport.replace('./', '~/');

      if (convertedImport in codeImports) {
        fileImports[mod] = convertedImport;
        return;
      }

      const importedFile = findFile(resolvedImport);
      // handle importing external stylesheets or images
      if (!importedFile) {
        if (isCss(resolvedImport)) {
          stylesheetImports[resolvedImport] = resolvedImport;
        }
        if (isImage(resolvedImport)) {
          imageImports[resolvedImport] = resolvedImport;
        }
        return;
      }

      const compiledLanguage =
        getLanguageEditorId(importedFile.language) === 'style' ? 'css' : 'javascript';

      if (isCss(resolvedImport, compiledLanguage)) {
        const cssTokens = compileInfo.cssModules?.[resolvedImport.replace('./', '')];
        if (resolvedImport.includes('.module.') && cssTokens) {
          // from compiler\import-map.ts#createCSSModulesImportMap
          const cssModule =
            `export default ${escapeCode(JSON.stringify(cssTokens))};\n` +
            Object.keys(cssTokens)
              .filter((key) => key === toCamelCase(key))
              .map((key) => `export const ${escapeCode(key)} = "${escapeCode(cssTokens[key])}";`)
              .join('\n');
          codeImports[convertedImport] = toDataUrl(cssModule);
        }
        const dataUrl = fileUrls[importedFile.filename] || getDataUrl(importedFile);
        if (!dataUrl) return;
        stylesheetImports[convertedImport] = dataUrl;
        relativeImports[resolvedImport] = convertedImport;
      } else if (isImage(resolvedImport)) {
        const dataUrl = fileUrls[importedFile.filename] || getDataUrl(importedFile);
        if (!dataUrl) return;
        imageImports[convertedImport] = dataUrl;
        relativeImports[resolvedImport] = convertedImport;
      } else {
        relativeImports[resolvedImport] = convertedImport;
        // mark it with null till all relative imports are collected
        codeImports[convertedImport] = null as any;
      }

      fileImports[mod] = convertedImport;
    });

    file.compiled = replaceImports(file.compiled, config, {
      importMap: fileImports,
    });

    // replace relative URL access (e.g. img.src="./logo.svg") or fetching files (e.g. fetch("./data.json"))
    // note that the URLs should be relative to the main file (e.g. index.html)
    // do that only for static files (binary, json, text, html), other files are handled later
    if (['binary', 'json', 'text', 'html'].includes(getFileLanguage(file.filename) || '')) {
      let dataUrl: string | undefined; // cache data url
      const replaceUrl = (targetFile: (typeof compiledFiles)[number]) => {
        if (targetFile.filename === file.filename) return;
        // handle svg <use href="./logo.svg#svg-logo"> which does not allow data urls
        const usePattern = /<use\s+href\s*=\s*"/g;
        if (
          file.filename.endsWith('.svg') &&
          (targetFile.content?.match(new RegExp(usePattern)) ||
            targetFile.compiled?.match(new RegExp(usePattern)))
        ) {
          targetFile.compiled = targetFile.compiled.replace(
            new RegExp(`(['"\`])(\\.?\\/)?${file.filename}#`, 'g'),
            (_match, $1) => {
              const div = document.createElement('div');
              div.style.display = 'none';
              div.innerHTML = file.compiled;
              dom.body.append(div);
              return `${$1}#`;
            },
          );
        }
        targetFile.compiled = targetFile.compiled.replace(
          new RegExp(`(['"\`\()])(\\.?\\/)?${file.filename}`, 'g'),
          `$1${(dataUrl ??= getDataUrl(file, /* saveToFileUrls */ false))}`,
        );
      };
      compiledFiles.forEach(replaceUrl);

      const domFile: (typeof compiledFiles)[number] = {
        filename: mainFile || 'index.html',
        compiled: dom.documentElement.innerHTML,
        content: dom.documentElement.innerHTML,
        language: 'html',
      };
      replaceUrl(domFile);
      if (domFile.compiled !== dom.documentElement.innerHTML) {
        dom.documentElement.innerHTML = domFile.compiled;
      }
    }
  });

  Object.keys(codeImports)
    .filter((mod) => codeImports[mod] === null)
    .forEach((mod) => {
      const file = findFile(mod.replace('~/', './'));
      if (!file) return;
      const dataUrl =
        fileUrls[file.filename] ||
        (mapLanguage(file.language) === 'json'
          ? toDataUrl(`export default ${file.compiled};`)
          : mapLanguage(file.language) === 'text'
            ? toDataUrl(`export default \`${escapeCode(file.compiled)}\`;`)
            : getDataUrl(file));
      if (!dataUrl) return;
      codeImports[mod] = dataUrl;
      fileUrls[file.filename] = dataUrl;
    });

  // imported stylesheets
  Object.keys(stylesheetImports).forEach((mod) => {
    const url = configImports[mod] || modulesService.getUrl(stylesheetImports[mod]);
    const stylesheet = dom.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = url;
    dom.head.appendChild(stylesheet);

    if (Object.keys(configImports).includes(mod)) {
      delete configImports[mod];
    }
  });

  // imported images
  Object.keys(imageImports).forEach((mod) => {
    const content = `export default '${imageImports[mod]}'`;
    codeImports[mod] = toDataUrl(content);
  });

  // stylesheet files added in markup
  dom.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
    let href = link.getAttribute('href');
    if (!href || !isRelativeUrl(href)) return;
    if (!href.startsWith('./')) {
      href = './' + href;
    }
    const styleFile = compiledFiles.find(
      (f) => resolvePath(href, './' + mainFile) === './' + f.filename,
    );
    if (!styleFile) return;
    const dataUrl = fileUrls[styleFile.filename] || getDataUrl(styleFile);
    if (!dataUrl) return;
    link.href = dataUrl;
  });

  // script added in markup
  dom.querySelectorAll<HTMLScriptElement>('script').forEach((script) => {
    let src = script.getAttribute('src'); // avoid getting absolute paths
    if (src && isRelativeUrl(src)) {
      if (src.startsWith('/')) src = '.' + src;
      if (!src.startsWith('./')) src = './' + src;

      const scriptFile = compiledFiles.find(
        (f) => resolvePath(src!, './' + mainFile) === './' + f.filename,
      );
      if (!scriptFile) return;
      const scriptImports: Record<string, string> = {};
      getImports(scriptFile.compiled).forEach((mod) => {
        if (!isRelativeUrl(mod)) return;
        const relativeImport = resolvePath(mod, './' + scriptFile.filename);
        if (!relativeImport) return;
        scriptImports[mod] = relativeImport.replace('./', '~/');
      });
      const dataUrl = toDataUrl(
        replaceImports(scriptFile.compiled, config, {
          importMap: scriptImports,
        }),
      );
      if (script.type === 'module') {
        // preserve relative imports (e.g. srcipt.src="js/script.js")
        let url = src.replace('./', '~/');
        if (!url.startsWith('~/')) {
          url = '~/' + url;
        }
        codeImports[url] = dataUrl;
        script.src = toDataUrl(`import '${url}'`);
      } else {
        script.src = dataUrl;
      }
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
  const userImports: Record<string, string> =
    config.customSettings.mapImports === false
      ? {}
      : {
          ...codeImports,
          ...(runTests && !forExport && hasImports(compiledTests)
            ? createImportMap(compiledTests, config, { external: externalModules })
            : {}),
          ...Object.keys(stylesheetImports)
            .filter((s) => !s.includes('.module.'))
            .reduce(
              (acc, url) => ({
                ...acc,
                [url]: toDataUrl(''),
              }),
              {},
            ),
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
${escapeScript(compiledFiles.find((f) => f.filename === testsFilename)?.compiled || '')}

window.browserJest.run().then(results => {
  parent.postMessage({type: 'testResults', payload: {results: results.testResults }}, '*');
}).catch((error) => {
  parent.postMessage({type: 'testResults', payload: {error: error.message || String(error)}}, '*');
});
    `;
    dom.body.appendChild(testScript);
  }

  lastOutput = '<!DOCTYPE html>\n' + dom.documentElement.outerHTML;
  return lastOutput;
};
