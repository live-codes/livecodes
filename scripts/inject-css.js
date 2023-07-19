var fs = require('fs');
var path = require('path');

const injectCss = async () => {
  var htmlFile = 'build/index.html';
  var outDir = 'build/livecodes/';
  const cssFile = (await fs.promises.readdir(outDir)).find(
    (file) => file.startsWith('index.') && file.endsWith('.css'),
  );

  if (!cssFile) return;

  var html = fs.readFileSync(path.resolve(htmlFile), 'utf8');
  var css = fs.readFileSync(path.resolve(outDir + cssFile), 'utf8');

  var result = html.replace('<!-- index.css -->', `<style>\n${css}</style>`);
  fs.writeFileSync(path.resolve(htmlFile), result, 'utf8');
  fs.unlinkSync(path.resolve(outDir + cssFile));
};

module.exports = { injectCss };

if (require.main === module) {
  injectCss();
}
