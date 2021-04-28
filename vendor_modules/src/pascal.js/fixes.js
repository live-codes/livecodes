// emscripten workarounds
// @ts-ignore
window.arguments = [];

var Module = {};

// Keep LLVM.js from triggering browser print dialog
window.print = function () {};

// Monkey patch XMLHttpRequest open to be relative to XHR_PREFIX
(function (xhr) {
  var orig_open = xhr.open;
  xhr.open = function (method, url) {
    var rest = Array.prototype.slice.apply(arguments).slice(2);
    if (window.XHR_PREFIX && url.substr(0, 4).toLowerCase() !== 'http') {
      url = XHR_PREFIX + url;
    }
    return orig_open.apply(this, [method, url].concat(rest));
  };
})(XMLHttpRequest.prototype);

// TODO: fix
var XHR_PREFIX = 'https://kanaka.github.io/pascal.js/llvm.js/';
