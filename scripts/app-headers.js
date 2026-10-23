// Connect middleware for the dev app server (`npm run serve:app`).
// Cross-origin isolation is deliberately not enabled: the Beam (Elixir/Erlang)
// runtime uses a single-threaded AtomVM build and does not need
// SharedArrayBuffer. Keeping COOP/COEP off also preserves popup-based OAuth.
module.exports = function appHeaders(req, res, next) {
  // The app is designed to be embedded cross-origin (SDK). Without an
  // explicit CORP header, COEP defaults it to same-origin and cross-origin
  // embeds are blocked (net::ERR_BLOCKED_BY_RESPONSE).
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
};
