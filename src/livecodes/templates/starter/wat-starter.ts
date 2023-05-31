import type { Template } from '../../models';

export const watStarter: Template = {
  name: 'wat',
  title: 'WebAssembly Text Starter',
  thumbnail: 'assets/templates/webassembly.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/webassembly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script>
  (async () => {
    const importObject = {
      title: {
        change: changeTitle,
      },
    };

    // The \`loadWasm\` method of \`livecodes\` global object
    // optionally takes an import object and
    // returns a promise which resolves to an object
    // exposing the compiled wasm module and wasm binary
    const { wasmModule, binary } = await livecodes.loadWasm(importObject);
    const { memory, setTitle, increment } = wasmModule.exports;

    function changeTitle(offset, length) {
      const bytes = new Uint8Array(memory.buffer, offset, length);
      const title = new TextDecoder("utf8").decode(bytes);
      document.querySelector("#title").innerText = title;
    }
    setTitle();

    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    button.addEventListener(
      "click",
      () => {
        count = increment(count);
        counter.innerText = count;
      },
      false
    );
  })();
</script>
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
    language: 'wat',
    content: `
(module
  (import "title" "change" (func $changeTitle (param i32) (param i32)))
  (export "memory" (memory $0))
  (export "setTitle" (func $setTitle))
  (export "increment" (func $increment))
  (memory $0 1)
  (data 0 (i32.const 0) "WebAssembly Text")
  (func $setTitle
    (call $changeTitle (i32.const 0) (i32.const 16))
  )
  (func $increment (param $0 i32) (result i32)
    (i32.add (local.get $0) (i32.const 1))
  )
)
`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
