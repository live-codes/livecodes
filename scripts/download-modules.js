const decompress = require('decompress');
const decompressTarbz = require('decompress-tarbz2');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const sdkPkg = require('../src/sdk/package.sdk.json');

const downloadModules = async ({ dryRun = false } = {}) => {
  console.log(`Downloading modules...`);

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
  let pyodideBaseUrl = '';

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
  for (let baseUrl of baseUrls) {
    if (baseUrl.includes('@seth0x41/doppio')) {
      baseUrl = baseUrl.replace('https://unpkg.com/', '').replace('unpkg:', '');
    }
    if (baseUrl.includes('pyodide')) {
      pyodideBaseUrl = baseUrl;
    }
    if (baseUrl.startsWith('https://')) {
      continue;
    }
    const mod = getModuleName(baseUrl);
    const type = baseUrl.startsWith('gh:') ? 'gh' : 'npm';
    const modInfoUrl = `https://data.jsdelivr.com/v1/package/${type}/${mod}/flat`;
    const modInfo = await fetch(modInfoUrl).then((res) => res.json());
    const files = modInfo.files;
    if (Array.isArray(files)) {
      for (const file of files) {
        if ((mod + file.name).includes(baseUrl) && !shouldExclude(mod + file.name)) {
          modules.push(mod + file.name);
        }
      }
    } else if (type === 'gh') {
      // use GitHub API when jsDelivr errors: Package size exceeded the configured limit of 50 MB.
      const [repo, version] = mod.split('@');
      const filesUrl = `https://api.github.com/repos/${repo}/git/trees/${version}?recursive=1`;
      const repoInfo = await fetch(filesUrl).then((res) => res.json());
      const files = repoInfo.tree;
      if (Array.isArray(files)) {
        const basePath = baseUrl.split(mod + '/')[1];
        for (const file of files) {
          if (file.path.includes(basePath) && !shouldExclude(mod + '/' + file.path)) {
            modules.push('gh:' + mod + '/' + file.path);
          }
        }
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
    // TODO: handle font absolute urls in css (in font CDNs)
  }

  // download modules
  const download = async (/** @type {Array<{module: string; url: string}>} */ moduleUrls) => {
    /** @type {Array<{module: string; url: string; error: string}>} */
    const failedModuleUrls = [];

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
          failedModuleUrls.push({ module, url, error: res.statusText });
          continue;
        }
        text = await res.text();
      }
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(fullPath, text);
    }

    return failedModuleUrls;
  };

  let failedModuleUrls = await download(moduleUrls);
  if (failedModuleUrls.length) {
    // retry
    failedModuleUrls = await download(failedModuleUrls);
    if (failedModuleUrls.length) {
      for (const { module, error } of failedModuleUrls) {
        console.error(`Failed to download module (${module}): ${error}`);
      }
    }
  }

  // download Pyodide
  if (pyodideBaseUrl) {
    const pyodideVersion = pyodideBaseUrl.split('/v')[1].split('/')[0] || '0.28.0';
    const pyodideFiles = [
      `pyodide-${pyodideVersion}.tar.bz2`,
      `pyodide-core-${pyodideVersion}.tar.bz2`,
      `static-libraries-${pyodideVersion}.tar.bz2`,
      `xbuildenv-${pyodideVersion}.tar.bz2`,
    ];
    fs.mkdirSync(`${tempDir}pyodide/v${pyodideVersion}`, { recursive: true });
    await Promise.all(
      pyodideFiles.map((file) =>
        (async () => {
          const downloadPath = `${tempDir}pyodide/v${pyodideVersion}/${file}`;
          const url = `https://github.com/pyodide/pyodide/releases/download/${pyodideVersion}/${file}`;
          if (!fs.existsSync(downloadPath)) {
            await fetchAndSaveFile(url, downloadPath);
          }
          await decompress(downloadPath, `${outputDir}pyodide/v${pyodideVersion}/full`, {
            plugins: [decompressTarbz()],
            map: (file) => {
              file.path = file.path.split('/').slice(1).join('/');
              return file;
            },
          });
        })(),
      ),
    );
  }

  // copy to build directory
  fs.mkdirSync(outputDir, { recursive: true });
  fs.promises.cp(modulesDir, outputDir, { recursive: true });

  // cleanup
  fs.rmSync(tempDir + 'vendors.js');

  // log
  console.log(`Modules downloaded to: ${outputDir}`);
  if (failedModuleUrls.length) {
    console.log(`Failed to download ${failedModuleUrls.length} modules.`);
  }

  // utils
  /**
   * @param {string} module
   */
  function getModuleName(module) {
    if (module.startsWith('gh:')) {
      return module.replace('gh:', '').split('/').slice(0, 2).join('/');
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

  /**
   * @param {string | URL | Request} url
   * @param {any} filePath
   */
  async function fetchAndSaveFile(url, filePath) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.body) {
        throw new Error('Response body is empty.');
      }
      const writer = fs.createWriteStream(filePath);
      // @ts-ignore
      const readableStream = stream.Readable.fromWeb(response.body);
      readableStream.pipe(writer);
      return /** @type {Promise<void>} */ (
        new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        })
      );
    } catch (error) {
      console.error(`Error fetching or saving file: ${error.message}`);
    }
  }
};

module.exports = { downloadModules };

if (require.main === module) {
  downloadModules({ dryRun: process.argv.includes('--dry-run') });
}
