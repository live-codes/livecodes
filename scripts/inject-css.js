var fs = require('fs');
var path = require('path');

var htmlFile = 'build/index.html';
var cssFile = 'src/livecodes/styles/index.css';

var html = fs.readFileSync(path.resolve(htmlFile), 'utf8');
var css = fs.readFileSync(path.resolve(cssFile), 'utf8');

var result = html.replace('<!-- main.css -->', `<style>\n${css}</style>`);
fs.writeFileSync(path.resolve(htmlFile), result, 'utf8');
