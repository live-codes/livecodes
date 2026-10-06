import type { Template } from '../../models';

/**
 * The V starter, matching the other Wasm starters: the markup drives the program through the
 * `livecodes.v` API. The program's first line names the language — which is what the heading
 * shows — and the second is a counter the button increments by re-running with new input.
 */
export const vWasmStarter: Template = {
  name: 'v-wasm',
  title: window.deps.translateString('templates.starter.v-wasm', 'V Starter'),
  thumbnail: 'assets/templates/v.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/v.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.v.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.v.loaded;

    // get initial output
    const initialOutput = livecodes.v.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.v.run(window.count);
      update(output);
    };

    function update(output) {
      const counter = document.querySelector("#counter");
      const name = document.querySelector("#name");

      const [title, count] = (output || '').split('\\n');

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
    language: 'v-wasm',
    content: `
import os

fn main() {
	count := os.input('').int()
	println('V')
	println(count + 1)
}
`.trimStart(),
  },
};
