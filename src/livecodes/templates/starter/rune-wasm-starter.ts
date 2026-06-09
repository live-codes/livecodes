import type { Template } from '../../models';

export const runeWasmStarter: Template = {
  name: 'rune-wasm',
  aliases: ['rune', 'rn'],
  title: window.deps.translateString('templates.starter.rune-wasm', 'Rune Starter'),
  thumbnail: 'assets/templates/rune.svg',
  activeEditor: 'script',
  markup: {
    language: 'html',
    content: `
<div class="container">
  <h1>Hello, <span id="title">World</span>!</h1>
  <img class="logo" alt="logo" src="{{ __livecodes_baseUrl__ }}assets/templates/rune.svg" />
  <p>You clicked <span id="counter">0</span> times.</p>
  <button id="counter-button" disabled>Loading...</button>
</div>

<script>
  // set initial input
  livecodes.runeWasm.input = "-1";

  addEventListener('load', async () => {
    const button = document.querySelector("#counter-button");

    // wait till loaded
    await livecodes.runeWasm.loaded;

    // get initial output
    const initialOutput = livecodes.runeWasm.output;
    update(initialOutput);

    button.onclick = async () => {
      button.disabled = true;
      // run with new input
      const {output} = await livecodes.runeWasm.run(window.count);
      update(output);
    };

    function update(output) {
      const name = document.querySelector("#title");
      const counter = document.querySelector("#counter");
      const button = document.querySelector("#counter-button");

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
    language: 'rune-wasm',
    content: `
pub fn main() {
    println("Hello, Rune!");
    println(\`\${__input + 1}\`);
}
`.trimStart(),
  },
};
