// based on dts-bundle

import { pathBrowserifyUrl } from '../vendors';

// const dtsExp = /\.d\.ts$/;
const bomOptExp = /^\uFEFF?/;

const externalExp = /^([ \t]*declare module )(['"])(.+?)(\2[ \t]*{?.*)$/;
const importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/;
const importEs6Exp =
  /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/;
const referenceTagExp = /^[ \t]*\/\/\/[ \t]*<reference[ \t]+path=(["'])(.*?)\1?[ \t]*\/>.*$/;
const identifierExp = /^\w+(?:[\.-]\w+)*$/;
const fileExp = /^([\./].*|.:.*)$/;
const privateExp = /^[ \t]*(?:static )?private (?:static )?/;
const publicExp = /^([ \t]*)(static |)(public |)(static |)(.*)/;

export interface Options {
  main: string;
  name: string;
  baseDir?: string;
  newline?: string;
  indent?: string;
  prefix?: string;
  separator?: string;
  externals?: boolean;
  exclude?: ((file: string) => boolean) | RegExp;
  verbose?: boolean;
  referenceExternals?: boolean;
  emitOnIncludedFileNotFound?: boolean;
  emitOnNoIncludedFileNotFound?: boolean;
  headerText?: string;
}

export interface ModLine {
  original: string;
  modified?: string;
  skip?: boolean;
}

export interface Result {
  file: string;
  name: string;
  indent: string;
  exp: string;
  refs: string[];
  externalImports: string[];
  relativeImports: string[];
  exports: string[];
  lines: ModLine[];
  importLineRef: ModLine[];
  relativeRef: ModLine[];
  fileExists: boolean;
}

export interface BundleResult {
  fileMap: { [name: string]: Result };
  includeFilesNotFound: string[];
  noIncludeFilesNotFound: string[];
  emitted?: boolean;
  options: Options;
}

export async function bundle(options: Options): Promise<string> {
  const path = await import(pathBrowserifyUrl);
  assert(typeof options === 'object' && options, 'options must be an object');

  // option parsing & validation
  const main = options.main;
  const exportName = options.name;
  const baseDir = optValue(options.baseDir, options.main.split('/').slice(0, -1).join('/'));

  const newline = optValue(options.newline, '\n');
  const indent = optValue(options.indent, '    ') || '    ';
  const prefix = optValue(options.prefix, '');
  const separator = optValue(options.separator, '/') || '/';

  const externals = optValue(options.externals, false);
  const exclude = optValue(options.exclude, null);
  const referenceExternals = optValue(options.referenceExternals, false);
  const emitOnIncludedFileNotFound = optValue(options.emitOnIncludedFileNotFound, false);
  const emitOnNoIncludedFileNotFound = optValue(options.emitOnNoIncludedFileNotFound, false);
  const headerText = optValue(options.headerText, '');

  // regular (non-jsdoc) comments are not actually supported by declaration compiler
  const comments = false;

  const verbose = optValue(options.verbose, false);

  assert(main, 'option "main" must be defined');
  assert(exportName, 'option "name" must be defined');

  assert(typeof newline === 'string', 'option "newline" must be a string');
  assert(typeof indent === 'string', 'option "indent" must be a string');
  assert(typeof prefix === 'string', 'option "prefix" must be a string');
  assert(separator.length > 0, 'option "separator" must have non-zero length');

  trace('### settings object passed ###');
  traceObject(options);

  trace('### settings ###');
  trace('main:         %s', main);
  trace('name:         %s', exportName);
  trace('baseDir:      %s', baseDir);
  trace('mainFile:     %s', main);
  trace('externals:    %s', externals ? 'yes' : 'no');
  trace('exclude:      %s', exclude);
  trace('comments:     %s', comments ? 'yes' : 'no');
  trace('emitOnIncludedFileNotFound:   %s', emitOnIncludedFileNotFound ? 'yes' : 'no');
  trace('emitOnNoIncludedFileNotFound: %s', emitOnNoIncludedFileNotFound ? 'yes' : 'no');
  trace('headerText    %s', headerText);

  const headerData = headerText ? '/*' + headerText + '*/\n' : '';

  let isExclude: (file: string, arg?: boolean) => boolean;
  if (typeof exclude === 'function') {
    isExclude = exclude;
  } else if (exclude instanceof RegExp) {
    isExclude = (file) => exclude.test(file);
  } else {
    isExclude = () => false;
  }

  const getPkgName = (exportedName: string) => {
    if (!exportedName.includes('/')) return exportedName;
    if (!exportedName.startsWith('@')) return exportedName.split('/')[0];
    const [scope, name, ..._path] = exportedName.split('/');
    return `${scope}/${name}`;
  };

  const pkgName = getPkgName(exportName);
  const [urlPart1, urlPart2] = main.split(pkgName, 2);
  const sourceRoot = urlPart1 + pkgName + urlPart2?.split('/')[0] + '/';

  trace('\n### find typings ###');

  const inSourceTypings = (file: string) => file.startsWith(sourceRoot); // if file reference is a directory assume commonjs index.d.ts

  trace('source typings (will be included in output if actually used)');
  trace('excluded typings (will always be excluded from output)');

  const fileMap: { [name: string]: Result } = Object.create(null);
  const globalExternalImports: string[] = [];
  let mainParse: Result | null = null; // will be parsed result of first parsed file
  const externalTypings: string[] = [];
  const inExternalTypings = (file: string) => externalTypings.indexOf(file) !== -1;
  {
    // recursively parse files, starting from main file,
    // following all references and imports
    trace('\n### parse files ###');

    const queue: string[] = [main];
    const queueSeen: { [name: string]: boolean } = Object.create(null);

    while (queue.length > 0) {
      const target = queue.shift();
      if (!target) {
        continue;
      }
      if (queueSeen[target]) {
        continue;
      }
      queueSeen[target] = true;

      // parse the file
      const parse = await parseFile(target);
      if (!parse) {
        continue;
      }
      if (!mainParse) {
        mainParse = parse;
      }
      fileMap[parse.file] = parse;
      pushUniqueArr(queue, parse.refs, parse.relativeImports);
    }
  }

  // map all exports to their file
  trace('\n### map exports ###');

  const exportMap = Object.create(null);
  Object.keys(fileMap).forEach((file) => {
    const parse = fileMap[file];
    parse.exports.forEach((name) => {
      assert(!(name in exportMap), 'already got export for: ' + name);
      exportMap[name] = parse;
      trace('- %s -> %s', name, parse.file);
    });
  });

  // build list of typings to include in output later
  trace('\n### determine typings to include ###');

  const excludedTypings: string[] = [];
  const usedTypings: Result[] = [];
  const externalDependencies: string[] = []; // lists all source files that we omit due to !externals
  {
    const queue = [mainParse];
    const queueSeen: { [name: string]: boolean } = Object.create(null);

    trace('queue');
    trace(queue);

    while (queue.length > 0) {
      const parse = queue.shift();
      if (!parse || queueSeen[parse.file]) {
        continue;
      }
      queueSeen[parse.file] = true;

      trace('%s (%s)', parse.name, parse.file);

      usedTypings.push(parse);

      parse.externalImports.forEach((name) => {
        const p = exportMap[name];
        if (!p) return;
        if (!externals) {
          trace(' - exclude external %s', name);
          pushUnique(externalDependencies, !p ? name : p?.file);
          return;
        }
        if (isExclude(path.relative(baseDir, p?.file), true)) {
          trace(' - exclude external filter %s', name);
          pushUnique(excludedTypings, p?.file);
          return;
        }
        trace(' - include external %s', name);
        assert(p, name);
        queue.push(p);
      });
      parse.relativeImports.forEach((file) => {
        const p = fileMap[file];
        if (!p) return;
        if (isExclude(path.relative(baseDir, p?.file), false)) {
          trace(' - exclude internal filter %s', file);
          pushUnique(excludedTypings, p?.file);
          return;
        }
        trace(' - import relative %s', file);
        assert(p, file);
        queue.push(p);
      });
    }
  }

  // rewrite global external modules to a unique name
  trace('\n### rewrite global external modules ###');

  usedTypings.forEach((parse) => {
    trace(parse.name);

    parse.relativeRef.forEach((line) => {
      line.modified = replaceExternal(line.original, getLibName);
      trace(' - %s  ==>  %s', line.original, line.modified);
    });

    parse.importLineRef.forEach((line) => {
      if (importExp.test(line.original)) {
        line.modified = replaceImportExport(line.original, getLibName);
      } else {
        line.modified = replaceImportExportEs6(line.original, getLibName);
      }
      trace(' - %s  ==>  %s', line.original, line.modified);
    });
  });

  // build collected content
  trace('\n### build output ###');

  let content = headerData;
  if (externalDependencies.length > 0) {
    content += '// Dependencies for this module:' + newline;
    externalDependencies.forEach((file) => {
      if (referenceExternals) {
        content += formatReference(path.relative(baseDir, file).replace(/\\/g, '/')) + newline;
      } else {
        content += '//   ' + path.relative(baseDir, file).replace(/\\/g, '/') + newline;
      }
    });
  }

  if (globalExternalImports.length > 0) {
    content += newline;
    content += globalExternalImports.join(newline) + newline;
  }

  content += newline;

  // add wrapped modules to output
  content +=
    usedTypings
      .filter((parse: Result) => {
        // Eliminate all the skipped lines
        parse.lines = parse.lines.filter((line: ModLine) => true !== line.skip);

        // filters empty parse objects.
        return parse.lines.length > 0;
      })
      .map((parse: Result) => {
        if (inSourceTypings(parse.file)) {
          return formatModule(
            parse.file,
            parse.lines.map((line) => getIndenter(parse.indent, indent)(line)),
          );
        } else {
          return (
            parse.lines.map((line) => getIndenter(parse.indent, indent)(line)).join(newline) +
            newline
          );
        }
      })
      .join(newline) + newline;

  const inUsed = (file: string): boolean =>
    usedTypings.filter((parse) => parse.file === file).length !== 0;

  const bundleResult: BundleResult = {
    fileMap,
    includeFilesNotFound: [],
    noIncludeFilesNotFound: [],
    options,
  };

  trace('## files not found ##');
  // eslint-disable-next-line guard-for-in
  for (const p in fileMap) {
    const parse = fileMap[p];
    if (!parse.fileExists) {
      if (inUsed(parse.file)) {
        bundleResult.includeFilesNotFound.push(parse.file);
        warning(' X Included file NOT FOUND %s ', parse.file);
      } else {
        bundleResult.noIncludeFilesNotFound.push(parse.file);
        trace(' X Not used file not found %s', parse.file);
      }
    }
  }

  // write main file
  trace('\n### write output ###');
  // write only if there aren't not found files or there are and option "emit file not found" is true.
  if (
    (bundleResult.includeFilesNotFound.length === 0 ||
      (bundleResult.includeFilesNotFound.length > 0 && emitOnIncludedFileNotFound)) &&
    (bundleResult.noIncludeFilesNotFound.length === 0 ||
      (bundleResult.noIncludeFilesNotFound.length > 0 && emitOnNoIncludedFileNotFound))
  ) {
    bundleResult.emitted = true;
  } else {
    warning(' XXX Not emit due to exist files not found.');
    trace(
      'See documentation for emitOnIncludedFileNotFound and emitOnNoIncludedFileNotFound options.',
    );
    bundleResult.emitted = false;
  }

  // print some debug info
  if (verbose) {
    trace('\n### statistics ###');

    // trace('used sourceTypings');
    // sourceTypings.forEach(p => {
    //     if (inUsed(p)) {
    //         trace(' - %s', p);
    //     }
    // });

    // trace('unused sourceTypings');
    // sourceTypings.forEach(p => {
    //     if (!inUsed(p)) {
    //         trace(' - %s', p);
    //     }
    // });

    trace('excludedTypings');
    excludedTypings.forEach((p) => {
      trace(' - %s', p);
    });

    trace('used external typings');
    externalTypings.forEach((p) => {
      if (inUsed(p)) {
        trace(' - %s', p);
      }
    });

    trace('unused external typings');
    externalTypings.forEach((p) => {
      if (!inUsed(p)) {
        trace(' - %s', p);
      }
    });

    trace('external dependencies');
    externalDependencies.forEach((p) => {
      trace(' - %s', p);
    });
  }

  trace('\n### done ###\n');
  return content;

  function assert(condition: any, msg?: string) {
    if (!condition && verbose) {
      // eslint-disable-next-line no-console
      console.error(msg || 'assertion failed');
    }
  }

  function traceObject(obj: any) {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(obj);
    }
  }

  function trace(...args: any[]) {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  function warning(...args: any[]) {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  function getModName(file: string) {
    return path.relative(
      baseDir,
      path.dirname(file) + path.sep + path.basename(file).replace(/\.d\.ts$/, ''),
    );
  }

  function getExpName(file: string) {
    if (file === main) {
      return exportName;
    }
    return getExpNameRaw(file);
  }

  function getExpNameRaw(file: string) {
    return prefix + pkgName + separator + cleanupName(getModName(file));
  }

  function getLibName(ref: string) {
    return getExpNameRaw(main) + separator + prefix + separator + ref;
  }

  function cleanupName(name: string) {
    return name.replace(/\.\./g, '--').replace(/[\\\/]/g, separator);
  }

  function mergeModulesLines(lines: any) {
    const i = indent;
    return (lines.length === 0 ? '' : i + lines.join(newline + i)) + newline;
  }

  function formatModule(file: string, lines: string[]) {
    let out = '';
    out += "declare module '" + getExpName(file) + "' {" + newline;
    out += mergeModulesLines(lines);
    out += '}' + newline;
    return out;
  }

  // main info extractor
  async function parseFile(file: string): Promise<Result> {
    const name = getModName(file);

    trace('%s (%s)', name, file);

    const res: Result = {
      file,
      name,
      indent,
      exp: getExpName(file),
      refs: [], // triple-slash references
      externalImports: [], // import()'s like "events"
      relativeImports: [], // import()'s like "./foo"
      exports: [],
      lines: [],
      fileExists: true,
      // the next two properties contain single-element arrays, which reference the same single-element in .lines,
      // in order to be able to replace their contents later in the bundling process.
      importLineRef: [],
      relativeRef: [],
    };
    try {
      const url = new URL(file);
      const mainUrl = new URL(main);
      if (url.origin !== mainUrl.origin && url.origin === window.location.origin) {
        trace(' X - Invalid URL: %s', file);
        throw new Error();
      }
    } catch {
      return res;
    }
    let response = await fetch(file);
    if (!response.ok) {
      // if file is a directory then lets assume commonjs convention of an index file in the given folder
      file = file + '/index.d.ts';
      response = await fetch(file);
      if (!response.ok) {
        trace(' X - File not found: %s', file);
        res.fileExists = false;
        return res;
      }
    }

    let code = (await response.text()).replace(bomOptExp, '').replace(/\s*$/, '');

    if (code.includes(sourceRoot)) {
      // if module is imported from same the package with absolute URL make it relative
      const dir = file.substring(0, file.lastIndexOf('/')) + '/';
      code = code.replace(new RegExp(regexEscape(sourceRoot) + '(.*)', 'g'), (match) =>
        path.relative(dir, match),
      );
    }

    res.indent = indent || '    ';

    // buffer multi-line comments, handle JSDoc
    let multiComment: string[] = [];
    let queuedJSDoc: string[] | null;
    let inBlockComment = false;
    const popBlock = () => {
      if (multiComment.length > 0) {
        // jsdoc
        if (/^[ \t]*\/\*\*/.test(multiComment[0])) {
          // flush but hold
          queuedJSDoc = multiComment;
        } else if (comments) {
          // flush it
          multiComment.forEach((line) => res.lines.push({ original: line }));
        }
        multiComment = [];
      }
      inBlockComment = false;
    };
    const popJSDoc = () => {
      if (queuedJSDoc) {
        queuedJSDoc.forEach((line) => {
          // fix shabby TS JSDoc output
          const match = line.match(/^([ \t]*)(\*.*)/);
          if (match) {
            res.lines.push({ original: match[1] + ' ' + match[2] });
          } else {
            res.lines.push({ original: line });
          }
        });
        queuedJSDoc = null;
      }
    };

    for (let line of code.split('\n')) {
      let match: string[] | null;

      // block comment end
      if (/^[((=====)(=*)) \t]*\*+\//.test(line)) {
        multiComment.push(line);
        popBlock();
        continue;
      }

      // block comment start
      if (/^[ \t]*\/\*/.test(line)) {
        multiComment.push(line);
        inBlockComment = true;

        // single line block comment
        if (/\*+\/[ \t]*$/.test(line)) {
          popBlock();
        }
        continue;
      }

      if (inBlockComment) {
        multiComment.push(line);
        continue;
      }

      // blankline
      if (/^\s*$/.test(line)) {
        res.lines.push({ original: '' });
        continue;
      }

      // reference tag
      if (/^\/\/\//.test(line)) {
        const ref = extractReference(line);
        if (ref) {
          const refPath = path.resolve(path.dirname(file), ref);
          if (inSourceTypings(refPath)) {
            trace(' - reference source typing %s (%s)', ref, refPath);
          } else {
            const relPath = path.relative(baseDir, refPath).replace(/\\/g, '/');

            trace(' - reference external typing %s (%s) (relative: %s)', ref, refPath, relPath);

            if (!inExternalTypings(refPath)) {
              externalTypings.push(refPath);
            }
          }
          pushUnique(res.refs, refPath);
          continue;
        }
      }

      // line comments
      if (/^\/\//.test(line)) {
        if (comments) {
          res.lines.push({ original: line });
        }
        continue;
      }

      // private member
      if (privateExp.test(line)) {
        queuedJSDoc = null;
        continue;
      }
      popJSDoc();

      // import() statement or es6 import
      if (
        (line.indexOf('from') >= 0 && (match = line.match(importEs6Exp))) ||
        (line.indexOf('require') >= 0 && (match = line.match(importExp)))
      ) {
        const [_, lead, quote, moduleName, trail] = match;
        assert(moduleName);

        let impPath = path.resolve(path.dirname(file), moduleName);
        if (impPath.startsWith('/')) {
          impPath = impPath.replace('/https:/', 'https://').replace('.js', '.d.ts');
        }

        // filename (i.e. starts with a dot, slash or windows drive letter)
        if (fileExp.test(moduleName) || moduleName.startsWith(sourceRoot)) {
          // TODO: some module replacing is handled here, whereas the rest is
          // done in the "rewrite global external modules" step. It may be
          // more clear to do all of it in that step.
          const modLine: ModLine = {
            original: lead + quote + getExpName(impPath) + trail,
          };
          res.lines.push(modLine);

          let full = impPath;
          // If full is not an existing file, then let's assume the extension .d.ts

          const fullRes = await fetch(full);
          if (!fullRes.ok) {
            full += '.d.ts';
          }

          trace(' - import relative %s (%s)', moduleName, full);

          pushUnique(res.relativeImports, full);
          res.importLineRef.push(modLine);
        }
        // identifier
        else {
          const modLine: ModLine = {
            original: line,
          };
          trace(' - import external %s', moduleName);
          pushUnique(res.externalImports, moduleName);
          if (externals) {
            res.importLineRef.push(modLine);
          }
          res.lines.push(modLine);
        }
      }
      // declaring an external module
      // this triggers when we're e.g. parsing external module declarations, such as node.d.ts
      else if ((match = line.match(externalExp))) {
        const [_, _declareModule, _lead, moduleName, _trail] = match;
        assert(moduleName);

        trace(' - declare %s', moduleName);
        pushUnique(res.exports, moduleName);
        const modLine: ModLine = {
          original: line,
        };
        res.relativeRef.push(modLine); // TODO
        res.lines.push(modLine);
      }
      // clean regular lines
      else {
        // remove public keyword
        if ((match = line.match(publicExp))) {
          const [_, sp, static1, _pub, static2, ident] = match;
          line = sp + static1 + static2 + ident;
        }
        if (inSourceTypings(file)) {
          // for internal typings, remove the 'declare' keyword (but leave 'export' intact)
          res.lines.push({ original: line.replace(/^(export )?declare /g, '$1') });
        } else {
          res.lines.push({ original: line });
        }
      }
    }

    return res;
  }
}

function pushUnique<T>(arr: T[], value: T) {
  if (arr.indexOf(value) < 0) {
    arr.push(value);
  }
  return arr;
}

function pushUniqueArr<T>(arr: T[], ...values: T[][]) {
  values.forEach((vs) => vs.forEach((v) => pushUnique(arr, v)));
  return arr;
}

function formatReference(file: string) {
  return '/// <reference path="' + file.replace(/\\/g, '/') + '" />';
}

function extractReference(tag: string) {
  const match = tag.match(referenceTagExp);
  if (match) {
    return match[2];
  }
  return null;
}

function replaceImportExport(line: string, replacer: (str: string) => string) {
  const match = line.match(importExp);
  if (match) {
    // assert(match[4]);
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}

function replaceImportExportEs6(line: string, replacer: (str: string) => string) {
  if (line.indexOf('from') < 0) {
    return line;
  }
  const match = line.match(importEs6Exp);
  if (match) {
    // assert(match[4]);
    if (identifierExp.test(match[3])) {
      return match[1] + match[2] + replacer(match[3]) + match[4];
    }
  }
  return line;
}

function replaceExternal(line: string, replacer: (str: string) => string) {
  const match = line.match(externalExp);
  if (match) {
    const [_, declareModule, beforeIndent, moduleName, afterIdent] = match;
    // assert(afterIdent);
    if (identifierExp.test(moduleName)) {
      return declareModule + beforeIndent + replacer(moduleName) + afterIdent;
    }
  }
  return line;
}

function getIndenter(_actual: string, _use: string): (line: ModLine) => string {
  return (line) => line.modified || line.original;
}
// function getIndenter(actual: string, use: string): (line: ModLine) => string {
//     if (actual === use || !actual) {
//         return line => line.modified || line.original;
//     }
//     return line => (line.modified || line.original).replace(new RegExp('^' + actual + '+', 'g'), match => match.split(actual).join(use));
// }

function optValue<T>(passed: T, def: T): T {
  if (typeof passed === 'undefined') {
    return def;
  }
  return passed;
}

function regexEscape(s: string) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
