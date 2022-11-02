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

  const patch = (
    /** @type {string} */ filePath,
    /** @type {Record<string, string>} */ replacements = {},
  ) =>
    new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) return reject(err);

        var result = data;
        for (const key of Object.keys(replacements)) {
          result = result.split(key).join(replacements[key]);
        }

        if (result === data) return resolve(null);

        fs.writeFile(filePath, result, 'utf8', function (err) {
          if (err) return reject(err);
          resolve(null);
        });
      });
    });

  /** @type {Record<string, string>} */
  const hashMap = {};
  const toBeDeleted = [];
  const toBeRenamed = {};

  await Promise.all(
    (
      await getFileNames()
    ).map(async (file) => {
      if (!filetypes.some((ext) => file.endsWith(`.${ext}`))) return;

      const hash = await md5File(buildDir + file);
      const originalFile = removeHash(file);
      const newFile = addHash(originalFile, hash);

      if (file.length > 35 && file.split('.').length > 0) {
        // previous hashed build
        hashMap[file] = newFile;
        if (fs.existsSync(buildDir + originalFile)) {
          toBeDeleted.push(file);
        }
      } else {
        hashMap[`{{hash:${file}}}`] = newFile;
        toBeRenamed[file] = newFile;
      }
    }),
  );

  await Promise.all(toBeDeleted.map((x) => fs.promises.rm(buildDir + x)));
  await Promise.all(
    Object.keys(toBeRenamed).map(
      (x) =>
        fs.promises
          .rename(buildDir + x, buildDir + toBeRenamed[x])
          .catch(() => fs.promises.rename(buildDir + x, buildDir + toBeRenamed[x])), // retry
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
