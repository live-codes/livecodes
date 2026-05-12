import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const SRC_SDK = join(ROOT, 'src', 'sdk');
const DIST_SDK = join(ROOT, 'dist', 'jsr');

async function main(): Promise<void> {
  // Clean dist/sdk if it already exists
  if (existsSync(DIST_SDK)) {
    await rm(DIST_SDK, { recursive: true });
  }
  await mkdir(DIST_SDK, { recursive: true });

  await copyDir(SRC_SDK, DIST_SDK);

  for (const file of ['LICENSE', 'README.md']) {
    const src = join(ROOT, file);
    if (existsSync(src)) {
      await cp(src, join(DIST_SDK, file));
    }
  }

  await processFiles(DIST_SDK);

  console.log('JSR package prepared in dist/jsr');
}

/**
 * Recursively copies a directory, skipping __tests__ subdirectories, UMD files and package.*.json files.
 */
async function copyDir(src: string, dest: string): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });
  await mkdir(dest, { recursive: true });

  for (const entry of entries) {
    if (
      entry.name === '__tests__' ||
      entry.name.includes('.umd') ||
      entry.name.includes('package.')
    )
      continue;

    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await cp(srcPath, destPath);
    }
  }
}

/**
 * Recursively processes all TypeScript files in a directory, applying
 * the required transformations for JSR compatibility.
 */
async function processFiles(dir: string): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await processFiles(fullPath);
      continue;
    }

    // Only process TypeScript files (.ts, .tsx, .mts, .cts, etc.)
    if (!/\.[mc]?tsx?$/.test(entry.name)) continue;

    let content = await readFile(fullPath, 'utf-8');

    // Remove `// @ts-ignore` comment lines (including optional trailing text)
    content = content.replace(/^\s{0,5}\/\/\s{0,5}@ts-ignore\b.{0,25}\r?\n/gm, '');

    // Add file extensions to relative imports and exports
    content = addExtensions(content, fullPath);

    // Replace @vue/runtime-core → vue
    content = content.replace(/(['"])@vue\/runtime-core\1/g, '$1vue$1');

    await writeFile(fullPath, content);
  }
}

/**
 * Adds file extensions to relative import/export specifiers that lack them.
 *
 * Handles:
 *   import { foo } from './bar'        → './bar.ts'
 *   export { foo } from './bar'        → './bar.ts'
 *   export type { Foo } from './bar'   → './bar.ts'
 *   import('./bar')                    → './bar.ts'
 */
function addExtensions(content: string, filePath: string): string {
  const dir = dirname(filePath);

  const replacer = (_match: string, prefix: string, specifier: string, suffix: string): string => {
    // Skip specifiers that already have a known file extension
    const ext = extname(specifier);
    if (
      ext &&
      ['.ts', '.tsx', '.mts', '.js', '.jsx', '.mjs', '.json', '.svelte', '.css'].includes(ext)
    ) {
      return `${prefix}${specifier}${suffix}`;
    }

    const resolved = resolveExtension(dir, specifier);
    if (resolved) {
      return `${prefix}${specifier}${resolved}${suffix}`;
    }

    return `${prefix}${specifier}${suffix}`;
  };

  // Static imports/exports:  from './foo'  or  from "../foo"
  content = content.replace(/(from\s+['"])(\.\.?\/[^'"]*?)(['"])/g, replacer);

  // Dynamic imports:  import('./foo')
  content = content.replace(/(import\(\s*['"])(\.\.?\/[^'"]*?)(['"]\s*\))/g, replacer);

  return content;
}

/**
 * Resolves the file extension for a relative specifier by checking the
 * filesystem for matching files in the dist directory.
 *
 * Returns the extension string (e.g. '.ts') to append, or '' if no match found.
 */
function resolveExtension(dir: string, specifier: string): string {
  const base = resolve(dir, specifier);
  const extensions = ['.ts', '.tsx', '.mts'];

  // Direct file match: ./foo → ./foo.ts
  for (const ext of extensions) {
    if (existsSync(base + ext)) {
      return ext;
    }
  }

  // Directory index match: ./foo → ./foo/index.ts
  for (const ext of extensions) {
    if (existsSync(join(base, `index${ext}`))) {
      return `/index${ext}`;
    }
  }

  return '';
}

main().catch((err) => {
  console.error('Failed to prepare JSR package:', err);
  process.exit(1);
});
