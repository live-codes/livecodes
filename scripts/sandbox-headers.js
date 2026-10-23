// Connect middleware for the dev sandbox server (`npm run serve:sandbox`).
// The sandbox is embedded cross-origin by the app, so allow that explicitly.
// No COOP/COEP: the Beam runtime is single-threaded and does not require
// cross-origin isolation.
module.exports = function sandboxHeaders(req, res, next) {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
};
