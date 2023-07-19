const fs = require('fs');
const crypto = require('crypto');

const srcDirs = ['build/', 'build/livecodes/'];
const outputDir = 'build/livecodes/';
const filetypes = ['js', 'css', 'html', 'svg', 'ico', 'png'];
const hashPattern = /{{hash:([\w\.-]+)}}/g;
const hashedPattern = /["'\/]([\w-\.]+\.[\w\d]{32}\.[\w]{2,3})["']/g;
const brokenLinks = [];

const ignoreHash = (filename) => {
  if (!filename.includes(outputDir)) return true;
  return false;
};

const md5 = (data) => crypto.createHash('md5').update(data).digest('hex');

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

const getHashedFileNames = async (srcFiles) => {
  const hashedNames = [];
  for (const file of srcFiles) {
    const data = await fs.promises.readFile(file, 'utf8');
    const hashedMatches = [...data.matchAll(new RegExp(hashedPattern))];
    hashedNames.push(...hashedMatches.map((m) => m[1]));

    const unHashedMatches = [...data.matchAll(new RegExp(hashPattern))];
    brokenLinks.push(...unHashedMatches.map((m) => m[0]));

    if (!ignoreHash(file) && !file.includes(md5(data))) {
      brokenLinks.push(file);
    }
  }
  return [...new Set(hashedNames)].sort();
};

(async () => {
  const srcFiles = await getAllFiles(srcDirs);
  const hashedNames = await getHashedFileNames(srcFiles);

  const outFiles = await getFileNames(outputDir);

  for (const name of hashedNames) {
    if (!outFiles.includes(name)) {
      brokenLinks.push(name);
    }
  }
  if (brokenLinks.length > 0) {
    throw new Error('broken links!\n' + brokenLinks.map((x) => outputDir + x).join('\n') + '\n');
  }

  console.log('No broken links!');
})();
