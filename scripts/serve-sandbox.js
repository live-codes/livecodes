// Dev server for the sandbox (result/compiler pages).
// Mirrors the old `live-server ... --port=8085` flags, but loads the
// isolation-headers middleware via an absolute path (live-server resolves
// relative `--middleware` paths from its own package, not the repo root).
const path = require('path');
const liveServer = require('live-server');

liveServer.start({
  root: path.join(__dirname, '..', 'src', 'livecodes', 'html', 'sandbox'),
  port: 8085,
  cors: true,
  quiet: true,
  open: false,
  noBrowser: true,
  middleware: [path.join(__dirname, 'sandbox-headers.js')],
});
