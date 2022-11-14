const fs = require('fs');
const md5File = require('md5-file');

const applyHash = async () => {
  const buildDir = './build/livecodes/';
  const filetypes = ['js', 'css'];

  const getFileNames = async (dir = buildDir) =>
    (await fs.promises.readdir(dir)).filter((name) => !fs.statSync(dir + name).isDirectory());

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

  const patch = async (
    /** @type {string} */ filePath,
    /** @type {Record<string, string>} */ replacements = {},
  ) => {
    const data = await fs.promises.readFile(filePath, 'utf8');
    var result = data;
    for (const key of Object.keys(replacements)) {
      result = result.split(`{{hash:${key}}}`).join(replacements[key]);
    }
    if (result === data) return;
    await fs.promises.writeFile(filePath, result, 'utf8');
  };

  /** @type {Record<string, string>} */
  const hashMap = {};

  await Promise.all(
    (
      await getFileNames()
    ).map(async (file) => {
      if (!filetypes.some((ext) => file.endsWith(`.${ext}`))) return;
      const hash = await md5File(buildDir + file);
      const newFile = addHash(file, hash);
      hashMap[file] = newFile;
    }),
  );

  await Promise.all(
    Object.keys(hashMap).map(
      (x) =>
        fs.promises
          .rename(buildDir + x, buildDir + hashMap[x])
          .catch(() => fs.promises.rename(buildDir + x, buildDir + hashMap[x])), // retry
    ),
  );

  const dirsToPatch = ['build/', 'build/assets/', buildDir];
  for (const dir of dirsToPatch) {
    const files = await getFileNames(dir);
    await Promise.all(files.map((file) => patch(dir + file, hashMap)));
  }
};

module.exports = { applyHash };

if (require.main === module) {
  applyHash();
}
