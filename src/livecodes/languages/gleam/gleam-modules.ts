import { gleamBaseUrl } from '../../vendors';

const srcBaseUrl = gleamBaseUrl + 'build/packages/';

export interface Modules {
  [key: string]: {
    srcUrl?: string;
    src?: string;
    compiledUrl?: string;
  };
}

export const modules: Modules = {
  // gleam_stdlib
  'gleam/bit_array': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bit_array.gleam' },
  'gleam/bool': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bool.gleam' },
  'gleam/bytes_builder': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/bytes_builder.gleam' },
  'gleam/dict': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/dict.gleam' },
  'gleam/dynamic': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/dynamic.gleam' },
  'gleam/float': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/float.gleam' },
  'gleam/function': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/function.gleam' },
  'gleam/int': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/int.gleam' },
  'gleam/io': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/io.gleam' },
  'gleam/iterator': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/iterator.gleam' },
  'gleam/list': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/list.gleam' },
  'gleam/option': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/option.gleam' },
  'gleam/order': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/order.gleam' },
  'gleam/pair': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/pair.gleam' },
  'gleam/queue': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/queue.gleam' },
  'gleam/regex': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/regex.gleam' },
  'gleam/result': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/result.gleam' },
  'gleam/set': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/set.gleam' },
  'gleam/string': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/string.gleam' },
  'gleam/string_builder': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/string_builder.gleam' },
  'gleam/uri': { srcUrl: srcBaseUrl + 'gleam_stdlib/src/gleam/uri.gleam' },
  // extras
  'gleam/crypto': { srcUrl: srcBaseUrl + 'gleam_crypto/src/gleam/crypto.gleam' },
  'gleam/erlang': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang.gleam' },
  'gleam/erlang/atom': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang/atom.gleam' },
  'gleam/erlang/charlist': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang/charlist.gleam' },
  'gleam/erlang/node': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang/node.gleam' },
  'gleam/erlang/os': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang/os.gleam' },
  'gleam/erlang/process': { srcUrl: srcBaseUrl + 'gleam_erlang/src/gleam/erlang/process.gleam' },
  'gleam/fetch': { srcUrl: srcBaseUrl + 'gleam_fetch/src/gleam/fetch.gleam' },
  'gleam/http': { srcUrl: srcBaseUrl + 'gleam_http/src/gleam/http.gleam' },
  'gleam/http/cookie': { srcUrl: srcBaseUrl + 'gleam_http/src/gleam/http/cookie.gleam' },
  'gleam/http/request': { srcUrl: srcBaseUrl + 'gleam_http/src/gleam/http/request.gleam' },
  'gleam/http/response': { srcUrl: srcBaseUrl + 'gleam_http/src/gleam/http/response.gleam' },
  'gleam/http/service': { srcUrl: srcBaseUrl + 'gleam_http/src/gleam/http/service.gleam' },
  'gleam/javascript': { srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript.gleam' },
  'gleam/javascript/array': {
    srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/array.gleam',
  },
  'gleam/javascript/map': {
    srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/map.gleam',
  },
  'gleam/javascript/promise': {
    srcUrl: srcBaseUrl + 'gleam_javascript/src/gleam/javascript/promise.gleam',
  },
  'gleam/json': { srcUrl: srcBaseUrl + 'gleam_json/src/gleam/json.gleam' },
  'gleam/otp/actor': { srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/actor.gleam' },
  'gleam/otp/intensity_tracker': {
    srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/intensity_tracker.gleam',
  },
  'gleam/otp/port': { srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/port.gleam' },
  'gleam/otp/supervisor': { srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/supervisor.gleam' },
  'gleam/otp/system': { srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/system.gleam' },
  'gleam/otp/task': { srcUrl: srcBaseUrl + 'gleam_otp/src/gleam/otp/task.gleam' },
};
