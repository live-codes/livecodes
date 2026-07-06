const fs = require('fs');
const path = require('path');

const pkg = fs.readFileSync(path.resolve('./package.json'), 'utf8');
const patched = pkg.replace('run-p install:*', 'run-p install:server');
fs.writeFileSync(path.resolve('./package.json'), patched, 'utf8');
