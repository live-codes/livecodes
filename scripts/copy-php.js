const esbuild = require('esbuild');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.resolve(root, 'build');
const phpDir = path.resolve(root, 'server/php');
const sandboxSrcDir = path.resolve(root, 'src/livecodes/html/sandbox');

/**
 * Extracts a name → title map of starter templates as JSON,
 * using the same technique as `functionsBuild` in scripts/build.js.
 */
const generateStarterTemplates = async () => {
  const tmpFile = path.join(os.tmpdir(), `livecodes-starter-templates-${Date.now()}.cjs`);
  await esbuild.build({
    bundle: true,
    minify: true,
    format: 'cjs',
    target: 'es2020',
    logLevel: 'error',
    loader: { '.html': 'text' },
    entryPoints: [path.resolve(root, 'src/livecodes/templates/starter/index.ts')],
    outfile: tmpFile,
    define: {
      'window.deps.translateString': 'getTemplateName',
    },
  });
  fs.writeFileSync(
    tmpFile,
    `var getTemplateName = (_, templateName) => templateName;\n${fs.readFileSync(tmpFile, 'utf8')}`,
    'utf8',
  );
  const { starterTemplates } = require(tmpFile);
  fs.unlinkSync(tmpFile);

  const map = {};
  for (const template of starterTemplates) {
    if (template && template.name) {
      map[template.name] = template.title || '';
    }
  }
  fs.writeFileSync(path.resolve(outDir, 'inc/starter-templates.json'), JSON.stringify(map), 'utf8');
};

const main = async () => {
  if (!fs.existsSync(outDir)) {
    throw new Error('build/ directory not found. Run `npm run build:app` first.');
  }
  // PHP server files (index.php, oembed.php, .htaccess, api/, broadcast/, sandbox/index.php, inc/, vendor/)
  fs.cpSync(phpDir, outDir, { recursive: true });
  // sandbox static content (version directories), like the Dockerfile does
  fs.cpSync(sandboxSrcDir, path.resolve(outDir, 'sandbox'), { recursive: true });
  await generateStarterTemplates();
  // eslint-disable-next-line no-console
  console.log('PHP server files copied to build/');
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
