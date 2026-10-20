// Connect middleware for the dev sandbox server (`npm run serve:sandbox`).
// It sends cross-origin isolation headers so that result/compiler pages are
// `crossOriginIsolated`, which enables `SharedArrayBuffer`. Threaded Wasm
// runtimes (e.g. Elixir on AtomVM) need it to boot.
//
// `credentialless` (instead of `require-corp`) is used so that third-party
// CDN resources without CORP headers keep loading; browsers that do not
// support it simply ignore it and behave as before.
module.exports = function sandboxIsolationHeaders(req, res, next) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  // The sandbox is meant to be embedded cross-origin (the app embeds result
  // and compiler frames), so opt into that explicitly.
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
};
