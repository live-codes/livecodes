var fs = require('fs');
var path = require('path');
var rfs = require('recursive-fs');

function mkdirp(dir) {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }
}

var node_modules = path.resolve(__dirname + '/../node_modules');
var browserCompilers = path.resolve(node_modules + '/@live-codes/browser-compilers/dist');
var targetDir = path.resolve(__dirname + '/../build/livecodes/vendor');
mkdirp(targetDir);

//monaco-editor
rfs.copy(
  path.resolve(browserCompilers + '/monaco-editor'),
  path.resolve(targetDir + '/monaco-editor'),
);
