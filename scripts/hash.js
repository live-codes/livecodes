const fs = require('fs');
const crypto = require('crypto');

const applyHash = async (
  /** @type {{devMode?:boolean; buildDir?: string; entryPoint?: string; patchFiles?: string[]; hashPattern?: RegExp}} */ {
    devMode = false,
    buildDir = 'build/livecodes/',
    entryPoint = 'index.js',
    patchFiles = ['build/index.html'],
    hashPattern = /{{hash:([\w\.-]+)}}/g,
  } = {},
) => {
  const filetypes = ['js', 'css', 'html', 'svg', 'ico', 'png', 'json'];

  const getFileNames = async (dir) =>
    (await fs.promises.readdir(dir))
      .filter((name) => !fs.statSync(dir + name).isDirectory())
      .filter((name) => filetypes.some((t) => name.endsWith('.' + t)));

  const getAllFiles = async (srcDirs) => {
    const srcFiles = [];
    for (const dir of srcDirs) {
      (await getFileNames(dir)).forEach((file) => {
        srcFiles.push(dir + file);
      });
    }
    return srcFiles;
  };

  const devPatch = async () => {
    const buildDirFiles = await getAllFiles([buildDir]);
    for (const file of [...patchFiles, ...buildDirFiles]) {
      const data = await fs.promises.readFile(file, 'utf8');
      const result = data.replace(new RegExp(hashPattern), (_match, name) => name);
      await fs.promises.writeFile(file, result, 'utf8');
    }
  };

  if (devMode) return devPatch();

  const addHash = (/** @type {string} */ file, /** @type {string} */ hash) => {
    const ext = filetypes.find((t) => file.endsWith('.' + t));
    if (ext) {
      file = removeHash(file).replace(`.${ext}`, `.${hash}.${ext}`);
    }
    return file;
  };

  const removeHash = (/** @type {string} */ file) => {
    const fileParts = file.split('.');
    if (file.length < 35 || fileParts.length < 3) return file;
    return fileParts.filter((x, id) => x.length !== 32 || id === 0).join('.');
  };

  const md5 = (data) => crypto.createHash('md5').update(data).digest('hex');

  /** @type {Record<string, string>} */
  const hashMap = {};

  const patch = async (/** @type {string} */ fileName) => {
    if (hashMap[fileName]) return;
    hashMap[fileName] = 'waiting';
    const data = await fs.promises.readFile(buildDir + fileName, 'utf8').catch((e) => {
      if (devMode) return '';
      throw e;
    });
    const matches = data.matchAll(new RegExp(hashPattern));
    for (const match of matches) {
      const matchName = match[1];
      if (!matchName || hashMap[matchName]) continue;
      await patch(matchName);
    }
    const result = data.replace(new RegExp(hashPattern), (_match, name) => hashMap[name]);

    if (devMode) {
      hashMap[fileName] = fileName;
      await fs.promises.writeFile(buildDir + fileName, result, 'utf8');
      return;
    }

    const hash = md5(result);
    const hashedName = addHash(fileName, hash);
    hashMap[fileName] = hashedName;
    await fs.promises.writeFile(buildDir + hashedName, result, 'utf8');
  };

  await patch(entryPoint);

  for (const file of Object.keys(hashMap)) {
    if (hashMap[file] !== file) {
      await fs.promises.unlink(buildDir + file).catch((e) => {
        if (!devMode) throw e;
      });
    }
  }

  for (const file of patchFiles) {
    const data = await fs.promises.readFile(file, 'utf8');
    const result = data.replace(new RegExp(hashPattern), (_match, name) => hashMap[name]);
    await fs.promises.writeFile(file, result, 'utf8');
  }
};

module.exports = { applyHash };

if (require.main === module) {
  applyHash();
}
