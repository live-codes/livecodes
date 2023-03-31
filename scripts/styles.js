const fs = require('fs');
const path = require('path');

const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const srcDir = 'src/livecodes/styles/';
const outDir = 'build/livecodes/';

const buildStyles = async (devMode = false) => {
  const getFileNames = async (dir = srcDir) =>
    (await fs.promises.readdir(dir))
      .filter((name) => !fs.statSync(dir + name).isDirectory())
      .filter((name) => ['css', 'scss'].some((t) => name.endsWith('.' + t)));

  const files = await getFileNames(srcDir);

  await Promise.all(
    files.map(async (file) => {
      const style = devMode ? 'expanded' : 'compressed';
      const compiled = sass.compile(srcDir + file, { style, sourceMap: false });

      const processed = await new Promise((res) => {
        // @ts-ignore
        postcss([autoprefixer])
          .process(compiled.css, { from: undefined })
          .then((result) => {
            res(result.css);
          });
      });

      await fs.promises.writeFile(
        path.resolve(outDir + file.replace('scss', 'css')),
        processed,
        'utf8',
      );
    }),
  );
};

module.exports = { buildStyles };

if (require.main === module) {
  buildStyles();
}
