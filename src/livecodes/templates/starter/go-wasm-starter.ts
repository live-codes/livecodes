import type { Template } from '../../models';

export const goWasmStarter: Template = {
  name: 'go-wasm',
  title: 'C++ (Wasm) Starter',
  thumbnail: 'assets/templates/go.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/go.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.goWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.goWasm.loaded;

    // get initial output
    const initialOutput = livecodes.goWasm.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output, error, exitCode} = await livecodes.goWasm.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = output.split('\\n');

      if (parseInt(count) !== NaN) {
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
    language: 'go-wasm',
    content: `
package main

import "fmt"

func main() {
    fmt.Println("Go (Wasm)")

    // we need to read stdin and increment count
    fmt.Println("0")
}
`.trimStart(),
  },
};
