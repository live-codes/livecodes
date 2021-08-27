import { Template } from '../../models';

export const watStarter: Template = {
  name: 'wat',
  title: 'WebAssembly Text Starter',
  thumbnail: 'assets/templates/webassembly.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, WebAssembly Text!</h1>
  <img class="logo" src="{{ __localpen_baseUrl__ }}assets/templates/webassembly.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button">Click me</button>
</div>

<script defer>
  (async() => {
    // \`wasm\` is a global variable (promise) which resolves to an object
    // exposing the compiled wasm module and wasm binary
    const { wasmModule, binary } = await wasm;
    const { increment } = wasmModule.exports;

    const counter = document.querySelector("#counter");
    const button = document.querySelector("#counter-button");
    let count = 0;

    button.addEventListener("click", () => {
      count = increment(count);
      counter.textContent = count;
    }, false);

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
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (memory $0 0)
 (export "increment" (func $input/increment))
 (export "memory" (memory $0))
 (func $input/increment (param $0 i32) (result i32)
  local.get $0
  i32.const 1
  i32.add
 )
)`.trimStart(),
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
