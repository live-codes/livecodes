import type { Template } from '../../models';
import { gleamBaseUrl } from '../../vendors';

const plinthSrcBaseUrl = gleamBaseUrl + 'build/packages/plinth/src/plinth/';
const plinthCompiledBaseUrl = gleamBaseUrl + 'build/dev/javascript/plinth/plinth/';

export const gleamStarter: Template = {
  name: 'gleam',
  title: 'Gleam Starter',
  thumbnail: 'assets/templates/gleam.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1 id="title">Hello, World!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/gleam.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
.container,
.container button {
  text-align: center;
  font: 1em sans-serif;
}
.logo {
  width: 150px;
}
`.trimStart(),
  },
  script: {
    language: 'gleam',
    content: `
import gleam/int
import gleam/io
import gleam/result
import plinth/browser/document
import plinth/browser/element
import plinth/browser/event
// see docs for using custom modules:
// https://livecodes.io/docs/languages/gleam

pub fn main() {
  say_hello()
  counter()
}

fn say_hello() {
  let greeting = hello("Gleam")
  let assert Ok(title) = document.query_selector("#title")
  element.set_inner_html(title, greeting)
  io.println(cowsay(greeting))
}

fn counter() {
  document.add_event_listener("click", fn(ev) {
    let target = event.target(ev)
    case element.get_attribute(target, "id") {
        Ok("counter-button") -> increment()
        _ -> Nil
    }
  })
}

fn increment() {
  let assert Ok(el) = document.query_selector("#counter")
  let assert Ok(_) = el
  |> element.inner_text
  |> int.parse
  |> result.map(fn(n) { n + 1 })
  |> result.map(int.to_string)
  |> result.map(element.set_inner_html(el, _))
  Nil
}

// custom module
@external(javascript, "my_pkg/greet.js", "hello")
pub fn hello(str: String) -> String

// npm module
@external(javascript, "npm:cowsay2", "say")
pub fn cowsay(str: String) -> String
`.trimStart(),
  },
  customSettings: {
    imports: {
      'my_pkg/greet.js': gleamBaseUrl + 'demo/greet.js',
    },
    gleam: {
      modules: {
        'plinth/browser/audio': {
          srcUrl: plinthSrcBaseUrl + 'browser/audio.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/audio.mjs',
        },
        'plinth/browser/blob': {
          srcUrl: plinthSrcBaseUrl + 'browser/blob.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/blob.mjs',
        },
        'plinth/browser/clipboard': {
          srcUrl: plinthSrcBaseUrl + 'browser/clipboard.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/clipboard.mjs',
        },
        'plinth/browser/document': {
          srcUrl: plinthSrcBaseUrl + 'browser/document.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/document.mjs',
        },
        'plinth/browser/element': {
          srcUrl: plinthSrcBaseUrl + 'browser/element.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/element.mjs',
        },
        'plinth/browser/event': {
          srcUrl: plinthSrcBaseUrl + 'browser/event.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/event.mjs',
        },
        'plinth/browser/file': {
          srcUrl: plinthSrcBaseUrl + 'browser/file.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/file.mjs',
        },
        'plinth/browser/file_system': {
          srcUrl: plinthSrcBaseUrl + 'browser/file_system.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/file_system.mjs',
        },
        'plinth/browser/range': {
          srcUrl: plinthSrcBaseUrl + 'browser/range.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/range.mjs',
        },
        'plinth/browser/selection': {
          srcUrl: plinthSrcBaseUrl + 'browser/selection.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/selection.mjs',
        },
        'plinth/browser/serial': {
          srcUrl: plinthSrcBaseUrl + 'browser/serial.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/serial.mjs',
        },
        'plinth/browser/shadow': {
          srcUrl: plinthSrcBaseUrl + 'browser/shadow.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/shadow.mjs',
        },
        'plinth/browser/window': {
          srcUrl: plinthSrcBaseUrl + 'browser/window.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/window.mjs',
        },
        'plinth/browser/worker': {
          srcUrl: plinthSrcBaseUrl + 'browser/worker.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'browser/worker.mjs',
        },
        'plinth/javascript/big_int': {
          srcUrl: plinthSrcBaseUrl + 'javascript/big_int.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/big_int.mjs',
        },
        'plinth/javascript/compression_stream': {
          srcUrl: plinthSrcBaseUrl + 'javascript/compression_stream.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/compression_stream.mjs',
        },
        'plinth/javascript/console': {
          srcUrl: plinthSrcBaseUrl + 'javascript/console.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/console.mjs',
        },
        'plinth/javascript/date': {
          srcUrl: plinthSrcBaseUrl + 'javascript/date.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/date.mjs',
        },
        'plinth/javascript/decompression_stream': {
          srcUrl: plinthSrcBaseUrl + 'javascript/decompression_stream.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/decompression_stream.mjs',
        },
        'plinth/javascript/global': {
          srcUrl: plinthSrcBaseUrl + 'javascript/global.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/global.mjs',
        },
        'plinth/javascript/storage': {
          srcUrl: plinthSrcBaseUrl + 'javascript/storage.gleam',
          compiledUrl: plinthCompiledBaseUrl + 'javascript/storage.mjs',
        },
      },
    },
  },
};
