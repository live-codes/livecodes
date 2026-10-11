import { setupDartRuntime } from '../dart/lang-dart-runtime';

// The result page is served without a UTF-8 charset, so the browser falls back to its default
// (windows-1252). The Dart/Flutter SDK loads its large, non-ASCII runtime scripts as
// `text/javascript` blobs, and a blob script with no charset inherits the document's encoding,
// which corrupts the SDK's data tables — an `Uri.parse` then throws
// `RangeError (index): Index out of range`. Tagging those JS blobs with UTF-8 keeps the SDK
// decoding correctly however the page is served.
const forceUtf8ScriptBlobs = () => {
  const scope = globalThis as any;
  const OriginalBlob = scope.Blob;
  if (typeof OriginalBlob !== 'function' || OriginalBlob.livecodesUtf8) return;

  const Utf8Blob = function (parts: any, options: any) {
    if (
      options &&
      typeof options.type === 'string' &&
      /^(text|application)\/(java|ecma)script$/.test(options.type)
    ) {
      options = { ...options, type: `${options.type};charset=utf-8` };
    }
    return new OriginalBlob(parts, options);
  };
  Utf8Blob.prototype = OriginalBlob.prototype;
  Utf8Blob.livecodesUtf8 = true;
  scope.Blob = Utf8Blob;
};

forceUtf8ScriptBlobs();

// Flutter renders into the result page, which is also where the compiled Dart runs.
setupDartRuntime('flutter');
