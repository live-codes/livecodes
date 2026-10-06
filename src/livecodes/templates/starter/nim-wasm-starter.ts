import type { Template } from '../../models';

export const nimWasmStarter: Template = {
  name: 'nim-wasm',
  title: window.deps.translateString('templates.starter.nim-wasm', 'Nim (Wasm) Starter'),
  thumbnail: 'assets/templates/nim.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/nim.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // The compiled program reads standard input, so give it something to read on the first run.
  livecodes.nimWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    await livecodes.nimWasm.loaded;
    update(livecodes.nimWasm.output);

    button.onclick = async () => {
      button.disabled = true;
      const { output } = await livecodes.nimWasm.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (!isNaN(Number(count))) {
        window.count = count;
        counter.innerText = window.count;
      }
      if (title) {
        name.innerText = title;
      }
      button.innerText = "Click me";
      button.disabled = false;
    }
  });
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
    language: 'nim-wasm',
    // Compiled to C and then to WebAssembly by the Clang toolchain, which the runner drives in its own worker.
    content: `
import std/strutils

echo "Nim"
let count = stdin.readLine().parseInt()
echo count + 1
`.trimStart(),
  },
};
