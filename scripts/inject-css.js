var fs = require('fs');
var path = require('path');

const injectCss = async () => {
  var htmlFile = 'build/index.html';
  var outDir = 'build/livecodes/';
  const cssFile =
    outDir +
    (await fs.promises.readdir(outDir)).find(
      (file) => file.startsWith('index.') && file.endsWith('.css'),
    );

  var html = fs.readFileSync(path.resolve(htmlFile), 'utf8');
  var css = fs.readFileSync(path.resolve(cssFile), 'utf8');

  var result = html.replace('<!-- main.css -->', `<style>\n${css}</style>`);
  fs.writeFileSync(path.resolve(htmlFile), result, 'utf8');
};

module.exports = { injectCss };

if (require.main === module) {
  injectCss();
}
