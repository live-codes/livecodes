const fs = require('fs');
const md5File = require('md5-file');

const applyHash = async () => {
  const buildDir = './build/livecodes/';
  const filetypes = ['js', 'css'];

  const getFileNames = async (dir = buildDir) =>
    (await fs.promises.readdir(dir)).filter((name) => !fs.statSync(dir + name).isDirectory());

  const addHash = (/** @type {string} */ file, /** @type {string} */ hash) => {
    filetypes.forEach((ext) => {
      file = file.replace(`.${ext}`, `.${hash}.${ext}`);
    });
    return file;
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
  await Promise.all(
    (
      await getFileNames()
    ).map(async (file) => {
      if (!filetypes.some((ext) => file.endsWith(`.${ext}`))) return;
      if (file.length > 35 && file.split('.').length > 0) {
        // previous hashed build
        await fs.promises.rm(buildDir + file);
        return;
      }

      const hash = await md5File(buildDir + file);
      const newFile = addHash(file, hash);
      hashMap[`{{hash:${file}}}`] = newFile;
      try {
        await fs.promises.rename(buildDir + file, buildDir + newFile);
      } catch {
        // retry
        await fs.promises.rename(buildDir + file, buildDir + newFile);
      }
    }),
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
