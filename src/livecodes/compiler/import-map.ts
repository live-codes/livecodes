/* eslint-disable import/no-internal-modules */
import type { CompileInfo, Config, Language } from '../models';
import { modulesService } from '../services/modules';
import {
  escapeCode,
  getFileExtension,
  getValidUrl,
  removeComments,
  removeCommentsAndStrings,
  toCamelCase,
  toDataUrl,
} from '../utils/utils';
import { compileInCompiler } from './compile-in-compiler';

export const importsPattern =
  /(import\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:".*?")|(?:'.*?'))([\s]*?(?:;|$|))/g;

export const dynamicImportsPattern = /(import\s*?\(\s*?((?:".*?")|(?:'.*?'))\s*?\))/g;

export const getImports = (code: string, removeSpecifier = false) =>
  [
    ...[...removeComments(code).matchAll(new RegExp(importsPattern))],
    ...[...removeComments(code).matchAll(new RegExp(dynamicImportsPattern))],
  ]
    .map((arr) => arr[2].replace(/"/g, '').replace(/'/g, ''))
    .map((mod) => {
      if (!removeSpecifier || !isBare(mod) || !mod.includes(':')) {
        return mod;
      }
      return mod.split(':')[1];
    });

const needsBundler = /* @__PURE__ */ (mod: string) =>
  !mod.startsWith('https://deno.bundlejs.com/') &&
  !mod.startsWith('https://edge.bundlejs.com/') &&
  !mod.startsWith('https://esm.sh/') &&
  !mod.endsWith('#nobundle') &&
  (mod.startsWith('https://deno.land/') ||
    mod.startsWith('https://github.com/') ||
    mod.startsWith('https://raw.githubusercontent.com/') ||
    mod.startsWith('https://gitlab.com/') ||
    mod.startsWith('https://bitbucket.org') ||
    mod.endsWith('.ts') ||
    mod.endsWith('.jsx') ||
    mod.endsWith('.tsx'));

export const isBare = /* @__PURE__ */ (mod: string) =>
  !mod.startsWith('https://') &&
  !mod.startsWith('http://') &&
  !mod.startsWith('.') &&
  !mod.startsWith('/') &&
  !mod.startsWith('data:') &&
  !mod.startsWith('blob:');

const isStylesheet = /* @__PURE__ */ (mod: string) =>
  (mod.endsWith('.css') ||
    mod.endsWith('.scss') ||
    mod.endsWith('.sass') ||
    mod.endsWith('.less') ||
    mod.endsWith('.styl')) &&
  !mod.startsWith('./style');

export const findImportMapKey = /* @__PURE__ */ (mod: string, importmap: Record<string, string>) =>
  Object.keys(importmap).find((key) => key === mod || mod.startsWith(key + '/'));

export const createImportMap = (code: string, config: Config, fallbackToCdn = true) =>
  getImports(code)
    .map((libName) => {
      if ((!needsBundler(libName) && !isBare(libName)) || isStylesheet(libName)) {
        return {};
      } else {
        const imports = { ...config.imports, ...config.customSettings?.imports };
        const key = findImportMapKey(libName, imports);
        if (key) {
          return { [key]: imports[key] };
        }
        if (!fallbackToCdn) {
          return {};
        }
        return {
          [libName]: modulesService.getModuleUrl(libName, {
            defaultCDN: config?.customSettings?.defaultCDN,
          }),
        };
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {} as Record<string, string>);

export const hasImports = (code: string) => getImports(code).length > 0;

export const hasExports = (code: string) =>
  new RegExp(/(^export\s)|([\s|;]export\s)/).test(removeCommentsAndStrings(code));

export const hasDefaultExport = (code: string) => new RegExp(/export\s*default\s/).test(code);

export const hasUrlImportsOrExports = (code: string) =>
  new RegExp(
    /((?:import|export)\s+?(?:(?:(?:[\w*\s{},\$]*)\s+from\s+?)|))((?:"(?:\.|http|\/).*?")|(?:'(?:\.|http|\/).*?'))([\s]*?(?:;|$|))/,
  ).test(removeComments(code));

export const hasAwait = (code: string) =>
  new RegExp(/(^await\s)|([\s|;]await\s)/).test(removeCommentsAndStrings(code));

export const isModuleScript = (code: string) =>
  hasImports(code) || hasExports(code) || hasAwait(code);

export const replaceImports = (
  code: string,
  config: Config,
  importMap?: Record<string, string>,
) => {
  importMap = importMap || createImportMap(code, config);
  return code.replace(new RegExp(importsPattern), (statement) => {
    if (!importMap) {
      return statement;
    }
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');

    const key = findImportMapKey(libName, importMap);
    if (!key) {
      return statement;
    }
    return statement.replace(key, importMap[key]);
  });
};

export const replaceSFCImports = async (
  code: string,
  {
    filename,
    config,
    sfcExtension,
    getLanguageByAlias,
    compileSFC,
  }: {
    config: Config;
    filename: string;
    sfcExtension: string;
    getLanguageByAlias: (alias: string) => Language | undefined;
    compileSFC: (code: string, options: { filename: string; config: Config }) => Promise<string>;
  },
) => {
  const isSfc = (mod: string) => mod.toLowerCase().endsWith(sfcExtension);
  const isExtensionless = (mod: string) =>
    mod.startsWith('.') && !mod.split('/')[mod.split('/').length - 1].includes('.');
  const sfcImports = getImports(code).filter(
    (mod) => isSfc(mod) || isExtensionless(mod) || mod.startsWith('.'),
  );
  const projectImportMap = {
    ...config.imports,
    ...config.customSettings.imports,
  };
  const importMap: Record<string, string> = {};
  await Promise.all(
    sfcImports.map(async (mod) => {
      // convert extensionless, relative URL to absolute URL and find in import map
      const urlInMap =
        isExtensionless(mod) &&
        getValidUrl(filename) != null &&
        projectImportMap[findImportMapKey(new URL(mod, filename).href, projectImportMap) || 0];

      const url =
        projectImportMap[findImportMapKey(mod, projectImportMap) || 0] ||
        urlInMap ||
        (mod.startsWith('https://') || mod.startsWith('http://')
          ? mod
          : mod.startsWith('.') && getValidUrl(filename) != null
            ? new URL(mod, filename).href
            : modulesService.getUrl(mod));

      const res = await fetch(url);
      const content = await res.text();
      const compiled = isSfc(mod)
        ? await compileSFC(content, { filename: url, config })
        : await replaceSFCImports(
            (
              await compileInCompiler(
                content,
                getLanguageByAlias(getFileExtension(url)) || 'javascript',
                config,
              )
            ).code,
            { filename: url, config, sfcExtension, getLanguageByAlias, compileSFC },
          );
      if (!compiled) return;
      const dataUrl = toDataUrl(compiled);
      importMap[mod] = dataUrl;
    }),
  );
  return replaceImports(code, {} as Config, importMap);
};

export const removeImports = (code: string, mods: string[]) =>
  code.replace(new RegExp(importsPattern), (statement) => {
    const libName = statement
      .replace(new RegExp(importsPattern), '$2')
      .replace(/"/g, '')
      .replace(/'/g, '');
    return mods.includes(libName) ? '' : statement;
  });

export const styleimportsPattern =
  /(?:@import\s+?)((?:".*?")|(?:'.*?')|(?:url\('.*?'\))|(?:url\(".*?"\)))(.*)?;/g;

export const hasStyleImports = (code: string) => new RegExp(styleimportsPattern).test(code);

export const replaceStyleImports = (code: string) =>
  code.replace(new RegExp(styleimportsPattern), (statement, match, media) => {
    const url: string = match
      .replace(/"/g, '')
      .replace(/'/g, '')
      .replace(/url\(/g, '')
      .replace(/\)/g, '');
    const modified = '@import "' + modulesService.getUrl(url) + '";';
    const mediaQuery = media?.trim();
    return !isBare(url)
      ? statement
      : mediaQuery
        ? `@media ${mediaQuery} {\n${modified}\n}`
        : modified;
  });

// based on https://github.com/sveltejs/svelte-repl/blob/master/src/workers/bundler/plugins/commonjs.js
export const cjs2esm = (code: string) => {
  const strippedCode = removeComments(code);
  if (!/\b(require|module|exports)\b/.test(strippedCode)) return code;
  const requirePattern = /(?:^|\s)require(?:\s*)\((?:\s*)('(.*?)'|"(.*?)")(?:\s*)\)/g;

  const getRequires = (str: string) =>
    [...str.matchAll(new RegExp(requirePattern))].map((arr) =>
      arr[1].replace(/"/g, '').replace(/'/g, ''),
    );

  const requires = getRequires(strippedCode);

  if (requires.length === 0) return code;

  const imports = requires
    .map((id, i) =>
      [
        `import * as __requires_${i} from '${id}';`,
        `const __requires_${i}_default = __requires_${i}.default;`,
      ].join('\n'),
    )
    .join('\n');
  const lookup = `const __requires_lookup = { ${requires
    .map((id, i) => `'${id}': __requires_${i}_default || __requires_${i}`)
    .join(', ')} };`;

  const require = `window.require = window.require || ((id) => {
	if (id in __requires_lookup) return __requires_lookup[id];
	throw new Error(\`Cannot require modules dynamically (\${id})\`);
});`;

  return [
    imports,
    lookup,
    require,
    `const exports = {}; const module = { exports };`,
    code,
    `export default module.exports;`,
  ].join('\n\n');
};

export const createCSSModulesImportMap = (
  compiledScript: string,
  compiledStyle: string,
  cssTokens: CompileInfo['cssModules'] = {},
  extension: Language = 'css',
) => {
  const scriptImports = getImports(compiledScript);
  const extensions = extension === 'css' ? [extension] : ['css', extension];
  const filenames = [
    ...extensions.map((ext) => './style.' + ext),
    ...extensions.map((ext) => './styles.' + ext),
    ...extensions.map((ext) => './style.module.' + ext),
    ...extensions.map((ext) => './styles.module.' + ext),
  ];

  return filenames
    .map((filename) => {
      if (!scriptImports.includes(filename)) {
        return {};
      }

      if (!filename.includes('.module.')) {
        return {
          [filename]: toDataUrl(`export default \`${escapeCode(compiledStyle)}\`;`),
        };
      }

      const cssModule =
        `export default ${escapeCode(JSON.stringify(cssTokens))};\n` +
        Object.keys(cssTokens)
          .filter((key) => key === toCamelCase(key))
          .map((key) => `export const ${escapeCode(key)} = "${escapeCode(cssTokens[key])}";`)
          .join('\n');

      return { [filename]: toDataUrl(cssModule) };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
