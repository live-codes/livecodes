// Connect middleware for the dev app server (`npm run serve:app`).
// It sends cross-origin isolation headers so the app page is
// `crossOriginIsolated`. Embedded sandbox (result/compiler) frames can only
// be isolated when the embedding page is isolated too, and threaded Wasm
// runtimes (e.g. Elixir on AtomVM) need isolation to boot.
//
// NOTE: this must be plain `same-origin`. `same-origin-allow-popups` does NOT
// produce an isolated context in browsers (verified), so it cannot be used
// here even though it would preserve OAuth popups. `credentialless` (instead
// of `require-corp`) keeps third-party CDN resources loading without CORP.
module.exports = function appIsolationHeaders(req, res, next) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  // The app is designed to be embedded cross-origin (SDK). Without an
  // explicit CORP header, COEP defaults it to same-origin and cross-origin
  // embeds are blocked (net::ERR_BLOCKED_BY_RESPONSE).
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
};
