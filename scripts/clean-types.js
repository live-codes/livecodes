// scripts/clean-types.js
//
// Reads package.json to discover public .d.ts entry points,
// walks their transitive local imports to find all reachable files,
// validates that only expected shared dependencies are reachable,
// deletes any unreachable (internal) declaration files,
// and fails if an unexpected file becomes reachable.
//
// Usage:
//   node scripts/clean-types.js [packageJsonPath] [outDir]
//
// Environment:
//   EXPECTED_DEPS - comma-separated list of expected shared dependency
//                   filenames (e.g. "models.d.ts,helpers.d.ts").
//                   Defaults to "models.d.ts".
//
// Exit codes:
//   0 - success
//   1 - error (missing files, unexpected reachable files, etc.)

const fs = require('fs');
const path = require('path');

const cleanTypes = () => {
  console.log('\nCleaning types...');

  const packageJsonPath = path.join('src', 'sdk', 'package.sdk.json');
  const outDir = path.join('build', 'sdk', 'types');

  const expectedDeps = ['models.d.ts'];

  // ─── Extract type paths from package.json ────────────────────────

  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  /**
   * @param {{ types: any; typings: any; exports: { [s: string]: any; } | ArrayLike<any>; }} pkg
   */
  function extractTypePaths(pkg) {
    const paths = new Set();
    if (pkg.types) paths.add(pkg.types);
    if (pkg.typings) paths.add(pkg.typings);
    if (pkg.exports) {
      for (const value of Object.values(pkg.exports)) {
        if (typeof value === 'string' && value.endsWith('.d.ts')) {
          paths.add(value);
        } else if (value && typeof value === 'object') {
          if (value.types) paths.add(value.types);
        }
      }
    }
    return [...paths];
  }

  const rawTypePaths = extractTypePaths(pkg);
  if (rawTypePaths.length === 0) {
    console.error('ERROR: No type entry points found in package.json.');
    process.exit(1);
  }

  // ─── Map package.json paths to outDir-relative filenames ─────────

  const norm = (/** @type {string} */ p) => p.split(path.sep).join('/');

  const stripped = rawTypePaths.map((p) => p.replace(/^\.\//, ''));
  const dirs = [...new Set(stripped.map((p) => path.posix.dirname(p)))];

  /**
   * @param {string | any[]} dirs
   */
  function longestCommonDir(dirs) {
    if (dirs.length === 0) return '';
    let prefix = dirs[0];
    for (const d of dirs.slice(1)) {
      while (d !== prefix && !d.startsWith(prefix + '/')) {
        const i = prefix.lastIndexOf('/');
        prefix = i >= 0 ? prefix.slice(0, i) : '';
        if (!prefix) return '';
      }
    }
    return prefix;
  }

  const commonDir = longestCommonDir(dirs);
  const publicFiles = [
    ...new Set(stripped.map((p) => (commonDir ? p.slice(commonDir.length + 1) : p))),
  ];

  // ─── Validate public entries exist ───────────────────────────────

  const missing = publicFiles.filter((f) => !fs.existsSync(path.join(outDir, f)));
  if (missing.length > 0) {
    console.error('ERROR: Public type files not found in output directory:');
    missing.forEach((f) => console.error(`  ${path.join(outDir, f)}`));
    console.error(
      `\nVerify that outDir ("${outDir}") matches the types directory in package.json.`,
    );
    process.exit(1);
  }

  // ─── Collect all .d.ts files in outDir (recursive) ──────────────

  /**
   * @param {fs.PathLike} dir
   */
  function collectDts(dir, base = '') {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        results.push(...collectDts(path.join(dir, entry.name), rel));
      } else if (entry.name.endsWith('.d.ts')) {
        results.push(rel);
      }
    }
    return results;
  }

  const allFiles = collectDts(outDir);

  // ─── Walk transitive imports from public entries ─────────────────

  /**
   * @param {fs.PathOrFileDescriptor} absPath
   */
  function getLocalImportSpecifiers(absPath) {
    const content = fs.readFileSync(absPath, 'utf-8');
    const specifiers = [];
    const re = /\bfrom\s+['"](\.[^'"]+)['"]/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      specifiers.push(m[1]);
    }
    return specifiers;
  }

  /**
   * @param {string} specifier
   * @param {string} fromFileRel
   */
  function resolveSpecifier(specifier, fromFileRel) {
    let resolved = norm(path.join(path.dirname(fromFileRel), specifier));
    if (!resolved.endsWith('.d.ts')) resolved += '.d.ts';
    return resolved.replace(/^\.\//, '');
  }

  /**
   * @param {any[]} entries
   */
  function findReachable(entries) {
    const visited = new Set();
    const stack = [...entries];
    while (stack.length > 0) {
      const file = stack.pop();
      if (visited.has(file)) continue;
      const abs = path.join(outDir, file);
      if (!fs.existsSync(abs)) continue;
      visited.add(file);
      for (const spec of getLocalImportSpecifiers(abs)) {
        const resolved = resolveSpecifier(spec, file);
        if (!visited.has(resolved)) {
          stack.push(resolved);
        }
      }
    }
    return visited;
  }

  const reachable = findReachable(publicFiles);

  // ─── Classify files ─────────────────────────────────────────────

  const publicSet = new Set(publicFiles);
  const sharedDeps = [...reachable].filter((f) => !publicSet.has(f)).sort();
  const internal = allFiles.filter((/** @type {any} */ f) => !reachable.has(f)).sort();

  // ─── Validate shared dependencies against allow-list ─────────────

  const expectedSet = new Set(expectedDeps);
  const unexpected = sharedDeps.filter((f) => !expectedSet.has(f));

  if (unexpected.length > 0) {
    console.error('\nERROR: Unexpected files are reachable from public entry points:');
    unexpected.forEach((f) => console.error(`  ${f}`));
    console.error(
      '\nThis means an internal module has leaked into the public type declarations.' +
        '\nEither:' +
        '\n  1. Refactor the source so the import does not appear in the declaration, or' +
        '\n  2. If intentional, add the file to EXPECTED_DEPS.',
    );
    process.exit(1);
  }

  if (sharedDeps.length > 0) {
    console.log('Shared dependencies (kept):');
    sharedDeps.forEach((f) => console.log(`  ${f}`));
  }

  // ─── Delete unreachable files ────────────────────────────────────

  if (internal.length === 0) {
    console.log('No internal files to remove.');
    process.exit(0);
  }

  for (const file of internal) {
    const abs = path.join(outDir, file);
    fs.unlinkSync(abs);
  }

  // Clean up empty directories left behind
  /**
   * @param {fs.PathLike} dir
   */
  function removeEmptyDirs(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        removeEmptyDirs(path.join(dir, entry.name));
      }
    }
    if (fs.readdirSync(dir).length === 0 && dir !== outDir) {
      fs.rmdirSync(dir);
    }
  }
  removeEmptyDirs(outDir);

  console.log(`Done. Removed ${internal.length} internal file(s).\n`);
};

module.exports = { cleanTypes };

if (require.main === module) {
  cleanTypes();
}
