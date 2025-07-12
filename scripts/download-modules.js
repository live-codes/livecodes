const fs = require('fs');
const path = require('path');
const sdkPkg = require('../src/sdk/package.sdk.json');

const downloadModules = async ({ dryRun = false } = {}) => {
  const vendorsModule = 'src/livecodes/vendors.ts';
  const tempDir = '.cache/';
  const modulesDir = tempDir + '/modules/';
  const outputDir = 'build/modules/';

  /** @type {string[]} */
  const modules = [];
  /** @type {string[]} */
  const baseUrls = [];
  /** @type {Array<{module: string; url: string}>} */
  const moduleUrls = [];

  fs.mkdirSync(modulesDir, { recursive: true });

  const verdorModulesContent =
    'const modulesService = { getUrl: (mod) => mod };\n' +
    fs
      .readFileSync(vendorsModule, 'utf8')
      .replace('import', '// import')
      .replace('process.env.SDK_VERSION', `"${sdkPkg.version}"`);
  fs.writeFileSync(tempDir + 'vendors.js', verdorModulesContent, 'utf8');

  const vendorUrls = require('../' + tempDir + 'vendors.js');

  // modules vs baseUrls
  for (const [key, value] of Object.entries(vendorUrls)) {
    if (key.includes('BaseUrl')) {
      baseUrls.push(value);
    } else {
      modules.push(value);
    }
  }

  // get modules from baseUrls
  for (const baseUrl of baseUrls) {
    // https://unpkg.com/@seth0x41/doppio@1.0.0/
    if (baseUrl.startsWith('https://unpkg.com/')) {
      baseUrl.replace('https://unpkg.com/', '');
    }
    if (baseUrl.startsWith('https://')) continue;
    const mod = getModuleName(baseUrl);
    const type = baseUrl.startsWith('gh:') ? 'gh' : 'npm';
    const modInfoUrl = `https://data.jsdelivr.com/v1/package/${type}/${mod}/flat`;
    const modInfo = await fetch(modInfoUrl).then((res) => res.json());
    const files = modInfo.files;
    if (!Array.isArray(files)) continue;
    for (const file of files) {
      if ((mod + file.name).includes(baseUrl) && !shouldExclude(mod + file.name)) {
        modules.push(mod + file.name);
      }
    }
  }

  // get moduleUrls
  for (const module of modules) {
    if (module.startsWith('http')) {
      moduleUrls.push({ module, url: module });
    } else if (module.startsWith('gh:')) {
      moduleUrls.push({
        module,
        url: `https://cdn.jsdelivr.net/gh/${module.replace('gh:', '')}`,
      });
    } else {
      // use unpkg - no restriction on file types (e.g. jar)
      moduleUrls.push({ module, url: `https://unpkg.com/${module}` });
    }
    // TODO: handle modules hosted elsewhere:
    //   - https://cdn.jsdelivr.net/pyodide/v0.25.1/full/ -> https://pyodide.org/en/stable/usage/downloading-and-deploying.html#github-releases
    // TODO: handle font absolute urls in css (in font CDNs)
  }

  // download modules
  for (const { module, url } of moduleUrls) {
    const fullPath =
      modulesDir + module.replaceAll('https://', '').replaceAll(':', '_').replaceAll('?', '_');
    const dirPath = path.dirname(fullPath);
    if (fs.existsSync(fullPath)) continue;

    let text = '';
    if (dryRun) {
      text = url;
    } else {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Failed to fetch ${module}: ${res.statusText}`);
        continue;
      }
      text = await res.text();
    }
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(fullPath, text);
  }

  // copy to build directory
  fs.mkdirSync(outputDir, { recursive: true });
  fs.promises.cp(modulesDir, outputDir, { recursive: true });

  // cleanup
  fs.rmSync(tempDir + 'vendors.js');

  // utils
  /**
   * @param {string} module
   */
  function getModuleName(module) {
    if (module.startsWith('gh:')) {
      return module.replace('gh:', '');
    }
    const parts = module.split('/');
    if (parts[0].startsWith('@')) {
      return parts[0] + '/' + parts[1];
    } else {
      return parts[0];
    }
  }
  /**
   * @param {string} module
   */
  function shouldExclude(module) {
    const includePackages = ['@live-codes/browser-compilers'];
    const excludeExtensions = ['.map', '.md', '.d.ts', 'package.json', 'package-lock.json'];
    for (const pkg of includePackages) {
      if (module.includes(pkg)) return false;
    }
    for (const extension of excludeExtensions) {
      if (module.endsWith(extension)) {
        return true;
      }
    }
    return false;
  }
};

module.exports = { downloadModules };

if (require.main === module) {
  downloadModules({ dryRun: process.argv.includes('--dry-run') });
}
