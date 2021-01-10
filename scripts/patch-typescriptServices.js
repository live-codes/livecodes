var fs = require('fs');
var path = require('path');

var outDir = path.resolve(__dirname + '/../vendor_modules/src/typescript');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.copyFileSync(
  path.resolve(
    __dirname +
      '/../node_modules/monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js',
  ),
  path.resolve(outDir + '/typescriptServices.js'),
);
fs.appendFileSync(
  path.resolve(outDir + '/typescriptServices.js'),
  'export var transpile = ts.transpile;\n',
);
