// Dev server for the app.
// Mirrors the old `live-server build ...` flags, but loads the
// isolation-headers middleware via an absolute path (live-server resolves
// relative `--middleware` paths from its own package, not the repo root).
const path = require('path');
const liveServer = require('live-server');

liveServer.start({
  root: path.join(__dirname, '..', 'build'),
  watch: path.join(__dirname, '..', 'build', 'tmp'),
  cors: true,
  quiet: true,
  middleware: [path.join(__dirname, 'app-headers.js')],
});
