import type { Template } from '../../models';

/**
 * The D starter, matching the other Wasm starters: the markup drives the program through the
 * `livecodes.d` API. The program's first line names the language — which is what the heading
 * shows — and the second is a counter the button increments by re-running with new input.
 */
export const dWasmStarter: Template = {
  name: 'd-wasm',
  title: window.deps.translateString('templates.starter.d-wasm', 'D Starter'),
  thumbnail: 'assets/templates/d.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/d.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.d.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.d.loaded;

    // get initial output
    const initialOutput = livecodes.d.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.d.run(window.count);
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
    language: 'd',
    content: `
import std.stdio;
import std.string : strip;
import std.conv : to;

void main()
{
    writeln("D");
    int count = readln().strip().to!int;
    writeln(count + 1);
}
`.trimStart(),
  },
};
