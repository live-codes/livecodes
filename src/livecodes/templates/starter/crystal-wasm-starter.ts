import type { Template } from '../../models';

export const crystalWasmStarter: Template = {
  name: 'crystal-wasm',
  aliases: ['crystal'],
  title: window.deps.translateString('templates.starter.crystal-wasm', 'Crystal Starter'),
  thumbnail: 'assets/templates/crystal.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="name">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/crystal.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.crystalWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.crystalWasm.loaded;

    // get initial output
    const initialOutput = livecodes.crystalWasm.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const { output } = await livecodes.crystalWasm.run(window.count);
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
    language: 'cr',
    content: `
title = "Crystal"
count = gets.try(&.to_i?) || -1

puts title
puts count + 1
`.trimStart(),
  },
};
